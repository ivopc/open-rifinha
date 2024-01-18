<template>
    <div class="flex justify-center">
      <div class="w-full block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 text-center">
          Pedido <span>#{{ pageData.id }}</span>
        </h5>
        <div class="w-full block rounded-lg bg-neutral-700 p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div class="grid grid-cols-2 gap-4 text-slate-100">
                <div class="p-3">
                    <h3><span class="font-semibold">Comprado por</span>: {{ pageData.full_name }}</h3>
                    <h4><span class="font-semibold">Celular</span>: {{ pageData.phone_number }}</h4>
                    <h4><span class="font-semibold">CPF</span>: {{ pageData.cpf }}</h4>
                </div>
                <div class="p-3">
                    <h3><span class="font-semibold">ID do pedido</span>: {{ pageData.id }}</h3>
                    <h4><span class="font-semibold">Data da compra</span>: {{ date }}</h4>
                    <h4><span class="font-semibold">Pagamento PIX ID</span>: {{ pageData.pix_payment_id }}</h4>
                </div>
				<div class="col-span-2 flex items-center justify-center mt-2 text-2xl">
					<span class="font-semibold">Número de bilhetes</span>: {{ ticketsAmount }}
				</div>
            </div>
			<div class="flex items-center justify-center mt-7">
				<button
					type="button"
					data-te-ripple-init
					data-te-ripple-color="light"
					data-te-toggle="popconfirm"
					data-te-message="Tem certeza que deseja aprovar a compra?"
					data-te-ok-text="Aprovar!"
					data-te-cancel-text="Cancelar"
					id="confirm-approve-purchase"
					class="inline-block rounded mr-5 bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]">
					Aprovar compra
				</button>
				<button
					type="button"
					data-te-ripple-init
					data-te-ripple-color="light"
					data-te-toggle="popconfirm"
					data-te-message="Tem certeza que deseja apagar a compra? Isso removerá todos os dados da compra e os bilhetes de maneira permanente."
					data-te-ok-text="Apagar!"
					data-te-cancel-text="Cancelar"
					data-te-class-btn-confirm="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]"
					id="confirm-delete-purchase"
					class="inline-block rounded mr-5 bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]">
					Apagar compra
				</button>
			</div>
			<Alert v-if="showRequestError">
				{{ requestError }}
			</Alert>
        </div>
		<hr class="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
		<div class="col-span-2 flex items-center justify-center mt-2 text-2xl">Detalhes dos bilhetes</div>
        <div class="flex flex-col mt-7">
          <div id="datatable" class="text-neutral-800"></div>
          <div id="overview" class="text-neutral-800 text-right">
            <h3>Subtotal: {{ totalPrice }}</h3> 
            <h3>Descontos: -</h3> 
            <h3> Total: {{ totalPrice }}</h3>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
	definePageMeta({
		layout: "dashboard"
	});
	import { type IPurchaseDashboard } from "~/interface-types";
	import { fetchPurchaseForDashboardDetails, deletePurchase } from "~/services/purchase";
	import Alert from "~/components/misc/Alert.vue";
	const { $dayjs: dayjs } = useNuxtApp();
	const { id }: { id: number } = useRoute().query;
	const pageData: Ref<IPurchaseDashboard> = ref({});
	const totalPrice: Ref<string> = ref(0);
	const date: Ref<string> = ref(null);
	const ticketsAmount: Ref<number> = ref(0);
	const showRequestError: Ref<boolean> = ref(false);
    const requestError: Ref<string> = ref("");
	fetchPurchaseForDashboardDetails(id).then(data => {
		const { $initTE, $Datatable: Datatable, $Popconfirm: Popconfirm } = useNuxtApp();
		$initTE({ Datatable, Popconfirm }, { allowReinits: true });
		pageData.value = data.user;
		date.value = dayjs(data.user.created_at).format("DD/MM/YYYY HH:mm");
		totalPrice.value = (data.user.purchase_price).toLocaleString("pt-BR", { 
			minimumFractionDigits: 2, 
			style: "currency", 
			currency: "BRL"
		});
		ticketsAmount.value = data.tickets.length;
		const rows = data.tickets.map(ticket => ({
			itemId: ticket.ticket_number,
			price: data.user.ticket_price.toLocaleString("pt-BR", { 
				minimumFractionDigits: 2, 
				style: "currency", 
				currency: "BRL"
			}),
			desc: "Bilhete de número: #" + ticket.ticket_number
		}));
		document.getElementById("confirm-approve-purchase").addEventListener("confirm.te.popconfirm", () => {
			console.log("confirm-approve-purchase");
		});
		document.getElementById("confirm-delete-purchase").addEventListener("confirm.te.popconfirm", async () => {
			try {
				await deletePurchase(id);
				navigateTo("/dashboard/pedidos");
			} catch (err) {
				showRequestError.value = true;
        		requestError.value = err.data.error;
				setTimeout(() => {
                	showRequestError.value = false;
            	}, 2500);
			};
		});
		new Datatable(document.getElementById("datatable"), {
			columns: [
				{
					label: "Item ID",
					field: "itemId",
				},
				{
					label: "Descrição",
					field: "desc"
				},
				{
					label: "Preço",
					field: "price"
				}
			],
			rows
		});
	});
</script>