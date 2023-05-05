import {
  browserLocalPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
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

  async loginWhitGoogle({ commit }) {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      await setPersistence(auth, browserLocalPersistence); // Keep user logged in.
      const response = await signInWithPopup(auth, provider);
      console.log(response.user);
      commit("setUser", response.user);
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
    await firebase.auth().signOut();
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
