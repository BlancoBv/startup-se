<script setup lang="ts">
definePageMeta({ layout: "panel" })
const { id } = useRoute().params as unknown as { id: string }
const apiRoute = computed(() => `/api/cola-mantenimiento/${id}`)
const { data, refresh } = useFetch(`/api/cola-mantenimiento/${id}`)
</script>
<template>
    <main class="flex flex-col prose min-w-full">
        <h1>Información general</h1>
        <div class="stats stats-vertical bg-base-200 shadow not-prose mb-4">
            <div class="stat">
                <div class="stat-figure text-secondary">
                    <Icon name="mdi:person" size="3em" />
                </div>
                <div class="stat-title">Nombre del cliente</div>
                <div class="stat-value">
                    <InputEditable :value="data?.nombreCliente" field="nombreCliente" :api-route="apiRoute"
                        :refresh-fn="refresh">
                        {{ data?.nombreCliente }}</InputEditable>

                </div>
                <div class="stat-desc">Núm. celular: {{ data?.numTel }}</div>
            </div>

            <div class="stat">
                <div class="stat-figure text-secondary">
                    <Icon name="mdi:information" size="3em" />
                </div>
                <div class="stat-title">Información del equipo</div>
                <div class="stat-value">Marca {{ data?.marcaEquipo }}</div>
                <div class="stat-desc">Núm. serie: {{ data?.numSerieEquipo ?? "No especificado." }}</div>
            </div>

            <div class="stat">
                <div class="stat-figure text-secondary">
                    <Icon name="mdi:calendar" size="3em" />
                </div>
                <div class="stat-title">Fecha de ingreso</div>
                <div class="stat-value">{{ formatDate(data?.createdAt as string ?? "", "DD-MM-YYYY") }}</div>
                <!--                 <div class="stat-desc">↘︎ 90 (14%)</div>
 -->
            </div>
            <div class="stat">
                <div class="stat-figure text-secondary">
                    <Icon name="mdi:comment-question" size="3em" />
                </div>
                <div class="stat-title">Motivo de ingreso</div>
                <div class="stat-value">
                    <InputEditable :value="data?.razonEntrada" field="razonEntrada" :api-route="apiRoute"
                        :refresh-fn="refresh">
                        {{ data?.nombreCliente }}</InputEditable>
                </div>
                <!--                 <div class="stat-desc">↘︎ 90 (14%)</div>
 -->
            </div>
        </div>
        <h1>Procedimientos</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <ul v-if="data?.procedimientos.length === 0" class="list bg-base-200 rounded-box shadow-md not-prose h-96">

                <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Procedimientos realizados al equipo</li>
                <li class="list-row">
                    <!-- <div class="text-4xl font-thin opacity-30 tabular-nums">0</div> -->
                    <!-- <div><img class="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/4@94.webp" />
    </div> -->
                    <div class="list-col-grow">
                        <div>Ningún procedimiento ha sido realizado</div>
                        <div class="text-xs uppercase font-semibold opacity-60">En breve se actualizará la información.
                        </div>
                    </div>
                    <!-- <button class="btn btn-square btn-ghost">
        <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none"
                stroke="currentColor">
                <path d="M6 3L20 12 6 21 6 3z"></path>
            </g>
        </svg>
    </button> -->
                </li>
            </ul>
            <ul v-else class="list bg-base-200 rounded-box shadow-md not-prose h-96">

                <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Procedimientos realizados al equipo</li>

                <li v-for="procedimiento, index in data?.procedimientos" class="list-row">
                    <div class="text-4xl font-thin opacity-30 tabular-nums">{{ index + 1 }}</div>
                    <!-- <div><img class="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" />
    </div> -->
                    <div class="list-col-grow">
                        <div>{{ procedimiento.descripcion }}</div>
                        <!--                         <div>Realizado el {{ formatDate(procedimiento?.createdAt ?? "", "DD, MMMM YYYY") }}</div>
 -->
                        <div class="text-xs uppercase font-semibold opacity-60">Costo: ${{ procedimiento.costo }}</div>
                    </div>
                </li>


            </ul>

            <form class="flex items-center justify-center not-prose">
                <fieldset class="fieldset w-md bg-base-200 border border-base-300 p-4 rounded-box gap-4">
                    <legend class="fieldset-legend">Añadir nuevo procedimiento</legend>
                    <label class="floating-label">
                        <span>Descripción</span>
                        <textarea placeholder="Costo" class="input input-md w-full min-h-40 " required />
                    </label>
                    <label class="floating-label">
                        <span>Costo</span>
                        <input type="number" step="0.01" min="0" placeholder="Costo" class="input input-md w-full"
                            required />
                    </label>
                    <button class="btn btn-primary btn-soft" type="submit">
                        <Icon name="mdi:plus" size="2em" />
                    </button>
                </fieldset>

            </form>
        </div>
        <div class="flex gap-4 justify-end">
            <ButtonMarcarTerminado :id="id" :estatus-actual="data?.estatus ?? ''" />
            <ButtonMarcarEntregado :id="id" :estatus-actual="data?.estatus ?? ''" :refresh-fn="refresh" />
        </div>
    </main>
</template>