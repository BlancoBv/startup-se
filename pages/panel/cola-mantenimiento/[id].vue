<script setup lang="ts">
definePageMeta({ layout: "panel" })
const { id } = useRoute().params as unknown as { id: string }
const apiRoute = computed(() => `/api/cola-mantenimiento/${id}`)
const { data, refresh } = useFetch(`/api/cola-mantenimiento/${id}`)
</script>
<template>
    <main class="flex flex-col prose min-w-full">
        <h1>Información general</h1>
        <div class="stats stats-vertical bg-base-100 shadow not-prose mb-4">
            <div class="stat">
                <div class="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        class="inline-block h-8 w-8 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
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
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        class="inline-block h-8 w-8 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4">
                        </path>
                    </svg>
                </div>
                <div class="stat-title">Información del equipo</div>
                <div class="stat-value">Marca {{ data?.marcaEquipo }}</div>
                <div class="stat-desc">Núm. serie: {{ data?.numSerieEquipo ?? "No especificado." }}</div>
            </div>

            <div class="stat">
                <div class="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        class="inline-block h-8 w-8 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4">
                        </path>
                    </svg>
                </div>
                <div class="stat-title">Fecha de ingreso</div>
                <div class="stat-value">{{ data?.createdAt }}</div>
                <!--                 <div class="stat-desc">↘︎ 90 (14%)</div>
 -->
            </div>
            <div class="stat">
                <div class="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        class="inline-block h-8 w-8 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4">
                        </path>
                    </svg>
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
        <ul v-if="data?.procedimientos.length === 0" class="list bg-base-100 rounded-box shadow-md not-prose">

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
        <ul v-else class="list bg-base-100 rounded-box shadow-md not-prose">

            <li class="p-4 pb-2 text-xs opacity-60 tracking-wide">Procedimientos realizados al equipo</li>

            <li v-for="procedimiento, index in data?.procedimientos" class="list-row">
                <div class="text-4xl font-thin opacity-30 tabular-nums">{{ index + 1 }}</div>
                <!-- <div><img class="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp" />
                </div> -->
                <div class="list-col-grow">
                    <div>{{ procedimiento.descripcion }}</div>
                    <div class="text-xs uppercase font-semibold opacity-60">Costo: ${{ procedimiento.costo }}</div>
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

            <!-- <li class="list-row">
                <div class="text-4xl font-thin opacity-30 tabular-nums">02</div>
                <div><img class="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/4@94.webp" />
                </div>
                <div class="list-col-grow">
                    <div>Ellie Beilish</div>
                    <div class="text-xs uppercase font-semibold opacity-60">Bears of a fever</div>
                </div>
                <button class="btn btn-square btn-ghost">
                    <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none"
                            stroke="currentColor">
                            <path d="M6 3L20 12 6 21 6 3z"></path>
                        </g>
                    </svg>
                </button>
            </li>

            <li class="list-row">
                <div class="text-4xl font-thin opacity-30 tabular-nums">03</div>
                <div><img class="size-10 rounded-box" src="https://img.daisyui.com/images/profile/demo/3@94.webp" />
                </div>
                <div class="list-col-grow">
                    <div>Sabrino Gardener</div>
                    <div class="text-xs uppercase font-semibold opacity-60">Cappuccino</div>
                </div>
                <button class="btn btn-square btn-ghost">
                    <svg class="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g stroke-linejoin="round" stroke-linecap="round" stroke-width="2" fill="none"
                            stroke="currentColor">
                            <path d="M6 3L20 12 6 21 6 3z"></path>
                        </g>
                    </svg>
                </button>
            </li> -->

        </ul>

        <form class="flex items-center justify-center not-prose mt-4">
            <fieldset class="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box gap-4">
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
                <button class="btn btn-primary" type="submit">Añadir</button>
            </fieldset>

        </form>



        <div>
            <ButtonMarcarTerminado :id="id" />
            <ButtonMarcarEntregado :id="id" />
        </div>
    </main>
</template>