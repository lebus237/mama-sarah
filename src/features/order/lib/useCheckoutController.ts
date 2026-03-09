'use client'

import { useCart } from './useCart'
import { useEffect, useMemo, useState } from 'react'

export type CheckoutStep = 1 | 2 | 3
export type DeliveryMode = 'pickup' | 'delivery'
export type PaymentMethod = 'mtn_momo' | 'orange_money' | ''

export interface CheckoutDraft {
   step: CheckoutStep
   phone: string
   name: string
   deliveryMode: DeliveryMode
   deliveryLocation: string
   paymentMethod: PaymentMethod
}

export interface CheckoutActions {
   goBack: () => void
   goNext: () => void
   onPay: () => Promise<void>
   resetCheckout: () => void
}

export interface CheckoutState {
   step: CheckoutStep
   phone: string
   name: string
   deliveryMode: DeliveryMode
   deliveryLocation: string
   paymentMethod: PaymentMethod
   hasTriedNext: boolean
   hasTriedPay: boolean
   isSubmitting: boolean
   isSuccess: boolean
   canGoNext: boolean
   canPay: boolean
   step1Errors: { phone: boolean }
   step2Errors: { deliveryLocation: boolean }
   step3Errors: { paymentMethod: boolean }
}

export interface CheckoutController extends CheckoutState, CheckoutActions {
   setPhone: (value: string) => void
   setName: (value: string) => void
   setDeliveryMode: (value: DeliveryMode) => void
   setDeliveryLocation: (value: string) => void
   setPaymentMethod: (value: PaymentMethod) => void
   setIsSuccess: (value: boolean) => void
   setStep: (value: CheckoutStep) => void
}

const CHECKOUT_DRAFT_KEY = 'mama-sarah-checkout-draft'

export function useCheckoutController(): CheckoutController {
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
      if (step === 1) return phone.trim().length > 0
      if (step === 2) return deliveryMode === 'pickup' ? true : deliveryLocation.trim().length > 0
      if (step === 3) return paymentMethod !== ''
      return false
   }, [step, phone, deliveryMode, deliveryLocation, paymentMethod])

   const step1Errors = useMemo(() => ({ phone: phone.trim().length === 0 }), [phone])

   const step2Errors = useMemo(
      () => ({
         deliveryLocation: deliveryMode === 'delivery' && deliveryLocation.trim().length === 0,
      }),
      [deliveryMode, deliveryLocation],
   )

   const step3Errors = useMemo(() => ({ paymentMethod: paymentMethod === '' }), [paymentMethod])

   const canPay = useMemo(() => {
      if (cart.totalItems === 0) return false
      if (phone.trim().length === 0) return false
      if (deliveryMode === 'delivery' && deliveryLocation.trim().length === 0) return false
      if (paymentMethod === '') return false
      return true
   }, [cart.totalItems, phone, deliveryMode, deliveryLocation, paymentMethod])

   const clearDraft = () => {
      if (typeof window === 'undefined') return
      window.localStorage.removeItem(CHECKOUT_DRAFT_KEY)
   }

   const saveDraft = (draft: CheckoutDraft) => {
      if (typeof window === 'undefined') return
      window.localStorage.setItem(CHECKOUT_DRAFT_KEY, JSON.stringify(draft))
   }

   const loadDraft = (): Partial<CheckoutDraft> | null => {
      if (typeof window === 'undefined') return null
      try {
         const raw = window.localStorage.getItem(CHECKOUT_DRAFT_KEY)
         if (!raw) return null
         return JSON.parse(raw) as Partial<CheckoutDraft>
      } catch {
         clearDraft()
         return null
      }
   }

   // Load draft on mount
   useEffect(() => {
      const draft = loadDraft()
      if (!draft) return

      if (draft.step) setStep(draft.step)
      if (typeof draft.phone === 'string') setPhone(draft.phone)
      if (typeof draft.name === 'string') setName(draft.name)
      if (draft.deliveryMode === 'pickup' || draft.deliveryMode === 'delivery')
         setDeliveryMode(draft.deliveryMode)
      if (typeof draft.deliveryLocation === 'string') setDeliveryLocation(draft.deliveryLocation)
      if (
         draft.paymentMethod === 'mtn_momo' ||
         draft.paymentMethod === 'orange_money' ||
         draft.paymentMethod === ''
      )
         setPaymentMethod(draft.paymentMethod)
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   // Save draft on state changes
   useEffect(() => {
      saveDraft({ step, phone, name, deliveryMode, deliveryLocation, paymentMethod })
   }, [step, phone, name, deliveryMode, deliveryLocation, paymentMethod])

   // Reset when cart is empty
   useEffect(() => {
      if (cart.totalItems > 0) return
      resetCheckout()
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [cart.totalItems])

   const resetCheckout = () => {
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
   }

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

   return {
      // State
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
      // Actions
      goBack,
      goNext,
      onPay,
      resetCheckout,
      // Setters
      setPhone,
      setName,
      setDeliveryMode,
      setDeliveryLocation,
      setPaymentMethod,
      setIsSuccess,
      setStep,
   }
}
