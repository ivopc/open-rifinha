<template>
  <div class="max-w-5xl mx-auto flex flex-col">
    <div class="flex flex-col">
      <div class="grid grid-cols-1 md:grid-cols-2 md:px-4 md:pt-8">
        <div class="rounded-lg m-4 md:m-0 md:bg-transparent">
          <div class="slider-pro sp-horizontal" id="my-slider" style="width: 100%; max-width: 500px;">

            <div class="sp-slides-container">
              <div class="sp-mask" style="width: 496px; height: 496px;">
                <div class="sp-slides">
                  <div class="sp-slide sp-selected" data-init="true" data-index="0" style="width: 496px; height: 496px; left: 0px;">
                    <div class="sp-image-container" style="width: 496px; height: 496px;"><img :src="`${useStrapiMedia()}${image}`" class="lg:rounded-t-lg rounded-t-lg sm:rounded-t-lg md:rounded-b-lg lg:rounded-b-lg md:rounded-t-lg w-full sp-image" style="width: 100%; height: auto; margin-left: 0px; margin-top: 0px;"></div>

                  </div>
                </div>
              </div>
              <div class="sp-arrows sp-fade-arrows">
                <div class="sp-arrow sp-previous-arrow"></div>
                <div class="sp-arrow sp-next-arrow"></div>
              </div>
            </div>
          </div>
          <div class="md:hidden rounded-b-md bg-white text-gray-600 w-auto ">
            <h3 class="px-2 pt-2 pb-2 text-gray-600 font-semibold text-md mx-1 mb-2">
              {{ prize.title }}
            </h3>
          </div>
          <div class="md:hidden">
            <h3 class="text-red-500"></h3>
          </div>
        </div>
        <div class="md:pl-4">
          <div>
            <div class="hidden md:block">
              <h3 class="px-2 pt-2 text-gray-600 font-semibold text-lg mx-1 break-words">{{ prize.title }}</h3>
              <h3 class="text-red-500 px-2 pt-2"></h3>
            </div>
            <p class="text-sm text-gray-600 px-4 mx-2 text-center">POR APENAS <span class="bg-lime-700 text-white p-1 rounded-md">
                {{ displayPriceValue || "0,00" }}
              </span>
            </p>
            <p class="px-4 m-2 text-sm text-gray-500 text-center">{{ prize.title }}
              <span class="font-semibold">
                12/07/2023 às 20:00
              </span>
            </p>
          </div>
          <div class=" bg-white mt-3 overflow-y-auto text-clip break-words text-sm mx-4 p-2 rounded-lg shadow-md max-h-[150px] md:max-h-[300px]">
            <p>{{ prize.desc }}</p>
            <p><br></p>
          </div>
          <div class="p-4 mb-1">
            <a href="/pedidos" class="inline-flex items-center justify-center text-white p-2 rounded w-full bg-indigo-600 font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mx-2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"></path>
              </svg>
              Ver meus números
            </a>
          </div>
          <div class="py-2">
            <h1 class="text-xl text-gray-600 font-semibold mx-4">🔥 Promoção</h1>
            <p class="mx-4 text-sm text-gray-400">Aproveite o desconto!</p>
          </div>
          <div class="bg-white unselectable mx-4 shadow-md p-4 mb-4 rounded-lg flex justify-center items-center flex-wrap">
            <div class="flex flex-wrap -mx-3 overflow-hidden xl:-mx-2">
              <div class="mb-2 w-1/2 overflow-hidden promotion pointer" data-amount="100" data-value="4">
                <div class="mx-1 p-1 rounded-lg border border-green-600 text-[13px] text-black text-center pointer pointer-events-none options">
                  100 cotas - R$4,00
                </div>
              </div>
              <div class="mb-2 w-1/2 overflow-hidden promotion pointer" data-amount="200" data-value="8">
                <div class="mx-1 p-1 rounded-lg border border-green-600 text-[13px] text-black text-center pointer pointer-events-none options">
                  200 cotas - R$8,00
                </div>
              </div>
              <div class="mb-2 w-1/2 overflow-hidden promotion pointer" data-amount="300" data-value="12">
                <div class="mx-1 p-1 rounded-lg border border-green-600 text-[13px] text-black text-center pointer pointer-events-none options">
                  300 cotas - R$12,00
                </div>
              </div>
              <div class="mb-2 w-1/2 overflow-hidden promotion pointer" data-amount="400" data-value="16">
                <div class="mx-1 p-1 rounded-lg border border-green-600 text-[13px] text-black text-center pointer pointer-events-none options">
                  400 cotas - R$16,00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="py-2 lg:mt-5">
        <h1 class="text-xl text-gray-600 font-semibold mx-4">🍀 Cotas</h1>
        <p class="mx-4 text-sm text-gray-400">Escolha sua quantidade de chances de ganhar</p>
      </div>
      <div class="flex flex-col mx-4 rounded-lg text-center bg-white shadow-lg p-4">
        <div class="flex flex-col">
          <span class="mb-2 text-gray-400 text-sm">Digite ou selecione a quantidade de números</span>
          <p id="random-description" class="text-black">{{ ticketAmount }}x &nbsp;{{ displayPriceValue }} = <strong>{{ finalPayment }}</strong></p>
          <p id="random-message-validation"></p>
          <div class="flex flex-col items-center border-green-50 justify-between">
            <div class="flex items-center w-full my-2">
              <div id="less-random-option" @click="subtractOneTicket" class="cursor-pointer flex justify-center items-center ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-gray-600">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div class="w-full mx-2">
                <label>
                  <input id="ticket_amount_input" min="1" v-model="ticketAmount" placeholder="1" class="p-1 w-full text-center rounded-lg bg-gray-100 text-dark border-1 border-gray-400 font-bold focus:outline-none focus:border-lime-700 focus:ring-lime-700 only-number-input" type="number">
                </label>
              </div>
              <div id="plus-random-option" @click="addOneTicket" class="cursor-pointer flex justify-center items-center ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7 text-gray-600">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-2 overflow-hidden p-3">
            <div @click="addTicketsAmount(5)" class="random-option p-1 shadow-lg cursor-pointer rounded-lg bg-gray-100 border-gray-200 text-dark border-1 border-solid select-none">
              <div class="pointer-events-none rounded flex flex-col justify-center py-2">
                <span class="pointer-events-none text-lg">
                  + 05
                </span>
                <span class="uppercase text-sm pointer-events-none w-full rounded">Adicionar</span>
              </div>
            </div>
            <div @click="addTicketsAmount(15)" class="random-option p-1 shadow-lg cursor-pointer rounded-lg bg-gray-100 border-gray-200 text-dark border-1 border-solid select-none">
              <div class="pointer-events-none rounded flex flex-col justify-center py-2">
                <span class="pointer-events-none text-lg">
                  + 15
                </span>
                <span class="uppercase text-sm pointer-events-none w-full rounded">Adicionar</span>
              </div>
            </div>
            <div @click="addTicketsAmount(50)" class="random-option p-1 shadow-lg cursor-pointer rounded-lg bg-gray-100 border-gray-200 text-dark border-1 border-solid select-none">
              <div class="pointer-events-none rounded flex flex-col justify-center py-2">
                <span class="pointer-events-none text-lg">
                  + 50
                </span>
                <span class="uppercase text-sm pointer-events-none w-full rounded">Adicionar</span>
              </div>
            </div>
            <div @click="addTicketsAmount(100)" class="random-option p-1 shadow-lg cursor-pointer rounded-lg bg-gray-100 border-gray-200 text-dark border-1 border-solid select-none">
              <div class="pointer-events-none rounded flex flex-col justify-center py-2">
                <span class="pointer-events-none text-lg">
                  + 100
                </span>
                <span class="uppercase text-sm pointer-events-none w-full rounded">Adicionar</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-center border-green-50 justify-between pt-3">
          <button id="purchase-btn" class="py-2 text-white px-3 rounded w-full bg-green-600 font-medium" type="submit" data-te-toggle="modal" data-te-target="#buyModal" data-te-ripple-init data-te-ripple-color="light">
            Prosseguir
          </button>
            <BuyModal :ticketAmount="ticketAmount" :prizeId="prizeId" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { fetchPrizeToSorteiosPage } from "~/services/prizes";
  import { type IPrizeToSorteios } from "~/interface-types";
  import BuyModal from "~/components/prizes/BuyModal.vue";

  const ticketAmount: Ref<number> = ref(0);
  const prizeId: Ref<string> = ref(useRoute().params.id);
  const prize: Ref<IPrizeToSorteios> = ref({});
  const image: Ref<string> = ref(""); 

  function addOneTicket () {
    //if (ticketAmount.value + 1 > prize.value.maxTicketsPerPurchase) return;
    ticketAmount.value++;
  };

  function subtractOneTicket () {
    //if (ticketAmount.value - 1 < prize.value.minTicketsPerPurchase) return;
    ticketAmount.value--;
  };

  function addTicketsAmount (amount: number) {
    /*if (ticketAmount.value + Number(amount) > prize.value.maxTicketsPerPurchase){
      ticketAmount.value = prize.value.maxTicketsPerPurchase;
      return;
    };*/
    ticketAmount.value += Number(amount);
  };


  watch(ticketAmount, (value, oldValue) => {
    if (value > prize.value.maxTicketsPerPurchase) {
      ticketAmount.value = prize.value.maxTicketsPerPurchase;
    };
    if (value < prize.value.minTicketsPerPurchase) {
      ticketAmount.value = prize.value.minTicketsPerPurchase;
    };
  });
  
  fetchPrizeToSorteiosPage(prizeId.value).then(data => {
    
    prize.value = data;
    image.value = data.images[0].url;

    console.log("ivo123", prize.value.images, data);
    
    
    ticketAmount.value = data.minTicketsPerPurchase;
  });

  const finalPayment = computed(() => ((ticketAmount?.value || 0) * (prize?.value?.price || 0)).toLocaleString("pt-BR", { 
    minimumFractionDigits: 2, 
    style: "currency", 
    currency: "BRL"
  }));

  const displayPriceValue = computed(() => (prize?.value?.price || 0).toLocaleString("pt-BR", {
    minimumFractionDigits: 2, 
    style: "currency", 
    currency: "BRL"
  }));

</script>

<style scoped>
  .max-w-5xl {
      max-width: 64rem;
  }
</style>