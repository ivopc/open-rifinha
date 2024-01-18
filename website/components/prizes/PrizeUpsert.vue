<template>
    <div class="container flex flex-col justify-center items-center">
      <div class="flex flex-col block justify-center items-center ml-8 w-full rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <form @submit.prevent="savePrize">
          <div id="f-main" class="rounded-lg bg-transparent p-6 mt-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div id="f-title-subtitle" class="flex flex-col md:flex-row">
              <div class="flex-1 p-2">
                <label for="title" class="text-lg font-bold">Título</label>
                <input type="text" id="title" required v-model="title" class="w-full mt-1 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0" placeholder="Digite o título">
              </div>
              <div class="flex-1 p-2">
                <label for="subtitle" class="text-lg font-bold">Subtítulo</label>
                <input type="text" id="subtitle" required v-model="subtitle" class="w-full mt-1 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0" placeholder="Digite o subtítulo">
              </div>
            </div>
            <div id="f-desc" class="relative mt-5 mb-3" data-te-input-wrapper-init>
              <p class="text-lg font-bold">Descrição</p>
              <textarea v-model="desc" class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0" id="exampleFormControlTextarea1" rows="3" placeholder="Descrição"></textarea>
            </div>
          </div>
          <div id="f-tickets" class="rounded-lg bg-transparent p-6 mt-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div class="space-y-4">
                  <span class="text-lg font-bold uppercase">Bilhetes</span>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div class="mb-4">
                          <label for="ticket_range" class="block text-sm font-medium text-gray-600">Quantidade de bilhetes a serem ofertados</label>
                          <input required v-if="queryType === PrizeUpsertTypes.Update" type="number" disabled v-model="ticketsAmount" id="input-ticketsAmount" class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0" />
                          <input required v-else type="number" v-model="ticketsAmount" id="input-ticketsAmount" class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0" placeholder="Quantidade de tickets" />
                        </div>
  
                      <div class="mb-4">
                          <label for="ticket_price" class="block text-sm font-medium text-gray-600">
                              Preço por bilhete <small>(obrigatório)</small>
                          </label>
                          <input required type="number" step="any" v-model="price" class="mt-1 block w-full form-input money" name="ticket_price" id="ticket_price" style="text-align: right;">
                      </div>
                      <div class="mb-4">
                          <label for="reserve_tickets_after_payment_before" class="block text-sm font-medium text-gray-600">
                              Atribuição de bilhetes:
                          </label>
                          <div class="mt-2 space-x-4">
                              <input required v-model="ticketsBuyAssignment" type="radio" :value="TicketBuyAssignment.BeforeBuy" id="reserve_tickets_after_payment_before" class="form-radio" />
                              <label for="reserve_tickets_after_payment_before">Antes do pagamento</label>
                              <input required v-model="ticketsBuyAssignment" type="radio" :value="TicketBuyAssignment.AfterBuy" id="reserve_tickets_after_payment_after" class="form-radio" />
                              <label for="reserve_tickets_after_payment_after">Após o pagamento</label>
                          </div>
                      </div>
                  </div>
                  <div id="f-raffle-type" class="mt-5">
                    <p class="text-lg font-bold">
                      Modalidade
                    </p>
                    <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                      <input 
                        class="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]" 
                        type="radio" 
                        name="raffle-type" 
                        :value="RaffleType.Random"
                        v-model="raffleType"
                        checked 
                      />
                      <label class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer" for="radioDefault02">
                        Randômica
                      </label>
                    </div>
                    <div class="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                      <input 
                        class="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]" 
                        type="radio" 
                        name="raffle-type" 
                        disabled
                        :value="RaffleType.Pick"
                        v-model="raffleType"
                      />
                      <label class="mt-px inline-block pl-[0.15rem] hover:cursor-pointer" for="radioDefault01">
                        Painel (Pick)
                      </label>
                    </div>
                  </div>
              </div>
          </div>
          <div id="f-datetime" class="rounded-lg bg-transparent p-6 mt-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div class="space-y-4">
                  <span class="text-2xl font-bold uppercase">Datas e Horários</span>
  
                  <div class="space-y-3">
                    <div
                      v-if="queryType === PrizeUpsertTypes.Insert"
                      class="block w-full rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                      <div class="p-6 text-base text-neutral-600 dark:text-neutral-200">
                        <span class="text-1xl font-bold uppercase">Início do sorteio</span>
                        <div class="col-12 mt-2">
                            <span>Data do início do sorteio</span>
                            <div
                              class="relative mb-3"
                              data-te-inline="true"
                              data-te-input-wrapper-init
                              id="datetimepicker-init">
                              <input
                                v-model="raffleStartDateInput"
                                required
                                type="text"
                                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                />
                            </div>
                        </div>
                      </div>
                    </div>
                    <div v-else class="text-2xl">
                      Data de início do sorteio: <span class="text-1xl font-bold">{{ raffleStartDateInput }}</span>
                    </div>
                    <div
                      class="block w-full rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                      <div class="p-6 text-base text-neutral-600 dark:text-neutral-200">
                        <span class="text-1xl font-bold uppercase">Resultados do Sorteio</span>
                        <div class="col-12 mt-2">
                            <span>Data dos resultados sorteio</span>
                            <div
                              class="relative mb-3"
                              data-te-inline="true"
                              data-te-input-wrapper-init
                              id="datetimepicker-results">
                              <input
                                required
                                v-model="raffleResultsDateInput"
                                type="text"
                                class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                />
                            </div>
                        </div>
                      </div>
                    </div>
                      <div class="col-12 md:col-6">
                          <span>Tempo limite para expirar dos pedidos em horas</span>
                          <div class="relative mb-3" data-te-input-wrapper-init>
                            <input
                              type="number"
                              v-model="timeLimitToExpireTicketBuyRequestInput"
                              required
                              class="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                              id="i-timeLimitToExpireTicketBuyRequest"
                              />
                            <label
                              for="i-timeLimitToExpireTicketBuyRequest"
                              class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                              >Em horas
                            </label>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div id="f-availability" class="rounded-lg bg-transparent p-6 mt-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
              <div class="space-y-4">
                  <span class="text-2xl font-bold uppercase">Status</span>
  
                  <div class="space-y-3">
                      <div class="col-12 md:col-6">
                          <div class="mb-3">
                              <label for="status" class="block text-sm font-medium text-gray-600">Status do sorteio</label>
                              <div class="relative">
                                  <select v-model="availability" name="status" id="status" class="block w-full px-4 py-2 pr-8 leading-5 text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300">
                                      <option :value="true">Disponível</option>
                                      <option :value="false">Indisponível</option>
                                  </select>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <button type="submit" class="w-full h-15 mt-8 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" data-te-ripple-init data-te-ripple-color="light">
            {{ queryType === PrizeUpsertTypes.Update ? "Editar" : "Criar" }}
          </button>
          <div>
            <Alert v-if="showRequestError">
              {{ requestError }}
            </Alert>
          </div>
        </form>
      </div>
    </div>
