<!-- <template>
  <div>
    <h1>Product Details</h1>
    <p>Product ID: {{ $route.params.id }}</p>
  </div>
</template>

<script setup>
</script> -->

<template>
      <main class="max-w-7xl mx-auto p-6 bg-transparent rounded-lg shadow-lg">
        
        <!-- Product Details Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Product Images -->
        <div class="space-y-6">
          <!-- Main Product Image -->
          <div class="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-orange-400 to-orange-600 p-8">
            <img 
              :src="selectedImage" 
              alt="Fall Limited Edition Sneakers" 
              class="w-full h-full object-contain"
            >
          </div>
          
          <!-- Thumbnail Images -->
          <div class="grid grid-cols-4 gap-4">
            <button 
              v-for="(image, index) in productImages" 
              :key="index"
              @click="selectedImage = image.src"
              :class="[
                'aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200',
                selectedImage === image.src 
                  ? 'border-orange-500 ring-2 ring-orange-200' 
                  : 'border-transparent hover:border-orange-300'
              ]"
            >
              <img 
                :src="image.thumbnail" 
                :alt="`Product view ${index + 1}`" 
                class="w-full h-full object-cover"
              >
            </button>
          </div>
        </div>

        <!-- Product Details -->
        <div class="space-y-6">
          <!-- Brand Label -->
          <div class="text-orange-500 font-semibold text-sm uppercase tracking-wider">
            C3D Studio
          </div>
          
          <!-- Product Title -->
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Fall Limited Edition Sneakers
          </h1>
          
          <!-- Product Description -->
          <p class="text-gray-600 text-lg leading-relaxed">
            These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.
          </p>
          
          <!-- Pricing -->
          <div class="space-y-2">
            <div class="flex items-center space-x-4">
              <span class="text-3xl font-bold text-gray-900">${{ currentPrice.toFixed(2) }}</span>
              <span class="bg-orange-100 text-orange-600 px-2 py-1 rounded-lg text-sm font-semibold">
                {{ discountPercentage }}%
              </span>
            </div>
            <div class="text-gray-400 line-through text-lg">
              ${{ originalPrice.toFixed(2) }}
            </div>
          </div>
          
          <!-- Quantity and Add to Cart -->
          <div class="flex flex-col sm:flex-row gap-4">
            <!-- Quantity Selector -->
            <div class="flex items-center bg-gray-100 rounded-lg">
              <button 
                @click="decreaseQuantity"
                class="p-3 text-orange-500 hover:text-orange-600 transition-colors"
                :disabled="quantity <= 1"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M20 12H4"/>
                </svg>
              </button>
              <span class="px-6 py-3 font-semibold text-gray-900 min-w-[60px] text-center">
                {{ quantity }}
              </span>
              <button 
                @click="increaseQuantity"
                class="p-3 text-orange-500 hover:text-orange-600 transition-colors"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M12 4v16m8-8H4"/>
                </svg>
              </button>
            </div>
            
            <!-- Add to Cart Button -->
            <button 
              @click="addToCart"
              class="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.1 5.4M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4.01"/>
              </svg>
              <span>Add to cart</span>
            </button>
          </div>
        </div>
      </div>
    </main>
</template>

<script setup>
import { ref, computed } from 'vue'

// Product data
const currentPrice = ref(125.00)
const originalPrice = ref(250.00)
const discountPercentage = ref(50)
const quantity = ref(0)
const cartCount = ref(0)

// Product images
const productImages = ref([
  {
    src: '',
    thumbnail: ''
  },
  {
    src: '',
    thumbnail: ''
  },
  {
    src: '',
    thumbnail: ''
  },
  {
    src: '',
    thumbnail: ''
  }
])

const selectedImage = ref(productImages.value[0].src)

// Methods
const increaseQuantity = () => {
  quantity.value++
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  if (quantity.value > 0) {
    cartCount.value += quantity.value
    quantity.value = 0
  }
}
</script>