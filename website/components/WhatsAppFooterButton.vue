<template>
    <div class="transition-all duration-100 ease-in-out  hover:-translate-y-1 hover:scale-110 fixed right-5 bottom-5 bg-white rounded-3xl p-2 shadow-lg shadow-black/50">
      <a class="cursor-pointer text-gray-900 text-sm font-medium" :href="whats" target="_blank">
      <div class="flex items-center justify-center rounded-full">
        <div class="mr-2">
          FALE CONOSCO
        </div>
        <img src="/img/whatsapp.svg" width="30" alt="">
      </div>
      </a>
    </div>
</template>

<script setup lang="ts">
import { fetchConfig } from "~/services/config";
  const whats: Ref<string> = ref("");
  fetchConfig().then(({ whatsapp }) => whats.value = whatsapp);
</script>