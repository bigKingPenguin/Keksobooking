import {TIMEOUT_DEBOUNCE} from '../const/common.js';

let timer;
const debounce = (func, timeout = TIMEOUT_DEBOUNCE) => {
  if (timer) clearTimeout(timer);
  timer = setTimeout(func, timeout);
};

export {debounce};
