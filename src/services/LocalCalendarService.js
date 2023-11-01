import { v4 as uuidv4 } from "uuid";

/**
 * Service to interact with calendars from the local storage.
 *
 */
export class LocalCalendarService {
  constructor() {}

  /**
   * Get the calendars from the local storage
   *
   * @returns Array of calendars
   */
  index() {
    return JSON.parse(localStorage.getItem("calendars")) || [];
  }

  create(calendar) {
    // Always get the calendars from the local storage as another
    // tab could have added a new calendar or removed another
    const calendars = this.index();
    calendars.push({ ...calendar, uuid: uuidv4() }); // Always generate a new uuid on create
    localStorage.setItem("calendars", JSON.stringify(calendars));
    return calendar;
  }

  /**
   * Get a calendar from the local storage
   * @param {string} uuid
   * @returns The calendar
   * @throws Error if the calendar is not found on local storage
   */
  get(uuid) {
    const calendars = this.index();
    const calendar = calendars.find((c) => c.uuid === uuid);

    if (!calendar) {
      throw new Error("Calendar not found");
    }

    return calendar;
  }

  /**
   * Updates a calendar from the local storage
   *
   * @param {Object} calendar
   * @returns The updated calendar
   * @throws Error if the calendar is not found on local storage
   */
  update(calendar) {
    const calendars = this.index();
    const index = calendars.findIndex((c) => c.uuid === calendar.uuid);

    if (index < 0) {
      throw new Error("Calendar not found");
    }

    calendars.splice(index, 1, calendar);
    localStorage.setItem("calendars", JSON.stringify(calendars));
    return calendar;
  }

  delete(calendar) {
    const calendars = this.index();
    const filteredCalendars = calendars.filter((c) => c.uuid !== calendar.uuid);
    // This way of deleting a calendar should now throw an error
    localStorage.setItem("calendars", JSON.stringify(filteredCalendars));
    return calendar;
  }
}
