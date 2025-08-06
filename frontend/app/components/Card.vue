<template>
  <div class="border border-gray-900 p-4 rounded-lg">
    <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover mb-4">
    <h2 class="text-lg font-bold">{{ product.name }}</h2>
    <p class="text-gray-600">{{ product.description }}</p>
    <p class="text-xl font-semibold mt-2">${{ product.price }}</p>
    <NuxtLink :to="`/products/${product.id}`" class="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block">View Details</NuxtLink>
    <!-- <button @click="addToCart" class="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-2 inline-block">Add to Cart</button> -->
    <button @click="addToCart" class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
<span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
Add to Cart
</span>
</button>
  </div>
</template>

<script setup>

defineProps({
  product: Object
})

function addToCart() {
  // Logic to add to cart
  console.log('Added to cart')
}
</script>