
export default raw;
import AjaxRequest from './ajax-request';

/**
 * Same as `request` except it resolves an object with
 *
 *   {response, textStatus, jqXHR}
 *
 * Useful if you need access to the jqXHR object for headers, etc.
 *
 * @public
 */
function raw() {
  var ajax = new AjaxRequest();
  return ajax.raw.apply(ajax, arguments);
}