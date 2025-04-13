<script setup lang="ts">
const props = defineProps<{ id: string, estatusActual: string }>()
const { execute, status } = useFetch(`/api/cola-mantenimiento/marcar-terminado/${props.id}`, { method: "POST", immediate: false })
const disabled = computed(() =>
    props.estatusActual === "terminado" || props.estatusActual === "terminado_entregado"
)
</script>
<template>
    <Button class-name="btn-secondary btn-outline" :is-pending="status === 'pending'" @click="execute"
        :disabled="disabled">
        Marcar como terminado
    </Button>
</template>