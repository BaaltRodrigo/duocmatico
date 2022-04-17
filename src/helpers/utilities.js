/**
 * Modulo comun para distintas funciones utiles que puedan ser usadas
 * a lo largo de todo el proyecto
 * @author BaaltRodrigo
 */

/**
 * Por si se necesita realizar alguna espera.
 *
 * @example await delat(1000)
 *
 * @param {number} ms
 * @returns
 */
function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

export { delay };
