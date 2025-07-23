<template>
  <div>
    <h1>Nuestros Productos</h1>
    <div v-if="products.length">
      <div v-for="product in products" :key="product.id" class="product-card">
        <NuxtLink :to="`/products/${product.slug}`">
          <img v-if="product.image" :src="product.image" :alt="product.name" />
          <h2>{{ product.name }}</h2>
          <p>${{ product.price }}</p>
        </NuxtLink>
        <button @click="addToCart(product)">Añadir al Carrito</button>
      </div>
    </div>
    <p v-else>No hay productos disponibles.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useNuxtApp } from '#app';

const { $axios } = useNuxtApp();
const products = ref([]);

onMounted(async () => {
  try {
    const response = await $axios.get('products/');
    products.value = response.data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
  }
});

const addToCart = (product) => {
  // Lógica para añadir al carrito (usando Vuex o Pinia)
  console.log('Producto añadido al carrito:', product.name);
  // Por ahora, solo una alerta o consola
  alert(`${product.name} añadido al carrito!`);
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ccc;
  padding: 15px;
  margin: 10px;
  text-align: center;
  display: inline-block;
  width: 200px;
}
.product-card img {
  max-width: 100%;
  height: auto;
}
</style>