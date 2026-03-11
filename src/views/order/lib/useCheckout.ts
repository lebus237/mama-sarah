'use client'

import type {
   CheckoutErrors,
   CheckoutState,
   CheckoutStep,
   DeliveryMode,
   PaymentMethod,
   UseCheckoutReturn,
} from '@/features/checkout'
import { useCart } from '@/features/order'
import { useEffect, useMemo, useState } from 'react'
import { validatePhoneForPaymentMethod } from './checkout-validation'

const CHECKOUT_DRAFT_KEY = 'mama-sarah-checkout-draft'

export function useCheckout(): UseCheckoutReturn {
   const cart = useCart()

   const [step, setStep] = useState<CheckoutStep>(1)
   const [phone, setPhone] = useState('')
   const [name, setName] = useState('')
   const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>('pickup')
   const [deliveryLocation, setDeliveryLocation] = useState('')
   const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('')

   const [hasTriedNext, setHasTriedNext] = useState(false)
   const [hasTriedPay, setHasTriedPay] = useState(false)
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [isSuccess, setIsSuccess] = useState(false)

   const canGoNext = useMemo(() => {
      // Step 1: Payment method selection
      if (step === 1) return paymentMethod !== ''
      // Step 2: Phone validation based on payment method
      if (step === 2) {
         if (phone.trim().length === 0) return false
         const validation = validatePhoneForPaymentMethod(phone, paymentMethod)
         return validation.isValid
      }
      // Step 3: Delivery mode/location
      if (step === 3) return deliveryMode === 'pickup' ? true : deliveryLocation.trim().length > 0
      return false
   }, [step, phone, deliveryMode, deliveryLocation, paymentMethod])

   const canPay = useMemo(() => {
      if (cart.totalItems === 0) return false
      if (paymentMethod === '') return false
      if (phone.trim().length === 0) return false
      const phoneValidation = validatePhoneForPaymentMethod(phone, paymentMethod)
      if (!phoneValidation.isValid) return false
      if (deliveryMode === 'delivery' && deliveryLocation.trim().length === 0) return false
      return true
   }, [cart.totalItems, phone, deliveryMode, deliveryLocation, paymentMethod])

   const errors = useMemo<CheckoutErrors>(() => {
      const phoneValidation = validatePhoneForPaymentMethod(phone, paymentMethod)
      return {
         step1: { paymentMethod: paymentMethod === '' },
         step2: {
            phone: phone.trim().length === 0,
            phoneOperator: !phoneValidation.isValid && phone.trim().length > 0,
         },
         step3: {
            deliveryLocation: deliveryMode === 'delivery' && deliveryLocation.trim().length === 0,
         },
      }
   }, [phone, deliveryMode, deliveryLocation, paymentMethod])

   const clearDraft = () => {
      if (typeof window === 'undefined') return
      window.localStorage.removeItem(CHECKOUT_DRAFT_KEY)
   }

   // Load draft on mount
   useEffect(() => {
      if (typeof window === 'undefined') return
      try {
         const raw = window.localStorage.getItem(CHECKOUT_DRAFT_KEY)
         if (!raw) return
         const parsed = JSON.parse(raw) as Partial<CheckoutState>

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
   }, [])

   // Save draft on state changes
   useEffect(() => {
      if (typeof window === 'undefined') return
      const draft: CheckoutState = {
         step,
         phone,
         name,
         deliveryMode,
         deliveryLocation,
         paymentMethod,
      }
      window.localStorage.setItem(CHECKOUT_DRAFT_KEY, JSON.stringify(draft))
   }, [step, phone, name, deliveryMode, deliveryLocation, paymentMethod])

   // Reset when cart is emptied
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
   }, [cart.totalItems])

   const goBack = () => {
      setHasTriedNext(false)
      setHasTriedPay(false)
      setStep(prev => (prev === 1 ? 1 : ((prev - 1) as CheckoutStep)))
   }

   const goNext = () => {
      setHasTriedNext(true)
      if (!canGoNext) return
      setStep(prev => (prev + 1) as CheckoutStep)
      setHasTriedNext(false)
   }

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

   const resetSuccess = () => {
      setIsSuccess(false)
      setStep(1)
   }

   return {
      // State
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

      // Computed
      canGoNext,
      canPay,
      errors,

      // Actions
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
   }
}
