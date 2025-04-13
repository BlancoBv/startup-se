<script setup lang="ts">
const { user, logout } = useAuth()
</script>

<template>
    <NuxtLoadingIndicator />
    <div class="drawer lg:drawer-open">
        <input id="drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col">
            <div class="navbar bg-base-200 w-full print:hidden">
                <div class="flex-none lg:hidden">
                    <label for="drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
                        <Icon name="mdi:menu" size="2em" />
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
        <div class="drawer-side z-50">
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