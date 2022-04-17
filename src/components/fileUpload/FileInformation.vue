<template>
  <div>
    <v-card class="mb-2" outlined>
      <v-list-item>
        <v-list-item-icon>
          <v-icon size="32px">mdi-file-delimited</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ file.name }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon @click="setArchivoCursos(null)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-card>
    <v-btn block depressed color="success" @click="xlsxToJson(file)">
      Continuar con este archivo
    </v-btn>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { delay } from "../../helpers/utilities.js";

export default {
  name: "FileInformation",

  props: {
    file: {
      type: File,
      required: true,
    },
  },

  methods: {
    ...mapMutations(["setArchivoCursos", "setDisponibles"]),

    async xlsxToJson(file) {
      console.log("Esperando 5");
      await delay(5000);
      console.log("Listo!");

      // console.log('[LOG] Archivo recivido')
      const rows = await this.mapFileContent(file);
      // const carreras = this.getCarrerasCollection(rows);
      const secciones = this.agruparPorSecciones(rows);
      const disponibles = this.agruparPorCarrera(secciones);
      console.log(disponibles);
      this.setDisponibles(disponibles);
      this.$emit("done");
    },

    async mapFileContent(file) {
      // Object to map xlsx headers to JSON object for rows
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
      const cursos = await readXlsxFile(file, { map });
      return cursos.rows;
    },

    /**
     * Obtenemos tdas las secciones de las asignaturas.
     * Se asume que la seccion es una tupla de la forma (sigla-idSeccion-jornada),
     * por lo que se espera que si varias columnas tienen la misma tupla, todos
     * sus atributos seran los mismos MENOS los del horario y la sala.
     */
    agruparPorSecciones(rows) {
      // console.log("[LOG] Agrupando los horarios de las secciones");
      const seccionesUnicas = [...new Set(rows.map((row) => row.seccion))];
      const secciones = [];

      seccionesUnicas.forEach((seccion) => {
        // Separo por la seccion que estoy mirando
        let mismaSeccion = rows.filter((row) => row.seccion === seccion);
        let seccionAgrupada = {
          ...mismaSeccion[0],
          planes: [...new Set(mismaSeccion.map((s) => s.plan))], // Planes unios
          horarios: mismaSeccion.map((s) => {
            return {
              horario: s.horario,
              dia: s.dia,
              sala: s.sala,
            };
          }),
        };

        // Elimino atributos que no se usaran mas
        delete seccionAgrupada.plan;
        delete seccionAgrupada.horario;
        delete seccionAgrupada.dia;
        delete seccionAgrupada.sala;
        secciones.push(seccionAgrupada);
      });
      // Ordenamos las secciones de forma alfabetica segun el nombre
      secciones.sort((a, b) => (a.asignatura > b.asignatura ? 1 : 0));
      return secciones;
    },

    agruparPorCarrera(secciones) {
      // console.log("[LOG] Agregando las secciones a sus carreras");
      const uniqueCarrera = [...new Set(secciones.map((s) => s.carrera))];
      const collection = uniqueCarrera.map((carrera) => {
        let mismaCarrera = secciones.filter((s) => s.carrera === carrera);
        mismaCarrera = mismaCarrera.map((c) => {
          delete c.carrera;
          return c;
        });
        return {
          carrera: carrera,
          ramos: mismaCarrera,
        };
      });
      // Ordenamos las carreras alfabeticamente
      collection.sort((a, b) => (a.carrera > b.carrera ? 1 : 0));
      return collection;
    },
  },
};
</script>
