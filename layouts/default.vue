<template>
    <NuxtLoadingIndicator />
    <div class="drawer">
        <input id="drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content w-screen h-screen">
            <div class="navbar h-16 bg-base-300 w-full">
                <div class="flex-none lg:hidden">
                    <label for="drawer" aria-label="open sidebar" class="btn btn-square btn-ghost">
                        <Icon name="mdi:menu" size="2em" />
                    </label>
                </div>
                <div class="mx-2 flex-1 px-2">
                    <NuxtLink class="btn btn-ghost" to="/">
                        Systems Engineers
                    </NuxtLink>
                </div>
                <div class="hidden flex-none lg:block">
                    <ul class="menu menu-horizontal">
                        <li>
                            <NuxtLink to="/prueba" active-class="menu-active">Prueba</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/estatus-equipo" active-class="menu-active">Consultar estatus
                            </NuxtLink>

                        </li>
                        <li>
                            <NuxtLink to="/login" active-class="menu-active">Iniciar sesión</NuxtLink>
                        </li>

                    </ul>
                </div>
            </div>
            <main class="h-[calc(100vh-64px)] overflow-y-auto">
                <slot />
            </main>

        </div>
        <div class="drawer-side z-50">
            <label for="drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu bg-base-200 min-h-full w-80 p-4">
                <!-- Sidebar content here -->
                <li>
                    <!-- <NuxtLink to="/horarios">Horarios</NuxtLink> -->
                    <NuxtLink to="/login" active-class="menu-active">Iniciar sesión</NuxtLink>
                    <NuxtLink to="/estatus-equipo" active-class="menu-active">Consultar estatus</NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>