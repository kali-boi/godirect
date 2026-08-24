/**
 * GoDirect Chat Shield - Anti-Disintermediation & Contact Obfuscation Engine
 * Prevents off-platform leakage (phone numbers, WhatsApp links, bank accounts, emails)
 * Protects users by enforcing on-platform escrow guarantees.
 */

// Patterns to detect off-platform contact attempts
const PHONE_PATTERN = /(\+?234|0)[789][01]\d{8}|\b\d{3}[-.\s]?\d{3}[-.\s]?\d{4}\b/g;
const EMAIL_PATTERN = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
const WHATSAPP_PATTERN = /\b(whatsapp|wa\.me|dm me on|chat me on|reach me on|call me on)\b/gi;
const NUBAN_BANK_PATTERN = /\b\d{10}\b/g; // 10-digit Nigerian NUBAN account numbers
const OFFLINE_PAYMENT_KEYWORDS = /\b(pay cash|transfer to my account|bank transfer direct|send to my zenith|send to my gtbank|send to my access|send to my kuda|wire me|pay outside|bypass platform)\b/gi;

export function filterChatMessage(text) {
  let flagged = false;
  let reasons = [];
  let sanitizedText = text;

  // 1. Check Phone Numbers
  if (PHONE_PATTERN.test(sanitizedText)) {
    flagged = true;
    reasons.push('Phone number detected');
    sanitizedText = sanitizedText.replace(PHONE_PATTERN, '[Phone Number Protected]');
  }

  // 2. Check Emails
  if (EMAIL_PATTERN.test(sanitizedText)) {
    flagged = true;
    reasons.push('Email address detected');
    sanitizedText = sanitizedText.replace(EMAIL_PATTERN, '[Email Protected]');
  }

  // 3. Check 10-Digit NUBAN Account Numbers
  if (NUBAN_BANK_PATTERN.test(sanitizedText)) {
    flagged = true;
    reasons.push('Bank account number detected');
    sanitizedText = sanitizedText.replace(NUBAN_BANK_PATTERN, '[Bank Account Protected]');
  }

  // 4. Check WhatsApp & Offline keywords
  if (WHATSAPP_PATTERN.test(sanitizedText) || OFFLINE_PAYMENT_KEYWORDS.test(sanitizedText)) {
    flagged = true;
    reasons.push('Off-platform payment attempt');
  }

  return {
    isFlagged: flagged,
    reasons,
    sanitizedText,
    securityWarning: flagged 
      ? '⚠️ Warning: Payments & contact outside GoDirect void 100% of your 24h Escrow Protection and refund rights. Always book on-platform.'
      : null
  };
}
