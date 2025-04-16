<script setup lang="ts">
const { height } = useWindowSize()
const { y } = useWindowScroll()
const pcRef = useTemplateRef("pc")
const handymanRef = useTemplateRef("handyman")
const card1Ref = useTemplateRef("card-1")
const pcMotion = useMotionProperties(pcRef)
const handymanMotion = useMotionProperties(handymanRef)
const card1Motion = useMotionProperties(card1Ref)

watchEffect(() => {
    card1Motion.transform.translateZ = 0 - Math.min(y.value * 0.1, 40)
    card1Motion.transform.rotateZ = Math.min((y.value * 5) / height.value, 1)


    pcMotion.transform.translateZ = 200 - Math.min((y.value * 0.3))
    /* Math.min(y.value / height.value, 0.1) */

})
</script>

<template>
    <div class="relative p-10 overflow-clip">
        <div
            class=" sticky top-5 h-screen z-10 snap-start transform-3d perspective-normal transform-gpu overflow-visible">
            <div v-motion ref="card-1" :initial="{
                opacity: 0, rotateZ: 0, scale: 1, transition: {
                    type: 'spring',
                    stiffness: 250,
                    damping: 25,
                    mass: 0.5,
                    delay: 200
                }
            }" :visible="{
                opacity: 1
            }" class="mockup-window border bg-base-200 p-10">
                <div class="grid grid-cols-1 md:grid-cols-2 place-content-start place-items-center">
                    <div>
                        <h1 v-motion-pop-visible class="text-4xl md:text-6xl lg:text-8xl font-extrabold" :delay="200">
                            <span>Systems</span>
                            <br>
                            <span>Engineers</span>
                        </h1>
                        <br>
                        <p v-motion-pop-visible :delay="400" class="lg:text-2xl">
                            Mantenimiento total, rendimiento óptimo para tu equipo de cómputo.
                        </p>
                    </div>
                    <div class="relative size-96 transform-3d perspective-normal transform-gpu">
                        <img v-motion ref="handyman" src="/img/handyman.webp" alt="Técnico" class="absolute">
                        <img v-motion ref="pc" src="/img/pc.webp" alt="PC" class="absolute ">
                    </div>
                </div>
            </div>
        </div>

        <!-- Slide 2 -->
        <div v-motion :initial="{ opacity: 0, rotateZ: 0, x: 0 }" :visible="{
            opacity: 1, rotateZ: 0.8, x: 10,
            transition: {
                type: 'spring',
                stiffness: 250,
                damping: 25,
                mass: 0.5,
                delay: 200
            },
        }" class="mockup-window border sticky top-10 bg-neutral p-4 z-20 snap-start">

            <div class="flex flex-col gap-4">
                <h1 v-motion-pop-visible :delay="200" class="text-6xl font-extrabold text-neutral-content">Te
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
    <div
        class="relative bg-base-200 h-[700px] lg:h-screen p-4 z-30 grid grid-cols-1 lg:grid-cols-2 place-items-center gap-4 overflow-clip">

        <h1 class="text-6xl font-light text-center lg:text-left" v-motion-slide-visible-left :delay="200">
            <span>¿Necesitas ayuda?</span>
            <br>
            <span class="text-error">Contáctanos</span>
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center" v-motion-roll-visible-left>
            <div class="card bg-base-100 image-full max-w-96 h-60 shadow-sm group">
                <figure>
                    <img src="/img/bal.webp" class="object-cover w-full group-hover:scale-120 ease-in-out duration-150"
                        alt="Balancán" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title flex flex-col items-start">
                        <span class="text-sm font-normal">Sí te encuentras en</span>
                        <span class="text-3xl flex items-center">
                            <Icon name="mdi:location" /> Balancán, Tabasco
                        </span>
                    </h2>
                    <div class="flex items-center gap-4">
                        <Icon name="mdi:phone" size="2em" />
                        <span>934 110 2962</span>
                    </div>
                    <div class="card-actions justify-end">
                        <a href="https://wa.link/uqxihg" target="_blank"
                            class="btn bg-green-600 text-white btn-circle btn-lg" title="Abrir WhatsApp">
                            <Icon name="mdi:whatsapp" size="2em" />
                        </a>
                        <a href="mailto:edwinquegonzales@gmail.com" target="_blank"
                            class="btn bg-white text-black btn-circle btn-lg" title="Enviar correo electronico">
                            <Icon name="mdi:email" size="2em" />
                        </a>
                    </div>
                </div>
            </div>
            <div class="card bg-base-100 image-full max-w-96 h-60 shadow-sm group" v-motion-roll-visible-right>
                <figure>
                    <img src="/img/zap.webp" class="object-cover w-full group-hover:scale-120 ease-in-out duration-150"
                        alt="Emiliano Zapata" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title flex flex-col items-start">
                        <span class="text-sm font-normal">Sí te encuentras en</span>
                        <span class="text-3xl flex items-center">
                            <Icon name="mdi:location" /> Emiliano Zapata,
                        </span>
                        <span class="text-3xl">Tabasco</span>
                    </h2>
                    <div class="flex items-center gap-4">
                        <Icon name="mdi:phone" size="2em" />
                        <span>934 112 6289</span>
                    </div>
                    <div class="card-actions justify-end">
                        <a href="https://wa.link/7uj1mf" target="_blank"
                            class="btn bg-green-600 text-white btn-circle btn-lg" title="Abrir WhatsApp">
                            <Icon name="mdi:whatsapp" size="2em" />
                        </a>
                        <a href="mailto:dehara14@gmail.com" target="_blank"
                            class="btn bg-white text-black btn-circle btn-lg" title="Enviar correo electronico">
                            <Icon name="mdi:email" size="2em" />
                        </a>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div class="hero bg-base-300 min-h-screen">
        <div class="hero-content text-center">
            <div class="max-w-md">
                <h1 class="text-7xl font-bold">¿Ya usaste nuestro servicio?</h1>
                <p class="py-6 md:text-2xl text-balance">
                    Recuerda que puedes consultar el estatus de tu equipo.
                </p>
                <NuxtLink to="/estatus-equipo" class="btn btn-primary">Consultar
                    <Icon name="mdi:arrow-right" size="2em" />
                </NuxtLink>
            </div>
        </div>
    </div>

</template>
