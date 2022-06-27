import readXlsxFile from "read-excel-file";

export interface ExcelFileRow {
  abbreviation: string;
  campus: string;
  career: string;
  classroom: string;
  day: string;
  daytime: string;
  level: number;
  period: number;
  plan: number;
  scheduleString: string;
  school: string;
  section: string;
  subjectType: string;
  subject: string;
  teacher: string;
  year: number;
  color?: string;
}

/**
 * Used to convert every row of xlsx into a json object
 * with the headers as keys
 *
 * @param {File} file
 * @returns
 */
export function mapFileContent(file: File) {
  // Headers we want to keep from file
  const map = {
    Año: "year",
    Período: "period",
    Sede: "campus",
    Escuela: "school",
    Carrera: "career",
    Plan: "plan",
    "Tipo Plan de Estudios": "typePlan",
    Jornada: "daytime",
    Nivel: "level",
    "Tipo Asignatura": "typeSubject",
    Sigla: "abbreviation",
    Asignatura: "subject",
    Sección: "section",
    Horario: "scheduleString",
    Sala: "classroom",
    Docente: "teacher",
    Día: "day",
  };
  return readXlsxFile(file, { map });
}
