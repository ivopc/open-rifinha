<script lang="ts" setup>

  import { register } from '~/services/buyers';

  const props = defineProps({
    ticketAmount: Number,
    prizeId: String
  });
  
  onMounted(() => {
    const { $initTE, $Modal: Modal, $Ripple: Ripple } = useNuxtApp();
    $initTE({ Modal, Ripple }, { allowReinits: true });
  });
  const email = ref("pedropclola@gmail.com");
  const cpf = ref(42017528870);
  const phone = ref(11969040589);
  const name = ref("Pedro Oliveira");

  async function requestToBuy () {
    const { $Modal } = useNuxtApp();
    try {
      const response = await register({ fullName: name.value, email: email.value, cpf: cpf.value, phone: phone.value, ticketAmount: props.ticketAmount, prizeId: props.prizeId })
      const router = useRouter();
      router.push({ path: `/sorteios/pagamento`,  query: { id: response.internalPurchaseId } });
      $Modal.getInstance(document.querySelector("#buyModal")).hide();
    } catch (err) {
      /**@todo */
    };
  };
</script>

<template>
  <div>
    <div data-te-modal-init class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none" id="buyModal" tabindex="-1" aria-labelledby="buyModalLabel" aria-hidden="true">
      <div data-te-modal-dialog-ref class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
        <div class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
          <div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            <!--Modal title-->
            <h5 class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200" id="buyModalLabel">
              Finalize sua compra
            </h5>
            <!--Close button-->
            <button type="button" class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none" data-te-modal-dismiss aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!--Modal body-->
          <div class="relative flex-auto p-4" data-te-modal-body-ref>
            <form id="place-order-form" @submit.prevent="requestToBuy" x-init="isSetPhoneNumber">
              <input type="hidden" name="ticket_amount" value="2250">
              <input type="hidden" name="_token" value="hubfe16fg4u4UqkQxo5baRy3mjyuCvP6MIdAaXc3"> <input type="hidden" id="ref" name="ref" value="">
              <input type="hidden" name="raffle_id" value="15">
              <div class="mb-4" x-show="open" x-transition="">
                <label for="name" class="block text-sm font-medium text-slate-700" id="label_name">Nome</label>
                <div class="mt-1">
                  <input required="true" v-model="name" type="text" name="customer_name" id="name" @input="validateOrderInputs" style="outline: none" placeholder="Digite seu nome" autocomplete="on" class="px-3 py-2 bg-white light-theme-autocomplete text-slate-700 border-slate-300 border shadow-sm  placeholder-slate-400 focus:outline-none focus:border-lime-700 focus:ring-lime-700 w-full rounded-md sm:text-sm focus:ring-1">
                </div>
              </div>
              <div class="mb-4" x-show="open" x-transition="">
                <label for="email" class="block text-sm font-medium text-slate-700">Email</label>
                <div class="mt-1">
                  <input required="true" v-model="email" type="email" name="customer_email" id="email" style="outline: none" @input="validateOrderInputs" placeholder="exemplo@email.com" autocomplete="on" class="px-3 py-2 bg-white border-slate-300 light-theme-autocomplete border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-lime-700 focus:ring-lime-700 w-full rounded-md sm:text-sm focus:ring-1">
                </div>
              </div>
              <div class="mb-4">
                <label for="phone" class="block text-sm font-medium text-slate-700 light-theme-autocomplete">Telefone</label>
                <div class="mt-1">
                  <input required="true" type="text" v-model="phone" inputmode="numeric" name="customer_phone" placeholder="(00) 9 0000-0000" id="phone" style="outline: none" autocomplete="on" @input="searchCustomer" class="px-3 py-2 bg-white border-slate-300 light-theme-autocomplete border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-lime-700 focus:ring-lime-700 block w-full rounded-md sm:text-sm focus:ring-1" x-mask="(99) 9 9999-9999">
                </div>
              </div>
              <div class="mb-4" x-show="open" x-transition="">
                <label for="customer_cpf" class="block text-sm font-medium text-slate-700 light-theme-autocomplete">CPF</label>
                <div class="mt-1">
                  <input type="text" v-model="cpf" inputmode="numeric" name="customer_cpf" placeholder="000.000.000-00" id="cpf" style="outline: none" @input="validateOrderInputs" autocomplete="off" required="" class="px-3 py-2 bg-white border-slate-300 light-theme-autocomplete border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" x-mask="999.999.999-99">
                </div>
              </div>
              <div id="spacing" style="height: 10px"></div>
              <div class="flex items-center mb-5" x-show="open" x-transition="">
                <input id="terms" name="terms" required="true" type="checkbox" class="h-4 w-4 text-green-600 focus:ring-blue-500 border-gray-300 rounded">
                <label for="terms" class="ml-2 block text-sm text-gray-900">
                  Declaro que li e concordo com os <a class="text-green-500" target="_blank" href="#">Termos e Condições</a>
                </label>
              </div>
              <div class="w-full flex justify-center items-center">
              </div>
              <!--Modal footer-->
              <div class="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                <button type="button" class="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200" data-te-modal-dismiss data-te-ripple-init data-te-ripple-color="light">
                  Fechar
                </button>
                <button type="submit" class="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" data-te-ripple-init data-te-ripple-color="light">
                  Reservar Bilhetes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>