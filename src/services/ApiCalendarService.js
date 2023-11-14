import axios from "axios";
import { CALENDAR_SOURCES } from "../helpers/constants";

/**
 * Service to get calendars from the API.
 * This service is a mirror of the CalendarController in the API.
 *
 * The service for itself does not check for user roles or permission,
 * this check must be checked before call the service. Must notice
 * that there is a role check inside the API. The check before
 * is just to prevent an API call with an error as a response.
 *
 * @see https://github.com/BaaltRodrigo/duocmatico-api/blob/main/app/Http/Controllers/CalendarController.php
 */
export class ApiCalendarService {
  constructor(apiUrl, auth) {
    this.apiUrl = apiUrl;
    this.auth = auth;
  }

  /**
   * Returns the authorization header if the token is provided
   *
   * @param {string} token The firebase token provided to the user
   * @returns Object with authorization header or empty object
   */
  async #getAuthorizationHeader() {
    const token = await this.auth.currentUser?.getIdToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /**
   * Function to prevent the utilization of a method if it required
   * a token to be authorized.
   *
   * @throws Error if the the current user is null
   */
  #requireToken() {
    if (!this.auth.currentUser) {
      throw new Error("Token is required to perform this action");
    }
  }

  /**
   * Used to get the current user calendars from the API
   *
   * @param {string} token The firebase token provided to the user
   * @returns Promise with the calendars or error from axios
   */
  async index() {
    this.#requireToken();

    const response = await axios.get(`${this.apiUrl}/calendars`, {
      headers: await this.#getAuthorizationHeader(),
    });

    // Need to modify response to add the fromApi flag
    const calendars = response.data.map((c) => ({
      ...c,
      source: CALENDAR_SOURCES.API,
    }));
    return calendars;
  }

  /**
   * Create a calendar for the current user inside API
   *
   * @param {Object} calendar
   *
   * @returns Promise with the calendar or error from axios
   */
  async create(calendar) {
    this.#requireToken();

    const response = await axios.post(`${this.apiUrl}/calendars`, calendar, {
      headers: await this.#getAuthorizationHeader(),
    });

    return { ...response.data, source: CALENDAR_SOURCES.API };
  }

  /**
   * Update a calendar for the current user inside API
   *
   * @param {Object} calendar
   * @returns Promise with the calendar or error from axios
   */
  async update(calendar) {
    this.#requireToken();

    const response = await axios.put(
      `${this.apiUrl}/calendars/${calendar.uuid}`,
      calendar,
      { headers: await this.#getAuthorizationHeader() }
    );

    return { ...response.data, source: CALENDAR_SOURCES.API };
  }

  /**
   * Delete a calendar for the current user inside API
   *
   * @param {Object} calendar
   * @returns An axios response
   */
  async delete(calendar) {
    this.#requireToken();
    const response = await axios.delete(
      `${this.apiUrl}/calendars/${calendar.uuid}`,
      { headers: await this.#getAuthorizationHeader() }
    );

    // Returned the calendar deleted, in case we needed to undo the action
    return { ...calendar, source: CALENDAR_SOURCES.API };
  }

  /**
   * Get a calendar for the API. This calendar can be from the current user
   * or a public calendar.
   *
   * @param {string} token
   * @param {string} uuid Calendar UUID
   * @returns
   */
  async get({ uuid }) {
    const response = await axios.get(`${this.apiUrl}/calendars/${uuid}`, {
      headers: await this.#getAuthorizationHeader(),
    });

    return { ...response.data, source: CALENDAR_SOURCES.API };
  }

  /**
   * Get the events for a calendar
   *
   * @param {string} token
   * @param {Object} calendar
   *
   * @returns Promise with the events or error from axios
   */
  async getSections(uuid) {
    try {
      const response = await axios.get(
        `${this.apiUrl}/calendars/${uuid}/sections`,
        { headers: await this.#getAuthorizationHeader(token) }
      );

      return { ...response.data };
    } catch (error) {
      // Here you can send the error to a logger service
      return error;
    }
  }

  /**
   * Update the sections for a calendar.
   *
   * @param {string} token
   * @param {string} uuid
   * @param {Object} calendar The calendar with the sections to update
   * @returns
   */
  async updateSections({ calendar }) {
    try {
      // The route gets a list of the sections id
      const sectionsId = calendar.sections.map((s) => s.id);

      const response = await axios.put(
        `${this.apiUrl}/calendars/${uuid}/sections`,
        { sections: sectionsId },
        {
          headers: await this.#getAuthorizationHeader(token),
        }
      );

      // Only sections are returned
      return response.data;
    } catch (error) {
      // Here you can send the error to a logger service
      return null;
    }
  }
}
