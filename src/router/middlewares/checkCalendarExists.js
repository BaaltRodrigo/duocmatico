function checkIfCalendarIndexExists(req, res, next) {
  const { id } = req.params;
  const calendars = JSON.parse(localStorage.getItem("calendars")) ?? [];

  if (id < 0 || id >= calendars.length) {
    // redirect to 404
    console.warn("Calendar index does not exist");
    return next({ name: "calendars.index" }); // may change it to 404 when exists
  }

  return next();
}

export default checkIfCalendarIndexExists;
