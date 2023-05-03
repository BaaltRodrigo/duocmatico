<template>
  <v-card variant="outlined" class="rounded-xl bg-white pa-2">
    <v-list-item class="mt-2">
      <v-list-item-title>{{ section.seccion }}</v-list-item-title>
      <v-list-item-subtitle class="text-capitalize">
        {{ section.asignatura.toLowerCase() }}
      </v-list-item-subtitle>
      <template #append>
        <v-btn
          variant="outlined"
          class="rounded-pill text-capitalize"
          size="small"
          @click="!isAdded ? addSection(section) : removeSection(section)"
        >
          {{ !isAdded ? "Agregar" : "Quitar" }}
        </v-btn>
      </template>
    </v-list-item>
    <v-container fluid>
      <v-row>
        <v-col cols="12" :md="isInSelection ? 12 : 6">
          <v-card variant="outlined" class="rounded-xl">
            <v-table density="compact">
              <thead>
                <tr>
                  <th>Dia y Hora</th>
                  <th>Sala</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(schedule, index) in validSchedules" :key="index">
                  <td>
                    {{ schedule.horario }}
                  </td>
                  <td>{{ schedule.sala }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>
        <v-expand-transition>
          <v-col
            v-show="showMoreInformation"
            cols="12"
            :md="isInSelection ? 12 : 6"
          >
            <v-card variant="outlined" class="rounded-xl">
              <v-table density="compact">
                <!-- make headers on the left side and information on rhe right side -->
                <tbody>
                  <tr>
                    <th>Docente</th>
                    <td>{{ section.docente ?? "Sin Docente" }}</td>
                  </tr>
                  <tr>
                    <th>Modalidad</th>
                    <td>
                      <v-chip
                        label
                        variant="outlined"
                        size="small"
                        class="text-capitalize"
                      >
                        {{ section.tipoPlanEstudios.toLowerCase() }}
                      </v-chip>
                    </td>
                  </tr>
                  <tr>
                    <th>Jornada</th>
                    <td>
                      <v-chip
                        label
                        variant="outlined"
                        size="small"
                        class="text-capitalize"
                      >
                        {{ section.jornada.toLowerCase() }}
                      </v-chip>
                    </td>
                  </tr>
                  <tr>
                    <th>Semestre</th>
                    <td>{{ section.nivel ?? "Optativo" }}</td>
                  </tr>
                  <tr>
                    <th>Plan de estudios</th>
                    <td>
                      <v-chip
                        v-for="(plan, index) in section.planes"
                        :key="`${section.seccion}-plan-${index}`"
                        label
                        variant="outlined"
                        size="small"
                        class="mr-1"
                      >
                        {{ plan }}
                      </v-chip>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-card>
          </v-col>
        </v-expand-transition>
      </v-row>
      <v-btn
        v-if="!hideAddButton"
        variant="tonal"
        class="mt-4 rounded-pill text-capitalize"
        block
        @click="showMore = !showMore"
      >
        {{ showMoreInformation ? "Ocultar" : "Ver Mas" }}
      </v-btn>
    </v-container>
  </v-card>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "DmSectionCard",

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

  computed: {
    ...mapState("calendars", ["selectedCalendar"]),
    validSchedules() {
      return this.section.horarios.filter(
        (h) => h.horario != "0:00:00 - 0:00:00"
      );
    },

    isAdded() {
      const { section } = this;
      const { sections } = this.selectedCalendar;
      return sections.some((s) => s.seccion === section.seccion);
    },

    showMoreInformation() {
      return this.showMore || !this.isInSelection;
    },
  },

  data: () => ({
    showMore: false,
  }),

  methods: {
    ...mapActions("calendars", ["addSection", "removeSection"]),
  },
};
</script>
