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
   * @returns Promise with array of calendars
   */
  index() {
    // This promise should never be rejected...
    return new Promise((resolve, reject) => {
      const calendars = JSON.parse(localStorage.getItem("calendars")) || [];
      resolve(calendars);
    });
  }

  /**
   * Creates a calendar inside the local storage
   *
   * @param {Object} calendar
   * @returns Promise with the calendar
   */
  create({ calendar }) {
    // This promise should never reject...
    return new Promise((resolve, reject) => {
      const calendars = this.index();
      calendars.push({ ...calendar, uuid: uuidv4() }); // Always generate a new uuid on create
      localStorage.setItem("calendars", JSON.stringify(calendars));

      resolve(calendar);
    });
  }

  /**
   * Get a calendar from the local storage
   * @param {string} uuid
   * @returns Promise with the calendar
   * @throws Error if the calendar is not found on local storage
   */
  get(uuid) {
    return new Promise((resolve, reject) => {
      const calendars = this.index();
      const calendar = calendars.find((c) => c.uuid === uuid);

      if (!calendar) {
        reject(new Error("Calendar not found"));
      }

      resolve(calendar);
    });
  }

  /**
   * Updates a calendar from the local storage
   *
   * @param {Object} calendar
   * @returns The updated calendar
   * @throws Error if the calendar is not found on local storage
   */
  update({ calendar }) {
    return new Promise((resolve, reject) => {
      const calendars = this.index();
      const index = calendars.findIndex((c) => c.uuid === calendar.uuid);

      if (index < 0) {
        reject(new Error("Calendar not found"));
      }

      calendars.splice(index, 1, calendar);
      localStorage.setItem("calendars", JSON.stringify(calendars));
      resolve(calendar);
    });
  }

  /**
   * Deletes a calendar from the local storage
   *
   * @param {Object} payload
   * @param {string} payload.uuid The uuid of the calendar to delete
   * @returns The deleted calendar
   */
  delete({ calendar }) {
    return new Promise(async (resolve, reject) => {
      const calendars = await this.index();
      const index = calendars.findIndex((c) => c.uuid === calendar.uuid);

      if (index < 0) {
        reject(new Error("Calendar not found"));
      }

      const deletedCalendar = calendars[index];

      calendars.splice(index, 1);
      localStorage.setItem("calendars", JSON.stringify(calendars));
      resolve(deletedCalendar);
    });
  }
}
