<script setup>
useHead({
  title: 'Socket.io Nuxt 3',
  htmlAttrs: {
    lang: 'fr'
  }
})

const { $socket } = useNuxtApp()

const name = ref('World')
const message = ref('')
const received = ref('')

watch(message, (msg) => {
  $socket.emit('message', msg)
  $socket.on('message', (data) => {
    received.value = data
  })
})
</script>

<template>
  <div>
    <h1>Hello {{ name }}</h1>
    <p>Message from server: {{ received }}</p>
    <input type="text" v-model="message" placeholder="send message to server">
  </div>
</template>
