<template>
  <div class="border p-4 rounded-lg">
    <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover mb-4">
    <h2 class="text-lg font-bold">{{ product.name }}</h2>
    <p class="text-gray-600">{{ product.description }}</p>
    <p class="text-xl font-semibold mt-2">${{ product.price }}</p>
    <NuxtLink :to="`/products/${product.id}`" class="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block">View Details</NuxtLink>
    <button @click="addToCart" class="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-2 inline-block">Add to Cart</button>
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