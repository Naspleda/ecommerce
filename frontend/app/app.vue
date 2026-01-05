<template>
  <div class="app-wrapper min-h-screen bg-dark font-sans text-white">
    <Navbar />
    <main class="container mx-auto px-4 py-8">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>

<style>
/* Global Styles */
html {
  scroll-behavior: smooth;
}

body {
  background-color: #0D0D0D;
  color: #ffffff;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1A1A1A;
}

::-webkit-scrollbar-thumb {
  background: #FF6B00;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #E65C00;
}

/* Selection */
::selection {
  background-color: rgba(255, 107, 0, 0.3);
  color: #ffffff;
}

/* Transitions */
* {
  transition-property: color, background-color, border-color, box-shadow, transform, opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>