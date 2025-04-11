<script setup lang="ts">
definePageMeta({ layout: "panel" })
const user = useState("user")
</script>

<template>Panel
    {{ user }}
</template>