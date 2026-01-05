<template>
  <div class="card group bg-dark-500 border border-dark-300/30 rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-glow">
    <!-- Image Container -->
    <div class="relative overflow-hidden">
      <img 
        :src="product.image" 
        :alt="product.name" 
        class="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
      >
      <!-- Overlay on Hover -->
      <div class="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <!-- Quick Actions -->
      <div class="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <NuxtLink 
          :to="`/products/${product.id}`" 
          class="flex-1 bg-white/90 backdrop-blur text-dark text-center py-2 px-4 rounded-lg font-medium hover:bg-white"
        >
          Ver Detalles
        </NuxtLink>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5">
      <div class="flex items-start justify-between gap-2 mb-2">
        <h3 class="text-lg font-semibold text-white group-hover:text-primary line-clamp-1">
          {{ product.name }}
        </h3>
        <span class="text-primary font-bold text-lg whitespace-nowrap">
          ${{ product.price }}
        </span>
      </div>
      
      <p class="text-gray-400 text-sm mb-4 line-clamp-2">
        {{ product.description }}
      </p>

      <!-- Add to Cart Button -->
      <button 
        @click="addToCart" 
        class="w-full bg-gradient-to-r from-primary to-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 active:scale-95 flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        Agregar al Carrito
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  product: Object
})

function addToCart() {
  // Logic to add to cart
  console.log('Added to cart')
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>