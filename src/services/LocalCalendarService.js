import { v4 as uuidv4 } from "uuid";
import { CALENDAR_SOURCES } from "../helpers/constants";

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
  async index() {
    // This promise should never be rejected...
    const calendars = JSON.parse(localStorage.getItem("calendars")) || [];
    return calendars;
  }

  /**
   * Creates a calendar inside the local storage
   *
   * @param {Object} calendar
   * @returns Promise with the calendar
   */
  async create(calendar) {
    // This promise should never reject..
    const calendars = await this.index();

    const createdCalendar = {
      ...calendar,
      uuid: uuidv4(),
      source: CALENDAR_SOURCES.LOCAL,
      public: false, // By default, any local calendar is private
    };
    calendars.push(createdCalendar); // Always generate a new uuid on create

    localStorage.setItem("calendars", JSON.stringify(calendars));

    return createdCalendar;
  }

  /**
   * Get a calendar from the local storage
   * @param {string} uuid
   * @returns Promise with the calendar
   * @throws Error if the calendar is not found on local storage
   */
  async get({ uuid }) {
    const calendars = await this.index();
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
  async update(calendar) {
    const calendars = await this.index();
    const index = calendars.findIndex((c) => c.uuid === calendar.uuid);

    if (index < 0) {
      throw new Error("Calendar not found");
    }

    calendars.splice(index, 1, calendar);
    localStorage.setItem("calendars", JSON.stringify(calendars));

    return calendar;
  }

  /**
   * Deletes a calendar from the local storage
   *
   * @param {Object} payload
   * @param {string} payload.uuid The uuid of the calendar to delete
   * @returns The deleted calendar
   */
  async delete({ calendar }) {
    const calendars = await this.index();
    const index = calendars.findIndex((c) => c.uuid === calendar.uuid);

    if (index < 0) {
      throw new Error("Calendar not found");
    }

    const deletedCalendar = calendars[index];

    calendars.splice(index, 1);
    localStorage.setItem("calendars", JSON.stringify(calendars));

    return deletedCalendar;
  }
}
