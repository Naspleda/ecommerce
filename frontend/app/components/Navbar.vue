<template>
  <nav class="navbar fixed top-0 left-0 right-0 z-50 bg-dark-800/95 backdrop-blur-md border-b border-dark-300/20">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <div class="w-10 h-10 bg-gradient-to-br from-primary to-primary-700 rounded-lg flex items-center justify-center shadow-glow group-hover:shadow-glow-lg">
            <span class="text-white font-bold text-xl">E</span>
          </div>
          <span class="text-xl font-bold text-white group-hover:text-primary">
            E-Store
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <NuxtLink 
            to="/" 
            class="nav-link text-gray-300 hover:text-primary font-medium"
            active-class="text-primary"
          >
            Inicio
          </NuxtLink>
          <NuxtLink 
            to="/products" 
            class="nav-link text-gray-300 hover:text-primary font-medium"
            active-class="text-primary"
          >
            Productos
          </NuxtLink>
          <NuxtLink 
            to="/cart" 
            class="nav-link relative text-gray-300 hover:text-primary font-medium flex items-center gap-2"
            active-class="text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Carrito
            <!-- Badge -->
            <span class="absolute -top-2 -right-4 bg-primary text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {{ cartCount }}
            </span>
          </NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button 
          @click="toggleMenu" 
          class="md:hidden p-2 text-gray-300 hover:text-primary focus:outline-none"
        >
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div 
        v-show="isMenuOpen" 
        class="md:hidden py-4 border-t border-dark-300/20"
      >
        <div class="flex flex-col gap-4">
          <NuxtLink 
            to="/" 
            class="nav-link text-gray-300 hover:text-primary font-medium py-2"
            @click="closeMenu"
          >
            Inicio
          </NuxtLink>
          <NuxtLink 
            to="/products" 
            class="nav-link text-gray-300 hover:text-primary font-medium py-2"
            @click="closeMenu"
          >
            Productos
          </NuxtLink>
          <NuxtLink 
            to="/cart" 
            class="nav-link text-gray-300 hover:text-primary font-medium py-2 flex items-center gap-2"
            @click="closeMenu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Carrito
            <span class="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
              {{ cartCount }}
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
  <!-- Spacer for fixed navbar -->
  <div class="h-16"></div>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)
const cartCount = ref(3) // This would come from a store/composable

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<style scoped>
.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #FF6B00, #FF9933);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}
</style>