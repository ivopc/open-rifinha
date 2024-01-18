<script lang="ts" setup>
  definePageMeta({
    layout: "dashboard"
  });

  import { fetchPurchaseRanking } from "~/services/purchase";
  import { fetchPrizes } from "~/services/prizes";
  import { IPrize } from "~/interface-types";
  import { IPrizeFullDesc } from "~/interface-types";
  import { fetchPurchaseStatistics, fetchMostPurchased } from "~/services/purchase";

  const optionsController: Ref<string> = ref(1);
  const optionsList: Ref<IPrize[]> = ref([]);
  const prizeSearch: Ref<string> = ref("");
  const prizes: Ref<IPrizeFullDesc[]> = ref([]);
  let Datatable: any;
  async function listRank (id) {
    document.getElementById('datatable').innerHTML = "";
    const data = await fetchPurchaseRanking(id);
    const rows = data.map(client => ({
      name: client.full_name,
      phone: client.phone_number,
      ticketAmount: client.ticket_count,
      price: client.price_value.toLocaleString("pt-BR", { 
        minimumFractionDigits: 2, 
        style: "currency", 
        currency: "BRL"
      })
    }));
    const datatable = new Datatable(document.getElementById('datatable'), {
        columns: [
          {
            label: "Nome",
            field: "name", //
          },
          {
            label: "Telefone",
            field: "phone"
          },
          {
            label: "Quantidade de bilhetes",
            field: "ticketAmount"
          },
          {
            label: "Preço",
            field: "price" //
          }
        ],
        rows
    });
  };
  function filterToday (item): boolean {
    const { $dayjs: dayjs } = useNuxtApp();
    const checkIfIsToday = dayjs(+item.createdAt);
    return dayjs().date() === checkIfIsToday.date() && dayjs().month() === checkIfIsToday.month() && dayjs().year() === checkIfIsToday.year()
  };
  function filterMonth (item): boolean {
    const { $dayjs: dayjs } = useNuxtApp();
    const checkIfIsMonth = dayjs(+item.createdAt);
    return dayjs().month() === checkIfIsMonth.month() && dayjs().year() === checkIfIsMonth.year()
  };
  function filterWeek (item): boolean {
    const { $dayjs: dayjs } = useNuxtApp();
    const week = dayjs().week();
    return dayjs(+item.createdAt).week() === week;
  };
  function filterAlltime () {return true;};
  function mapBuyersPurchase (purchases: Array<any>, filter: Function) {
    return purchases
      .map(item => ({
        name: item.full_name,
        cellphone: item.phone_number,
        ticketsNum: item.ticket_amount,
        price: item.price_value,
        createdAt: item.created_at
      }))
      //.sort((a, b) => a.price - b.price)
      .filter(filter)
      .map(item => ({
        ... item,
        ... {
          price: item.price.toLocaleString("pt-BR", { 
          minimumFractionDigits: 2, 
          style: "currency", 
          currency: "BRL"
        })
        }
      }));
  };
  function createAllBuyersPurchaseDataTables (data) {
    [
      {
        element: "datatable-day",
        filter: filterToday
      },
      {
        element: "datatable-week",
        filter: filterWeek
      },
      {
        element: "datatable-month",
        filter: filterMonth
      },
      { 
        element: "datatable-all-time",
        filter: filterAlltime
      }
    ].forEach(({ element, filter }) => createBuyersPurchaseDataTable(data, filter, element));
  };
  function createBuyersPurchaseDataTable (data: any, filter: Function, elementId: string) {
    const rows = mapBuyersPurchase(data, filter);
    document.getElementById(elementId).innerHTML = "";
    new Datatable(document.getElementById(elementId), {
        columns: [
          {
            label: "Usuário",
            field: "name",
            sort: true
          },
          {
            label: "Telefone",
            field: "cellphone"
          },
          {
            label: "Bilhetes comprados",
            field: "ticketsNum"
          },
          {
            label: "Quanto gastou",
            field: "price" //
          }
     ], 
     rows
    });
  };
  function createMostPurchasedsDataTable (data: any, elementId: string) {
    new Datatable(document.getElementById(elementId), {
      columns: [
        {
          label: "Prêmio",
          field: "title"
        },
        {
          label: "Número de bilhetes vendidos",
          field: "ticket_count"
        },
        {
          label: "Faturamento",
          field: "invoicing"
        }
      ],
      rows: data.map(prize => ({ ... prize, ... { invoicing: (prize.price * prize.ticket_count).toLocaleString("pt-BR", { 
          minimumFractionDigits: 2, 
          style: "currency", 
          currency: "BRL"
        }) } }))
    })
  };

  onMounted(() => {
    const { $initTE, $Datatable, $Select: Select, $Tab: Tab } = useNuxtApp();
    Datatable = $Datatable;
    $initTE({ Datatable, Select, Tab }, { allowReinits: true });
  });

  watch(prizeSearch, value => fetchPurchaseStatistics(value).then(createAllBuyersPurchaseDataTables));
  watch(optionsController, listRank);

  fetchPrizes().then(data => {
    optionsList.value = data;
    prizes.value = data;
    listRank(data[0].id);
    fetchPurchaseStatistics(data[0].id).then(createAllBuyersPurchaseDataTables);
  });
  fetchMostPurchased().then(data => {
    createMostPurchasedsDataTable(data, "datatable-most-purchased")
  });
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <div class="f-90-card block rounded-lg p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div class="flex flex-col justify-center items-center mt-6">
        <span class="w-full text-3xl text-blue-900 text-center">Maiores compradores</span>
        <select class="text-neutral-800" v-model="optionsController" data-te-select-init data-te-select-placeholder="Pesquisar sorteio" data-te-select-filter="true">
          <option v-for="(item, index) in optionsList" :value="item.id" :key="index">{{ item.title }}</option>
        </select>
        <div id="datatable" class="text-neutral-800" data-te-max-height="520" data-te-max-width="520" data-te-fixed-header="true"></div>
      </div>
      <div class="flex flex-col justify-center items-center mt-6">
        <span class="w-full text-3xl text-blue-900 text-center">Maiores compras recentes</span>
        <select data-te-select-search-placeholder="Procurar nome do prêmio..." data-te-select-init data-te-select-filter="true" v-model="prizeSearch">
          <option v-for="(prize, index) in prizes" :value="prize.id" :key="index">
            {{ prize.title }}
          </option>
        </select>
        <ul class="mb-5 flex list-none flex-col flex-wrap pl-0 md:flex-row" id="pills-tab" role="tablist" data-te-nav-ref>
          <li role="presentation">
            <a href="#pills-home" class="my-2 block rounded bg-neutral-100 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 data-[te-nav-active]:!bg-primary-100 data-[te-nav-active]:text-primary-700 dark:bg-neutral-700 dark:text-white dark:data-[te-nav-active]:text-primary-700 md:mr-4" id="pills-home-tab" data-te-toggle="pill" data-te-target="#pills-home" data-te-nav-active role="tab" aria-controls="pills-home" aria-selected="true">Dia</a>
          </li>
          <li role="presentation">
            <a href="#pills-profile" class="my-2 block rounded bg-neutral-100 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 data-[te-nav-active]:!bg-primary-100 data-[te-nav-active]:text-primary-700 dark:bg-neutral-700 dark:text-white dark:data-[te-nav-active]:text-primary-700 md:mr-4" id="pills-profile-tab" data-te-toggle="pill" data-te-target="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Semana</a>
          </li>
          <li role="presentation">
            <a href="#pills-contact" class="my-2 block rounded bg-neutral-100 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 data-[te-nav-active]:!bg-primary-100 data-[te-nav-active]:text-primary-700 dark:bg-neutral-700 dark:text-white dark:data-[te-nav-active]:text-primary-700 md:mr-4" id="pills-contact-tab" data-te-toggle="pill" data-te-target="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Mês</a>
          </li>
          <li role="presentation">
            <a href="#pills-contact" class="my-2 block rounded bg-neutral-100 px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 data-[te-nav-active]:!bg-primary-100 data-[te-nav-active]:text-primary-700 dark:bg-neutral-700 dark:text-white dark:data-[te-nav-active]:text-primary-700 md:mr-4" id="pills-alltime-tab" data-te-toggle="pill" data-te-target="#pills-all-time" role="tab" aria-controls="pills-contact" aria-selected="false">Todos os tempos</a>
          </li>
        </ul>
      </div>
      <div class="flex flex-col justify-center items-center mt-6">
        <div class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" data-te-tab-active>
          <div id="datatable-day" class="text-neutral-700" data-te-max-height="520" data-te-max-width="520" data-te-fixed-header="true"></div>
        </div>
        <div class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
          <div id="datatable-week" class="text-neutral-700" data-te-max-height="520" data-te-max-width="520" data-te-fixed-header="true"></div>
        </div>
        <div class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
          <div id="datatable-month" class="text-neutral-700" data-te-max-height="520" data-te-max-width="520" data-te-fixed-header="true"></div>
        </div>
        <div class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block" id="pills-all-time" role="tabpanel" aria-labelledby="pills-all-time">
          <div id="datatable-all-time" class="text-neutral-700" data-te-max-height="520" data-te-max-width="520" data-te-fixed-header="true"></div>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center mt-6">
          <span class="w-full text-3xl text-blue-900 text-center">Bilhetes mais vendidos</span>
          <div class="flex justify-center items-center mt-6">
            <div id="datatable-most-purchased" class="text-neutral-700" data-te-max-height="520" data-te-max-width="520" data-te-fixed-header="true"></div>
          </div>
      </div>
    </div>
    <ul
  class="mb-5 flex list-none flex-row flex-wrap border-b-0 pl-0"
  role="tablist"
  data-te-nav-ref>
  <li role="presentation">
    <a
      href="#tabs-home"
      class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
      data-te-toggle="pill"
      data-te-target="#tabs-home"
      data-te-nav-active
      role="tab"
      aria-controls="tabs-home"
      aria-selected="true"
      >Usuários que mais compraram</a
    >
  </li>
  <li role="presentation">
    <a
      href="#tabs-profile"
      class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
      data-te-toggle="pill"
      data-te-target="#tabs-profile"
      role="tab"
      aria-controls="tabs-profile"
      aria-selected="false"
      >Maiores compras recentes</a
    >
  </li>
  <li role="presentation">
    <a
      href="#tabs-messages"
      class="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
      data-te-toggle="pill"
      data-te-target="#tabs-messages"
      role="tab"
      aria-controls="tabs-messages"
      aria-selected="false"
      >Bilhetes mais vendidos</a
    >
  </li>
</ul>

<!--Tabs content-->
<div class="mb-6">
  <div
    class="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
    id="tabs-home"
    role="tabpanel"
    aria-labelledby="tabs-home-tab"
    data-te-tab-active>
    Usuários que mais compraram
  </div>
  <div
    class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
    id="tabs-profile"
    role="tabpanel"
    aria-labelledby="tabs-profile-tab">
    Maiores compras recentes
  </div>
  <div
    class="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
    id="tabs-messages"
    role="tabpanel"
    aria-labelledby="tabs-profile-tab">
    Bilhetes mais vendidos
  </div>
</div>
  </div>
</template>

<style scoped>
 .f-90-card {
  width: 90%;
 }

</style>
