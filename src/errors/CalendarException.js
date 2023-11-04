export default class CalendarError extends Error {
  constructor(message) {
    super(message);
    this.name = "CalendarError";
  }
}
