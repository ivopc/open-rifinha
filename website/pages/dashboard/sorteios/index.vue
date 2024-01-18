<template>
  <div>
    <div class="w-full mt-6 flex items-center justify-center ">
      <button
        type="button"
        data-te-ripple-init
        data-te-ripple-color="light"
        @click="createPrizeDrawPage"
        class="flex items-center rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]">
        <svg class="w-6 h-6 text-gray-800 dark:text-white mr-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
        Criar sorteio
      </button>
    </div>
    <hr class="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
    <div class="w-full grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 px-4">
      <div v-for="(prizedraw, index) in prizedraws" :key="index">
          <PrizedrawCard
              :id="prizedraw.id" 
              :title="prizedraw.title"
              :invoicing="prizedraw.invoicing"
              :createdAt="prizedraw.createdAt"
              :availability="prizedraw.availability"
              :requestAmount="prizedraw.requestAmount"
              :images="prizedraw.images"
              :minTicketsPerPurchase="prizedraw.minTicketsPerPurchase"
              :maxTicketsPerPurchase="prizedraw.maxTicketsPerPurchase"
          />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
    layout: "dashboard"
  });
  import PrizedrawCard from "~/components/dashboard/PrizedrawCard.vue";
  import { fetchPrizesToDashboard } from "~/services/prizes";
  import { type IPrizeToDashboard } from "~/interface-types";
  const prizedraws: Ref<IPrizeToDashboard[]> = ref([]);
  const dropdownInited = useState("dropdownInited", () => ref(false) as Ref<boolean>);
  fetchPrizesToDashboard().then(data => prizedraws.value = data);
  onMounted(() => {
    setTimeout(() => {
      if (dropdownInited.value) return;
      dropdownInited.value = true;
      const { $initTE, $Dropdown: Dropdown } = useNuxtApp();
      $initTE({ Dropdown }, { allowReinits: true });
    }, 800);
  });
  function createPrizeDrawPage () {
    navigateTo("/dashboard/sorteios/criar")
  };
</script>