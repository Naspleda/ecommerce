<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero relative -mt-8 -mx-4 px-4 py-20 md:py-32 overflow-hidden">
      <!-- Background Gradient -->
      <div class="absolute inset-0 bg-gradient-to-br from-dark via-dark-600 to-dark-800"></div>
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
      
      <!-- Content -->
      <div class="relative z-10 max-w-4xl mx-auto text-center">
        <span class="inline-block px-4 py-1 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-medium mb-6">
          ✨ Nueva Colección Disponible
        </span>
        
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Descubre Productos
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-300">
            Exclusivos
          </span>
        </h1>
        
        <p class="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Explora nuestra selección de productos premium. Calidad excepcional, 
          diseño innovador y los mejores precios del mercado.
        </p>
        
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink 
            to="/products" 
            class="w-full sm:w-auto bg-gradient-to-r from-primary to-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 shadow-glow hover:shadow-glow-lg flex items-center justify-center gap-2"
          >
            Explorar Productos
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NuxtLink>
          <NuxtLink 
            to="/products" 
            class="w-full sm:w-auto border border-white/20 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 flex items-center justify-center gap-2"
          >
            Ver Ofertas
          </NuxtLink>
        </div>
      </div>

      <!-- Decorative Elements -->
      <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-dark to-transparent"></div>
    </section>

    <!-- Features Section -->
    <section class="py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="feature-card bg-dark-500/50 border border-dark-300/20 rounded-xl p-6 text-center hover:border-primary/30">
          <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <h3 class="text-white font-semibold mb-2">Envío Gratis</h3>
          <p class="text-gray-400 text-sm">En compras mayores a $50</p>
        </div>

        <div class="feature-card bg-dark-500/50 border border-dark-300/20 rounded-xl p-6 text-center hover:border-primary/30">
          <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 class="text-white font-semibold mb-2">Garantía 100%</h3>
          <p class="text-gray-400 text-sm">30 días de devolución</p>
        </div>

        <div class="feature-card bg-dark-500/50 border border-dark-300/20 rounded-xl p-6 text-center hover:border-primary/30">
          <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 class="text-white font-semibold mb-2">Soporte 24/7</h3>
          <p class="text-gray-400 text-sm">Ayuda cuando lo necesites</p>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-8">
      <ProductGrid title="Productos Destacados" :show-view-all="true" :limit="4" />
    </section>

    <!-- CTA Section -->
    <section class="py-16">
      <div class="bg-gradient-to-r from-primary/10 to-primary-700/10 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">
          ¿Listo para descubrir más?
        </h2>
        <p class="text-gray-400 mb-6 max-w-xl mx-auto">
          Únete a miles de clientes satisfechos y encuentra el producto perfecto para ti.
        </p>
        <NuxtLink 
          to="/products" 
          class="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-600"
        >
          Ver Catálogo Completo
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>