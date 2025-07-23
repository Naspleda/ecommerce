import { useAuthStore } from '~/stores/auth';

export default defineNuxtPlugin((nuxtApp) => {
  const authStore = useAuthStore(nuxtApp.$pinia);
  authStore.initializeAuth(); // Carga tokens desde localStorage
  authStore.setAxiosAuthInterceptor(); // Configura el interceptor de Axios
});