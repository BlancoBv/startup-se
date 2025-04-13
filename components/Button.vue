<script setup lang="ts">
const props = defineProps<{ className?: string, isPending: boolean, btnType?: "button" | "submit" }>()

const emits = defineEmits(["click"])

const className = computed(() => {

    if (props.className) return `btn ${props.className}`
    return "btn"
})

const clickEv = () => {
    emits("click")
}

</script>
<template>
    <button :class="className" :type="props.btnType ?? 'button'" @click="clickEv" :disabled="props.isPending">
        <template v-if="props.isPending">
            <span class="loading loading-spinner"></span>
            Cargando...
        </template>
        <slot v-else></slot>
    </button>
</template>