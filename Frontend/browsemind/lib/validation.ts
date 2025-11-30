/**
 * Form validation utilities.
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validate email format.
 */
export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return { isValid: false, error: "Email is required" };
  }
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Please enter a valid email address" };
  }
  return { isValid: true };
}

/**
 * Validate password.
 */
export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, error: "Password is required" };
  }
  if (password.length < 6) {
    return { isValid: false, error: "Password must be at least 6 characters" };
  }
  return { isValid: true };
}

/**
 * Validate password confirmation.
 */
export function validatePasswordMatch(
  password: string,
  repeatPassword: string
): ValidationResult {
  if (password !== repeatPassword) {
    return { isValid: false, error: "Passwords do not match" };
  }
  return { isValid: true };
}

/**
 * Validate registration form.
 */
export function validateRegistration(
  email: string,
  password: string,
  repeatPassword: string,
  agreedToTerms: boolean
): ValidationResult {
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    return emailValidation;
  }

  const passwordValidation = validatePassword(password);
  if (!passwordValidation.isValid) {
    return passwordValidation;
  }

  const matchValidation = validatePasswordMatch(password, repeatPassword);
  if (!matchValidation.isValid) {
    return matchValidation;
  }

  if (!agreedToTerms) {
    return {
      isValid: false,
      error: "You must agree to the Terms of Service and Privacy Policy",
    };
  }

  return { isValid: true };
}

/**
 * Validate login form.
 */
export function validateLogin(
  email: string,
  password: string
): ValidationResult {
  const emailValidation = validateEmail(email);
  if (!emailValidation.isValid) {
    return emailValidation;
  }

  if (!password) {
    return { isValid: false, error: "Password is required" };
  }

  return { isValid: true };
}
