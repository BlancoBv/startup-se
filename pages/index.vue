<script setup lang="ts">
/* const container = ref<HTMLElement | null>(null)
const card1 = useTemplateRef("card-1")

const { x, y } = useWindowScroll()

const cardIns = useMotionProperties(card1)

watchEffect(() => {
    cardIns.transform.rotate = Math.min(Math.max((y.value - 0) / 300, 0), 1)
    cardIns.transform.scale = Math.min(Math.max((y.value - 0) / 300, 0), 1)
})
onMounted(() => {
    container.value = document.getElementById("main-container")
}) */
</script>

<template>
    <div ref="container" class="relative p-10 overflow-clip">
        <div ref="card-1" v-motion :initial="{
            opacity: 0, rotateZ: 0, transition: {
                type: 'spring',
                stiffness: 250,
                damping: 25,
                mass: 0.5,
                delay: 200
            }
        }" :visible="{
            opacity: 1, rotateZ: 0.4, transition: {
                type: 'spring',
                stiffness: 250,
                damping: 25,
                mass: 0.5,
                delay: 200
            }
        }" class="sticky top-5 h-screen bg-primary text-primary-content p-10 z-10 snap-start">
            <div class="flex flex-col gap-4">
                <h1 v-motion-pop-visible class="text-6xl lg:text-8xl font-extrabold" :delay="200">Systems Engineers</h1>
                <p v-motion-pop-visible :delay="400" class="text-2xl">
                    Mantenimiento total, rendimiento óptimo para tu equipo de cómputo.
                </p>
            </div>
        </div>

        <!-- Slide 2 -->
        <div ref="card-2" v-motion :initial="{ opacity: 0, rotateZ: 0, x: 0 }" :visible="{
            opacity: 1, rotateZ: 0.8, x: 10,
            transition: {
                type: 'spring',
                stiffness: 250,
                damping: 25,
                mass: 0.5,
                delay: 200
            },
        }" class="sticky top-10 bg-secondary p-4 z-20 snap-start shadow-lg ">
            <div class="flex flex-col gap-4">
                <h1 v-motion-pop-visible :delay="200" class="text-6xl font-extrabold text-secondary-content">Te
                    ofrecemos:</h1>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div v-motion-pop-visible :delay="200" class="card bg-base-100 w-full shadow-sm">
                        <div class="card-body">
                            <h2 class="card-title">Mantenimiento</h2>
                            <p>Sí crees que tu equipo esta lento o funciona mal, realizamos un mantenimiento preventivo
                                o correctivo para tu equipo.</p>
                        </div>
                        <figure>
                            <img src="/img/repair.webp" alt="Mantenimiento" />
                        </figure>
                    </div>
                    <div v-motion-pop-visible :delay="300" class="card bg-base-100 w-full shadow-sm">
                        <div class="card-body">
                            <h2 class="card-title">Recuperación de archivos</h2>
                            <p>Si borraste un archivo por error, ¡nosotros lo recuperamos!</p>
                        </div>
                        <figure class="text-secondary">

                            <img src="/img/files.webp" alt="Archivos" />
                        </figure>
                    </div>
                    <div v-motion-pop-visible :delay="400" class="card bg-base-100 w-full shadow-sm">
                        <div class="card-body">
                            <h2 class="card-title">Actualización de hardware</h2>
                            <p>Sí necesitas reemplazar alguna pieza de tu equipo.</p>
                        </div>
                        <figure>
                            <img src="/img/hardware.webp" alt="Hardware" />

                        </figure>
                    </div>
                    <div v-motion-pop-visible :delay="500" class="card bg-base-100 w-full shadow-sm">
                        <div class="card-body">
                            <h2 class="card-title">Actualización e instalación de software</h2>
                            <p>Sí necesitas la paquetería de Office o similares.</p>
                        </div>
                        <figure>
                            <img src="/img/software.webp" alt="Software" class="" />
                        </figure>
                    </div>
                </div>
            </div>
        </div>

        <!-- Slide 3 -->
        <!--         <div v-motion :initial="{
            opacity: 0, rotateZ: 0, transition: {
                type: 'spring',
                stiffness: 250,
                damping: 25,
                mass: 0.5,
                delay: 200
            }
        }" :visible="{
            opacity: 1, rotateZ: 1.6, transition: {
                type: 'spring',
                stiffness: 250,
                damping: 25,
                mass: 0.5,
                delay: 200
            }
        }" class="sticky top-60 h-[2000px] bg-neutral text-white p-4 z-30 snap-start">
            <h1 class="text-3xl font-bold">Slide 3</h1>
            <p>Last section stacked on top</p>
        </div>
        <div class="h-[500px]">


        </div> -->
    </div>
    <div class="relative h-[2000px] bg-neutral text-white p-4 z-30 flex flex-col gap-4">

        <h1 class="text-6xl font-extrabold sticky top-0 snap-start" v-motion-slide-visible-left :delay="200">
            Contactanos
        </h1>
        <div class="grid grid-cols-2 gap-4">

        </div>

    </div>

</template>
