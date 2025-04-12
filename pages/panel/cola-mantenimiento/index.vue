<script setup lang="ts">
definePageMeta({ layout: "panel" })

const { data } = useFetch("/api/cola-mantenimiento")
</script>
<template>
    <main class="grid grid-cols-3 gap-4">
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