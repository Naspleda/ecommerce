<template>
  <div class="login-page">
    <h1 class="text-3xl font-bold mb-6">Iniciar Sesión</h1>
    <form @submit.prevent="login">
      <div class="mb-4">
        <label for="email" class="block text-sm font-medium">Correo Electrónico</label>
        <input
          v-model="email"
          type="email"
          id="email"
          class="w-full p-2 border rounded"
          required
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-sm font-medium">Contraseña</label>
        <input
          v-model="password"
          type="password"
          id="password"
          class="w-full p-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Iniciar Sesión
      </button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:8000/auth/jwt/login", {
          email: this.email,
          password: this.password,
        });
        const token = response.data.access_token;
        localStorage.setItem("token", token);
        this.$router.push("/");
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      }
    },
  },
};
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>