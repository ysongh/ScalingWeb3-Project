import { Checkout, CheckoutButton, CheckoutStatus } from '@coinbase/onchainkit/checkout';

function OnchainCheckout() {
  return (
    <div>
      <h2>Integrate USDC checkout flows with ease</h2>

      <Checkout productId='my-product-id' > 
        <CheckoutButton coinbaseBranded/>
        <CheckoutStatus />
      </Checkout>
    </div>
  )
}

export default OnchainCheckout