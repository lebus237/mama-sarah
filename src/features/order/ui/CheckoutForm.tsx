'use client'

import { DeliveryMode } from '@/entities/delivery'
import { I18nLabel } from '@/shared/i18n'
import { cn } from '@/shared/lib/styles'
import { CheckoutController } from '../lib/useCheckoutController'

type CheckoutFormProps = {
   controller: CheckoutController
}

export function CheckoutForm({ controller }: CheckoutFormProps) {
   const {
      step,
      phone,
      name,
      deliveryMode,
      deliveryLocation,
      paymentMethod,
      hasTriedNext,
      hasTriedPay,
      isSubmitting,
      isSuccess,
      canGoNext,
      canPay,
      step1Errors,
      step2Errors,
      step3Errors,
      goBack,
      goNext,
      onPay,
      setPhone,
      setName,
      setDeliveryMode,
      setDeliveryLocation,
      setPaymentMethod,
      setIsSuccess,
      setStep,
   } = controller

   return (
      <div className="border border-gray-200 rounded-2xl bg-white p-4 shadow-xs">
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
                     onClick={() => {
                        setIsSuccess(false)
                        setStep(1)
                     }}
                     className="px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold">
                     <I18nLabel label="checkout.backToHome" />
                  </button>
               </div>
            </div>
         ) : (
            <>
               <div className="flex items-center gap-2 mb-4">
                  <button
                     type="button"
                     onClick={() => setStep(1)}
                     className={cn(
                        'px-3 py-2 rounded-full text-sm font-semibold',
                        step === 1 ? 'bg-primary text-white' : 'bg-gray-100 text-secondary',
                     )}>
                     1. <I18nLabel label="checkout.userInfo" />
                  </button>
                  <button
                     type="button"
                     onClick={() => phone.trim().length > 0 && setStep(2)}
                     className={cn(
                        'px-3 py-2 rounded-full text-sm font-semibold',
                        step === 2 ? 'bg-primary text-white' : 'bg-gray-100 text-secondary',
                     )}>
                     2. <I18nLabel label="checkout.delivery" />
                  </button>
                  <button
                     type="button"
                     onClick={() => {
                        if (phone.trim().length === 0) return
                        if (deliveryMode === 'delivery' && deliveryLocation.trim().length === 0)
                           return
                        setStep(3)
                     }}
                     className={cn(
                        'px-3 py-2 rounded-full text-sm font-semibold',
                        step === 3 ? 'bg-primary text-white' : 'bg-gray-100 text-secondary',
                     )}>
                     3. <I18nLabel label="checkout.payment" />
                  </button>
               </div>

               {step === 1 && (
                  <div className="space-y-4">
                     <div>
                        <label className="block text-sm font-semibold text-secondary mb-1">
                           <I18nLabel label="checkout.phone" />*
                        </label>
                        <input
                           value={phone}
                           onChange={e => setPhone(e.target.value)}
                           placeholder="+237..."
                           className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                        {hasTriedNext && step1Errors.phone && (
                           <p className="mt-1 text-xs text-red-600">
                              <I18nLabel label="checkout.errorPhoneRequired" />
                           </p>
                        )}
                     </div>

                     <div>
                        <label className="block text-sm font-semibold text-secondary mb-1">
                           <I18nLabel label="checkout.name" />
                        </label>
                        <input
                           value={name}
                           onChange={e => setName(e.target.value)}
                           placeholder=""
                           className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/30"
                        />
                     </div>
                  </div>
               )}

               {step === 2 && (
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
                              <I18nLabel label={`checkout.deliveryType.${DeliveryMode.PICKUP}`} />
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
                              <I18nLabel
                                 label={`checkout.deliveryType.${DeliveryMode.DELIVERY}.choose`}
                              />
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
                           {hasTriedNext && step2Errors.deliveryLocation && (
                              <p className="mt-1 text-xs text-red-600">
                                 <I18nLabel label="checkout.errorLocationRequired" />
                              </p>
                           )}
                        </div>
                     )}
                  </div>
               )}

               {step === 3 && (
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
                                 'flex-1 px-4 py-3 rounded-xl border font-semibold',
                                 paymentMethod === 'mtn_momo'
                                    ? 'border-primary bg-primary/5 text-secondary'
                                    : 'border-gray-200 bg-white text-gray-600',
                              )}>
                              MTN MoMo
                           </button>
                           <button
                              type="button"
                              onClick={() => setPaymentMethod('orange_money')}
                              className={cn(
                                 'flex-1 px-4 py-3 rounded-xl border font-semibold',
                                 paymentMethod === 'orange_money'
                                    ? 'border-primary bg-primary/5 text-secondary'
                                    : 'border-gray-200 bg-white text-gray-600',
                              )}>
                              Orange Money
                           </button>
                        </div>
                     </div>
                     {hasTriedPay && step3Errors.paymentMethod && (
                        <p className="mt-1 text-xs text-red-600">
                           <I18nLabel label="checkout.errorPaymentRequired" />
                        </p>
                     )}
                  </div>
               )}

               <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 border-dashed">
                  <button
                     type="button"
                     onClick={goBack}
                     disabled={step === 1}
                     className="px-5 py-3 rounded-full border border-gray-300 text-sm font-semibold text-gray-600 disabled:opacity-50">
                     <I18nLabel label="checkout.back" />
                  </button>

                  {step < 3 ? (
                     <button
                        type="button"
                        onClick={goNext}
                        disabled={!canGoNext}
                        className="px-6 py-3 rounded-full bg-primary text-white text-sm font-semibold disabled:opacity-50">
                        <I18nLabel label="checkout.next" />
                     </button>
                  ) : (
                     <button
                        type="button"
                        onClick={onPay}
                        disabled={!canPay || isSubmitting}
                        className="px-6 py-3 rounded-full bg-tertiary text-white text-sm font-semibold disabled:opacity-50">
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
   )
}