</template>
  
  <style scoped></style>
  
  <script lang="ts" setup>
    import { fetchPrize, upsertPrize } from '~/services/prizes';
    import { RaffleType, TicketBuyAssignment, PrizeUpsertTypes } from '~/interface-types';
    import Alert from '../misc/Alert.vue';

    const props = defineProps<{
      queryType: PrizeUpsertTypes,
      prizeId?: number 
    }>();

    const SECOND = 1000;
    const MINUTE = 60;
    const HOUR = 60;
    const DEFAULT_TICKETS_AMOUNT = 1000000;
    const DEFAULT_TICKET_PRICE = 0.25; 
  
    const { $dayjs: dayjs } = useNuxtApp();
    const title: Ref<string> = ref("");
    const subtitle: Ref<string> = ref("");
    const raffleType: Ref<RaffleType> = ref(RaffleType.Random);
    const desc: Ref<string> = ref("");
    const ticketsAmount: Ref<number> = ref(DEFAULT_TICKETS_AMOUNT);
    const price: Ref<number> = ref(DEFAULT_TICKET_PRICE);
    const ticketsBuyAssignment: Ref<TicketBuyAssignment> = ref(TicketBuyAssignment.AfterBuy);
    const availability: Ref<boolean> = ref(true);
    const raffleStartDateInput: Ref<string> = ref(""); // vue ref is not getting the value properly when its updates
    const raffleResultsDateInput: Ref<string> = ref(""); // vue ref is not getting the value properly when its updates
    const timeLimitToExpireTicketBuyRequestInput: Ref<number> = ref(1);
    const showRequestError: Ref<boolean> = ref(false);
    const requestError: Ref<string> = ref("");
  
    const raffleStartDate = computed(() => {
      const date = props.queryType === PrizeUpsertTypes.Update ? raffleStartDateInput.value : document.querySelector("#datetimepicker-init > input").value;
      return dayjs(date).toISOString() // vue ref is not getting the value properly when its updates
    });
  
    const raffleResultsDate = computed(() =>
      dayjs(document.querySelector("#datetimepicker-results > input").value).toISOString() // vue ref is not getting the value properly when its updates
    );
  
    const timeLimitToExpireTicketBuyRequest = computed(() => 
      Number(timeLimitToExpireTicketBuyRequestInput.value) * SECOND * MINUTE * HOUR
    );
  
    onMounted(() => {
      window.dayjs = dayjs;
      const { $initTE, $Datetimepicker: Datetimepicker, $Input: Input } = useNuxtApp();
      $initTE({ Datetimepicker, Input }, { allowReinits: true });
      new Datetimepicker(document.querySelector("#datetimepicker-results"), {
        datepicker: { format: "yyyy/mm/dd" },
        timepicker: { format24: true }
      });
      if (props.queryType === PrizeUpsertTypes.Insert) {
        new Datetimepicker(document.querySelector("#datetimepicker-init"), {
          datepicker: { format: "yyyy/mm/dd" },
          timepicker: { format24: true }
        });
        const startDate = dayjs();
        raffleStartDateInput.value = `${startDate.year()}/${startDate.month() + 1}/${startDate.date()}, ${formatHourMinute(startDate.hour())}:${formatHourMinute(startDate.minute())}`;
        const resultsDate = dayjs().add(7, "day");
        raffleResultsDateInput.value = `${resultsDate.year()}/${resultsDate.month() + 1}/${resultsDate.date()}, ${formatHourMinute(resultsDate.hour())}:${formatHourMinute(resultsDate.minute())}`;
      } else if (props.queryType === PrizeUpsertTypes.Update) {
        fetchPrize(props.prizeId).then(data => {
          title.value = data.title;
          subtitle.value = data.subtitle;
          raffleType.value = data.raffleType;
          desc.value = data.desc;
          ticketsAmount.value = data.ticketsAmount;
          price.value = data.price;
          ticketsBuyAssignment.value = data.ticketsBuyAssignment;
          const startDate = dayjs(data.raffleStartDate);
          raffleStartDateInput.value = `${startDate.year()}/${startDate.month() + 1}/${startDate.date()}, ${formatHourMinute(startDate.hour())}:${formatHourMinute(startDate.minute())}`;
          const resultsDate = dayjs(data.raffleResultsDate);
          raffleResultsDateInput.value = `${resultsDate.year()}/${resultsDate.month() + 1}/${resultsDate.date()}, ${formatHourMinute(resultsDate.hour())}:${formatHourMinute(resultsDate.minute())}`;
          timeLimitToExpireTicketBuyRequestInput.value = data.timeLimitToExpireTicketBuyRequest / SECOND / MINUTE / HOUR;
          availability.value = data.availability;
        });
      };
    });

    async function savePrize () {
      try {
        await upsertPrize({
          ... {
            title: title.value,
            subtitle: subtitle.value,
            raffleType: raffleType.value,
            desc: desc.value,
            ticketsAmount: ticketsAmount.value,
            price: price.value,
            ticketsBuyAssignment: ticketsBuyAssignment.value,
            raffleStartDate: raffleStartDate.value,
            raffleResultsDate: raffleResultsDate.value,
            timeLimitToExpireTicketBuyRequest: timeLimitToExpireTicketBuyRequest.value,
            availability: availability.value
          },
          ... props.prizeId ? { prizeId: props.prizeId } : {}
        });
        showRequestError.value = false;
        if (props.queryType === PrizeUpsertTypes.Insert) {
          navigateTo("/dashboard/sorteios/");
        };
      } catch (err) {
        showRequestError.value = true;
        requestError.value = err.data.error;
      };
    };
  
    function formatHourMinute (time: number): string {
      return String(time).length === 1 ? "0" + String(time) : String(time);
    }; 
  
  </script>