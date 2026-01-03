<template>
  <section class="products-section">
    <!-- Section Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-2">
          {{ title || 'Nuestros Productos' }}
        </h2>
        <div class="w-20 h-1 bg-gradient-to-r from-primary to-primary-400 rounded-full"></div>
      </div>
      <NuxtLink 
        v-if="showViewAll" 
        to="/products" 
        class="text-primary hover:text-primary-400 font-medium flex items-center gap-1"
      >
        Ver Todos
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </NuxtLink>
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <Card 
        v-for="product in productsToShow" 
        :key="product.id" 
        :product="product" 
      />
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: String,
  showViewAll: {
    type: Boolean,
    default: false
  },
  limit: {
    type: Number,
    default: null
  }
})

const products = [
  {
    id: 1,
    name: 'Auriculares Premium Pro',
    description: 'Auriculares inalámbricos con cancelación de ruido activa y sonido envolvente de alta fidelidad.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop'
  },
  {
    id: 2,
    name: 'Smartwatch Elite',
    description: 'Reloj inteligente con monitor de salud, GPS integrado y batería de larga duración.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop'
  },
  {
    id: 3,
    name: 'Cámara Profesional 4K',
    description: 'Cámara mirrorless con sensor full-frame, grabación 4K y estabilización de imagen.',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop'
  },
  {
    id: 4,
    name: 'Laptop Ultra Slim',
    description: 'Portátil ultraligero con pantalla OLED, procesador de última generación y 16GB RAM.',
    price: 1499.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop'
  },
  {
    id: 5,
    name: 'Altavoz Bluetooth',
    description: 'Altavoz portátil resistente al agua con sonido 360° y 24 horas de batería.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop'
  },
  {
    id: 6,
    name: 'Teclado Mecánico RGB',
    description: 'Teclado gaming con switches mecánicos, retroiluminación RGB y reposamuñecas.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400&h=400&fit=crop'
  }
]

const productsToShow = computed(() => {
  if (props.limit) {
    return products.slice(0, props.limit)
  }
  return products
})
</script>