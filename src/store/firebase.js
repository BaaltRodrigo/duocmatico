import { db } from "@/helpers/firebase.js";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

const state = {
  rootCollection: "cargas-academicas",
  cargasAcademicas: [],
  carga: null,
  carreras: [],
  carrera: null,
  secciones: [],
};

const getters = {
  sectionsGroupedByCourse({ secciones }) {
    const courses = [...new Set(secciones.map((s) => s.asignatura))];
    return courses.map((name) => {
      return {
        name: name,
        sections: secciones.filter((s) => s.asignatura === name),
      };
    });
  },
};

const mutations = {
  clearState(state) {
    state.cargasAcademicas = [];
    state.carga = null;
    state.carreras = [];
    state.carrera = null;
    state.secciones = [];
  },

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

  setSecciones(state, secciones) {
    state.secciones = secciones;
  },

  clearSections(state) {
    state.secciones = [];
  },

  addSection(state, section) {
    state.secciones.push(section);
  },
};

const actions = {
  async getCargasFromFirebase({ commit }) {
    const cargasRef = doc(db, "opciones", "cargas-disponibles");
    const cargasDoc = await getDoc(cargasRef);
    console.log("Cargas disponibles:", cargasDoc.data());
    commit("setCargasAcademicas", cargasDoc.data().cargas);
    commit("addLogEvent", `Cargas academicas cargadas desde firebase`, {
      root: true,
    });
  },

  async setCargaAcademica({ state, commit }, carga) {
    if (state.carga === carga) return;
    commit("setCarga", carga);
    commit("addLogEvent", `Carga academica cambiada a ${carga}`, {
      root: true,
    });

    // Get document for a specific academic data
    const { rootCollection } = state;
    const cargasRef = collection(db, rootCollection);
    const q = query(cargasRef, where("carga", "==", carga));
    const document = await getDocs(q);

    // There are chances thar the document is empty.
    if (document.empty) {
      commit("setCarreras", []);
      commit(
        "addLogEvent",
        `El documento ${carga} no existe en la base de datos`,
        { root: true }
      );
      return;
    }

    const { carreras } = document.docs[0].data(); // There will be always 1 or 0 documents with
    commit("setCarreras", carreras);
    commit("addLogEvent", `Se agregaron ${carreras.length} carreras`, {
      root: true,
    });
  },

  async setCarrera({ commit }, carrera) {
    commit("setCarrera", carrera);
    commit("clearSections");
  },

  async getSectionsFromFirebase({ state, commit }) {
    const { carga, carrera, rootCollection } = state;
    if (!carga || !carrera) return; // Early exit

    const url = `${rootCollection}/${carga}/carreras`;
    const careerRef = doc(db, url, carrera);
    const careerDoc = await getDoc(careerRef);
    const { secciones } = careerDoc.data();

    commit("setSecciones", secciones);
    commit("addLogEvent", `${secciones.length} secciones cargadas`, {
      root: true,
    });
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

  async uploadCargaAcademica2({ state }, payload) {
    try {
      const { rootCollection } = state;
      // carga is the ID for the new document.
      const { carreras, carga } = payload;
      // First, create the document for academic options
      const carrerasDisponibles = payload.carreras.map((c) => c.carrera);
      await setDoc(doc(db, rootCollection, carga), {
        carga: carga,
        carreras: carrerasDisponibles,
        createdAt: serverTimestamp(),
      });

      console.log("Creada la carga academica con id:", carga);

      // Update cargas-disponibles document from options collection
      const disponiblesRef = doc(db, "opciones", "cargas-disponibles");
      await updateDoc(disponiblesRef, {
        cargas: arrayUnion(carga),
        updatedAt: serverTimestamp(),
      });

      console.log("Actualizado el documento con las cargas disponibles");

      // Then we create a subcollection call "carreras" and add all careers as a document
      const uploadRequests = [];
      carreras.forEach((c) => {
        const subCollectionURL = `${rootCollection}/${carga}/carreras/`;
        uploadRequests.push(
          setDoc(doc(db, subCollectionURL, c.carrera), {
            carga: carga,
            carrera: c.carrera,
            secciones: c.ramos,
            createdAt: serverTimestamp(),
          })
        );
      });
      await Promise.all(uploadRequests);
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
