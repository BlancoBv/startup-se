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
    <div ref="container" class="prose max-w-full relative p-10 overflow-clip preserve-3d perspective-[1000px]">
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
        }"
            class="sticky top-5  h-[200vh] bg-primary text-primary-content p-4 z-10 snap-start transform-gpu preserve-3d">
            <h1 class="text-3xl font-bold">System engineers</h1>
            <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry's standard dummy text ever since the 1500s...
            </p>
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
        }" class="sticky top-30 h-[110vh] bg-secondary text-white p-4 z-20 snap-start shadow-lg ">
            <h1 class="text-3xl font-bold">Slide 2</h1>
            <p>More content here...</p>
        </div>

        <!-- Slide 3 -->
        <div v-motion :initial="{
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


        </div>
    </div>

</template>
