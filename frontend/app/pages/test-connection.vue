<template>
    <div class="p-10 max-w-2xl mx-auto space-y-6">
        <h1 class="text-3xl font-bold mb-6">System Status Check</h1>

        <!-- Backend Status -->
        <div class="p-6 rounded-lg border" :class="backendStatus.color">
            <h2 class="text-xl font-semibold mb-2">FastAPI Backend Connection</h2>
            <p>URL: http://127.0.0.1:8000</p>
            <div class="mt-4 font-mono text-sm bg-white/50 p-4 rounded">
                Status: {{ backendStatus.message }}
                <br>
                Response: {{ backendResponse }}
            </div>
            <button @click="checkBackend" class="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800">
                Re-check Connection
            </button>
        </div>

        <!-- Supabase Status (Frontend) -->
        <div class="p-6 rounded-lg border border-green-200 bg-green-50" v-if="supabase">
            <h2 class="text-xl font-semibold mb-2 text-green-800">Nuxt Supabase Module</h2>
            <p class="text-green-700">Client initialized successfully.</p>
        </div>
    </div>
</template>

<script setup>
const backendResponse = ref('Waiting to check...')
const backendStatus = reactive({
    message: 'Not checked',
    color: 'bg-gray-50 border-gray-200'
})

const supabase = useSupabaseClient()

async function checkBackend() {
    backendStatus.message = 'Checking...'
    backendStatus.color = 'bg-yellow-50 border-yellow-200'

    try {
        // Calling the FastAPI root endpoint
        const data = await $fetch('http://127.0.0.1:8000/')
        backendResponse.value = JSON.stringify(data)
        backendStatus.message = 'Connected ✅'
        backendStatus.color = 'bg-green-50 border-green-200'
    } catch (error) {
        backendResponse.value = error.message
        backendStatus.message = 'Connection Failed ❌'
        backendStatus.color = 'bg-red-50 border-red-200'
        console.error(error)
    }
}

onMounted(() => {
    checkBackend()
})
</script>
