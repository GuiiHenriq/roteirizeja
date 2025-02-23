import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from "../_shared/cors.ts"
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts"

const MERCADO_PAGO_ACCESS_TOKEN = Deno.env.get("MERCADO_PAGO_ACCESS_TOKEN")
const WEBHOOK_URL = "https://webhook.site/ad04f696-bcc2-42e4-ab89-0cc725244676"

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

    const idempotencyKey = crypto.randomUUID()
    const externalReference = `pedido_${crypto.randomUUID()}`

    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${MERCADO_PAGO_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        "X-Idempotency-Key": idempotencyKey
      },
      body: JSON.stringify({
        external_reference: `pedido_${externalReference}`,
        transaction_amount: 9.90,
        installments: 1,
        description: "Plano Básico - Roteirize Já",
        payment_method_id: "pix",
        payer: {
          email: "test@test.com",
          first_name: "Joao da Silva",
          last_name: "Santos",
          identification: {
            type: "CPF",
            number: "11111111111"
          }
        },
        notification_url: WEBHOOK_URL
      })
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Failed to create payment')
    }

    const responseData = {
      status: "ok",
      payment: {
        id: result.id,
        status: result.status,
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