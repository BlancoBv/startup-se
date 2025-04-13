<script setup lang="ts">
definePageMeta({ layout: "panel" })
const filtro = useState(() => "en_cola")
const { data, status } = useFetch("/api/cola-mantenimiento", { query: { estatus: filtro } })

</script>
<template>
    <main class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <form class="filter md:col-span-3">
            <input class="btn btn-square" type="reset" value="×" @click="filtro = 'en_cola'" />
            <input v-model="filtro" class="btn" type="radio" name="estatus" aria-label="Terminados" value="terminado" />
            <input v-model="filtro" class="btn" type="radio" name="estatus" aria-label="Entregados"
                value="terminado_entregado" />
        </form>

        <div v-if="status === 'pending'" v-for="_item in 6"
            class="card card-border bg-base-200 w-full shadow-sm h-48 skeleton" />
        <div v-else v-for="equipo in data" class="card card-border bg-base-200 w-full shadow-sm">
            <div class="card-body">
                <h2 class="card-title">Equipo {{ equipo.marcaEquipo }}</h2>
                <p class="text-xs italic opacity-90">{{ equipo.id }}</p>
                <!-- <p class="text-xs">{{ formatDate(equipo.createdAt as string ?? "", "DD-MM-YYYY") }}
                </p> -->
                <p>{{ equipo.razonEntrada }}</p>
                <div class="card-actions justify-end">
                    <NuxtLink class="btn btn-primary" :to="`/panel/cola-mantenimiento/${equipo.id}`">Ver</NuxtLink>
                </div>
            </div>
        </div>
    </main>
</template>