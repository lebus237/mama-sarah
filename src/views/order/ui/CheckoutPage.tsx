'use client'

import { I18nLabel } from '@/shared/i18n'
import { CartSummary } from '@/features/order'

export function CheckoutPage() {
   return (
      <div>
         <h1>
            <I18nLabel label="text.checkoutOrder" />
         </h1>

         <CartSummary />
      </div>
   )
}
