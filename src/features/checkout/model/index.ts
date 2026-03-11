export type CheckoutStep = 1 | 2 | 3
export type DeliveryMode = 'pickup' | 'delivery'
export type PaymentMethod = 'mtn_momo' | 'orange_money' | ''

export interface CheckoutState {
   step: CheckoutStep
   phone: string
   name: string
   deliveryMode: DeliveryMode
   deliveryLocation: string
   paymentMethod: PaymentMethod
}

export interface CheckoutErrors {
   step1: { paymentMethod: boolean }
   step2: { phone: boolean; phoneOperator: boolean }
   step3: { deliveryLocation: boolean }
}

export interface UseCheckoutReturn {
   // State
   step: CheckoutStep
   phone: string
   name: string
   deliveryMode: DeliveryMode
   deliveryLocation: string
   paymentMethod: PaymentMethod
   isSubmitting: boolean
   isSuccess: boolean
   hasTriedNext: boolean
   hasTriedPay: boolean

   // Computed
   canGoNext: boolean
   canPay: boolean
   errors: CheckoutErrors

   // Actions
   setPhone: (value: string) => void
   setName: (value: string) => void
   setDeliveryMode: (value: DeliveryMode) => void
   setDeliveryLocation: (value: string) => void
   setPaymentMethod: (value: PaymentMethod) => void
   setStep: (step: CheckoutStep) => void
   goBack: () => void
   goNext: () => void
   onPay: () => Promise<void>
   resetSuccess: () => void
}
