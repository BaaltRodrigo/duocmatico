/**
 * Class used to represent the block of time of a real class.
 *
 * @param {String} start time string with the format 'HH:MM:SS'
 * @param {String} end time string with the format 'HH:MM:SS'
 * @param {String} day WeekDay for this timetable
 * @param {String} classroom Where we do this timetable.
 */
class Timetable {
  constructor(start, end, day, classroom) {
    this.start = start;
    this.end = end;
    this.day = day;
    this.classroom = classroom;
  }
}

export default Timetable;
