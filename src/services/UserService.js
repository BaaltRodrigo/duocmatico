import {
  updateDoc,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

/**
 * This class is a wrapper to interact with Firebase as a REST API.
 * It uses Firebase firestore to store user data.
 *
 */
export default class UserService {
  constructor(firestore, collection) {
    this.firestore = firestore;
    this.collection = collection;
    this.defaultRoles = ["common"];
  }

  /**
   * Fetch all users from the database.
   *
   * TODO: Add a pagination
   * TODO: Add filtering and sorting (where, orderBy)
   *
   * @returns {array} An array of users.
   */
  async index() {
    throw new Error("Not implemented");
  }

  /**
   * Fetch a single user by it id.
   *
   * @param {string} id
   * @returns {object | null} The user object or null if not found.
   *
   * @see https://firebase.google.com/docs/firestore/query-data/get-data
   */
  async show(id) {
    const docRef = doc(this.firestore, this.collection, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;

    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  }

  /**
   * Send a new user into the database and return the created user.
   *
   * @param {object} user The user provided via Firebase Auth.
   * @returns {object} The created user
   *
   * @see https://firebase.google.com/docs/firestore/manage-data/add-data
   * @see https://firebase.google.com/docs/reference/js/v8/firebase.User
   */
  async store(data) {
    // Create an user using the given id inside data
    const { uid, email, displayName } = data;
    const userRef = doc(this.firestore, this.collection, uid);

    // Add user
    await setDoc(userRef, {
      email,
      displayName,
      roles: this.defaultRoles, // Roles are always added by default as a common user
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    const userSnap = await getDoc(userRef);

    return {
      uid,
      ...userSnap.data(),
    };
  }

  /**
   * Update an user by its id.
   * @param {string} id
   * @param {object} data An object representation of the resource
   */
  async update(id, data) {
    const docRef = doc(this.firestore, this.collection, id);
    const userRef = await updateDoc(docRef, data);

    return {
      id: userRef.id,
      ...userRef.data(),
    };
  }

  async destroy(id) {
    throw new Error("Not implemented");
  }
}
