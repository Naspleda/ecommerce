import { defineStore } from 'pinia';
import { useNuxtApp } from '#app';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    accessToken: null,
    refreshToken: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
  actions: {
    async login(username, password) {
      const { $axios } = useNuxtApp();
      try {
        const response = await $axios.post('token/', { username, password });
        this.accessToken = response.data.access;
        this.refreshToken = response.data.refresh;
        // Opcional: Obtener los datos del usuario después de iniciar sesión
        const userResponse = await $axios.get('users/me/', {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          }
        });
        this.user = userResponse.data;

        // Guardar tokens en localStorage para persistencia
        if (process.client) {
          localStorage.setItem('accessToken', this.accessToken);
          localStorage.setItem('refreshToken', this.refreshToken);
        }
        return true;
      } catch (error) {
        console.error('Error de inicio de sesión:', error);
        return false;
      }
    },
    async register(username, email, password) {
      const { $axios } = useNuxtApp();
      try {
        await $axios.post('users/', { username, email, password });
        return true;
      } catch (error) {
        console.error('Error de registro:', error);
        return false;
      }
    },
    logout() {
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;
      if (process.client) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    },
    // Esto es importante para recargar el usuario y tokens al iniciar la app
    initializeAuth() {
      if (process.client) {
        this.accessToken = localStorage.getItem('accessToken');
        this.refreshToken = localStorage.getItem('refreshToken');
      }
    },
    // Añadir un interceptor a Axios para enviar el token en cada request
    setAxiosAuthInterceptor() {
        const { $axios } = useNuxtApp();
        $axios.interceptors.request.use(config => {
            if (this.accessToken && !config.headers.Authorization) {
                config.headers.Authorization = `Bearer ${this.accessToken}`;
            }
            return config;
        });

        // Interceptor para refrescar el token si expira
        $axios.interceptors.response.use(response => response, async (error) => {
            const originalRequest = error.config;
            if (error.response.status === 401 && error.response.data.code === 'token_not_valid' && !originalRequest._retry) {
                originalRequest._retry = true;
                if (this.refreshToken) {
                    try {
                        const refreshResponse = await $axios.post('token/refresh/', { refresh: this.refreshToken });
                        this.accessToken = refreshResponse.data.access;
                        if (process.client) {
                          localStorage.setItem('accessToken', this.accessToken);
                        }
                        originalRequest.headers.Authorization = `Bearer ${this.accessToken}`;
                        return $axios(originalRequest);
                    } catch (refreshError) {
                        console.error("Error al refrescar token:", refreshError);
                        this.logout(); // Si el refresh token también falla, cierra sesión
                        return Promise.reject(refreshError);
                    }
                } else {
                    this.logout(); // No hay refresh token, cerrar sesión
                }
            }
            return Promise.reject(error);
        });
    }
  },
});