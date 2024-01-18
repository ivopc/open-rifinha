<template>
    <section class="py-4">
      <div class="container px-10 mx-auto">
        <div v-if="buyerPurchases.length === 0" class="flex flex-col py-5" id="search-container">
          <div class="flex flex-col justify-center lg:items-center mb-6">
            <div class="text-gray-400 space-y-3">
              <h2 class="text-lg md:text-center font-semibold text-gray-500">
                🔎 Buscar Pedidos
              </h2>
              <p class="text-sm  md:text-center text-gray-500">
                Informe seu e-mail ou telefone para consultar informações sobre os seus pedidos.
              </p>
            </div>
          </div>
          <div class="hidden w-full max-w-lg gap-3 grid-cols-2 py-2 self-center">
            <button class="search-field-option p-1.5 text-sm rounded bg-white text-gray-500 shadow-md">
              E-mail
            </button>
            <button class="search-field-option p-1.5 text-sm rounded bg-white text-gray-500 shadow-md">
              Telefone
            </button>
          </div>
          <div>
            <div class="flex justify-center">
              <div class="flex items-center mb-6 mr-8">
                <input id="default-radio-1" value="email" type="radio" v-model="searchType" checked="checked" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="default-radio-1" class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-300">E-mail</label>
              </div>
              <div class="flex items-center mb-6 ml-8">
                <input id="default-radio-2" type="radio" v-model="searchType" value="phone" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="default-radio-2" class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-300">Celular</label>
              </div>
            </div>
            <form class="flex justify-center" @submit.prevent="search">
              <div class="flex flex-col justify-center w-full max-w-lg">
                <div>
                  <label for="search" id="search-label" class="block text-sm font-medium text-gray-500 my-2">Digite seu {{ searchType === SearchTypes.Email ? "e-mail" : "número de celular" }}</label>
                  <input id="search" :placeholder="searchType === SearchTypes.Email ? 'exemplo@gmail.com' : '(XX) 9 9999-9999'" v-model="searchInput" autocomplete="off" class="p-2 my-2 border border-gray-300 shadow-sm focus:outline-none focus:border-blue-800 focus:ring-blue-800 block w-full rounded-md sm:text-sm focus:ring-1" inputmode="email">
                </div>
                <span>
                </span>
                <button class="bg-blue-800 my-2 h-10 p-2 rounded-md text-white" :disabled="searchInput == ''">Procurar</button>
              </div>
            </form>
            <div class="text-sm font-bold text-red-500 text-center" v-if="responseError">Nenhum pedido encontrado!</div>
          </div>
        </div>
        <div v-if="buyerPurchases.length > 0" class="flex flex-col py-5"  id="back-to-search-container">
          <div class="flex flex-col justify-center lg:items-center mb-6">
            <div class="text-gray-400 space-y-3">
              <a @click="backToSearch" class="flex gap-2 items-center" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                </svg>
                <span>Voltar</span>
              </a>
              <h2 class="text-lg md:text-center font-semibold text-gray-500">
                Seus Pedidos
              </h2>
              <p class="text-sm md:text-center text-gray-500">
                Resultados para busca:
                <span class="font-bold"> {{ searchInput }} </span>
              </p>
            </div>
          </div>
        </div>
        <div v-if="buyerPurchases.length > 0" class="flex w-full grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-2 px-1"  id="purchases-container">
          <div v-for="(purchase, index) in buyerPurchases" :key="index">
            <PurchaseBasicCard
              :id="purchase.purchase_id"
              :title="purchase.title"
              :status="purchase.already_paid"
              :ticketsAmount="purchase.ticket_amount"
              :image="purchase.image"
              :totalPrice="purchase.price_value"
            />
          </div>
        </div>
      </div>
    </section>
</template>
  
<script lang="ts" setup>
  import { fetchAllBuyerPurchases } from '~/services/purchase';
  import { IBuyerPurchases } from '~/interface-types';
  import PurchaseBasicCard from '~/components/purchases/PurchaseBasicCard.vue';
  definePageMeta({
    layout: "default"
  });
  enum SearchTypes {
    Email = "email",
    Phone = "phone"
  };
  const searchType: Ref<SearchTypes> = ref(SearchTypes.Email);
  const searchInput: Ref<string> = ref("");
  const responseError: Ref<boolean> = ref(false);
  const buyerPurchases: Ref<IBuyerPurchases[]> = ref([]);
  async function search () {
      try {
          const purchases = await fetchAllBuyerPurchases({
              [searchType.value === SearchTypes.Email ? SearchTypes.Email : SearchTypes.Phone]: searchInput.value 
          });
          if (purchases.length === 0) {
              responseError.value = true;
              return;
          };
          buyerPurchases.value = purchases;
      } catch (err) {
          responseError.value = true;
      }
  };
  function backToSearch () {
    buyerPurchases.value = [];
    searchInput.value = "";
    searchType.value = SearchTypes.Email;
  };
</script>