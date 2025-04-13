<script setup lang="ts">
const props = defineProps<{ id: string }>()
const { execute, status } = useFetch(`/api/cola-mantenimiento/marcar-entregado/${props.id}`, { method: "POST", immediate: false })
</script>
<template>
    <Button class-name="btn-warning" :is-pending="status === 'pending'" @click="execute">
        Marcar como Entregado
    </Button>
</template>