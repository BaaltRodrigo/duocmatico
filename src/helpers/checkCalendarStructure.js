/**
 * This function check for a calendar object to be correctly valid for
 * the POST request to the API and to the local calendar.
 * With this, we can have the same structure inside the local and api
 * calendars.
 *
 * @param {Object} calendar
 * @returns {*} if the structure is OK.
 */
export function checkCreateStructure(calendar) {
  const fields = [
    "uuid",
    "name",
    "is_public",
    "academic_charge.id",
    "academic_charge.season",
    "academic_charge.name",
    "calendarable.type",
    "calendarable.id",
  ];

  const calendarableTypes = ["career", "school"];
  // Check if the calendar has the correct structure
  fields.forEach((field) => {
    if (!_.has(calendar, field)) {
      throw new Error(`The calendar must have the field ${field}`);
    }
  });

  // Check if the calendarable type is correct
  if (!calendarableTypes.includes(calendar.calendarable.type)) {
    throw new Error(
      `The calendarable type must be one of ${calendarableTypes.join(", ")}`
    );
  }
}

export function checkUpdateStructure(calendar) {
  //
}
