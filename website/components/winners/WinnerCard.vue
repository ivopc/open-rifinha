<template>
    <div class="w-full flex rounded-xl bg-white rounded overflow-hidden shadow-lg mb-1 p-1.5 relative winner-card">
        <img class="rounded-full h-16 object-cover w-16" :src="prizeImageURL" :alt="prizeName" :title="prizeName">
        <div class="flex justify-end w-full absolute top-1 right-1">
            <p class="text-[13px] text-slate-400">Cota</p>
            <span class="rounded-md font-semibold text-green-600 px-1.5 text-[13px]">{{ ticket }}</span>
        </div>
        <div class="flex flex-col w-full px-2 justify-center">
            <div>{{ winnerName }}</div>
            <div class="text-gray-500 text-sm">Ganhou <span class="font-semibold">{{ prizeName }}</span></div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    defineProps({
        ticket: Number,
        winnerName: String,
        prizeName: String,
        prizeImageURL: String
    })
</script>
