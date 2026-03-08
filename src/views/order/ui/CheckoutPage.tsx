'use client'

import { CartSummaryDisplay, useCart } from '@/features/order'
import { I18nLabel } from '@/shared/i18n'
import { cn } from '@/shared/lib/styles'
import { useEffect, useMemo, useState } from 'react'

export function CheckoutPage() {
   const CHECKOUT_DRAFT_KEY = 'mama-sarah-checkout-draft'

   const [step, setStep] = useState<1 | 2 | 3>(1)

   const cart = useCart()

   const [phone, setPhone] = useState('')
   const [name, setName] = useState('')
   const [deliveryMode, setDeliveryMode] = useState<'pickup' | 'delivery'>('pickup')
   const [deliveryLocation, setDeliveryLocation] = useState('')
   const [paymentMethod, setPaymentMethod] = useState<'mtn_momo' | 'orange_money' | ''>('')

   const [hasTriedNext, setHasTriedNext] = useState(false)
   const [hasTriedPay, setHasTriedPay] = useState(false)
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [isSuccess, setIsSuccess] = useState(false)

   const canGoNext = useMemo(() => {
      if (step === 1) return phone.trim().length > 0
      if (step === 2) return deliveryMode === 'pickup' ? true : deliveryLocation.trim().length > 0
      if (step === 3) return paymentMethod !== ''
      return false
   }, [step, phone, deliveryMode, deliveryLocation, paymentMethod])

   const step1Errors = useMemo(() => {
      return {
         phone: phone.trim().length === 0,
      }
   }, [phone])

   const step2Errors = useMemo(() => {
      return {
         deliveryLocation: deliveryMode === 'delivery' && deliveryLocation.trim().length === 0,
      }
   }, [deliveryMode, deliveryLocation])

   const step3Errors = useMemo(() => {
      return {
         paymentMethod: paymentMethod === '',
      }
   }, [paymentMethod])

   const clearDraft = () => {
      if (typeof window === 'undefined') return
      window.localStorage.removeItem(CHECKOUT_DRAFT_KEY)
   }

   useEffect(() => {
      if (typeof window === 'undefined') return
      try {
         const raw = window.localStorage.getItem(CHECKOUT_DRAFT_KEY)
         if (!raw) return
         const parsed = JSON.parse(raw) as Partial<{
            step: 1 | 2 | 3
            phone: string
            name: string
            deliveryMode: 'pickup' | 'delivery'
            deliveryLocation: string
            paymentMethod: 'mtn_momo' | 'orange_money' | ''
         }>

         if (parsed.step) setStep(parsed.step)
         if (typeof parsed.phone === 'string') setPhone(parsed.phone)
         if (typeof parsed.name === 'string') setName(parsed.name)
         if (parsed.deliveryMode === 'pickup' || parsed.deliveryMode === 'delivery')
            setDeliveryMode(parsed.deliveryMode)
         if (typeof parsed.deliveryLocation === 'string')
            setDeliveryLocation(parsed.deliveryLocation)
         if (
            parsed.paymentMethod === 'mtn_momo' ||
            parsed.paymentMethod === 'orange_money' ||
            parsed.paymentMethod === ''
         )
            setPaymentMethod(parsed.paymentMethod)
      } catch {
         clearDraft()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   useEffect(() => {
      if (typeof window === 'undefined') return
      const draft = {
         step,
         phone,
         name,
         deliveryMode,
         deliveryLocation,
         paymentMethod,
      }
      window.localStorage.setItem(CHECKOUT_DRAFT_KEY, JSON.stringify(draft))
   }, [step, phone, name, deliveryMode, deliveryLocation, paymentMethod])

   useEffect(() => {
      if (cart.totalItems > 0) return
      setStep(1)
      setPhone('')
      setName('')
      setDeliveryMode('pickup')
      setDeliveryLocation('')
      setPaymentMethod('')
      setHasTriedNext(false)
      setHasTriedPay(false)
      setIsSubmitting(false)
      setIsSuccess(false)
      clearDraft()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [cart.totalItems])

   const goBack = () => {
      setHasTriedNext(false)
      setHasTriedPay(false)
      setStep(prev => (prev === 1 ? 1 : ((prev - 1) as 1 | 2 | 3)))
   }

   const goNext = () => {
      setHasTriedNext(true)
      if (!canGoNext) return
      setStep(prev => (prev + 1) as 1 | 2 | 3)
      setHasTriedNext(false)
   }

   const canPay = useMemo(() => {
      if (cart.totalItems === 0) return false
      if (phone.trim().length === 0) return false
      if (deliveryMode === 'delivery' && deliveryLocation.trim().length === 0) return false
      if (paymentMethod === '') return false
      return true
   }, [cart.totalItems, phone, deliveryMode, deliveryLocation, paymentMethod])

   const onPay = async () => {
      setHasTriedPay(true)
      if (!canPay) return
      if (isSubmitting) return

      setIsSubmitting(true)
      try {
         const orderPayload = {
            customer: {
               phone: phone.trim(),
               name: name.trim() || undefined,
            },
            delivery: {
               mode: deliveryMode,
               location: deliveryMode === 'delivery' ? deliveryLocation.trim() : undefined,
            },
            payment: {
               method: paymentMethod,
            },
            cart: {
               items: cart.detailedItems.map(i => ({
                  productId: i.product.id,
                  designation: i.product.designation,
                  quantity: i.quantity,
                  preferences: i.preferences,
                  unitPrice: Number(i.product.price),
                  lineTotal: i.lineTotal,
               })),
               subtotal: cart.subtotal,
               totalItems: cart.totalItems,
            },
            createdAt: new Date().toISOString(),
         }

         await new Promise(resolve => setTimeout(resolve, 800))
         void orderPayload

         cart.clearCart()
         clearDraft()
         setIsSuccess(true)
      } finally {
         setIsSubmitting(false)
      }
   }

   return (
      <div className="container py-8">
         <div className="mb-6">
            <h1 className="text-2xl font-bold font-cabin text-secondary">
               <I18nLabel label="text.checkoutOrder" />
            </h1>
         </div>

         <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <section className="xl:col-span-2">
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
                                 step === 1
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-secondary',
                              )}>
                              1. <I18nLabel label="checkout.userInfo" />
                           </button>
                           <button
                              type="button"
                              onClick={() => phone.trim().length > 0 && setStep(2)}
                              className={cn(
                                 'px-3 py-2 rounded-full text-sm font-semibold',
                                 step === 2
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-secondary',
                              )}>
                              2. <I18nLabel label="checkout.delivery" />
                           </button>
                           <button
                              type="button"
                              onClick={() => {
                                 if (phone.trim().length === 0) return
                                 if (
                                    deliveryMode === 'delivery' &&
                                    deliveryLocation.trim().length === 0
                                 )
                                    return
                                 setStep(3)
                              }}
                              className={cn(
                                 'px-3 py-2 rounded-full text-sm font-semibold',
                                 step === 3
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 text-secondary',
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
                                       <I18nLabel label="checkout.pickup" />
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
                                       <I18nLabel label="checkout.delivery" />
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
            </section>

            <aside className="xl:col-span-1">
               <CartSummaryDisplay />
            </aside>
         </div>
      </div>
   )
}
