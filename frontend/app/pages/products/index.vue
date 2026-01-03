<template>
  <div class="products-page">
    <!-- Page Header -->
    <div class="mb-8">
      <nav class="text-sm text-gray-400 mb-4">
        <NuxtLink to="/" class="hover:text-primary">Inicio</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-white">Productos</span>
      </nav>
      <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">Todos los Productos</h1>
      <p class="text-gray-400">Explora nuestra colección completa de productos premium</p>
    </div>

    <!-- Filters Bar -->
    <div class="bg-dark-500/50 border border-dark-300/20 rounded-xl p-4 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <span class="text-gray-400 text-sm">Ordenar por:</span>
        <select 
          v-model="sortBy"
          class="bg-dark-600 border border-dark-300/30 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
        >
          <option value="featured">Destacados</option>
          <option value="price-low">Precio: Menor a Mayor</option>
          <option value="price-high">Precio: Mayor a Menor</option>
          <option value="name">Nombre A-Z</option>
        </select>
      </div>
      <span class="text-gray-400 text-sm">6 productos encontrados</span>
    </div>

    <!-- Products Grid -->
    <ProductGrid />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sortBy = ref('featured')
</script>