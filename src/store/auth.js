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
import { auth, db } from "../config/firebase";
import UserService from "../services/UserService";

const userService = new UserService(db, "users");

const state = {
  user: null,
  roles: [],
};

const mutations = {
  setRoles(state, roles) {
    state.roles = roles;
  },

  setUser(state, user) {
    state.user = user;
  },
};

const actions = {
  /**
   * This action will run at the start of the application to check for a logged in user.
   * If a user is logged in, it will fetch the user data from firestore.
   * If no user is logged in, it will do nothing.
   *
   * @param {*} param0
   * @returns
   */
  async checkUser({ commit }) {
    await setPersistence(auth, browserLocalPersistence);
    const { currentUser } = auth;

    if (!currentUser) return; // early exit

    // Fetch user from firestore
    const user = await userService.show(currentUser.uid);
    commit("setUser", user);

    // TODO: Fetch user form firestore collection
  },

  async loginWhitGoogle({ commit }) {
    try {
      const provider = new GoogleAuthProvider();
      await setPersistence(auth, browserLocalPersistence);
      const response = await signInWithPopup(auth, provider);

      // Fetch user from firestore
      let user = await userService.show(response.user.uid);
      if (!user) {
        // Create user in firestore
        user = await userService.store(response.user);
      }

      commit("setUser", user);
    } catch (error) {
      console.log(error);
    }
  },

  async login({ commit }, { email, password }) {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const response = await signInWithEmailAndPassword(auth, email, password);

      // Fetch user from firestore
      let user = await userService.show(response.user.uid);
      if (!user) {
        // Create user in firestore
        user = await userService.store(response.user);
      }

      commit("setUser", user);
    } catch (error) {
      console.error(error);
    }
  },

  async logout({ commit }) {
    await signOut(auth);
    // Clean auth status
    commit("setUser", null);

    // TODO: Clean firestore calendars
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

    // Create new user. createWithEmailAndPassword throws an error if the user already exists.
    const user = await userService.store(response.user);

    commit("setUser", user);
  },

  async requestPasswordReset(_, email) {
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
  mutations,
  actions,
};
