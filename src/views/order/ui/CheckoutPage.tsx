'use client'

import { CheckoutForm, OrderSummaryDisplay, useCheckoutController } from '@/features/order'
import { I18nLabel } from '@/shared/i18n'

export function CheckoutPage() {
   const controller = useCheckoutController()

   return (
      <div className="container py-8">
         <div className="xl:w-4/5 mx-auto">
            <div className="mb-6">
               <h1 className="text-2xl font-bold font-cabin text-secondary">
                  <I18nLabel label="page.checkoutOrder" />
               </h1>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
               <section className="xl:col-span-2">
                  <CheckoutForm controller={controller} />
               </section>

               <aside className="xl:col-span-1">
                  <OrderSummaryDisplay />
               </aside>
            </div>
         </div>
      </div>
   )
}
