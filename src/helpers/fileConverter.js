import readXlsxFile from "read-excel-file";

/**
 * Used to convert every row of xlsx into a json object
 * with the headers as keys
 * @param {File} file
 * @returns
 */
async function mapFileContent(file) {
  // Objecto con los headers que nos importan
  const map = {
    Escuela: "escuela",
    Carrera: "carrera",
    Plan: "plan",
    Jornada: "jornada",
    Nivel: "nivel",
    "Tipo Asignatura": "tipoAsignatura",
    Sigla: "sigla",
    Asignatura: "asignatura",
    Sección: "seccion",
    Horario: "horario",
    Sala: "sala",
    Docente: "docente",
    Día: "dia",
  };
  const mappedData = await readXlsxFile(file, { map });
  return mappedData.rows;
}

function groupBySections(rows) {
  const uniqueNames = [...new Set(rows.map((row) => row.seccion))];
  const sections = uniqueNames.map((sectionName) => {
    let sameSection = rows.filter((row) => row.seccion === sectionName);
    let horarios = sameSection.map(({ horario, dia, sala }) => {
      return { horario, dia, sala };
    });
    let planes = [...new Set(sameSection.map((s) => s.plan))];
    let first = sameSection[0];
    // Clean unnecesary data
    delete first.plan;
    delete first.horario;
    delete first.dia;
    delete first.sala;
    return {
      ...first,
      ...{ horarios: uniqueSchedules(horarios) },
      planes,
      nivel: first.nivel || null,
    };
  });
  return sections;
}

function groupByCareer(sections) {
  const uniqueNames = [...new Set(sections.map((s) => s.carrera))];
  const careers = uniqueNames.map((career) => {
    let sameCareer = sections.filter((s) => s.carrera === career);
    sameCareer = sameCareer.map((c) => {
      delete c.carrera;
      return c;
    });
    return {
      carrera: career,
      ramos: sameCareer,
    };
  });
  // This sort method does nothing on some browsers
  careers.sort((a, b) => (a.carrera > b.carrera ? 1 : 0));
  return careers;
}

/**
 * Used to make sections schedules uniques.
 * Sometimes there are sections with duplicated schedules. This make them uniques
 *
 * @param {Array} horarios
 * @return {Array} Array with unique Schedules
 */
function uniqueSchedules(horarios) {
  const noDuplicates = [...new Set(horarios.map((h) => h.horario))];
  const schedules = noDuplicates.map((hours) => {
    // Can do this because hours comes with the same array.
    // There is 100% chance that I will find AT LEAST one match
    return horarios.filter((h) => h.horario === hours)[0];
  });
  return schedules;
}

export { mapFileContent, groupBySections, groupByCareer, uniqueSchedules };
