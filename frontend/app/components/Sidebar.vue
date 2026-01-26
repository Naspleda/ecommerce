<template>
  <aside class="sidebar h-[calc(100vh-180px)] sticky top-24 overflow-hidden">
    <!-- Sidebar Container -->
    <div class="bg-dark-500/50 border border-dark-300/30 rounded-2xl h-full flex flex-col">
      <!-- Header -->
      <div class="p-5 border-b border-dark-300/30 flex-shrink-0">
        <h2 class="text-lg font-bold text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Categorías
        </h2>
        <p class="text-gray-400 text-sm mt-1">Modelos 3D para impresión</p>
      </div>

      <!-- Scrollable Categories -->
      <div class="flex-1 overflow-y-auto scrollbar-thin p-3 space-y-1">
        <!-- All Products -->
        <button
          @click="selectCategory(null)"
          :class="[
            'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200',
            selectedCategory === null 
              ? 'bg-primary/20 text-primary border border-primary/40' 
              : 'text-gray-300 hover:bg-dark-400/50 hover:text-white border border-transparent'
          ]"
        >
          <span class="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-600 text-white text-sm">
            ✦
          </span>
          <div class="flex-1">
            <span class="font-medium block">Todos los Modelos</span>
            <span class="text-xs opacity-60">Ver catálogo completo</span>
          </div>
        </button>

        <!-- Category Items -->
        <button
          v-for="category in categories"
          :key="category.id"
          @click="selectCategory(category.id)"
          :class="[
            'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200',
            selectedCategory === category.id 
              ? 'bg-primary/20 text-primary border border-primary/40' 
              : 'text-gray-300 hover:bg-dark-400/50 hover:text-white border border-transparent'
          ]"
        >
          <span 
            class="w-8 h-8 flex items-center justify-center rounded-lg text-lg"
            :style="{ background: `linear-gradient(135deg, ${category.color}20, ${category.color}40)` }"
          >
            {{ category.icon }}
          </span>
          <div class="flex-1">
            <span class="font-medium block">{{ category.name }}</span>
            <span class="text-xs opacity-60">{{ category.count }} modelos</span>
          </div>
        </button>
      </div>

      <!-- Footer -->
      <div class="p-4 border-t border-dark-300/30 flex-shrink-0">
        <div class="bg-gradient-to-r from-primary/10 to-primary-700/10 border border-primary/20 rounded-xl p-4">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-2xl">🎨</span>
            <div>
              <p class="text-white text-sm font-medium">¿Modelo personalizado?</p>
              <p class="text-gray-400 text-xs">Contáctanos para diseños únicos</p>
            </div>
          </div>
          <button class="w-full mt-3 bg-primary/20 hover:bg-primary/30 text-primary text-sm py-2 rounded-lg font-medium transition-colors">
            Solicitar Diseño
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup>
const emit = defineEmits(['category-change'])

const props = defineProps({
  modelValue: {
    type: String,
    default: null
  }
})

const selectedCategory = ref(props.modelValue)

const categories = [
  // Figuras y Personajes
  { id: 'anime', name: 'Anime & Manga', icon: '🎭', color: '#FF6B9D', count: 156 },
  { id: 'gaming', name: 'Videojuegos', icon: '🎮', color: '#6366F1', count: 234 },
  { id: 'movies', name: 'Películas & Series', icon: '🎬', color: '#F59E0B', count: 189 },
  { id: 'comics', name: 'Cómics & Superhéroes', icon: '💥', color: '#EF4444', count: 167 },
  { id: 'fantasy', name: 'Fantasía & Medieval', icon: '⚔️', color: '#8B5CF6', count: 143 },
  
  // Tabletop Gaming
  { id: 'miniatures', name: 'Miniaturas Wargame', icon: '♟️', color: '#10B981', count: 312 },
  { id: 'terrain', name: 'Terrenos & Escenografía', icon: '🏰', color: '#6B7280', count: 98 },
  { id: 'dnd', name: 'D&D & RPG', icon: '🐉', color: '#DC2626', count: 276 },
  
  // Funcionales
  { id: 'gadgets', name: 'Gadgets & Herramientas', icon: '🔧', color: '#3B82F6', count: 87 },
  { id: 'organizers', name: 'Organizadores', icon: '📦', color: '#14B8A6', count: 64 },
  { id: 'phone', name: 'Accesorios Tech', icon: '📱', color: '#6366F1', count: 52 },
  
  // Decoración
  { id: 'home', name: 'Decoración Hogar', icon: '🏠', color: '#F97316', count: 134 },
  { id: 'art', name: 'Arte & Esculturas', icon: '🗿', color: '#A855F7', count: 89 },
  { id: 'plants', name: 'Macetas & Jardinería', icon: '🌿', color: '#22C55E', count: 47 },
  
  // Vehículos y Mecánicos
  { id: 'vehicles', name: 'Vehículos & Autos', icon: '🚗', color: '#EF4444', count: 78 },
  { id: 'aircraft', name: 'Aviones & Naves', icon: '✈️', color: '#0EA5E9', count: 56 },
  { id: 'robots', name: 'Robots & Mechas', icon: '🤖', color: '#8B5CF6', count: 123 },
  
  // Educativo y Científico
  { id: 'anatomy', name: 'Anatomía & Medicina', icon: '🫀', color: '#F43F5E', count: 34 },
  { id: 'architecture', name: 'Arquitectura', icon: '🏛️', color: '#64748B', count: 45 },
  { id: 'science', name: 'Ciencia & Educación', icon: '🔬', color: '#06B6D4', count: 29 },
  
  // Otros
  { id: 'cosplay', name: 'Cosplay & Props', icon: '🎪', color: '#EC4899', count: 198 },
  { id: 'jewelry', name: 'Joyería & Accesorios', icon: '💍', color: '#FBBF24', count: 76 },
  { id: 'animals', name: 'Animales & Mascotas', icon: '🐾', color: '#84CC16', count: 112 },
  { id: 'holiday', name: 'Temporadas & Fiestas', icon: '🎄', color: '#16A34A', count: 89 }
]

function selectCategory(categoryId) {
  selectedCategory.value = categoryId
  emit('category-change', categoryId)
}

// Watch for external changes
watch(() => props.modelValue, (newVal) => {
  selectedCategory.value = newVal
})
</script>

<style scoped>
/* Custom scrollbar for sidebar */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: transparent;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgba(255, 107, 0, 0.3);
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 107, 0, 0.5);
}

/* Firefox scrollbar */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 107, 0, 0.3) transparent;
}
</style>
