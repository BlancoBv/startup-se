<script setup lang="ts">
definePageMeta({ layout: "panel" })
const route = useRoute()
</script>
<template>
    <main>
        {{ route.params.id }}
    </main>
</template>