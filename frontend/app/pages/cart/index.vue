<template>
  <div class="cart-page">
    <!-- Page Header -->
    <div class="mb-8">
      <nav class="text-sm text-gray-400 mb-4">
        <NuxtLink to="/" class="hover:text-primary">Inicio</NuxtLink>
        <span class="mx-2">/</span>
        <span class="text-white">Carrito</span>
      </nav>
      <h1 class="text-3xl md:text-4xl font-bold text-white">Tu Carrito</h1>
    </div>

    <!-- Cart Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2 space-y-4">
        <div v-if="cartItems.length === 0" class="bg-dark-500/50 border border-dark-300/20 rounded-xl p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 class="text-white font-semibold text-lg mb-2">Tu carrito está vacío</h3>
          <p class="text-gray-400 mb-6">¡Explora nuestros productos y agrega algo increíble!</p>
          <NuxtLink to="/products" class="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-600">
            Ver Productos
          </NuxtLink>
        </div>

        <!-- Cart Item -->
        <div 
          v-for="item in cartItems" 
          :key="item.id"
          class="bg-dark-500/50 border border-dark-300/20 rounded-xl p-4 flex gap-4"
        >
          <img 
            :src="item.image" 
            :alt="item.name" 
            class="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg"
          >
          <div class="flex-1 flex flex-col justify-between">
            <div>
              <NuxtLink :to="`/products/${item.id}`" class="text-white font-semibold hover:text-primary">
                {{ item.name }}
              </NuxtLink>
              <p class="text-gray-500 text-sm mt-1">{{ item.variant }}</p>
            </div>
            <div class="flex items-center justify-between mt-2">
              <!-- Quantity -->
              <div class="flex items-center gap-2">
                <button 
                  @click="updateQuantity(item.id, item.quantity - 1)"
                  class="w-8 h-8 bg-dark-600 border border-dark-300/30 rounded-lg text-white hover:border-primary flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
                </button>
                <span class="w-8 text-center text-white font-medium">{{ item.quantity }}</span>
                <button 
                  @click="updateQuantity(item.id, item.quantity + 1)"
                  class="w-8 h-8 bg-dark-600 border border-dark-300/30 rounded-lg text-white hover:border-primary flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              <span class="text-primary font-bold">${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
          <button 
            @click="removeItem(item.id)"
            class="text-gray-500 hover:text-red-500 p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="bg-dark-500/50 border border-dark-300/20 rounded-xl p-6 sticky top-24">
          <h2 class="text-xl font-bold text-white mb-6">Resumen del Pedido</h2>
          
          <div class="space-y-4 mb-6">
            <div class="flex justify-between text-gray-400">
              <span>Subtotal ({{ totalItems }} items)</span>
              <span class="text-white">${{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-gray-400">
              <span>Envío</span>
              <span class="text-green-500">Gratis</span>
            </div>
            <div class="flex justify-between text-gray-400">
              <span>Impuestos</span>
              <span class="text-white">${{ taxes.toFixed(2) }}</span>
            </div>
            <div class="border-t border-dark-300/20 pt-4">
              <div class="flex justify-between">
                <span class="text-white font-semibold">Total</span>
                <span class="text-primary font-bold text-xl">${{ total.toFixed(2) }}</span>
              </div>
            </div>
          </div>

          <!-- Promo Code -->
          <div class="mb-6">
            <div class="flex gap-2">
              <input 
                type="text" 
                placeholder="Código promocional"
                class="flex-1 bg-dark-600 border border-dark-300/30 text-white rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
              >
              <button class="bg-dark-600 border border-dark-300/30 text-white px-4 py-2 rounded-lg text-sm hover:border-primary">
                Aplicar
              </button>
            </div>
          </div>

          <!-- Checkout Button -->
          <button class="w-full bg-gradient-to-r from-primary to-primary-600 text-white py-4 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 shadow-glow hover:shadow-glow-lg flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Proceder al Pago
          </button>

          <!-- Security Badge -->
          <div class="flex items-center justify-center gap-2 mt-4 text-gray-500 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Pago seguro garantizado
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const cartItems = ref([
  {
    id: 1,
    name: 'Auriculares Premium Pro',
    variant: 'Color: Negro',
    price: 199.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop'
  },
  {
    id: 2,
    name: 'Smartwatch Elite',
    variant: 'Tamaño: 44mm',
    price: 299.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop'
  }
])

const totalItems = computed(() => cartItems.value.reduce((sum, item) => sum + item.quantity, 0))
const subtotal = computed(() => cartItems.value.reduce((sum, item) => sum + (item.price * item.quantity), 0))
const taxes = computed(() => subtotal.value * 0.1)
const total = computed(() => subtotal.value + taxes.value)

function updateQuantity(id, newQuantity) {
  if (newQuantity < 1) {
    removeItem(id)
    return
  }
  const item = cartItems.value.find(i => i.id === id)
  if (item) {
    item.quantity = newQuantity
  }
}

function removeItem(id) {
  cartItems.value = cartItems.value.filter(i => i.id !== id)
}
</script>