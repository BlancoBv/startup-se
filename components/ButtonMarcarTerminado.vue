<script setup lang="ts">
const props = defineProps<{ id: string }>()
const { execute, status } = useFetch(`/api/cola-mantenimiento/marcar-terminado/${props.id}`, { method: "POST", immediate: false })
</script>
<template>
    <Button class-name="btn-primary" :is-pending="status === 'pending'" @click="execute">
        Marcar como terminado
    </Button>
</template>