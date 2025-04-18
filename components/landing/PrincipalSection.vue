<script setup lang="ts">
const container = useState<HTMLElement | null>(() => null)
const { height } = useWindowSize()
const { y: scrollY } = useScroll(container)

const card1Styles = computed(() =>
    ({ transform: `translateZ(${0 - Math.min((scrollY.value / height.value) * 100,)}px) rotateZ(${Math.min((scrollY.value / height.value) * 10, 2)}deg) rotateX(${Math.min((scrollY.value / height.value) * 20, 30)}deg)` })
)
const card1MockupStyle = computed(() => ({ transform: `translateZ(${0 - Math.min((scrollY.value / height.value) * 50, 60)}px)` }))
const card1TitleNPcStyle = computed(() => ({ transform: `translateZ(${Math.min((scrollY.value / height.value) * 50, 20)}px)` }))

onMounted(() => {
    container.value = document.getElementById("main-container")
})
onUnmounted(() => {
    container.value = null
})
</script>

<template>
    <div ref="card-1" class="sticky top-0 transform-3d transform-gpu perspective-distant py-10 mb-[100vh]"
        :style=card1Styles>
        <div class="mockup-window border bg-primary/80 text-primary-content absolute inset-0" :style="card1MockupStyle">
        </div>
        <div
            class="grid grid-cols-1 md:grid-cols-2 lg:place-items-center translate-z-5 h-full transform-3d perspective-normal transform-gpu">
            <div class="text-center transform-3d perspective-normal transform-gpu">
                <h1 v-motion-pop-visible class="text-4xl md:text-6xl lg:text-8xl font-extrabold drop-shadow-sm/50"
                    :style="card1TitleNPcStyle" :delay="200">
                    <span>Systems</span>
                    <br>
                    <span>Engineers</span>
                </h1>
                <br>
                <p v-motion-pop-visible :delay="400" class="lg:text-2xl text-balance">
                    Mantenimiento total, rendimiento óptimo para tu equipo de cómputo.
                </p>
            </div>
            <div class="relative transform-3d perspective-normal transform-gpu flex items-center justify-center">
                <img src="/img/handyman.webp" alt="Técnico" class="absolute z-0 -translate-1 inset-0">
                <img src="/img/pc.webp" alt="PC" class="translate-z-9 size-40 md:size-96" :style="card1TitleNPcStyle">
            </div>
        </div>
    </div>
    <div class="mockup-window border sticky top-0 bg-neutral/80 backdrop-blur-xs p-10 z-20 mb-[100vh] h-full">

        <div class="flex flex-col gap-4">
            <h1 v-motion-pop-visible :delay="200"
                class="text-4xl md:text-6xl lg:text-8xl font-extrabold text-neutral-content">Te
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

</template>