<script lang="ts" setup>
  definePageMeta({
    layout: "dashboard",
  });

  import { fetchLayout, saveConfig } from "~/services/config";

  /*const colors = [
    "slate", "gray", "zinc", "neutral", "stone", "red","orange", "amber", "yellow", "lime", "green", "emerald", "teal", "cyan",
    "sky", "blue", "indigo", "violeta", "purple", "fuchsia", "pink", "rose"
  ];*/

  const colorInput: Ref<string> = ref("");

  const colors = ["primary", "secondary", "success", "danger", "warning", "info"];

  const tonalities = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"];


  const options: string[] = [];

  colors.forEach(color => {
    tonalities.forEach(tonality => {
      options.push(`bg-${color}-${tonality}`);
    }); 
  });

  async function changeTheme () {
    await saveConfig({
      theme: colorInput.value
    });
    theme.value = colorInput.value;
  };
  const theme: Ref<string> = ref("");
  fetchLayout().then(data => theme.value = data.theme);
</script>

<template>
  <div class="flex justify-center items-center h-screen">
    <div>
      Cor Atual: <div :class="`color-box ${theme}`"></div>
    </div>
    <div class="overflow-auto grid grid-cols-4 grid-rows-4 gap-4" id="colors-form">
      <form>
        <div v-for="(color, index) in options" :key="index" class="colors-input">
            <input
              class="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
              type="radio"
              name="theme"
              :value="color"
              :id="`radioDefault${index}`"
              v-model="colorInput" />
            <label
              class="mt-px pl-[0.15rem] hover:cursor-pointer"
              :for="`radioDefault${index}`">
              <div :class="`color-box ${color}`"></div>
            </label>
        </div>
      </form>
    <br>
    </div>
    <button
  class="rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
  @click="changeTheme"
  >
  Salvar tema
</button>
  </div>
</template>

<style scoped>
  .color-box {
    width: 32px;
    height: 32px;
  }

  #colors-form {
    width: 114px;
    height: 300px;
  }
  .colors-input {
    width: 64px;
    height: 10px;
    margin: 35px;
  }
</style>
