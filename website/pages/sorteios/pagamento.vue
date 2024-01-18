<template>
  <div>
    <section class="relative payment-hero min-h-screen">
    <div class="container mx-auto pt-5">
      <a :href="`/sorteios/${prize}`">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path>
      </svg>
      </a>
    </div>
    <div class="max-w-[600px] mx-auto">
      <div class="flex flex-col items-center pt-14">
        <h1 class="text-black font-medium text-xl px-4 py-5 text-center mb-16 md:text-3xl md:mb-10">
        <span v-if="!purchase.already_paid">Falta pouco! Copie e cole o código a seguir no seu app de pagamentos ou Internet Banking</span>
        <span v-else>Pagamento Aprovado! Agradecemos sua participação no sorteio, boa sorte!</span>
        </h1>
        <div class="bg-white shadow-lg rounded-lg p-6 mx-4 md:w-full mx-auto space-y-10">
        <div class="w-full flex items-start">
          <div class="hidden md:w-1/3 md:block">
            <img :src="prize.image" alt="Imagem do sorteio">
          </div>
          <div class="w-full md:w-2/3 pl-3 ">
            <div class="flex flex-col text-gray-900 space-y-1 text-sm">
              <div class="flex justify-between">
                <span class="font-bold">Sorteio:</span>
                <span>{{ prize.title }}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-bold">Quantidade:</span>
                <span>{{ purchase.ticket_amount }} bilhetes</span>
              </div>
              <div class="flex justify-between">
                <span class="font-bold">Valor por bilhete:</span>
                <span>R$ {{ prize.price }}</span>
              </div>
              <div class="max-h-[180px] overflow-y-scroll px-4"></div>
            </div>
          </div>
        </div>
        <div id="payment-data" v-if="!purchase.already_paid">
          <p>Valor a ser pago: <b>R$ {{ priceValue }}</b></p>
          <img class="w-44 h-44 mx-auto" :src="`data:image/jpeg;base64,${purchase.payment_qr_code_image}`" alt="qrcode">
          <div>
          <div class="hidden md:flex md:flex-col md:w-full md:my-3">
          <label for="hash">
          <small class="font-sm text-gray-900">Se preferir, você pode pagá-lo copiando e colando o código abaixo:</small>
          </label>
          <input class="px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" id="hash" :value="purchase.payment_qr_code" type="text">
          </div>
          <button id="copy-pix-hash-btn" :data-clipboard-text="purchase.payment_qr_code" class="clipboard-btn bg-green-500 px-6 py-3 rounded-lg text-white mr-4 hover:bg-green-600 w-full">
          Copiar código
          </button>
          <div class="text-center mt-4 place-items-center grid">
            Status do pagamento: <span id="payment-status" class="text-red-800 font-bold">Não pagou ainda</span>
            <LoadingUpdate />
          </div>
          </div>
        </div>
        <div v-else>
          <div class="flex justify-between">
            <span class="font-bold flex items-center justify-between w-full">
            <span class="mr-3">Bilhetes:</span>
            </span>
          </div>
          <div class="max-h-[180px] overflow-y-scroll px-4">
            <span class="text-green-600 font-bold">
              <span v-for="(ticket, index) in ticketsNums" :key="index">
                {{ ticket }},
              </span>
            </span>
          </div>
        </div>
        </div>
        </div>
    </div>
    </section>
  </div>
</template>

<style scoped></style>

<script lang="ts" setup>
import { fetchPurchasePayment, fetchIsPaid } from "~/services/purchase";
import { fetchPrize } from "~/services/prizes";
import { fetchTicketNumbers } from "~/services/tickets";
import { IPurchase, IPrize } from "~/interface-types";
import LoadingUpdate from "~/components/misc/LoadingUpdate.vue"
  const purchaseId: Ref<string> = ref(useRoute().query.id);
  const purchase: Ref<IPurchase> = ref({});
  const prize: Ref<IPrize> = ref({});
  const priceValue: Ref<string> = ref("");
  const ticketsNums: Ref<number[]> = ref([]);
  fetchPurchasePayment(purchaseId.value)
    .then(data => {
      priceValue.value = data.price_value.toLocaleString("pt-br", { minimumFractionDigits: 2 });
      purchase.value = data;
      if (!data.already_paid)
        setCheckPaidTimer();
      return fetchPrize(data.prize_id);
    })
    .then(data => {
      prize.value = data;
      return fetchTicketNumbers(purchaseId.value)
    })
    .then(data => ticketsNums.value = data);
  function setCheckPaidTimer () {
    const timerPaidCheck: ReturnType<typeof setInterval> = setInterval(async () => {
      const { isPaid, tickets } = await fetchIsPaid(purchaseId.value);
      purchase.value.already_paid = isPaid;
      ticketsNums.value = tickets;
      if (isPaid)
        clearInterval(timerPaidCheck);
    }, 4000);
  };
</script>
