<template>
    <div class="flex justify-center items-center h-screen">
        <div class="f-90-card mt-6 block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <form @submit.prevent="saveData">
                <div class="grid grid-cols-2 gap-4">
                <div class="bg-white p-4 shadow-md text-center">
                    Página do facebook
                    <div class="relative mb-3" data-te-input-wrapper-init>
                    <input
                        v-model="facebook"
                        type="text"
                        class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput1"
                        placeholder="Link da página do facebook" />
                    </div>
                </div>
                <div class="bg-white p-4 shadow-md text-center">
                    Perfil no Instagram
                    <div class="relative mb-3" data-te-input-wrapper-init>
                    <input
                        v-model="instagram"
                        type="text"
                        class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput1"
                        placeholder="Link do perfil do Instagram" />
                    </div>
                </div>
                <div class="bg-white p-4 shadow-md text-center">
                    Contato no Telegram
                    <div class="relative mb-3" data-te-input-wrapper-init>
                    <input
                    v-model="telegram"
                        type="text"
                        class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput1"
                        placeholder="Link do perfil do Telegram" />
                    </div>
                </div>
                <div class="bg-white p-4 shadow-md text-center">
                    Contato no WhatsApp
                    <div class="relative mb-3" data-te-input-wrapper-init>
                    <input
                        v-model="whatsapp"
                        type="text"
                        class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlInput1"
                        placeholder="Link do grupo do WhatsApp" />

                    </div>
                </div>
                </div>
                <div class="mt-4 flex justify-center items-center">
                <button
                type="submit"
                class="inline-block rounded bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                value=""
                >Salvar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: "dashboard"
    });

    import { fetchConfig, saveConfig, fetchLayout } from "~/services/config";

    const facebook: Ref<string> = ref("");
    const instagram: Ref<string> = ref("");
    const telegram: Ref<string> = ref("");
    const whatsapp: Ref<string> = ref("");

    onMounted(() => {
        const { $initTE, $Input: Input } = useNuxtApp();
        $initTE({ Input }, { allowReinits: true });
    });

    fetchLayout().then(console.log);

    fetchConfig().then(data => {
        facebook.value = data.facebook;
        instagram.value = data.instagram;
        telegram.value = data.telegram;
        whatsapp.value = data.whatsapp;
    });

    async function saveData () {
        const data = {};
        [
            ["facebook", facebook], 
            ["instagram", instagram], 
            ["telegram", telegram], 
            ["whatsapp", whatsapp]
        ].forEach(([ name, field ]) => data[name] = field.value);
        await saveConfig(data);
    };
</script>

<style scoped>
 .f-90-card {
  width: 90%;
 }

</style>