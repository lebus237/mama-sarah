'use client'

import { CartSummaryDisplay } from '@/features/order'
import { I18nLabel } from '@/shared/i18n'

export function CheckoutPage() {
   return (
      <div>
         <h1>
            <I18nLabel label="text.checkoutOrder" />
         </h1>

         <CartSummaryDisplay />
      </div>
   )
}
