import { db } from "../config/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const state = {
  user: null,
  loggedIn: false,
};

const getters = {
  user(state) {
    return state.user;
  },
};

const mutations = {
  setUser(state, user) {
    state.user = user;
    state.loggedIn = !!user;
  },
};

const actions = {
  async checkUser({ commit }) {
    const auth = getAuth();
    await setPersistence(auth, browserLocalPersistence);
    const user = auth.currentUser;

    if (!user) {
      return;
    } // early exit

    commit("setUser", user);
  },

  async updateFirebaseUser({ commit }, user) {
    const userRef = doc(db, "users", user.uid);

    // Obtienes userDoc aquí
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      user.photoURL = user.photoURL;
    } else {
      await updateDoc(userRef, {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      user.photoURL = user.photoURL;
    }
    commit("setUser", user);
  },

  async loginWhitGoogle({ commit, dispatch }) {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      await setPersistence(auth, browserLocalPersistence);
      const response = await signInWithPopup(auth, provider);
      console.log(response.user);
      commit("setUser", response.user);
      dispatch("updateFirebaseUser", response.user);
    } catch (error) {
      console.log(error);
    }
  },

  async login({ commit, dispatch }, { email, password }) {
    try {
      const auth = getAuth();
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential.user);
      commit("setUser", userCredential.user);
      dispatch("updateFirebaseUser", userCredential.user);
    } catch (error) {
      console.error(error);
    }
  },

  async logout({ commit }) {
    const auth = getAuth();
    await signOut(auth);
    commit("setUser", null);
  },
  async registration(
    { commit, dispatch },
    { email, password, passwordConfirmation }
  ) {
    if (password !== passwordConfirmation) {
      throw new Error("Passwords do not match");
    }
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    commit("setUser", userCredential.user);
    dispatch("updateFirebaseUser", userCredential.user);
  },
  async requestPasswordReset({ commit }, email) {
    try {
      const auth = getAuth();
      const resetResponse = await sendPasswordResetEmail(auth, email);
      return resetResponse;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
