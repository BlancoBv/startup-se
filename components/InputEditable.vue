<script setup lang="ts">
const props = defineProps<{ value: string | undefined, apiRoute: string, field: string, refreshFn: () => Promise<void> }>()
const isActiveEditing = ref<boolean>(false)
const value = ref<string>(props.value ?? "")
const input = useTemplateRef("input-edit")

const body = computed(() => {
    return { [props.field]: value.value }
})

const { execute } = useFetch(props.apiRoute, {
    method: "PUT", body, watch: false, immediate: false, onResponse(res) {
        if (res.response.status === 200) {
            props.refreshFn()
            isActiveEditing.value = false
        }
    }
})

const activateEdit = async () => {
    isActiveEditing.value = true
    await nextTick(() => {
        input.value?.focus()
    })
}

const cancelEdit = () => {
    isActiveEditing.value = false
    value.value = props.value ?? ""
}
</script>
<template>
    <div v-if="!isActiveEditing" @click="activateEdit">{{ props.value }}</div>
    <form v-else class="flex gap-4 items-center" @submit.prevent="execute()">

        <div class="join">
            <input v-model="value" ref="input-edit" type="text" placeholder="Escribe el nuevo valor del campo"
                class="input validator join-item" required @blur="cancelEdit" />
            <button class="btn btn-error join-item rounded-r-full " type="button" @click="cancelEdit">X</button>
        </div>



    </form>
</template>