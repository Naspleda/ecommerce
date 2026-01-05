<template>
  <div class="product-detail-page">
    <!-- Breadcrumb -->
    <nav class="text-sm text-gray-400 mb-6">
      <NuxtLink to="/" class="hover:text-primary">Inicio</NuxtLink>
      <span class="mx-2">/</span>
      <NuxtLink to="/products" class="hover:text-primary">Productos</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-white">{{ product.name }}</span>
    </nav>

    <!-- Product Content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      <!-- Image Gallery -->
      <div class="space-y-4">
        <div class="bg-dark-500 rounded-2xl overflow-hidden border border-dark-300/30">
          <img 
            :src="product.image" 
            :alt="product.name" 
            class="w-full h-[400px] md:h-[500px] object-cover"
          >
        </div>
        <!-- Thumbnail Gallery -->
        <div class="grid grid-cols-4 gap-3">
          <button
            v-for="(img, index) in thumbnails"
            :key="index"
            class="bg-dark-500 rounded-lg overflow-hidden border-2 hover:border-primary transition-colors"
            :class="selectedImage === index ? 'border-primary' : 'border-dark-300/30'"
            @click="selectedImage = index"
          >
            <img :src="img" :alt="`Vista ${index + 1}`" class="w-full h-20 object-cover">
          </button>
        </div>
      </div>

      <!-- Product Info -->
      <div class="space-y-6">
        <!-- Title & Price -->
        <div>
          <span class="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full mb-3">
            En Stock
          </span>
          <h1 class="text-3xl md:text-4xl font-bold text-white mb-2">
            {{ product.name }}
          </h1>
          <div class="flex items-center gap-4">
            <span class="text-3xl font-bold text-primary">${{ product.price }}</span>
            <span class="text-lg text-gray-500 line-through">${{ (product.price * 1.2).toFixed(2) }}</span>
            <span class="bg-primary/20 text-primary text-sm font-semibold px-2 py-1 rounded">-20%</span>
          </div>
        </div>

        <!-- Rating -->
        <div class="flex items-center gap-2">
          <div class="flex text-primary">
            <svg v-for="n in 5" :key="n" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <span class="text-gray-400">(128 reseñas)</span>
        </div>

        <!-- Description -->
        <div>
          <h3 class="text-white font-semibold mb-2">Descripción</h3>
          <p class="text-gray-400 leading-relaxed">
            {{ product.description }}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel 
            tincidunt lacinia, nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
          </p>
        </div>

        <!-- Quantity -->
        <div>
          <h3 class="text-white font-semibold mb-3">Cantidad</h3>
          <div class="flex items-center gap-3">
            <button 
              @click="quantity > 1 && quantity--"
              class="w-10 h-10 bg-dark-500 border border-dark-300/30 rounded-lg text-white hover:border-primary flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </button>
            <span class="w-12 text-center text-white font-semibold text-lg">{{ quantity }}</span>
            <button 
              @click="quantity++"
              class="w-10 h-10 bg-dark-500 border border-dark-300/30 rounded-lg text-white hover:border-primary flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex flex-col sm:flex-row gap-4 pt-4">
          <button 
            @click="addToCart"
            class="flex-1 bg-gradient-to-r from-primary to-primary-600 text-white py-4 px-8 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 shadow-glow hover:shadow-glow-lg flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Agregar al Carrito
          </button>
          <button class="w-14 h-14 bg-dark-500 border border-dark-300/30 rounded-xl text-gray-400 hover:text-primary hover:border-primary flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <!-- Features -->
        <div class="grid grid-cols-2 gap-4 pt-6 border-t border-dark-300/20">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
              </svg>
            </div>
            <div>
              <p class="text-white text-sm font-medium">Envío Gratis</p>
              <p class="text-gray-500 text-xs">2-3 días hábiles</p>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <p class="text-white text-sm font-medium">Garantía</p>
              <p class="text-gray-500 text-xs">1 año de garantía</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const quantity = ref(1)
const selectedImage = ref(0)

// Mock product data - in real app, fetch by route.params.id
const product = ref({
  id: route.params.id,
  name: 'Auriculares Premium Pro',
  description: 'Auriculares inalámbricos con cancelación de ruido activa y sonido envolvente de alta fidelidad.',
  price: 199.99,
  image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop'
})

const thumbnails = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop'
]

function addToCart() {
  console.log(`Added ${quantity.value} items to cart`)
}
</script>