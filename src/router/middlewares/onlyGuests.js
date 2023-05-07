import store from "../../store";

/**
 * Use this middleware to ensure that not user is
 * logged in before accessing a route.
 *
 * If an user is logged in, it will be redirected to
 * the home page.
 */
async function onlyGuests(req, res, next) {
  const { user } = store.state.auth;

  if (user) {
    return next({ name: "home" });
  }

  next();
}

export default onlyGuests;
