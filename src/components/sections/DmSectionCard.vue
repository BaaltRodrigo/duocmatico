<template>
  <v-card class="pa-2 mb-2">
    <v-list-item class="mt-2">
      <v-list-item-title>{{ section.code }}</v-list-item-title>
      <v-list-item-subtitle class="text-capitalize">
        {{ formatGroupName(section.subject.name) }}
      </v-list-item-subtitle>
      <template #append>
        <v-btn variant="outlined" class="rounded-pill text-capitalize" size="small"
          @click="!isAdded ? addSection(section) : removeSection(section)">
          {{ !isAdded ? "Agregar" : "Quitar" }}
        </v-btn>
      </template>
    </v-list-item>
    <v-container fluid>
      <v-row>
        <v-col cols="12" :md="!isInSelection ? 12 : 6">
          <v-card class="elevation-0">
            <v-table density="compact">
              <thead>
                <tr>
                  <th>Día y Hora</th>
                  <th>Sala</th>
                </tr>
              </thead>
              <tbody v-for="schedules in section.schedules" :key="schedules">
                <tr v-if="schedules.times !== '0:00:00 - 0:00:00'">
                  <td>
                    {{ schedules.times }}
                  </td>
                  <td>
                    {{ schedules.classroom.toUpperCase() }}
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>
        <v-col cols="12" v-show="show" v-if="section.id === show" :md="!isInSelection ? 12 : 6">
          <v-card class="elevation-0">
            <v-table density="compact">
              <tbody>
                <tr>
                  <th>Docente</th>
                  <td class="text-capitalize">{{ formatGroupName(section.teacher) || "Sin Docente" }}</td>
                </tr>
                <tr>
                  <th>Jornada</th>
                  <td>
                    <v-chip label variant="outlined" size="small" class="text-capitalize">
                      {{ section.shift }}
                    </v-chip>
                  </td>
                </tr>
                <tr>
                  <th>Semestre</th>
                  <td>{{ section.subject.level === 0 ? "Optativo" : section.subject.level }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>
        <v-col cols="12" v-if="!hideAddButton">
          <v-btn text="Ver más" class="rounded-pill" block @click="toggleExpand(section.id)">
            {{ showMoreInformation ? "Ocultar" : "Ver Mas" }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    show: false,
  }),

  props: {
    section: {
      type: Object,
      default: () => ({}),
    },

    isInSelection: {
      type: Boolean,
      default: false,
    },

    hideAddButton: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    ...mapActions("calendars", ["addSection", "removeSection"]),

    formatGroupName(name) {
      return name.replace(/-/g, ' ')
    },

    toggleExpand(sectionId) {
      if (this.show === sectionId) {
        this.show = null
      } else {
        this.show = sectionId
      }
    },
  },

  computed: {
    ...mapState("calendars", ["calendar"]),
    validSchedules() {
      return this.section.horarios.filter(
        (h) => h.horario != "0:00:00 - 0:00:00"
      );
    },

    isAdded() {
      const { section } = this;
      const { sections } = this.calendar;
      return sections.some((s) => s.code === section.code);
    },

    showMoreInformation() {
      return this.show || !this.isInSelection;
    },
  },


};
</script>