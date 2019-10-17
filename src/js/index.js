import {$, removeClass} from "./nudoru/util/dom";

window.onload = _ => {
  showJsApp();
  window.onload = null;
};

const showJsApp = _ => {
  removeClass($("#js-application"), 'hidden');
};