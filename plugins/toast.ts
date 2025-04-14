import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vue3Toastify, {
    autoClose: 3000,
  } as ToastContainerOptions);
});
