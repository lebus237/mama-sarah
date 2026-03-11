import type { PaymentMethod } from '@/features/checkout'
import { getPhoneOperator, normalizePhoneNumber } from '@/shared/lib'

/**
 * Validates if a phone number matches the expected operator for a payment method
 * @param phone - The phone number to validate
 * @param paymentMethod - The selected payment method
 * @returns Validation result with error message key if invalid
 */
export function validatePhoneForPaymentMethod(
  phone: string,
  paymentMethod: PaymentMethod
): {
  isValid: boolean
  operator: 'MTN' | 'ORANGE' | 'UNKNOWN' | null
  errorKey: string | null
} {
  const normalized = normalizePhoneNumber(phone)

  if (!normalized) {
    return {
      isValid: false,
      operator: null,
      errorKey: 'checkout.errorPhoneRequired'
    }
  }

  const operator = getPhoneOperator(normalized)

  if (!operator) {
    return {
      isValid: false,
      operator: null,
      errorKey: 'checkout.errorPhoneInvalid'
    }
  }

  if (operator === 'UNKNOWN') {
    return {
      isValid: false,
      operator: 'UNKNOWN',
      errorKey: 'checkout.errorPhoneUnknownOperator'
    }
  }

  // Validate phone operator matches payment method
  if (paymentMethod === 'mtn_momo' && operator !== 'MTN') {
    return {
      isValid: false,
      operator,
      errorKey: 'checkout.errorPhoneNotMTN'
    }
  }

  if (paymentMethod === 'orange_money' && operator !== 'ORANGE') {
    return {
      isValid: false,
      operator,
      errorKey: 'checkout.errorPhoneNotOrange'
    }
  }

  return {
    isValid: true,
    operator,
    errorKey: null
  }
}

/**
 * Gets the expected operator for a payment method
 */
export function getExpectedOperatorForPayment(
  paymentMethod: PaymentMethod
): 'MTN' | 'ORANGE' | null {
  if (paymentMethod === 'mtn_momo') return 'MTN'
  if (paymentMethod === 'orange_money') return 'ORANGE'
  return null
}
