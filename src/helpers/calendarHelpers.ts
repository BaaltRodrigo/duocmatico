/**
 * Helper to get the monday of current week
 *
 * @returns {Date} Monday of the current week
 */
export function getFirstDayOfTheWeek(): Date {
  const today = new Date();
  // Same date but at 00:00:00 time
  const today00 = new Date(today.toISOString().split("T")[0]);
  const dayMinutes = 24 * 60;
  today00.setMinutes(-dayMinutes * (today00.getUTCDay() - 1)); // Current monday at 00:00:00
  return today00;
}
