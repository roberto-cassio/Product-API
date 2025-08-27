import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * Formata um valor em centavos para display em reais (0.00 format)
 * @param {string} value - Valor em centavos como string
 * @returns {string} - Valor formatado como "0.00"
 */
export function formatPrice(value) {
  const numsOnly = value.replace(/\D/g, '');
  if (!numsOnly) return '';

  const nums = numsOnly.replace(/^0+/, '') || '0';

  if (nums.length === 1) return '0.0' + nums;
  if (nums.length === 2) return '0.' + nums;
  return `${nums.slice(0, -2)}.${nums.slice(-2)}`;
}
