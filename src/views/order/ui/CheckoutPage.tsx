'use client'

import { OrderCartRecordDisplay, useCart } from '@/features/order'
import { I18nLabel } from '@/shared/i18n'
import { cn } from '@/shared/lib/styles'
import Image from 'next/image'
import { useCheckout } from '../lib/useCheckout'

export function CheckoutPage() {
   const {
      step,
      phone,
      name,
      deliveryMode,
      deliveryLocation,
      paymentMethod,
      isSubmitting,
      isSuccess,
      hasTriedNext,
      hasTriedPay,
      canGoNext,
      canPay,
      errors,
      setPhone,
      setName,
      setDeliveryMode,
      setDeliveryLocation,
      setPaymentMethod,
      setStep,
      goBack,
      goNext,
      onPay,
      resetSuccess,
   } = useCheckout()

   const orderCart = useCart()

   const canCheckout = orderCart.totalItems > 0

   return (
      <div className="container pt-12 pb-20 md:pt-20 space-y-6">
         <div className="xl:w-4/5 mx-auto">
            <h1 className="text-2xl font-bold font-cabin text-secondary">
               <I18nLabel label="text.checkoutOrder" />
            </h1>
         </div>

         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 xl:w-4/5 mx-auto">
            <aside className="xl:col-span-2">
               <div className="border border-gray-200 rounded-lg md:rounded-2xl bg-white p-4 shadow-xs xl:min-h-80">
                  {isSuccess ? (
                     <div className="space-y-4">
                        <h2 className="text-xl font-bold font-cabin text-secondary">
                           <I18nLabel label="checkout.successTitle" />
                        </h2>
                        <p className="text-sm text-gray-600">
                           <I18nLabel label="checkout.successDescription" />
                        </p>

                        <div className="flex gap-2 pt-2">
                           <button
                              type="button"
                              onClick={resetSuccess}
                              className="px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold">
                              <I18nLabel label="checkout.backToHome" />
                           </button>
                        </div>
                     </div>
                  ) : (
                     <>
                        <div className="flex items-center gap-x-2 gap-y-4 mb-6 flex-wrap">
                           <button
                              type="button"
                              onClick={() => setStep(1)}
                              className={cn(
                                 'p-3 rounded-full text-sm font-semibold w-[45%] md:w-auto',
                                 step === 1
                                    ? 'bg-secondary text-white'
                                    : 'bg-gray-100 text-secondary',
                              )}>
                              1. <I18nLabel label="checkout.payment" />
                           </button>
                           <button
                              type="button"
                              onClick={() => paymentMethod !== '' && setStep(2)}
                              className={cn(
                                 'p-3 rounded-full text-sm font-semibold w-1/2 md:w-auto',
                                 step === 2
                                    ? 'bg-secondary text-white'
                                    : 'bg-gray-100 text-secondary',
                              )}>
                              2. <I18nLabel label="checkout.userInfo" />
                           </button>
                           <button
                              type="button"
                              onClick={() => {
                                 if (paymentMethod === '') return
                                 if (phone.trim().length === 0) return
                                 setStep(3)
                              }}
                              className={cn(
                                 'p-3 rounded-full text-sm font-semibold w-[45%] md:w-auto',
                                 step === 3
                                    ? 'bg-secondary text-white'
                                    : 'bg-gray-100 text-secondary',
                              )}>
                              3. <I18nLabel label="checkout.delivery" />
                           </button>
                        </div>

                        {step === 1 && (
                           <div className="space-y-4">
                              <div className="space-y-2">
                                 <label className="block text-sm font-semibold text-secondary">
                                    <I18nLabel label="checkout.paymentMethod" />*
                                 </label>
                                 <div className="flex flex-col sm:flex-row gap-2">
                                    <button
                                       type="button"
                                       onClick={() => setPaymentMethod('mtn_momo')}
                                       className={cn(
                                          'flex w-full md:w-1/2 px-4 py-3 rounded-xl border font-semibold items-center gap-x-6',
                                          paymentMethod === 'mtn_momo'
                                             ? 'border-primary bg-primary/5 text-secondary'
                                             : 'border-gray-200 bg-white text-gray-600',
                                       )}>
                                       <Image
                                          src="/mtn-momo-logo.png"
                                          width={50}
                                          height={50}
                                          alt="mtn logo"
                                       />
                                       <span>MTN MoMo</span>
                                    </button>
                                    <button
                                       type="button"
                                       onClick={() => setPaymentMethod('orange_money')}
                                       className={cn(
                                          'flex w-full md:w-1/2  px-4 py-3 rounded-xl border font-semibold  items-center gap-x-6',
                                          paymentMethod === 'orange_money'
                                             ? 'border-primary bg-primary/5 text-secondary'
                                             : 'border-gray-200 bg-white text-gray-600',
                                       )}>
                                       <Image
                                          src="/orange-money-logo.png"
                                          width={50}
                                          height={50}
                                          alt="orange logo"
                                       />
                                       <span>Orange Money</span>
                                    </button>
                                 </div>
                              </div>
                              {hasTriedNext && errors.step1.paymentMethod && (
                                 <p className="mt-1 text-xs text-red-600">
                                    <I18nLabel label="checkout.errorPaymentRequired" />
                                 </p>
                              )}
                           </div>
                        )}

                        {step === 2 && (
                           <div className="space-y-4">
                              <div>
                                 <label className="block text-sm font-semibold text-secondary mb-1">
                                    <I18nLabel label="checkout.phone" />*
                                 </label>
                                 <input
                                    disabled={!canCheckout}
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    placeholder={
                                       paymentMethod === 'mtn_momo'
                                          ? 'MTN: 67, 68, 69, 65, 66...'
                                          : 'Orange: 69, 65, 66, 70-79...'
                                    }
                                    type="phone"
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
                                 />
                                 {hasTriedNext && errors.step2.phone && (
                                    <p className="mt-1 text-xs text-red-600">
                                       <I18nLabel label="checkout.errorPhoneRequired" />
                                    </p>
                                 )}
                                 {hasTriedNext && errors.step2.phoneOperator && (
                                    <p className="mt-1 text-xs text-red-600">
                                       {paymentMethod === 'mtn_momo' ? (
                                          <I18nLabel label="checkout.errorPhoneNotMTN" />
                                       ) : (
                                          <I18nLabel label="checkout.errorPhoneNotOrange" />
                                       )}
                                    </p>
                                 )}
                              </div>

                              <div>
                                 <label className="block text-sm font-semibold text-secondary mb-1">
                                    <I18nLabel label="checkout.customerName" />
                                 </label>
                                 <input
                                    disabled={!canCheckout}
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder=""
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
                                 />
                              </div>
                           </div>
                        )}

                        {step === 3 && (
                           <div className="space-y-4">
                              <div className="space-y-2">
                                 <label className="block text-sm font-semibold text-secondary">
                                    <I18nLabel label="checkout.deliveryMode" />
                                 </label>
                                 <div className="flex flex-col sm:flex-row gap-2">
                                    <button
                                       type="button"
                                       onClick={() => setDeliveryMode('pickup')}
                                       className={cn(
                                          'flex-1 px-4 py-3 rounded-xl border font-semibold',
                                          deliveryMode === 'pickup'
                                             ? 'border-primary bg-primary/5 text-secondary'
                                             : 'border-gray-200 bg-white text-gray-600',
                                       )}>
                                       <I18nLabel label="checkout.delivery.pickedup" />
                                    </button>
                                    <button
                                       type="button"
                                       onClick={() => setDeliveryMode('delivery')}
                                       className={cn(
                                          'flex-1 px-4 py-3 rounded-xl border font-semibold',
                                          deliveryMode === 'delivery'
                                             ? 'border-primary bg-primary/5 text-secondary'
                                             : 'border-gray-200 bg-white text-gray-600',
                                       )}>
                                       <I18nLabel label="checkout.delivery.delivered" />
                                    </button>
                                 </div>
                              </div>

                              {deliveryMode === 'delivery' && (
                                 <div>
                                    <label className="block text-sm font-semibold text-secondary mb-1">
                                       <I18nLabel label="checkout.location" />*
                                    </label>
                                    <input
                                       value={deliveryLocation}
                                       onChange={e => setDeliveryLocation(e.target.value)}
                                       placeholder="Quartier, rue, repère..."
                                       className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
                                    />
                                    {hasTriedNext && errors.step3.deliveryLocation && (
                                       <p className="mt-1 text-xs text-red-600">
                                          <I18nLabel label="checkout.errorLocationRequired" />
                                       </p>
                                    )}
                                 </div>
                              )}
                           </div>
                        )}

                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 border-dashed">
                           <button
                              type="button"
                              onClick={goBack}
                              disabled={step === 1}
                              className="px-5 h-12 rounded-full border border-gray-300 text-sm font-semibold text-gray-600 disabled:opacity-50">
                              <I18nLabel label="checkout.back" />
                           </button>

                           {step < 3 ? (
                              <button
                                 type="button"
                                 onClick={goNext}
                                 disabled={!canGoNext}
                                 className="px-6 h-12 rounded-full bg-primary text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                                 <I18nLabel label="checkout.next" />
                              </button>
                           ) : (
                              <button
                                 type="button"
                                 onClick={
                                    canCheckout ? onPay : () => console.log('Invalid order cart')
                                 }
                                 disabled={!canPay || isSubmitting}
                                 className="px-6 h-12 rounded-full bg-tertiary text-white text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                                 {isSubmitting ? (
                                    <I18nLabel label="checkout.processing" />
                                 ) : (
                                    <I18nLabel label="checkout.pay" />
                                 )}
                              </button>
                           )}
                        </div>
                     </>
                  )}
               </div>
            </aside>

            <aside className="xl:col-span-1 hidden md:block">
               <OrderCartRecordDisplay />
            </aside>
         </div>
      </div>
   )
}
