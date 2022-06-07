import Schedule from "./schedule";

/**
 * Class used to represent the section of a class dictated on DuocUC.
 *
 * @param {String} name The name of the Subject.
 * @param {String} section Composed by Subject identifier, section number and daytime.
 * @param {String} schoolName School in charge of that subject.
 * @param {String} teacher Name of the teacher who dictates a section.
 * @param {Number} level Semester related to this section.
 */
class Section {
  name: string;
  section: string;
  schoolName: string;
  teacher: string;
  level: number;
  plans: number[];
  schedules: Schedule[];

  constructor(
    name: string,
    section: string,
    schoolName: string,
    teacher: string,
    level: number
  ) {
    this.name = name;
    this.section = section;
    this.schoolName = schoolName;
    this.teacher = teacher;
    this.level = level;
    // Attributes who will be added later.
    this.plans = [];
    this.schedules = [];
  }

  /**
   * Add study plan to an existing section.
   * Sometimes, one section can be used in multiples plans of studies.
   * If plan number is already included. It wont be added again.
   *
   * @param {Number} plan
   * @returns {Section}
   */
  addPlans(plan: number): Section {
    if (this.plans.includes(plan)) return this;
    this.plans.push(plan);
    return this;
  }

  /**
   * Adds a timetable to the section. If timetable already exists, it wont be added.
   *
   * @param {Timetable} timetable
   * @return {Section}
   */
  addSchedule(schedule: Schedule): Section {
    this.schedules.push(schedule);
    return this;
  }
}

export default Section;
