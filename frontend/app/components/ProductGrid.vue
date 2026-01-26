<template>
  <section class="products-section">
    <!-- Section Header -->
    <div v-if="title" class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-2">
          {{ title || 'Nuestros Modelos' }}
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

    <!-- Empty State -->
    <div v-if="productsToShow.length === 0" class="text-center py-16">
      <div class="w-20 h-20 bg-dark-500/50 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <h3 class="text-lg font-medium text-white mb-2">No hay modelos en esta categoría</h3>
      <p class="text-gray-400 text-sm">Prueba seleccionando otra categoría o explora todos los modelos</p>
    </div>

    <!-- Products Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card 
        v-for="product in productsToShow" 
        :key="product.id" 
        :product="product" 
      />
    </div>
  </section>
</template>

<script setup>
import { computed, watch } from 'vue'

const emit = defineEmits(['product-count'])

const props = defineProps({
  title: String,
  showViewAll: {
    type: Boolean,
    default: false
  },
  limit: {
    type: Number,
    default: null
  },
  category: {
    type: String,
    default: null
  }
})

const products = [
  // Anime & Manga
  { id: 1, name: 'Goku Ultra Instinct', description: 'Figura articulada de Goku en su forma Ultra Instinct. Incluye base y efectos de aura. Optimizado para FDM y resina.', price: 14.99, image: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=400&h=400&fit=crop', category: 'anime' },
  { id: 2, name: 'Nezuko Demon Form', description: 'Escultura detallada de Nezuko en forma demonio. Perfecta para pintar. Compatible con impresoras de resina.', price: 12.99, image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=400&fit=crop', category: 'anime' },
  { id: 3, name: 'Naruto Sage Mode', description: 'Naruto en modo sabio con base de roca. Modelo dividido para fácil impresión. Incluye versión pre-soportada.', price: 16.99, image: 'https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?w=400&h=400&fit=crop', category: 'anime' },
  
  // Gaming
  { id: 4, name: 'Master Chief Helmet', description: 'Casco wearable de Master Chief escala 1:1. Dividido en secciones para impresión FDM. Incluye guía de ensamblaje.', price: 24.99, image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=400&fit=crop', category: 'gaming' },
  { id: 5, name: 'Pokemon Charizard', description: 'Charizard dinámico con llamas. Modelo articulado opcional. Optimizado para impresión sin soportes.', price: 18.99, image: 'https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=400&h=400&fit=crop', category: 'gaming' },
  { id: 6, name: 'Kratos & Leviathan Axe', description: 'Kratos con hacha Leviatán. Diorama épico incluido. Versión para resina con detalles ultra finos.', price: 22.99, image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop', category: 'gaming' },
  
  // Cosplay & Props
  { id: 7, name: 'Iron Man Arc Reactor', description: 'Reactor Arc funcional con LEDs. Escala real, wearable. Incluye caja electrónica y guía de cableado.', price: 19.99, image: 'https://images.unsplash.com/photo-1635863138275-d9b33299680b?w=400&h=400&fit=crop', category: 'cosplay' },
  { id: 8, name: 'Mjolnir Thor Hammer', description: 'Martillo de Thor tamaño real. Diseño modular para impresión fácil. Peso añadido opcional.', price: 29.99, image: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=400&fit=crop', category: 'cosplay' },
  { id: 9, name: 'Mandalorian Helmet', description: 'Casco Mandaloriano wearable. Acabado cromado simulado. Compatible con visor tintado.', price: 34.99, image: 'https://images.unsplash.com/photo-1608346128025-1896b97a6fa7?w=400&h=400&fit=crop', category: 'cosplay' },
  
  // D&D & RPG
  { id: 10, name: 'Dragon Ancient Red', description: 'Dragón rojo ancestral para D&D. Base de 4 pulgadas. Detalles de escamas esculpidos a mano.', price: 15.99, image: 'https://images.unsplash.com/photo-1577493340887-b7bfff550145?w=400&h=400&fit=crop', category: 'dnd' },
  { id: 11, name: 'Dungeon Tiles Set', description: 'Set de 50+ tiles modulares para mazmorras. Sistema de clips integrado. Múltiples configuraciones.', price: 24.99, image: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=400&h=400&fit=crop', category: 'dnd' },
  { id: 12, name: 'Miniatures Hero Pack', description: 'Pack de 10 héroes para RPG. Guerrero, mago, pícaro y más. Pre-soportados y listos para imprimir.', price: 19.99, image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&h=400&fit=crop', category: 'dnd' },
  
  // Miniatures Wargame
  { id: 13, name: 'Space Marines Squad', description: 'Escuadrón de 5 marines espaciales. Compatibles con bases de 32mm. Múltiples poses incluidas.', price: 16.99, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', category: 'miniatures' },
  { id: 14, name: 'Orc Warband', description: 'Banda de guerra orco con 8 figuras. Armas intercambiables. Perfecto para AoS y otros sistemas.', price: 14.99, image: 'https://images.unsplash.com/photo-1569437061241-a848be43cc82?w=400&h=400&fit=crop', category: 'miniatures' },
  
  // Home Decor
  { id: 15, name: 'Moon Lamp Lithophane', description: 'Lámpara lunar litofana personalizable. Incluye base con LED. Efecto de luz suave y cálida.', price: 11.99, image: 'https://images.unsplash.com/photo-1532188363366-3a1b2ac4a338?w=400&h=400&fit=crop', category: 'home' },
  { id: 16, name: 'Geometric Wall Art Set', description: 'Set de 6 piezas geométricas para pared. Diseño moderno y minimalista. Fácil montaje.', price: 9.99, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', category: 'home' },
  { id: 17, name: 'Floating Shelf Brackets', description: 'Soportes ocultos para estantes flotantes. Diseño industrial. Capacidad 5kg por soporte.', price: 7.99, image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=400&h=400&fit=crop', category: 'home' },
  
  // Plants & Gardening
  { id: 18, name: 'Self-Watering Planter', description: 'Maceta con sistema de auto-riego. Diseño moderno con reservorio visible. Varios tamaños.', price: 8.99, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop', category: 'plants' },
  { id: 19, name: 'Succulent Pot Collection', description: 'Colección de 8 macetas para suculentas. Formas geométricas únicas. Drenaje incluido.', price: 12.99, image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop', category: 'plants' },
  
  // Robots & Mechs
  { id: 20, name: 'Gundam RX-78-2', description: 'Modelo articulado del Gundam clásico. 30cm de altura. Juntas móviles y accesorios de armas.', price: 39.99, image: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=400&h=400&fit=crop', category: 'robots' },
  { id: 21, name: 'Transformable Robot', description: 'Robot que se transforma en vehículo. Mecánica funcional impresa. Sin tornillos necesarios.', price: 27.99, image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=400&fit=crop', category: 'robots' },
  
  // Gadgets & Tools
  { id: 22, name: 'Cable Management Box', description: 'Organizador de cables con tapa. Ventilación integrada. Ideal para escritorios gaming.', price: 6.99, image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop', category: 'gadgets' },
  { id: 23, name: 'Headphone Stand RGB', description: 'Soporte para auriculares con canal para LEDs RGB. Diseño gaming futurista.', price: 9.99, image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop', category: 'gadgets' },
  { id: 24, name: 'Tool Organizer Wall Mount', description: 'Sistema modular de organización de herramientas. Ganchos y bandejas intercambiables.', price: 14.99, image: 'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=400&h=400&fit=crop', category: 'gadgets' },
  
  // Vehicles
  { id: 25, name: 'Cybertruck Model', description: 'Réplica detallada del Cybertruck. Escala 1:24. Puertas y cofre funcionales.', price: 18.99, image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=400&fit=crop', category: 'vehicles' },
  { id: 26, name: 'F1 Car Collection', description: 'Set de 4 autos F1 legendarios. Detalles de aerodinámica realistas. Incluye bases.', price: 22.99, image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=400&fit=crop', category: 'vehicles' },
  
  // Animals & Pets
  { id: 27, name: 'Articulated Dragon', description: 'Dragón articulado print-in-place. Se imprime en una sola pieza. Movimiento fluido.', price: 5.99, image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=400&h=400&fit=crop', category: 'animals' },
  { id: 28, name: 'Pet Name Tag Customizable', description: 'Identificador para mascotas personalizable. Incluye archivo editable. Múltiples formas.', price: 2.99, image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop', category: 'animals' },
  { id: 29, name: 'Wildlife Collection', description: 'Set de 12 animales salvajes detallados. León, elefante, jirafa y más. Educativo.', price: 16.99, image: 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=400&h=400&fit=crop', category: 'animals' },
  
  // Art & Sculptures  
  { id: 30, name: 'Greek Statue Replica', description: 'Réplica de escultura griega clásica. 25cm de altura. Acabado mármol simulado.', price: 19.99, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', category: 'art' },
  { id: 31, name: 'Abstract Sculpture Set', description: 'Set de 3 esculturas abstractas modernas. Diseño contemporáneo. Ideales para oficina.', price: 14.99, image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=400&h=400&fit=crop', category: 'art' },
  
  // Tech Accessories
  { id: 32, name: 'Phone Stand Adjustable', description: 'Soporte de teléfono ajustable. Ángulo variable. Compatible con todos los tamaños.', price: 4.99, image: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?w=400&h=400&fit=crop', category: 'phone' },
  { id: 33, name: 'AirPods Case Armor', description: 'Funda protectora para AirPods. Diseño táctico con clip. Absorción de impactos.', price: 6.99, image: 'https://images.unsplash.com/photo-1588423771073-b8903fba77ac?w=400&h=400&fit=crop', category: 'phone' },
  
  // Fantasy & Medieval
  { id: 34, name: 'Medieval Castle', description: 'Castillo medieval modular. Torres y murallas separadas. Compatible con miniaturas 28mm.', price: 34.99, image: 'https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?w=400&h=400&fit=crop', category: 'fantasy' },
  { id: 35, name: 'Excalibur Sword', description: 'Espada Excalibur tamaño real. Diseño en secciones. Detalles de gemas y runas.', price: 28.99, image: 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=400&h=400&fit=crop', category: 'fantasy' },
  
  // Movies & Series
  { id: 36, name: 'Baby Yoda Grogu', description: 'Grogu adorable con múltiples poses. Incluye cápsula flotante. Detalles de tela simulados.', price: 13.99, image: 'https://images.unsplash.com/photo-1626278664285-f796b9ee7806?w=400&h=400&fit=crop', category: 'movies' },
  { id: 37, name: 'DeLorean Time Machine', description: 'DeLorean de Volver al Futuro. Escala 1:24. Puertas que abren y detalles interiores.', price: 24.99, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=400&fit=crop', category: 'movies' },
  
  // Holiday & Seasonal
  { id: 38, name: 'Christmas Ornament Set', description: 'Set de 20 adornos navideños. Copos de nieve, estrellas y figuras festivas.', price: 11.99, image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a814?w=400&h=400&fit=crop', category: 'holiday' },
  { id: 39, name: 'Halloween Decorations', description: 'Pack de decoraciones de Halloween. Calabazas, fantasmas y murciélagos articulados.', price: 9.99, image: 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=400&h=400&fit=crop', category: 'holiday' }
]

const productsToShow = computed(() => {
  let filteredProducts = products
  
  // Filter by category
  if (props.category) {
    filteredProducts = products.filter(p => p.category === props.category)
  }
  
  // Apply limit
  if (props.limit) {
    return filteredProducts.slice(0, props.limit)
  }
  
  return filteredProducts
})

// Emit product count when it changes
watch(productsToShow, (newProducts) => {
  emit('product-count', newProducts.length)
}, { immediate: true })
</script>