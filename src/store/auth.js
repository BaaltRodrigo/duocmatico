import { db } from "../config/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signOut,
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
    // get user from firebase collection with user uuid
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // create new user with base roles
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        photoURL: user?.photoURL,
      });
    } else {
      // update user, but not the roles
      await updateDoc(userRef, {
        name: user.displayName,
        email: user.email,
        photoURL: user?.photoURL,
      });
    }
    commit("setUser", user);
  },

  async loginWhitGoogle({ commit, dispatch }) {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      await setPersistence(auth, browserLocalPersistence); // Keep user logged in.
      const response = await signInWithPopup(auth, provider);
      console.log(response.user);
      commit("setUser", response.user);
      dispatch("updateFirebaseUser", response.user);
    } catch (error) {
      console.log(error);
    }
  },

  async login({ commit }, { email, password }) {
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    commit("setUser", user);
  },

  async logout({ commit }) {
    const auth = getAuth();
    await signOut(auth);
    commit("setUser", null);
  },

  async register({ commit }, { email, password }) {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    commit("setUser", user);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
