/**
 * Phone number validation utilities for Cameroon mobile operators (MTN and ORANGE)
 */

/** MTN Cameroon prefixes */
const MTN_PREFIXES = ['67', '68', '69', '65', '66'] as const

/** ORANGE Cameroon prefixes */
const ORANGE_PREFIXES = ['69', '65', '66', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79'] as const

/** Regex pattern for valid Cameroon mobile number (9 digits) */
const CAMEROON_MOBILE_REGEX = /^6[0-9]{8}$/

/**
 * Normalizes a phone number by removing spaces, dashes, and country code
 * @param phone - The phone number to normalize
 * @returns Normalized 9-digit phone number or null if invalid format
 */
export function normalizePhoneNumber(phone: string): string | null {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '')

  // Handle country code (+237 or 237)
  if (digits.startsWith('237') && digits.length === 12) {
    return digits.slice(3)
  }

  // Already 9 digits
  if (digits.length === 9) {
    return digits
  }

  return null
}

/**
 * Validates if a phone number is a valid Cameroon mobile number format
 * @param phone - The phone number to validate
 * @returns true if valid format
 */
export function isValidCameroonMobile(phone: string): boolean {
  const normalized = normalizePhoneNumber(phone)
  if (!normalized) return false

  return CAMEROON_MOBILE_REGEX.test(normalized)
}

/**
 * Checks if a phone number is a valid MTN Cameroon number
 * @param phone - The phone number to check
 * @returns true if valid MTN number
 */
export function isMTNNumber(phone: string): boolean {
  const normalized = normalizePhoneNumber(phone)
  if (!normalized || !isValidCameroonMobile(normalized)) return false

  const prefix = normalized.slice(0, 2)
  return MTN_PREFIXES.includes(prefix as typeof MTN_PREFIXES[number])
}

/**
 * Checks if a phone number is a valid ORANGE Cameroon number
 * @param phone - The phone number to check
 * @returns true if valid ORANGE number
 */
export function isORANGENumber(phone: string): boolean {
  const normalized = normalizePhoneNumber(phone)
  if (!normalized || !isValidCameroonMobile(normalized)) return false

  const prefix = normalized.slice(0, 2)
  return ORANGE_PREFIXES.includes(prefix as typeof ORANGE_PREFIXES[number])
}

/**
 * Gets the mobile operator for a phone number
 * @param phone - The phone number to check
 * @returns 'MTN' | 'ORANGE' | 'UNKNOWN' | null (null if invalid format)
 */
export function getPhoneOperator(phone: string): 'MTN' | 'ORANGE' | 'UNKNOWN' | null {
  const normalized = normalizePhoneNumber(phone)
  if (!normalized || !isValidCameroonMobile(normalized)) return null

  if (isMTNNumber(normalized)) return 'MTN'
  if (isORANGENumber(normalized)) return 'ORANGE'

  return 'UNKNOWN'
}

/**
 * Validates if a phone number is either MTN or ORANGE
 * @param phone - The phone number to validate
 * @returns Object with validation result and operator info
 */
export function validatePhoneNumber(phone: string): {
  isValid: boolean
  operator: 'MTN' | 'ORANGE' | 'UNKNOWN' | null
  normalized: string | null
} {
  const normalized = normalizePhoneNumber(phone)

  if (!normalized || !isValidCameroonMobile(normalized)) {
    return {
      isValid: false,
      operator: null,
      normalized
    }
  }

  const operator = getPhoneOperator(normalized)

  return {
    isValid: operator === 'MTN' || operator === 'ORANGE',
    operator,
    normalized
  }
}
