<template>
  <v-file-input accept=".xlsx" @change="readFileContent" v-model="uploadedFiles" filled></v-file-input>  
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
    ...mapMutations(['setCursos']),
    async readFileContent() {
      console.log('Se subio un archivo');
      // String para pasar las cosas del xlsx a un JSON
      const map = {
        'Escuela': 'escuela',
        'Carrera': 'carrera',
        'Plan': 'plan',
        'Jornada': 'jornada',
        'Nivel': 'nivel',
        'Tipo Asignatura': 'tipoAsignatura',
        'Sigla': 'sigla',
        'Asignatura': 'asignatura',
        'Seccion': 'seccion',
        'Horario': 'horario',
        'Sala': 'sala',
        'Docente': 'docente',
        'Día': 'dia'
      };
      const cursos = await readXlsxFile(this.uploadedFiles, { map });
      this.setCursos(cursos.rows);
    }
  }
}
</script>