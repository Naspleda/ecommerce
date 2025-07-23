<template>
  <div>
    <h1>Checkout</h1>
    <div v-if="cartStore.items.length">
      <div v-for="item in cartStore.items" :key="item.id">
        <p>{{ item.name }} - ${{ item.price }} x {{ item.quantity }}</p>
      </div>
      <h3>Total: ${{ cartStore.totalAmount.toFixed(2) }}</h3>
      <button @click="proceedToPayment">Proceder al Pago con Mercado Pago</button>
    </div>
    <p v-else>Tu carrito está vacío.</p>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();

const proceedToPayment = async () => {
  if (!authStore.isAuthenticated) {
    alert('Por favor, inicia sesión para proceder con el pago.');
    router.push('/login');
    return;
  }

  // 1. Crear la orden en el backend
  try {
    const orderResponse = await $fetch('orders/', {
      method: 'POST',
      body: {
        items: cartStore.items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.price // Asegúrate de que el precio sea el del momento del pedido
        }))
      }
    });
    const orderId = orderResponse.data.id;

    // 2. Solicitar la preferencia de pago a Mercado Pago a través del backend
    const paymentResponse = await $fetch(`orders/${orderId}/process_payment/`);
    const initPoint = paymentResponse.data.init_point;

    if (initPoint) {
      window.location.href = initPoint; // Redirigir al usuario a Mercado Pago
    } else {
      alert('Error al generar la preferencia de pago.');
    }

  } catch (error) {
    console.error('Error al procesar el pago:', error);
    if (error.response && error.response.status === 401) {
        alert('Necesitas iniciar sesión para completar el pago.');
        router.push('/login');
    } else {
        alert('Hubo un error al procesar tu pago. Por favor, inténtalo de nuevo.');
    }
  }
};
</script>