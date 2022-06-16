import { ExcelFileRow } from "@/helpers/fileConverter";
import Schedule from "./schedule";

/**
 * Class used to represent the section of a class dictated on DuocUC.
 * Uses a full row to simplify write all the attributes.
 *
 * @param {ExcelFileRow} row A row from xlsx file
 */
class Section {
  abbreviation: string; // A short way to indicate the name of a subject
  subject: string; // Full name of the subject
  section: string; // Combination between abbreviation, section number and daytime
  school: string;
  teacher: string;
  level: number;
  career: string;
  daytime: string; // Indicates if a sections is given by day or night time
  plans: number[] = [];
  schedules: Schedule[] = [];
  color: string | null = null; // Color used to generate calendar event

  constructor({
    abbreviation,
    section,
    subject,
    school,
    teacher,
    level,
    career,
    daytime,
  }: ExcelFileRow) {
    this.abbreviation = abbreviation;
    this.subject = subject;
    this.section = section;
    this.school = school;
    this.teacher = teacher;
    this.level = level;
    this.career = career;
    this.daytime = daytime;
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

  /**
   * Changes calendar events color
   *
   * @param {string} color
   * @returns {Section}
   */
  setColor(color: string): Section {
    this.color = color;
    return this;
  }

  /**
   * Used to convert data inside xlsx to an array of Sections
   *
   * @param {ExcelFileRow[]} rows All rows from xlsx file provided by DuocUC
   * @returns {Section[]} Array with mapped information
   */
  static mapFromExcelRows(rows: ExcelFileRow[]): Section[] {
    const sections: Section[] = [];
    // Read line
    rows.forEach((row: ExcelFileRow) => {
      // Get information to create Schedule class
      const { day, scheduleString, classroom } = row; // Schedule information
      const schedule = new Schedule(scheduleString, day, classroom);
      // If Section does not exist, create it. else, find it
      const sectionIndex = sections.findIndex(
        (s: Section) => s.section === row.section
      );
      const section =
        sectionIndex >= 0 ? sections[sectionIndex] : new Section(row);
      // Add schedule to that section
      section.addSchedule(schedule);
      section.addPlan(row.plan);

      if (sectionIndex === -1) sections.push(section);
    });

    return sections;
  }
}

export default Section;
