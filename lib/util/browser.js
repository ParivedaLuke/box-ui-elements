/**
 * 
 * @file Helper for some browser utilities
 * @author Box
 */

var isDashSupported = void 0;

/**
 * Returns the user agent.
 * Helps in mocking out.
 *
 * @return {String} navigator userAgent
 */
export function getUserAgent() {
  return navigator.userAgent;
}

/**
 * Returns whether browser is mobile.
 *
 * @return {boolean} Whether browser is mobile
 */
export function isMobile() {
  // Relying on the user agent to avoid desktop browsers on machines with touch screens.
  return (/iphone|ipad|ipod|android|blackberry|bb10|mini|windows\sce|palm/i.test(getUserAgent())
  );
}

/**
 * Returns whether browser is IE.
 *
 * @return {boolena} Whether browser is IE
 */
export function isIE() {
  return (/Trident/i.test(getUserAgent())
  );
}

/**
 * Checks the browser for Dash support using H264 high.
 * Dash requires MediaSource extensions to exist and be applicable
 * to the H264 container (since we use H264 and not webm)
 *
 * @public
 * @param { boolean} recheck - recheck support
 * @return {boolean} true if dash is usable
 */
export function canPlayDash() {
  var recheck = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (typeof isDashSupported === 'undefined' || recheck) {
    var mse = global.MediaSource;
    isDashSupported = !!mse && typeof mse.isTypeSupported === 'function' && mse.isTypeSupported('video/mp4; codecs="avc1.64001E"');
  }
  return isDashSupported;
}