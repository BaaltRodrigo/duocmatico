<template>
  <v-file-input accept=".xlsx" @change="handleUploadedFile" v-model="uploadedFiles" filled></v-file-input>  
</template>

<script>
import readXlsxFile from 'read-excel-file';
import { mapMutations } from 'vuex';

export default {
  name: 'CargarArchivo',
  
  data() {
    return {
      uploadedFiles: null
    }
  },

  methods: {
    ...mapMutations(['setDisponibles']),
    
    async handleUploadedFile() {
      // console.log('[LOG] Archivo recivido')
      const rows = await this.readFileContent(this.uploadedFiles);
      // const carreras = this.getCarrerasCollection(rows);
      const secciones = this.agruparPorSecciones(rows);
      const disponibles = this.agruparPorCarrera(secciones);
      this.setDisponibles(disponibles);
    },
    
    async readFileContent(file) {
      // console.log("[LOG] Obteniendo los datos del archivo")
      // Object to map xlsx headers to JSON object for rows
      const map = {
        'Escuela': 'escuela',
        'Carrera': 'carrera',
        'Plan': 'plan',
        'Jornada': 'jornada',
        'Nivel': 'nivel',
        'Tipo Asignatura': 'tipoAsignatura',
        'Sigla': 'sigla',
        'Asignatura': 'asignatura',
        'Sección': 'seccion',
        'Horario': 'horario',
        'Sala': 'sala',
        'Docente': 'docente',
        'Día': 'dia'
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
      const seccionesUnicas = [... new Set(rows.map(row => row.seccion))];
      const secciones = [];

      seccionesUnicas.forEach(seccion => {
        // Separo por la seccion que estoy mirando
        let mismaSeccion = rows.filter( row => row.seccion === seccion);
        let seccionAgrupada = {
          ...mismaSeccion[0],
          planes: [... new Set(mismaSeccion.map( s => s.plan))], // Planes unios
          horarios: mismaSeccion.map( s => { 
            return {
              horario: s.horario,
              dia: s.dia,
              sala: s.sala
            }
          }),
        }

        // Elimino atributos que no se usaran mas
        delete seccionAgrupada.plan;
        delete seccionAgrupada.horario;
        delete seccionAgrupada.dia;
        delete seccionAgrupada.sala;
        secciones.push(seccionAgrupada)
      });
      return secciones;
    },

    agruparPorCarrera(secciones) {
      // console.log("[LOG] Agregando las secciones a sus carreras");
      const uniqueCarrera = [... new Set(secciones.map(s => s.carrera))]
      const collection = uniqueCarrera.map(carrera => {
        let mismaCarrera = secciones.filter(s => s.carrera === carrera);
        mismaCarrera = mismaCarrera.map( c => {
          delete c.carrera;
          return c;
        });
        return {
          carrera: carrera,
          ramosDisponibles: mismaCarrera
        }
      });
      console.log(collection);
      return collection;
    }
  }
}
</script>