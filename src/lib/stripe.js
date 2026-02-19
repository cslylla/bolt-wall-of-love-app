import { supabase } from './supabase'

const STRIPE_PRICE_ID = 'price_1QpE5pP8JbkzQo2aJoVdg7ym'

export async function createStripeCheckout(projectId, projectTitle) {
  try {
    const { data: { session } } = await supabase.auth.getSession()

    console.log('Session data:', session)
    console.log('Access token:', session?.access_token)

    if (!session) {
      throw new Error('You must be logged in to support a project')
    }

    if (!session.access_token) {
      throw new Error('No access token found in session')
    }

    const successUrl = `${window.location.origin}/wall?success=true&project=${encodeURIComponent(projectTitle)}`
    const cancelUrl = `${window.location.origin}/wall`

    console.log('Making request with Authorization:', `Bearer ${session.access_token.substring(0, 20)}...`)

    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price_id: STRIPE_PRICE_ID,
          success_url: successUrl,
          cancel_url: cancelUrl,
          mode: 'payment'
        })
      }
    )

    if (!response.ok) {
      console.error('Response status:', response.status)
      console.error('Response headers:', response.headers)
      const error = await response.json()
      console.error('Error response:', error)
      throw new Error(error.error || 'Failed to create checkout session')
    }

    const { url } = await response.json()

    if (!url) {
      throw new Error('No checkout URL returned')
    }

    return url
  } catch (error) {
    console.error('Stripe checkout error:', error)
    throw error
  }
}
