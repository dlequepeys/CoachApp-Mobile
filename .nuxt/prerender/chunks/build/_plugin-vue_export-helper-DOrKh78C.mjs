import { ref, watchEffect, watch, getCurrentInstance } from 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/vue/index.mjs';
import { i as injectHead, d as resolveUnrefHeadInput } from './server.mjs';
import { composableNames } from 'file://C:/Users/domin/Coachapp-mobile%20local/CoachApp-Mobile/node_modules/@unhead/shared/dist/index.mjs';

function useHead(input, options = {}) {
  const head = options.head || injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry.patch(e);
  });
  getCurrentInstance();
  return entry;
}
const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

export { _export_sfc as _, useHead as u };
//# sourceMappingURL=_plugin-vue_export-helper-DOrKh78C.mjs.map
