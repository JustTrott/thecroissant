/**
 * Calculates the total rating based on critic and member ratings
 * Formula: 50% critic rating + 50% member rating
 */
export function calculateTotalRating(
  criticRating: number,
  memberRating: number
): number {
  return criticRating * 0.5 + memberRating * 0.5;
}
