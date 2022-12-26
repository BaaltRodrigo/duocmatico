import { db } from "@/helpers/firebase.js";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

const state = {
  rootCollection: "cargas-academicas",
  cargasAcademicas: [],
  carga: null,
  carreras: [],
  carrera: null,
  secciones: [],
};

const mutations = {
  setCargasAcademicas(state, cargas) {
    state.cargasAcademicas = cargas;
  },

  setCarga(state, carga) {
    state.carga = carga;
  },

  setCarreras(state, carreras) {
    state.carreras = carreras;
  },

  setCarrera(state, carrera) {
    state.carrera = carrera;
  },

  clearSections(state) {
    state.sections = [];
  },

  addSection(state, section) {
    state.sections.push(section);
  },
};

const actions = {
  async getCargasFromFirebase({ state, commit }) {
    const cargasCol = await getDocs(collection(db, state.rootCollection));
    const cargasID = cargasCol.docs.map((doc) => {
      return doc.id;
    });
    commit("setCargasAcademicas", cargasID);
  },

  async setCargaAcademica({ state, commit }, carga) {
    commit("setCarga", carga);
    // Obtengo las carreras disponibles de la carga seleccionada
    // const cargaRef = collection(db, `${state.rootCollection}`).doc(carga);
    const cargaRef = doc(db, state.rootCollection, carga);
    const docSnap = await getDoc(cargaRef);
    if (docSnap.exists()) {
      commit("setCarreras", docSnap.data().careers);
      console.log("docSnap.data() ", docSnap.data().careers);
    } else {
      console.log("Not Found");
    }
  },

  async setCarrera({ state, commit }, carrera) {
    commit("setCarrera", carrera);
    commit("clearSections");
    const { rootCollection, carga } = state;
    const url = `${rootCollection}/${carga}/${carrera}`;
    console.log("String de la coleccion:", url);
    const seccionCol = await getDocs(collection(db, url));
    console.log(seccionCol);
    seccionCol.forEach((sec) => {
      // console.log(sec.id, "=>", sec.data());
      commit("addSection", sec.data());
    });
    console.log("Secciones Disponibles", state.sections);
  },

  async uploadCargaAcademica({ state }, payload) {
    try {
      let carrerasNombre = payload.carreras.map((c) => {
        return c.carrera;
      });
      // console.log(carrerasNombre);
      // Creation of first document with the name YEAR-SEMESTER SEDE
      // Also, added a careers attribute to act as a map for sub collections
      await setDoc(doc(db, state.rootCollection, payload.carga), {
        careers: carrerasNombre,
      });

      // Now, we iterate into every section and added it as a document to a collection
      // The collection has the name of the career of the section
      const flatSections = payload.carreras
        .map((c) => {
          return c.ramos;
        })
        .flat(1);
      console.log(flatSections);
      const uploadRequests = [];
      // console.log(flatSections);
      flatSections.forEach(async (section) => {
        let documentURL = `${state.rootCollection}/${payload.carga}/${section.carrera}`;
        let docRef = doc(db, documentURL, section.seccion);
        uploadRequests.push(setDoc(docRef, section));
        // console.log("agregada la seccion", section.seccion);
      });

      await Promise.all(uploadRequests);
    } catch (e) {
      console.log(e);
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
