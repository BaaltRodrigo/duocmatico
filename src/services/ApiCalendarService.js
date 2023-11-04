import axios from "axios";

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
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  /**
   * Returns the authorization header if the token is provided
   *
   * @param {string} token The firebase token provided to the user
   * @returns Object with authorization header or empty object
   */
  #getAuthorizationHeader(token) {
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  #requireToken(token) {
    if (!token) {
      throw new Error("Token is required to perform this action");
    }
  }

  /**
   * Used to get the current user calendars from the API
   *
   * @param {string} token The firebase token provided to the user
   * @returns Promise with the calendars or error from axios
   */
  async index({ token }) {
    this.#requireToken(token);

    console.log("token", token);

    try {
      const response = await axios.get(`${this.apiUrl}/calendars`, {
        headers: this.#getAuthorizationHeader(token),
      });

      // Need to modify response to add the fromApi flag
      const calendars = response.data.map((c) => ({ ...c, fromApi: true }));
      return calendars;
    } catch (error) {
      // Here you can send the error to a logger service
      return null;
    }
  }

  /**
   * Create a calendar for the current user inside API
   *
   * @param {string} token
   * @param {Object} calendar
   *
   * @returns Promise with the calendar or error from axios
   */
  create({ token, calendar }) {
    this.#requireToken(token);
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${this.apiUrl}/calendars`,
          calendar,
          { headers: this.#getAuthorizationHeader(token) }
        );

        resolve({ ...response.data, fromApi: true });
      } catch (error) {
        // Here you can send the error to a logger service
        reject(error);
      }
    });
  }

  /**
   * Update a calendar for the current user inside API
   *
   * @param {string} token
   * @param {Object} calendar
   * @returns Promise with the calendar or error from axios
   */
  async update({ token, calendar }) {
    try {
      const response = await axios.put(
        `${this.apiUrl}/calendars/${calendar.uuid}`,
        calendar,
        { headers: this.#getAuthorizationHeader(token) }
      );
      resolve({ ...response.data, fromApi: true });
    } catch (error) {
      // Here you can send the error to a logger service
      reject(error);
    }
  }

  /**
   * Delete a calendar for the current user inside API
   *
   * @param {string} token
   * @param {Object} calendar
   * @returns Promise with the calendar or error from axios
   */
  delete({ token, calendar }) {
    return new Promise(async (resolve, reject) => {
      try {
        await axios.delete(`${this.apiUrl}/calendars/${calendar.uuid}`, {
          headers: this.#getAuthorizationHeader(token),
        });
        // Returned the calendar deleted, in case we needed to undo the action
        resolve({ ...calendar, fromApi: true });
      } catch (error) {
        // Here you can send the error to a logger service
        reject(error);
      }
    });
  }

  /**
   * Get a calendar for the API. This calendar can be from the current user
   * or a public calendar.
   *
   * @param {string} token
   * @param {string} uuid Calendar UUID
   * @returns
   */
  get({ token, uuid }) {
    return axios.get(`${this.apiUrl}/calendars/${uuid}`, {
      headers: this.#getAuthorizationHeader(token),
    });
  }

  /**
   * Get the events for a calendar
   *
   * @param {string} token
   * @param {Object} calendar
   *
   * @returns Promise with the events or error from axios
   */
  getSections(token, uuid) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          `${this.apiUrl}/calendars/${uuid}/sections`,
          { headers: this.#getAuthorizationHeader(token) }
        );

        resolve({ ...response.data, fromApi: true });
      } catch (error) {
        // Here you can send the error to a logger service
        reject(error);
      }
    });
  }

  /**
   * Update the sections for a calendar.
   *
   * @param {string} token
   * @param {string} uuid
   * @param {Object} calendar The calendar with the sections to update
   * @returns
   */
  async updateSections({ token, calendar }) {
    return new Promise(async (resolve, reject) => {
      try {
        // The route gets a list of the sections id
        const sectionsId = calendar.sections.map((s) => s.id);

        const response = await axios.put(
          `${this.apiUrl}/calendars/${uuid}/sections`,
          { sections: sectionsId },
          {
            headers: this.#getAuthorizationHeader(token),
          }
        );

        // Only sections are returned
        resolve(response.data);
      } catch (error) {
        // Here you can send the error to a logger service
        reject(error);
      }
    });
  }
}
