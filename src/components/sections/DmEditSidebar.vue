<template>
  <v-navigation-drawer floating :width="450">
    <v-card class="ml-5">
      <v-text-field class="pt-3 pl-3 mr-2" prepend-inner-icon="mdi-magnify" clearable label="Asignatura" type="text"
        variant="outlined" :append-icon="'mdi-cog-outline'" @click:append="show = !show">
      </v-text-field>
      <v-expand-transition>
        <div v-show="show">
          <v-card-text>
            <v-card-text class="text-subtitle-1">
              Semestre
            </v-card-text>
            <v-row>
              <v-col cols="7">
                <v-autocomplete variant="outlined" clearable label="Ingrese su semestre "></v-autocomplete>
              </v-col>
              <v-col cols="5">
                <v-radio-group>
                  <v-radio label="Diurno" value="1"></v-radio>
                  <v-radio label="Vespertino" value="2"></v-radio>
                </v-radio-group>
                <v-btn color="green" variant="flat">Limpiar Datos</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
    <dm-section-card :calendar="calendar" />
  </v-navigation-drawer>
</template>

<script>
import { mapActions } from 'vuex';
import DmSectionCard from './DmSectionCard.vue';

export default {
  data: () => ({
    show: false,
  }),

  components: {
    DmSectionCard
  },

  props: {
    calendar: {
      type: Object,
      default: () => ({}),
    },
  },

  methods: {
    ...mapActions('academicCharges', ['getSections']),
  },
  created() {
    this.getSections({
      academicChargeId: this.calendar.academic_charge.id,
      calendarableId: this.calendar.calendarable.id,
      calendarableType: this.calendar.calendarable_type.toLowerCase(),
    });
  },
};
</script>