<script setup lang="ts">
const route = useRoute()
</script>

<template>
    <main>{{ route.params.id }}</main>

</template>