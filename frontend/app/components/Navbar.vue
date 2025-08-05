<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <NuxtLink to="/" class="text-white text-xl font-bold">My eCommerce</NuxtLink>
      <div class="space-x-4">
        <NuxtLink to="/" class="text-gray-300 hover:text-white">Home</NuxtLink>
        <NuxtLink to="/products" class="text-gray-300 hover:text-white">Products</NuxtLink>
        <NuxtLink to="/cart" class="text-gray-300 hover:text-white">Cart</NuxtLink>
      </div>
    </div>
  </nav>
</template>