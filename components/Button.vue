<script setup lang="ts">
const props = defineProps<{ className?: string, isPending?: boolean, btnType?: "button" | "submit", disabled?: boolean }>()

const emits = defineEmits(["click"])

const className = computed(() => {

    if (props.className) return `btn ${props.className}`
    return "btn"
})
const disabled = computed(() => {
    return props.isPending || props.disabled
})

const clickEv = () => {
    emits("click")
}

</script>
<template>
    <button :class="className" :type="props.btnType ?? 'button'" @click="clickEv" :disabled="disabled">
        <template v-if="props.isPending">
            <span class="loading loading-spinner"></span>
            Cargando...
        </template>
        <slot v-else></slot>
    </button>
</template>