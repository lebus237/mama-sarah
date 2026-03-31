'use client'

import { OrderCartRecordDisplay, useCart } from '@/features/order'
import { I18nLabel } from '@/shared/i18n'
import { cn } from '@/shared/lib/styles'
import Image from 'next/image'
import { CheckOutCardTotal, CheckOutResume } from '@/features/order'
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
         <div className="flex flex-col space-y-4   md:flex-row justify-between">
            <CheckOutResume />

            <aside className=" xl:col-span-1  block w-full md:w-1/3">
               <CheckOutCardTotal />
            </aside>
         </div>
      </div>
   )
}
