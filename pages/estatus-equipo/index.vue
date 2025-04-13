<!-- <script setup lang="ts">
const uuidLength = [8, 4, 4, 4, 12]
const completeUUID = ref<string>("")

const handleInput = (ev: Event, fieldIndex: number) => {

    const length = uuidLength[fieldIndex]
    const value = completeUUID.value.slice(0, length + 1)

    completeUUID.value = ev.target.value

    console.log({ value, length });

    if (value.length === length) {
        nextTick();
        ev.target?.nextSibling.focus()
    }
}
const getValue = (fieldIndex: number) => (

    completeUUID.value.slice(0, 8 + 1)
)
</script>

<template>
    <div class="hero min-h-screen">
        <div class="hero-content flex-col lg:flex-row-reverse">
            <div class="text-center lg:text-left">
                <h1 class="text-5xl font-bold">Consultar estatus</h1>
                <p class="py-6">
                    Para continuar ingresa el folio proporcionado a tu correo electronico. Dicho folio consta de 36
                    caracteres, por ejemplo: <span class="italic text-info ">73644905-b6f5-43cf-9b69-2d13135b6f99</span>
                </p>
            </div>
            <div class="card bg-base-200 w-full max-w-sm shrink-0 shadow-2xl">
                <div class="card-body">
                    <fieldset class="fieldset">

                        <input class="input" type="text" @input="handleInput($event, 0)" minlength="1" maxlength="8"
                            :value="getValue(0)">
                        <input class="input" type="text" @input="">
                        <button class="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
</template>
 -->
<!-- <script setup lang="ts">
const sectionLengths = [8, 4, 4, 4, 12];
const uuidParts = ref<string[]>(Array(sectionLengths.length).fill(''));
const inputRefs = ref<HTMLInputElement[]>([]);

const fullUUID = computed(() =>
    uuidParts.value.map((part, i) => (i < sectionLengths.length - 1 ? part + '-' : part)).join('').slice(0, 36)
);

const { data, execute } = useFetch(`/api/cola-mantenimiento/${fullUUID.value}`, { immediate: false, watch: false })



function autoMove(index: number, maxLength: number) {
    if (uuidParts.value[index].length === maxLength && index < sectionLengths.length - 1) {
        nextTick(() => {
            inputRefs.value[index + 1]?.focus();
        });
    }
}


</script>
<template>
    {{ data }}
    <div class="max-w-xl mx-auto p-6 rounded-xl shadow space-y-6">
        <h2 class="text-2xl font-bold">Ingresar UUID</h2>
        {{ uuidParts }}

        <form @submit.prevent="execute()" class="fieldset">
            <div class="flex flex-wrap gap-2">
                <input v-for="(len, i) in sectionLengths" :key="i" v-model="uuidParts[i]" :maxlength="len"
                    :placeholder="`${len} hex`" class="input" :style="{ width: `${len * 10 + 20}px` }"
                    @input="autoMove(i, len)" :ref="(el) => { inputRefs[i] = (el as HTMLInputElement) }" />
            </div>

            <p class="text-sm text-gray-500">UUID completo: {{ fullUUID }}</p>

            <button type="submit"
                class="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
                Enviar UUID
            </button>
        </form>
    </div>
</template> -->

<script setup lang="ts">
const UUID_SECTION_LENGTH = [8, 4, 4, 4, 12]
const UUID_REFS = ref<HTMLInputElement[]>([])
const UUID = useState(() => ["", "", "", "", ""])

const fullUUID = computed(() => UUID.value.join("-"))

const { data, execute, status } = useFetch(`/api/cola-mantenimiento/${fullUUID.value}`, { immediate: false, watch: false })


const handleInput = (ev: Event, index: number) => {
    const length = UUID_SECTION_LENGTH[index]
    const currentLength = UUID.value[index].length

    if (currentLength === length && index < UUID_REFS.value.length - 1) {
        UUID_REFS.value[index + 1].focus?.()
    }

}
</script>
<template>

    <div class="hero bg-base-200 min-h-screen">
        <div class="hero-content flex-col lg:flex-row-reverse">
            <div class="text-center lg:text-left">
                <h1 class="text-5xl font-bold">Consulta de estatus</h1>
                <p class="py-6">
                    Escribe el folio que se te fue proporcionado en el correo electronico, dicho folio consta de 36
                    caracteres, como el ejemplo siguiente:
                </p>
                <div class="mockup-code w-min">
                    <pre><code>73644905-b6f1-43cf-9b69-2d13135b6f99</code></pre>
                </div>
            </div>
            <div class="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <form class="card-body">
                    <fieldset class="fieldset w-xs">
                        <template v-for="(len, index) in UUID_SECTION_LENGTH">
                            <label class="floating-label">
                                <span>{{ len }} caracteres</span>
                                <input v-model="UUID[index]" type="text"
                                    :ref="el => { UUID_REFS[index] = (el as HTMLInputElement) }" class="input validator"
                                    :minlength="len" :maxlength="len" @input="ev => handleInput(ev, index)"
                                    :placeholder="`${len} caracteres`" pattern="^[0-9a-fA-F]+$" required>
                                <p class="validator-hint">
                                    Ingresar {{ len }} caracteres (0-9, a-f).
                                </p>
                            </label>
                        </template>
                        <Button btn-type="submit" class-name="btn-primary" :is-pending="status === 'pending'">
                            <Icon name="mdi:search" size="2em" />
                            Buscar
                        </Button>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
    <main>

    </main>


</template>