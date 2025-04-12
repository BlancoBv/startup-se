<script setup lang="ts">
definePageMeta({ layout: "panel" })

interface Body {
    nombreCliente: string,
    numTel: string,
    correo: string,
    numSerieEquipo: string | null,
    marcaEquipo: string,
    razonEntrada: string
}

const body = reactive<Body>({
    nombreCliente: "",
    numTel: "",
    correo: "",
    numSerieEquipo: null,
    marcaEquipo: "",
    razonEntrada: ""
})

const { execute, status } = useFetch("/api/cola-mantenimiento", { method: "POST", body, immediate: false, watch: false })
</script>
<template>
    <main>
        <form class="grid grid-cols-1 md:grid-cols-2 gap-4" @submit.prevent="execute()">
            <fieldset class="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box gap-4">
                <legend class="fieldset-legend">Información del cliente</legend>
                <label class="floating-label">
                    <span>Nombre</span>
                    <input v-model="body.nombreCliente" type="text" placeholder="Nombre del cliente"
                        class="input input-md w-full" required />
                </label>
                <label class="floating-label">
                    <span>Número de celular</span>
                    <input v-model="body.numTel" type="text" minlength="10" maxlength="10"
                        placeholder="Número de celular" class=" input input-md w-full" required />
                </label>
                <label class="floating-label">
                    <span>Correo electronico</span>
                    <input v-model="body.correo" type="email" placeholder="Correo electronico"
                        class=" input input-md w-full" required />
                </label>
            </fieldset>
            <fieldset class="fieldset w-full bg-base-200 border border-base-300 p-4 rounded-box gap-4">
                <legend class="fieldset-legend">Información del equipo</legend>
                <label class="floating-label">
                    <span>Marca del equipo</span>
                    <input v-model="body.marcaEquipo" type="text" placeholder="Marca del equipo"
                        class=" input input-md w-full" required />
                </label>
                <label class="floating-label">
                    <span>Número de serie del equipo (opcional)</span>
                    <input v-model="body.numSerieEquipo" type="text" placeholder="Número de serie del equipo (opcional)"
                        class=" input input-md w-full" />
                </label>
            </fieldset>
            <label class="floating-label">
                <span>Razón de entrada</span>
                <textarea v-model="body.razonEntrada" placeholder="Correo electronico"
                    class=" input input-md w-full min-h-80 " required />
            </label>
            <button class="btn btn-primary" type="submit" :disabled="status === 'pending'">Añadir</button>
        </form>
    </main>
</template>