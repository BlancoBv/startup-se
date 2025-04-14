<script setup lang="ts">
import { toast, type ToastContainerOptions } from "vue3-toastify"
const UUID_SECTION_LENGTH = [8, 4, 4, 4, 12]
const UUID_REFS = ref<HTMLInputElement[]>([])
const UUID = useState(() => ["", "", "", "", ""])
const infoContainer = useTemplateRef("info-container")
const formulario = useTemplateRef("formulario")


const fullUUID = computed(() => { return "/api/cola-mantenimiento/" + UUID.value.join("-") })

const { data, execute, status } = useFetch(/* `/api/cola-mantenimiento/${fullUUID.value}` */fullUUID, {
    immediate: false, watch: false, onResponseError() {
        toast('No se encontró ninguna coincidencia, intenta de nuevo.', { type: 'error' } as ToastContainerOptions)
    }, onResponse(res) {
        if (res.response.status === 200) {
            UUID.value = ["", "", "", "", ""]
            formulario.value?.reset()
        }

    }
})

const handleInput = (ev: Event, index: number) => {
    const length = UUID_SECTION_LENGTH[index]
    const currentLength = UUID.value[index].length

    if (currentLength === length && index < UUID_REFS.value.length - 1) {
        UUID_REFS.value[index + 1].focus?.()
    }

}

watch(status, async () => {
    if (status.value === 'success') {
        await nextTick()
        infoContainer.value?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" })
    }

})
</script>
<template>
    {{ fullUUID }}
    <div class="hero bg-base-200 min-h-screen">
        <div class="hero-content flex-col lg:flex-row-reverse">
            <div class="text-center lg:text-left">
                <h1 class="text-5xl font-bold">Consulta de estatus</h1>
                <p class="py-6">
                    Escribe el folio que se te fue proporcionado en el correo electronico, dicho folio consta de 36
                    caracteres, como el ejemplo siguiente:
                </p>
                <div class="mockup-code w-min">
                    <pre><code>73644905-b6f1-43cf-9b69-2d13135b6f99</code></pre>
                </div>
            </div>
            <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form ref="formulario" class="card-body" @submit.prevent="execute()">
                    <fieldset class="fieldset w-xs">
                        <template v-for="(len, index) in UUID_SECTION_LENGTH">
                            <label class="floating-label">
                                <span>{{ len }} caracteres</span>
                                <input v-model="UUID[index]" type="text"
                                    :ref="el => { UUID_REFS[index] = (el as HTMLInputElement) }" class="input validator"
                                    :minlength="len" :maxlength="len" @input="ev => handleInput(ev, index)"
                                    :placeholder="`${len} caracteres`" pattern="^[0-9a-fA-F]+$" required>
                                <p class="validator-hint">
                                    Ingresar {{ len }} caracteres (0-9, a-f).
                                </p>
                            </label>
                        </template>
                        <Button btn-type="submit" class-name="btn-primary" :is-pending="status === 'pending'">
                            <Icon name="mdi:search" size="2em" /> Buscar
                        </Button>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
    <Transition>
        <main v-if="status === 'success'" ref="info-container" class="min-h-screen">
            {{ data }}

        </main>
    </Transition>

</template>
<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>