<script setup lang="ts">
const container = useState<HTMLElement | null>(() => null)
const { height } = useWindowSize()
const { y: scrollY } = useScroll(container)

const card1Styles = computed(() =>
    ({ transform: `translateZ(${0 - Math.min((scrollY.value / height.value) * 100, 100)}px) rotateZ(${Math.min((scrollY.value / height.value) * 10, 2)}deg) rotateX(${Math.min((scrollY.value / height.value) * 20, 30)}deg)` })
)
const card1MockupStyle = computed(() => ({ transform: `translateZ(${0 - Math.min((scrollY.value / height.value) * 50, 60)}px)` }))
const card1TitleNPcStyle = computed(() => ({ transform: `translateZ(${Math.min((scrollY.value / height.value) * 50, 20)}px)` }))


const card2Styles = computed(() => {
    const start = height.value * 3.5// Empieza justo después de card1
    const end = height.value * 4 // Fin de la transición de entrada

    if (scrollY.value <= start) {
        return {
            transform: `translateZ(0px) rotateZ(0deg) rotateX(0deg)`
        }
    }

    const progress = Math.min((scrollY.value - start) / (end - start), 1)

    const translateZ = -progress * 100
    const rotateZ = progress * 2
    const rotateX = progress * 30

    return {
        transform: `translateZ(${translateZ}px) rotateZ(${rotateZ}deg) rotateX(${rotateX}deg)`
    }

}
)

const card2TitleNPcStyle = computed(() => {


    const start = height.value * 3.6// Empieza justo después de card1
    const end = height.value * 4 // Fin de la transición de entrada

    if (scrollY.value <= start) {
        return {
            transform: `translateZ(0px) rotateZ(0deg) rotateX(0deg)`
        }
    }

    const progress = Math.min((scrollY.value - start) / (end - start), 1)

    const translateZ = +progress * 100

    return {
        transform: `translateZ(${translateZ}px)`
    }
})
const rotatio = computed(() => {
    const start = height.value * 2
    const end = start + height.value * 2

    if (scrollY.value < start) return { transform: 'rotateZ(0deg)' }
    if (scrollY.value > end) return { transform: 'rotateZ(270deg)' }

    const progress = (scrollY.value - start) / (end - start)

    // easing tipo "snap" en pasos de 90°
    const steps = 3
    const p = progress * steps
    const base = Math.floor(p)
    const frac = p - base
    const eased = (frac < 0.5 ? 2 * frac * frac : -1 + (4 - 2 * frac) * frac)
    const angle = ((base + eased) / steps) * 270

    return { transform: `rotateZ(${angle}deg)` }
})

onMounted(() => {
    container.value = document.getElementById("main-container")
})
onUnmounted(() => {
    container.value = null
})
</script>

<template>
    <div class="sticky top-0 transform-3d transform-gpu perspective-distant p-10 mb-[100vh]" :style=card1Styles>
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
                <img src="/img/handyman.webp" alt="Técnico" class="absolute size-40 md:size-96 z-0 -translate-1 ">
                <img src="/img/pc.webp" alt="PC" class="translate-z-9 size-40 md:size-96" :style="card1TitleNPcStyle">
            </div>
        </div>
    </div>

    <div class="sticky top-0 pb-1 mb-[250vh] h-full w-full transform-3d transform-gpu perspective-distant"
        :style="card2Styles">
        <div class="mockup-window border bg-neutral/80 backdrop-blur-sm absolute inset-0">
        </div>
        <div class="relative h-full w-full overflow-clip transform-3d transform-gpu perspective-distant"
            :style="card2TitleNPcStyle">
            <h1 v-motion-pop-visible
                class="text-5xl md:text-6xl font-extrabold text-balance text-neutral-content pt-20 ps-10">Te
                ofrecemos</h1>

            <div class="absolute top-3/4 left-1/2 -translate-x-1/2 size-96 z-0 border rounded-full translate-z-5"
                :style="rotatio">

                <div v-motion-pop-visible
                    class="card image-full bg-base-100 size-60absolute bottom-full left-1/2 -translate-x-1/2 origin-center">

                    <figure>
                        <img src="/img/repair.webp" alt="Mantenimiento" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">Mantenimiento</h2>
                        <p>Sí crees que tu equipo esta lento o funciona mal, realizamos un mantenimiento preventivo
                            o correctivo para tu equipo.</p>
                    </div>

                </div>
                <div v-motion-pop-visible
                    class="card image-full bg-base-100 size-70 absolute top-1/2 right-full -translate-y-1/2 -rotate-90">
                    <figure class="text-secondary">

                        <img src="/img/files.webp" alt="Archivos" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">Recuperación de archivos</h2>
                        <p>Si borraste un archivo por error, ¡nosotros lo recuperamos!</p>
                    </div>
                </div>
                <div v-motion-pop-visible
                    class="card image-full bg-base-100 size-80 absolute top-full left-1/2 -translate-x-1/2 rotate-180">
                    <figure>
                        <img src="/img/hardware.webp" alt="Hardware" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">Actualización de hardware</h2>
                        <p>Sí necesitas reemplazar alguna pieza de tu equipo.</p>
                    </div>
                </div>
                <div v-motion-pop-visible
                    class="card image-full bg-base-100 size-84 absolute top-1/2 left-full -translate-y-1/2 -rotate-[270deg]">
                    <figure>
                        <img src="/img/software.webp" alt="Software" class="" />
                    </figure>
                    <div class="card-body">
                        <h2 class="card-title">Actualización e instalación de software</h2>
                        <p>Sí necesitas la paquetería de Office o similares.</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <!--     <div class="mockup-window border sticky top-0 bg-neutral/80 backdrop-blur-xs p-10 z-20 mb-[100vh] h-full">

        <div class="flex flex-col gap-4">
            <h1 v-motion-pop-visible :delay="200"
                class="text-4xl md:text-6xl lg:text-8xl font-extrabold text-neutral-content">Te
                ofrecemos:</h1>
            <div class="grid grid-cols-3 grid-rows-3 gap-4">
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
    </div> -->

</template>