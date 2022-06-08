/**
 * Class used to represent the block of time of a real class.
 *
 * @param {String} baseString schedule time given by xslx
 * @param {String} day WeekDay for this timetable
 * @param {String} classroom Where we do this timetable.
 */
class Schedule {
  EMPTY_SCHEDULE: string = "0:00:00 - 0:00:00";
  baseString: string;
  start: string | null = null;
  end: string | null = null;
  day: string;
  classroom: string;

  constructor(baseString: string, day: string, classroom: string) {
    this.baseString = baseString;
    this.day = day;
    this.classroom = classroom;
    this._calculateTimeBlock();
  }

  isEmptySchedule(): Boolean {
    return this.baseString == this.EMPTY_SCHEDULE;
  }

  equals(other: Schedule) {
    return (
      this.start === other.start &&
      this.end === other.end &&
      this.day === other.day
    );
  }

  /**
   * Calculate start and end of the time block;
   *
   * @returns {void}
   */
  _calculateTimeBlock(): void {
    if (this.isEmptySchedule()) return; // Keep null values
    const timesArray = this.baseString.split(" - ");
    this.end = timesArray[1];
    this.start = timesArray[0].slice(3);
    return;
  }
}

export default Schedule;
