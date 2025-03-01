import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/contexts/AuthContext';

export function CheckoutButton() {
  const { user } = useAuth();

  const userId = user?.user_metadata.sub;
  const userEmail = user?.user_metadata.email;
  const userName = user?.user_metadata.name;

  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    
    try {
      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { 
          user_id: userId,
          email: userEmail,
          name: userName
        }
      });

      if (error) throw error

      // Redirecionar para a página de pagamento
      if (data.payment.url_payment) {
        window.location.href = data.payment.url_payment
      }

    } catch (error) {
      console.error('Erro ao criar pagamento:', error)
      alert('Erro ao criar pagamento. Por favor, tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button 
      onClick={handleCheckout}
      disabled={loading}
      className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
    >
      {loading ? 'Processando...' : 'Pagar com PIX'}
    </button>
  )
} 