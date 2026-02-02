<template>
  <div class="home-page">
    <!-- Hero Banner -->
    <section class="hero-banner relative -mt-8 -mx-4 px-4 py-12 md:py-16 overflow-hidden mb-8">
      <!-- Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-dark via-dark-600 to-dark-800"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
      
      <!-- Content -->
      <div class="relative z-10 max-w-4xl mx-auto text-center">
        <span class="inline-block px-4 py-1 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium mb-4">
          🖨️ Modelos Listos para Imprimir
        </span>
        
        <h1 class="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Modelos 3D
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-300">
            Premium
          </span>
        </h1>
        
        <p class="text-lg text-gray-400 max-w-2xl mx-auto">
          Explora nuestra colección de modelos 3D listos para impresión. 
          Figuras, props, miniaturas y más.
        </p>
      </div>

      <!-- Decorative -->
      <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-dark to-transparent"></div>
    </section>

    <!-- Main Content with Sidebar -->
    <div class="flex gap-6">
      <!-- Sidebar -->
      <div class="hidden lg:block w-80 flex-shrink-0">
        <Sidebar 
          v-model="selectedCategory" 
          @category-change="handleCategoryChange" 
        />
      </div>

      <!-- Products Section -->
      <div class="flex-1 min-w-0">
        <!-- Active Category Badge -->
        <div v-if="selectedCategory" class="mb-4 flex items-center gap-2">
          <span class="text-gray-400 text-sm">Filtrando por:</span>
          <span class="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
            {{ getCategoryName(selectedCategory) }}
            <button @click="clearCategory" class="hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        </div>

        <!-- Filters Bar -->
        <div class="bg-dark-500/50 border border-dark-300/20 rounded-xl p-4 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
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
          <span class="text-gray-400 text-sm">{{ productCount }} modelos encontrados</span>
        </div>

        <!-- Mobile Category Selector -->
        <div class="lg:hidden mb-6">
          <select 
            v-model="selectedCategory"
            @change="handleCategoryChange(selectedCategory)"
            class="w-full bg-dark-600 border border-dark-300/30 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary"
          >
            <option :value="null">Todas las categorías</option>
            <option v-for="cat in categoryOptions" :key="cat.id" :value="cat.id">
              {{ cat.icon }} {{ cat.name }}
            </option>
          </select>
        </div>

        <!-- Products Grid -->
        <ProductGrid :category="selectedCategory" @product-count="updateProductCount" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const sortBy = ref('featured')
const selectedCategory = ref(null)
const productCount = ref(0)

const categoryOptions = [
  { id: 'anime', name: 'Anime & Manga', icon: '🎭' },
  { id: 'gaming', name: 'Videojuegos', icon: '🎮' },
  { id: 'movies', name: 'Películas & Series', icon: '🎬' },
  { id: 'comics', name: 'Cómics & Superhéroes', icon: '💥' },
  { id: 'fantasy', name: 'Fantasía & Medieval', icon: '⚔️' },
  { id: 'miniatures', name: 'Miniaturas Wargame', icon: '♟️' },
  { id: 'terrain', name: 'Terrenos & Escenografía', icon: '🏰' },
  { id: 'dnd', name: 'D&D & RPG', icon: '🐉' },
  { id: 'gadgets', name: 'Gadgets & Herramientas', icon: '🔧' },
  { id: 'organizers', name: 'Organizadores', icon: '📦' },
  { id: 'phone', name: 'Accesorios Tech', icon: '📱' },
  { id: 'home', name: 'Decoración Hogar', icon: '🏠' },
  { id: 'art', name: 'Arte & Esculturas', icon: '🗿' },
  { id: 'plants', name: 'Macetas & Jardinería', icon: '🌿' },
  { id: 'vehicles', name: 'Vehículos & Autos', icon: '🚗' },
  { id: 'aircraft', name: 'Aviones & Naves', icon: '✈️' },
  { id: 'robots', name: 'Robots & Mechas', icon: '🤖' },
  { id: 'anatomy', name: 'Anatomía & Medicina', icon: '🫀' },
  { id: 'architecture', name: 'Arquitectura', icon: '🏛️' },
  { id: 'science', name: 'Ciencia & Educación', icon: '🔬' },
  { id: 'cosplay', name: 'Cosplay & Props', icon: '🎪' },
  { id: 'jewelry', name: 'Joyería & Accesorios', icon: '💍' },
  { id: 'animals', name: 'Animales & Mascotas', icon: '🐾' },
  { id: 'holiday', name: 'Temporadas & Fiestas', icon: '🎄' }
]

function handleCategoryChange(categoryId) {
  selectedCategory.value = categoryId
}

function clearCategory() {
  selectedCategory.value = null
}

function getCategoryName(categoryId) {
  const cat = categoryOptions.find(c => c.id === categoryId)
  return cat ? `${cat.icon} ${cat.name}` : ''
}

function updateProductCount(count) {
  productCount.value = count
}
</script>