<template>
  <div id="main-requests-table" class="rounded-lg border h-screen">
    <div class="mb-3">
      <div class="relative mb-4 flex w-full flex-wrap items-stretch">
      <input
      v-model="search"
        id="datatable-search-input"
        type="search"
        class="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
        placeholder="Pesquisar"
        aria-label="Search"
        aria-describedby="button-addon1" />
      </div>
    </div>
    <div id="datatable" class="text-neutral-900" data-te-selectable="true" data-te-multi="true"></div>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
    layout: "dashboard"
  });

  import {
    fetchAllPurchases
  } from "~/services/purchase";

  import RequestsConfigButton from "~/components/dashboard/RequestsConfigButton.vue";

  import { createApp } from "vue";

  const {
    $dayjs: dayjs
  } = useNuxtApp();

  const dropdownInited = useState("dropdownInited", () => ref(false) as Ref<boolean>);

  function appendConfigButtons () {
    [ ... document.querySelectorAll("[data-purchase-config]") ].forEach(element => {
      if (element.querySelector("[data-te-dropdown-ref]")) return;
      const RequestsConfigButtonComponent = createApp(RequestsConfigButton, { 
        purchaseId: element.getAttribute("data-purchase-config") 
      });
      const wrapper = document.createElement("div");
     RequestsConfigButtonComponent.mount(wrapper);
      element.appendChild(wrapper);
    });
  };

  let datatable: any;

  fetchAllPurchases().then(purchases => {
    const {
      $initTE,
      $Datatable: Datatable,
      $Dropdown: Dropdown
    } = useNuxtApp();
    $initTE({
      Datatable
    });
    const rows = purchases.map(({
      price_value,
      ticket_amount,
      already_paid,
      id,
      full_name,
      title,
      created_at
    }) => ({
      numberIndex: id,
      createdAt: dayjs(new Date(created_at)).toNow(),
      prizedraw: title,
      status: already_paid ? "Aprovado" : "Pendente",
      client: full_name,
      value: price_value.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        style: "currency",
        currency: "BRL"
      }),
      buy: ticket_amount,
      config: `<div data-purchase-config="${id}"></div>`
    })).reverse();
    const advancedData = {
      columns: [{
          label: '#',
          field: 'numberIndex',
          sort: true
        }, //
        {
          label: 'Criado há',
          field: 'createdAt',
          sort: false
        },
        {
          label: 'Status',
          field: 'status',
          sort: true
        }, //
        {
          label: 'Sorteio',
          field: 'prizedraw',
          sort: true
        }, //
        {
          label: 'Cliente',
          field: 'client',
          sort: true
        }, //
        {
          label: 'Comprou',
          field: 'buy',
          sort: false
        }, //
        {
          label: 'Valor',
          field: 'value',
          sort: true
        }, //
        {
          label: 'Config',
          field: 'config',
          sort: false
        }, //
      ],
      rows
    };
    datatable = new Datatable(document.getElementById('datatable'), advancedData);
    document.getElementById('datatable').addEventListener("render.te.datatable", () => appendConfigButtons());

    appendConfigButtons();

    if (!dropdownInited.value) {
      $initTE({ Dropdown }, { allowReinits: true });
      dropdownInited.value = true;
    };
  });
  const search: Ref <string> = ref("");
  watch(search, value => {
    datatable.search(value);
    appendConfigButtons();
  });


  function navigateToDetailsPage (id: number) {
    navigateTo({
      path: "/dashboard/pedidos/detalhes",
      query: { id }
    })
  };

  onMounted(() => {
    window.navigateToDetailsPage = navigateToDetailsPage;
  });


</script>
