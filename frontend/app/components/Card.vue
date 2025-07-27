<template>
  <div class="w-80 bg-gray-900 rounded-lg overflow-hidden shadow-lg">
       <!-- Product Image Container  -->
      <div class="relative">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-f4ZBE2kOmLqcukfd0kil2WRmptEesx.png"
          alt="Blue T-Shirt"
          width={320}
          height={240}
          class="w-full h-60 object-cover"
        />
        <!-- Sale Badge  -->
        <div class="absolute top-3 left-3 bg-green-400 text-black text-xs font-semibold px-2 py-1 rounded">
          Sale
        </div>
      </div>

      <!-- Product Details  -->
      <div class="p-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-white font-medium text-lg mb-2">Blue T-Shirt</h3>
            <p class="text-white text-xl font-bold">$29</p>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-2">
            <button class="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
              <!-- <Heart class="w-5 h-5 text-white" /> -->
            </button>
            <button class="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
              <!-- <ShoppingCart class="w-5 h-5 text-white" /> -->
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
</script>

<style scoped>
</style>