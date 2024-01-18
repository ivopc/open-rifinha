<template>
    <div class="w-full md:w-1/2 xl:w-1/3 p-3">
      <NuxtLink :to="`/sorteios/pagamento?id=${id}`">
        <div class="flex w-full rounded-xl bg-white rounded overflow-hidden mb-1 shadow-md hover:shadow-lg content-center relative">
          <img class="w-1/3 object-cover" :src="image" alt="Prêmio">
          <div class="flex flex-col w-2/3 p-3 justify-between">
            <div>
              <div class="text-black font-semibold">{{ title }}</div>
              <div class="text-gray-500 text-sm flex justify-between items-center">
                <p>Status:</p>
                <p :class="`${status ? 'text-green-500' : 'text-red-500'} font-semibold`">{{ status ? 'Aprovado' : 'Cancelado' }}</p>
              </div>
              <div class="text-gray-500 text-sm flex justify-between items-center">
                <p>Quantidade:</p>
                <p class="text-gray-500 font-semibold">{{ ticketsAmount }}</p>
              </div>
              <div class="text-gray-500 text-sm flex justify-between items-center">
                <p>Preço Total:</p>
                <p class="text-gray-500 font-semibold">{{ totalPrice?.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' }) }}</p>
              </div>
            </div>
            <div class="text-gray-500 text-sm mt-2">
              <p class="text-slate-100">Clique para ver mais detalhes</p>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </template>
  
  <script lang="ts" setup>
    defineProps({
      id: Number,
      title: String,
      status: Boolean,
      ticketsAmount: Number,
      image: String,
      totalPrice: Number,
    })
  </script>
  