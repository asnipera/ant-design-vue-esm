import { resolveUnref } from './resolveUnref';
/**
 * Get the dom element of a ref of element or Vue component instance
 *
 * @param elRef
 */
export function unrefElement(elRef) {
  var _plain$$el;
  var plain = resolveUnref(elRef);
  return (_plain$$el = plain === null || plain === void 0 ? void 0 : plain.$el) !== null && _plain$$el !== void 0 ? _plain$$el : plain;
}