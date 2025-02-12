/**
 * Truncates text to a specified length and adds an ellipsis if needed
 * @param text The text to truncate
 * @param maxLength The maximum length of the text
 * @returns The truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  // Find the last space before maxLength to avoid cutting words in the middle
  const lastSpace = text.lastIndexOf(" ", maxLength);
  const truncateIndex = lastSpace > 0 ? lastSpace : maxLength;

  return text.substring(0, truncateIndex) + "...";
}
