<script setup lang="ts">
const route = useRoute()
const { id } = route.params

const { refresh } = useFetch(`/api/cola-mantenimiento/${id}`)
</script>

<template>
    <button @click="refresh()">ccc</button>
    <main>{{ route.params.id }}</main>

</template>