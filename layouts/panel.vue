<script setup lang="ts">
const { user, logout } = useAuth()
</script>

<template>
    <NuxtLoadingIndicator />
    <div class="drawer lg:drawer-open">
        <input id="drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col">
            <div class="navbar bg-base-300 w-full print:hidden">
                <div class="flex-none lg:hidden">
                    <label for="drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            class="inline-block h-6 w-6 stroke-current">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </label>
                </div>
                <div class="mx-2 flex-1 px-2">Panel de administracion {{ user }}</div>


                <!-- <div class="hidden flex-none lg:block">
                    <ul class="menu menu-horizontal">
                        <li><a>Horarios</a></li>
                    </ul>
                </div> -->
            </div>
            <!-- Page content here -->
            <slot />
        </div>
        <div class="drawer-side">
            <label for="drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu bg-base-200 min-h-full w-80 p-4">
                <!-- Sidebar content here -->
                <li>
                    <NuxtLink to="/panel" active-class="menu-active">Inicio</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/panel/cola-mantenimiento" active-class="menu-active">Cola de mantenimiento</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/panel/registrar-equipo" active-class="menu-active">Registrar equipo</NuxtLink>
                </li>
                <li>
                    <button class="btn btn-error" @click="logout">Cerrar sesion</button>
                </li>

            </ul>
        </div>
    </div>
</template>