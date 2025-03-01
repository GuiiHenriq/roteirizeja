import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from "../_shared/cors.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"


const SUPABASE_URL = "https://vqvgiuabjfozqbgpnlwh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxdmdpdWFiamZvenFiZ3BubHdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1MzUwODMsImV4cCI6MjA0NzExMTA4M30.da6ggSqFgyCcIfPI10iM4oDdr0WKlTVVSv9a8PftOaA";

const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const MERCADO_PAGO_ACCESS_TOKEN = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN")

/**
 * Atualiza o perfil do usuário quando o pagamento é aprovado
 * @param adminClient Cliente Supabase com permissões de administrador
 * @param orderId ID do pedido
 * @param paymentStatus Status do pagamento
 */
async function updateUserSubscriptionStatus(adminClient, orderId, paymentStatus) {
  console.log(`Verificando status do pagamento: ${paymentStatus} para o pedido: ${orderId}`)
  
  // Só prosseguir se o status for "approved"
  if (paymentStatus !== "approved" || paymentStatus === null) {
    console.log(`Status do pagamento não é 'approved', é '${paymentStatus}'. Nenhuma atualização necessária.`)
    return { success: false, reason: "payment_not_approved" }
  }
  
  try {
    // 1. Buscar o pedido para obter o user_id
    const { data: orderData, error: orderError } = await adminClient
      .from('orders')
      .select('user_id')
      .eq('id', orderId)
      .single()
    
    if (orderError || !orderData) {
      console.error("Erro ao buscar pedido:", orderError)
      return { success: false, reason: "order_not_found", error: orderError }
    }
    
    const userId = orderData.user_id
    console.log(`Atualizando assinatura para o usuário: ${userId}`)
    
    // 2. Atualizar o perfil do usuário
    const { data: profileData, error: profileError } = await adminClient
      .from('profiles')
      .update({
        is_subscribe: true,
        count_itineraries: 0
      })
      .eq('id', userId)
      .select()
    
    if (profileError) {
      console.error("Erro ao atualizar perfil:", profileError)
      return { success: false, reason: "profile_update_failed", error: profileError }
    }
    
    console.log(`Perfil atualizado com sucesso:`, profileData)
    return { success: true, profile: profileData }
  } catch (error) {
    console.error("Erro ao processar atualização de assinatura:", error)
    return { success: false, reason: "unexpected_error", error }
  }
}

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
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    
    // Initialize admin client with service role key (bypasses RLS)
    const adminSupabase = SUPABASE_SERVICE_ROLE_KEY 
      ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { 
          auth: { persistSession: false }
        })
      : supabase;

    // Parse webhook data
    const webhookData = await req.json()
    console.log("Received webhook:", JSON.stringify(webhookData))

    // Mercado Pago sends different types of notifications
    // We're interested in 'payment' type notifications
    if (webhookData.type === "payment") {
      const paymentId = webhookData.data.id

      // Get payment details from Mercado Pago API
      const paymentResponse = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        }
      })

      const paymentData = await paymentResponse.json()

      if (!paymentResponse.ok) {
        throw new Error(`Failed to get payment details: ${paymentData.message}`)
      }

      console.log("Payment details retrieved:", paymentData.status)

      // Update order status in database using admin client to bypass RLS
      const { data: updateData, error: updateError } = await adminSupabase
        .from('orders')
        .update({ 
          status: paymentData.status,
          updated_at: new Date().toISOString()
        })
        .eq('id', paymentId.toString())
        .select()

      if (updateError) {
        console.error("Error updating order:", updateError)
        throw new Error(`Failed to update order status: ${updateError.message}`)
      }

      console.log("Order updated successfully:", updateData)
      
      // Atualizar status de assinatura do usuário se o pagamento for aprovado
      const subscriptionResult = await updateUserSubscriptionStatus(
        adminSupabase, 
        paymentId.toString(), 
        paymentData.status
      )
      
      console.log("Subscription update result:", subscriptionResult)

      return new Response(
        JSON.stringify({ 
          success: true,
          order_update: updateData,
          subscription_update: subscriptionResult
        }),
        { 
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200 
        }
      )
    }

    // For other notification types, just acknowledge receipt
    return new Response(
      JSON.stringify({ success: true, message: "Notification received" }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200 
      }
    )

  } catch (error) {
    console.error("Webhook Error:", error)
    return new Response(
      JSON.stringify({ error: error.message }), 
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400 
      }
    )
  }
}) 