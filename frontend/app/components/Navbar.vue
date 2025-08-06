<template>
  <nav class="mx-auto bg-transparent shadow pt-4">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Logo / marca -->
      <NuxtLink to="/" class="text-2xl font-bold text-gray-100">
        C3D Studio
      </NuxtLink>

      <!-- Enlaces de navegación -->
      <div class="hidden md:flex space-x-24">
        <NuxtLink
          to="/"
          class="text-gray-300 hover:text-orange-500"
        >Home</NuxtLink>
        <NuxtLink
          to="/products"
          class="text-gray-300 hover:text-orange-500"
        >Products</NuxtLink>
        <NuxtLink
          to="/cart"
          class="text-gray-300 hover:text-orange-500"
        >Cart</NuxtLink>
      </div>

      <!-- Icono a la derecha -->
      <NuxtLink to="/cart" class="p-2 border border-orange-500 rounded-full hover:bg-gray-900">
        <!-- Aquí podrías usar un <img> o un SVG inline -->
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8m0 0H17m-10 0a1 1 0 11-2 0 1 1 0 012 0zm13-8a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
      </NuxtLink>
    </div>
  </nav>
</template>