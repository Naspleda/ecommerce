<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Card v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<script setup>
const products = [
  {
    id: 1,
    name: 'Product 1',
    description: 'This is a description for product 1.',
    price: 19.99,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'This is a description for product 2.',
    price: 29.99,
    image: 'https://via.placeholder.com/150'
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'This is a description for product 3.',
    price: 39.99,
    image: 'https://via.placeholder.com/150'
  }
]
</script>