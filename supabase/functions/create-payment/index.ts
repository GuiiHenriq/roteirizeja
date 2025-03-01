import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from "../_shared/cors.ts"
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const supabaseUrl = "https://vqvgiuabjfozqbgpnlwh.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxdmdpdWFiamZvenFiZ3BubHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1MzUwODMsImV4cCI6MjA0NzExMTA4M30.da6ggSqFgyCcIfPI10iM4oDdr0WKlTVVSv9a8PftOaA";
// Obtenha a service_role key do seu projeto Supabase (Dashboard > Settings > API)
const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const MERCADO_PAGO_ACCESS_TOKEN = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN")
const WEBHOOK_URL = "https://vqvgiuabjfozqbgpnlwh.supabase.co/functions/v1/payment-webhook"

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    // Verificar se o token está configurado
    if (!MERCADO_PAGO_ACCESS_TOKEN) {
      throw new Error("MERCADO_PAGO_ACCESS_TOKEN is not defined")
    }

    // Initialize Supabase client with anon key (for user context)
    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Initialize admin client with service role key (bypasses RLS)
    const adminSupabase = serviceRoleKey 
      ? createClient(supabaseUrl, serviceRoleKey, { 
          auth: { persistSession: false }
        })
      : supabase;

    // Parse request body to get user information
    const { user_id, email, name } = await req.json()

    if (!user_id) {
      throw new Error("user_id is required")
    }

    const idempotencyKey = crypto.randomUUID()

    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        "X-Idempotency-Key": idempotencyKey
      },
      body: JSON.stringify({
        transaction_amount: 9.90,
        installments: 1,
        description: "Plano Básico - Roteirize Já",
        payment_method_id: "pix",
        payer: {
          email: email,
          first_name: name,
        },
        notification_url: WEBHOOK_URL
      })
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Failed to create payment')
    }

    console.log("Payment created successfully:", result.id)

    // Prepare order data
    const orderData = {
      id: result.id.toString(),
      user_id: user_id,
      status: result.status,
      amount: 9.90,
      payment_method: "pix",
      payment_url: result.point_of_interaction.transaction_data.ticket_url
    }

    console.log("Attempting to save order:", orderData)

    // Save order information to the database using admin client to bypass RLS
    const { data: insertData, error: insertError } = await adminSupabase
      .from('orders')
      .insert(orderData)
      .select()

    if (insertError) {
      console.error("Error saving order details:", insertError)
      throw new Error(`Failed to save order information: ${insertError.message}`)
    }

    console.log("Order saved successfully:", insertData)

    const responseData = {
      status: "ok",
      payment: {
        id: result.id,
        status: result.date_approved,
        url_payment: result.point_of_interaction.transaction_data.ticket_url
      }
    }

    return new Response(
      JSON.stringify(responseData),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    )

  } catch (error) {
    console.error("Error:", error)
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400 
      }
    )
  }
}) 