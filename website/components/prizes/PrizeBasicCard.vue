<template>
    <NuxtLink :to="`/sorteios/${id}`">
        <div class="flex w-full rounded-xl bg-white rounded overflow-hidden mb-1 shadow-md hover:shadow-lg content-center relative">
            <img class="max-w-[120px] min-h-[120px] object-cover" style="height: 100px; width: 200px" :src="`${useStrapiMedia()}${image.url}`" alt="alternative image">
            <div class="flex flex-col w-full px-2 justify-center">
                <div class="text-black">{{ title }}</div>
                <div class="text-gray-500 text-sm">{{ subtitle }}</div>
            </div>
            <span :class="`rounded bg-${availability ? `green` : `red`}-600 px-1.5 text-[13px] bg-opacity-80 text-white absolute top-[10px] right-[6px]`">{{ availability ? "Adquira já!" : "Encerrado" }}</span>
        </div>
    </NuxtLink>
</template>

<script lang="ts" setup>
    import { type Image } from '~/interface-types';
    defineProps<{
        id: number,
        title: string,
        image: Image,
        subtitle: string,
        availability: boolean
    }>()
</script>