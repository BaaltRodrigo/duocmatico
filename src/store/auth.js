import {
  browserLocalPersistence,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../config/firebase";
import axios from "axios";

const AVAILABLE_PROVIDERS = {
  google: new GoogleAuthProvider(),
};

const state = {
  user: null,
  isLogged: false,
  // This comes from the Duocmatico API
  roles: [],
  permissions: [],
};

const getters = {
  user(state) {
    return state.user;
  },
};

const mutations = {
  setLoggedIn(state, user) {
    state.user = user;
    state.isLogged = true;
  },

  setLoggedOut(state) {
    state.user = null;
    state.isLogged = false;
  },

  setRoles(state, roles) {
    state.roles = roles;
  },

  setPermissions(state, permissions) {
    state.permissions = permissions;
  },
};

const actions = {
  async checkUser({ commit, dispatch }) {
    await setPersistence(auth, browserLocalPersistence);
    const user = auth.currentUser;

    if (!user) return; // early exit

    commit("setLoggedIn", user);

    dispatch("getCurrentRolesAndPermission");
  },

  async getCurrentRolesAndPermission({ commit, rootState }) {
    const token = await auth.currentUser.getIdToken();
    const response = await axios.get(`${rootState.apiUrl}/auth/me`, {
      headers: {
        Authorization: `Bearer ` + token,
      },
    });

    const { roles, permissions } = response.data;

    commit("setRoles", roles);
    commit("setPermissions", permissions);
  },

  async loginWhitProvider({ commit }, providerName) {
    const provider = AVAILABLE_PROVIDERS[providerName];
    if (!provider) {
      throw new Error("Invalid provider");
    }

    try {
      await setPersistence(auth, browserLocalPersistence);
      const response = await signInWithPopup(auth, provider);

      commit("setLoggedIn", response.user);
    } catch (error) {
      //TODO: Handle this error properly
      console.log(error);
    }
  },

  async login({ commit }, { email, password }) {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const response = await signInWithEmailAndPassword(auth, email, password);

      commit("setUser", response.user);
    } catch (error) {
      console.error(error);
    }
  },

  async logout({ commit }) {
    await signOut(auth);
    // Clean auth status
    commit("setLoggedOut");

    // Clean another modules state if needed
    commit("calendars/setApiCalendars", [], { root: true });
  },

  async registration({ commit }, payload) {
    const { email, password, passwordConfirmation } = payload;
    if (password !== passwordConfirmation) {
      throw new Error("Passwords do not match");
    }

    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    commit("setLoggedIn", response.user);
  },

  async requestPasswordReset({ commit }, email) {
    try {
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
