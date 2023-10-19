<template>
  <v-card class="pa-2 mb-2">
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
                    {{ schedules.classroom.toUpperCase() }}
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-expand-transition>
            <div v-show="show" v-if="section.id === show">
              <v-card variant="outlined" class="rounded-xl mb-4">
                <v-table density="compact">
                  <tbody>
                    <tr>
                      <th>Docente</th>
                      <td>{{ formatGroupName(section.teacher) || "Sin Docente" }}</td>
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
            </div>
          </v-expand-transition>
        </v-col>
      </v-row>
      <v-btn text="Ver más" class="rounded-pill" block @click="toggleExpand(section.id)" />
    </v-container>
  </v-card>
</template>

<script>

export default {
  data: () => ({
    show: null,
  }),

  props: {
    calendar: {
      type: Object,
      default: () => ({}),
    },
    section: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    formatGroupName(name) {
      let sentences = name.replace(/-/g, ' ').split(" ").map(word => {
        return word[0].toUpperCase() + word.slice(1);
      })
      return sentences.join(" ");
    },

    toggleExpand(sectionId) {
      if (this.show === sectionId) {
        this.show = null
      } else {
        this.show = sectionId
      }
    }
  },
};
</script>