import { ref } from 'vue';
import { inBrowser } from '../utils';
var width;
var height;
export function useWindowSize() {
  if (!width) {
    width = ref(0);
    height = ref(0);

    if (inBrowser) {
      var update = function update() {
        width.value = window.innerWidth;
        height.value = window.innerHeight;
      };

      update();
      window.addEventListener('resize', update, {
        passive: true
      });
      window.addEventListener('orientationchange', update, {
        passive: true
      });
    }
  }

  return {
    width: width,
    height: height
  };
}