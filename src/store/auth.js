const actions = {
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

  async signInWithGoogle({ commit }) {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await firebase.auth().signInWithPopup(provider);
    commit("setUser", user);
  },
};
