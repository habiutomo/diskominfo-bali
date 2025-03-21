import { format, formatRelative, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

/**
 * Format date string to Indonesian format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g. "Senin, 29 Juli 2023")
 */
export function formatDate(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  return format(date, "EEEE, dd MMMM yyyy", { locale: id });
}

/**
 * Format date string to relative format
 * @param dateString - ISO date string
 * @returns Relative date string (e.g. "3 hari yang lalu")
 */
export function formatRelativeDate(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  return formatRelative(date, new Date(), { locale: id });
}

/**
 * Format date string to simple format for display in lists
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g. "29 Jul 2023")
 */
export function formatSimpleDate(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? parseISO(dateString) : dateString;
  return format(date, "dd MMM yyyy", { locale: id });
}
