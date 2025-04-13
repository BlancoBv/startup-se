<script setup lang="ts">
const props = defineProps<{ id: string, estatusActual: string, refreshFn: () => Promise<void> }>()
const { execute, status } = useFetch(`/api/cola-mantenimiento/marcar-entregado/${props.id}`, { method: "POST", immediate: false })
const disabled = computed(() =>
    props.estatusActual === "en_cola" || props.estatusActual === "terminado_entregado"
)
</script>
<template>
    <Button class-name="btn-primary" :is-pending="status === 'pending'" @click="execute" :disabled="disabled">
        Marcar como entregado
    </Button>
</template>