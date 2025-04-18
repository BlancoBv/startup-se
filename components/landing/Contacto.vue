<template>
    <div
        class="sticky top-0 bg-base-200 h-full p-10 z-30 grid grid-cols-1 lg:grid-cols-3 place-items-center gap-4 mb-[100vh]">

        <h1 class="text-6xl font-light text-center lg:text-left" v-motion-slide-visible-left :delay="200">
            <span>¿Necesitas ayuda?</span>
            <br>
            <span class="text-error">Contáctanos</span>
        </h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center col-span-2" v-motion-roll-visible-left>
            <div class="card bg-base-100 image-full max-w-96 h-60 shadow-sm group">
                <figure>
                    <img src="/img/bal.webp" class="object-cover w-full group-hover:scale-120 ease-in-out duration-150"
                        alt="Balancán" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title flex flex-col items-start">
                        <span class="text-sm font-normal">Sí te encuentras en</span>
                        <span class="text-3xl">
                            <Icon name="mdi:location" /> Balancán, Tabasco
                        </span>
                    </h2>
                    <!--                     <div class="flex items-center gap-4">
                <Icon name="mdi:phone" size="2em" />
                <span>934 110 2962</span>
            </div> -->
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
                        <span class="text-3xl">
                            <span>
                                <Icon name="mdi:location" /> Emiliano Zapata,
                            </span>
                            <br>
                            <span class="text-3xl">Tabasco</span>
                        </span>
                    </h2>
                    <!--                     <div class="flex items-center gap-4">
                <Icon name="mdi:phone" size="2em" />
                <span>934 112 6289</span>
            </div> -->
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
</template>