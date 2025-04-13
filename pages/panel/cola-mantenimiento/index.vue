<script setup lang="ts">
definePageMeta({ layout: "panel" })

const { data } = useFetch("/api/cola-mantenimiento")
</script>
<template>
    <main class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <form class="filter md:col-span-3">
            <input class="btn btn-square" type="reset" value="×" />
            <input class="btn" type="radio" name="frameworks" aria-label="Terminados" />
            <input class="btn" type="radio" name="frameworks" aria-label="Entregados" />
            <!-- <input class="btn" type="radio" name="frameworks" aria-label="React" /> -->
        </form>
        <div v-for="equipo in data" class="card bg-base-100 w-full shadow-sm">
            <div class="card-body">
                <h2 class="card-title">Equipo {{ equipo.marcaEquipo }}</h2>
                <p class="text-xs ">Folio: {{ equipo.id }}</p>
                <p class="text-xs">Fecha de ingreso: {{ equipo.createdAt }}</p>
                <p>{{ equipo.razonEntrada }}</p>
                <div class="card-actions justify-end">
                    <NuxtLink class="btn btn-primary" :to="`/panel/cola-mantenimiento/${equipo.id}`">Ver</NuxtLink>
                </div>
            </div>
        </div>
    </main>
</template>