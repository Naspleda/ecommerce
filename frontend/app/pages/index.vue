<template>
  <Navbar />
  <div class="min-h-screen bg-white">
    <div class="flex flex-col items-center justify-center min-h-screen">
      <!-- <h1 class="text-4xl font-bold mb-4">Welcome to Our Application</h1>
      <p class="text-lg text-gray-600">This is the home page of our application.</p> -->
      <!-- Grid container para las cartas -->
      <div class="grid grid-cols-3 gap-6 max-w-6xl mx-auto">
        <Card v-for="i in 6" :key="i" />
      </div>
    </div>
  <footer class="bg-gray-900 text-white text-center py-4 mt-8">
    <p>&copy; 2025 Our Application. All rights reserved.</p>
  </footer>
</div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import Card from '../components/Card.vue';
</script>