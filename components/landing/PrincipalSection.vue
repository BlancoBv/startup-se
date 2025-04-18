<script setup lang="ts">
const container = useState<HTMLElement | null>(() => null)
const { height } = useWindowSize()
const { y } = useScroll(container)

const card1Styles = computed(() =>
    ({ transform: `translateZ(${0 - Math.min((y.value * 0.1), 50)}px) rotateZ(${Math.min((y.value * 10) / height.value, 2)}deg) rotateX(${Math.min((y.value * 20) / height.value, 30)}deg)` })
)

const card1MockupStyle = computed(() => ({ transform: `translateZ(${0 - Math.min((y.value * 0.1), 60)}px)` }))

watchEffect(() => {

    /*     if (card1Ref.value) {
            card1Ref.value.style.transform = `transform: translateZ(${y.value}px)`
    
        } */

    /*     card1Motion.transform.translateZ = 0 - Math.min(y.value * 0.1, 40)
        card1Motion.transform.rotateZ = Math.min((y.value * 5) / height.value, 1)
        card1Motion.style.backdropFilter = `blur(${y.value}px)` */


    /*     pcMotion.transform.translateZ = 0 - Math.min((y.value * 0.3), 200)
        handymanMotion.transform.translateZ = 0 - Math.min((y.value * 0.2), 200) */

})
onMounted(() => {
    container.value = document.getElementById("main-container")
})
onUnmounted(() => {
    container.value = null
})
</script>

<template>
    <!--     <div class=" hover:rotate-x-20 ease-in duration-500 transform-3d perspective-normal transform-gpu relative">
        <div class="mockup-window bg-primary border border-base-300 h-80">
        </div>
        <div class="absolute top-1/2 left-1/2 z-50 origin-center translate-z-10 drop-shadow-2xl">Hello!</div>
    </div> -->

    <div ref="card-1" class="sticky top-0 transform-3d transform-gpu perspective-distant py-10 mb-[100vh] h-full"
        :style=card1Styles>
        <div class="mockup-window border bg-primary/80 text-primary-content absolute inset-0" :style="card1MockupStyle">
        </div>
        <div
            class="grid grid-cols-1 md:grid-cols-2 place-items-center translate-z-5 h-full transform-3d perspective-normal transform-gpu">
            <div class="text-center">
                <h1 v-motion-pop-visible class="text-4xl md:text-6xl lg:text-8xl font-extrabold drop-shadow-sm/50"
                    :delay="200">
                    <span>Systems</span>
                    <br>
                    <span>Engineers</span>
                </h1>
                <br>
                <p v-motion-pop-visible :delay="400" class="lg:text-2xl text-balance">
                    Mantenimiento total, rendimiento óptimo para tu equipo de cómputo.
                </p>
            </div>
            <div class="relative size-60 md:size-96 transform-3d perspective-normal transform-gpu">
                <img src="/img/handyman.webp" alt="Técnico" class="absolute z-0">
                <img src="/img/pc.webp" alt="PC" class="abssolute inset-0 translate-z-9 ">
            </div>
        </div>
    </div>
    <!--         <div class=" sticky top-5 h-screen z-10 overflow-visible">

        </div> -->

    <!-- Slide 2 -->
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

</template>