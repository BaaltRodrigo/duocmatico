import { ExcelFileRow } from "@/helpers/fileConverter";
import Schedule from "./schedule";

/**
 * Class used to represent the section of a class dictated on DuocUC.
 * Uses a full row to simplify write all the attributes.
 *
 * @param {ExcelFileRow} row A row from xlsx file
 */
class Section {
  abbreviation: string;
  subject: string;
  section: string;
  school: string;
  teacher: string;
  level: number;
  plans: number[] = [];
  schedules: Schedule[] = [];

  constructor({
    abbreviation,
    section,
    subject,
    school,
    teacher,
    level,
  }: ExcelFileRow) {
    this.abbreviation = abbreviation;
    this.subject = subject;
    this.section = section;
    this.school = school;
    this.teacher = teacher;
    this.level = level;
  }

  /**
   * Add study plan to an existing section.
   * Sometimes, one section can be used in multiples plans of studies.
   * If plan number is already included. It wont be added again.
   *
   * @param {Number} plan
   * @returns {Section}
   */
  addPlan(plan: number): Section {
    if (!this.plans.includes(plan)) this.plans.push(plan);
    return this;
  }

  /**
   * Adds a schedule to the section. If schedule already exists, it wont be added.
   *
   * @param {Schedule} schedule
   * @return {Section}
   */
  addSchedule(schedule: Schedule): Section {
    const index = this.schedules.findIndex((s: Schedule) => {
      schedule.equals(s);
    });
    if (index < 0) this.schedules.push(schedule);
    return this;
  }
}

export default Section;
