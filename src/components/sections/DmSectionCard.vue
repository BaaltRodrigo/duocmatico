<template>
  <v-expansion-panels class="ml-5 mt-2" v-if="groupedSections">
    <v-expansion-panel v-for=" (group, subjectId) in groupedSections" :key="subjectId">
      <v-expansion-panel-title expand-icon="mdi-menu-down" class="text-body-1">
        {{ formatGroupName(group.subject.name) }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-card class="mb-2" v-for="section in group.sections" :key="section.id">
          <v-card-text>
            <v-card variant="outlined" class="rounded-xl bg-white pa-2">
              <v-list-item class="mt-2">
                <v-list-item-title>{{ section.code }}</v-list-item-title>
                <v-list-item-subtitle class="text-capitalize">
                  {{ formatGroupName(section.subject.name) }}
                </v-list-item-subtitle>
                <template #append>
                  <v-btn variant="outlined" class="rounded-pill text-capitalize" size="small" @click="">Agregar
                  </v-btn>
                </template>
              </v-list-item>
              <v-container fluid>
                <v-row>
                  <v-col cols="12">
                    <v-card variant="outlined" class="rounded-xl">
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
                              {{ schedules.classroom }}
                            </td>
                          </tr>
                        </tbody>
                      </v-table>
                    </v-card>
                  </v-col>
                  <v-expand-transition>
                    <v-col v-show="show">
                      <v-card variant="outlined" class="rounded-xl">
                        <v-table density="compact">
                          <tbody>
                            <tr>
                              <th>Docente</th>
                              <td>{{ section.teacher || "Sin Docente" }}</td>
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
                  </v-expand-transition>
                </v-row>
              </v-container>
              <v-btn variant="tonal" class="mt-4 rounded-pill text-capitalize" block @click="toggleExpand">
                {{ show ? 'Ocultar' : 'Mostrar' }}
              </v-btn>
            </v-card>
          </v-card-text>
        </v-card>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data: () => ({
    show: false,
  }),

  props: {
    calendar: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState('academicCharges', ['sections']),
    groupedSections() {
      return this.sections.reduce((acc, section) => {
        const subjectId = section.subject.id;
        if (!acc[subjectId]) {
          acc[subjectId] = {
            subject: section.subject,
            sections: [],
          };
        }
        acc[subjectId].sections.push(section);
        return acc;
      }, {});
    },
  },
  methods: {
    formatGroupName(name) {
      return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
    },
    toggleExpand() {
      this.show = !this.show;
    },
  },
};
</script>