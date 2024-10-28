<script setup>
import { computed, watch, onMounted, ref } from 'vue'
import { state, socket } from './socket'

const name = ref('World')
const received = ref('')
const message = ref('')

watch(message, (msg) => {
  socket.emit('message', msg)
})

onMounted(() => {
  name.value = 'Vite'
})

socket.on('my message', (msg) => {
  received.value = msg
})

const connected = computed(() => {
  return state.connected
})
</script>

<template>
  <div>
    <p>Hello {{ name }} - Connected: {{ connected }}</p>
    <p>{{ received }}</p>
    <input v-model="message" />
  </div>
</template>

<style scoped></style>
