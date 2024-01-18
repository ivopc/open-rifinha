<template>
    <div>
        <div
        class="block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div
                class="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
                Produto #{{ id }}
            </div>
            <div class="p-6">
                <h5
                class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {{ title }} 
            </h5>
                <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                Faturamento: R$ {{ invoicing }}<br>
                Criado em: {{ createdAt }}
                </p>

                <div class="flex justify-center items-center" data-te-dropdown-ref>
                <button
                    class="flex items-center whitespace-nowrap rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    type="button"
                    id="dropdownMenuButton1"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                    data-te-ripple-init
                    data-te-ripple-color="light">
                    ...
                    <span class="ml-2 w-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        class="h-5 w-5">
                        <path
                        fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd" />
                    </svg>
                    </span>
                </button>
                <ul
                    class="absolute z-[1000] float-left m-0 hidden min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                    aria-labelledby="dropdownMenuButton1"
                    data-te-dropdown-menu-ref>
                    <li>
                        <NuxtLink
                        :to="`/dashboard/sorteios/estatisticas/?id=${id}`"
                        class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        data-te-dropdown-item-ref>
                            Estatísticas
                        </NuxtLink>
                    </li>
                    <li>
                        <a
                            class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                            href="#"
                            data-te-dropdown-item-ref
                            data-te-toggle="modal" :data-te-target="`#share${id}Modal`"
                        >Compartilhar</a>
                    </li>
                    <li>
                        <a
                            class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                            href="#"
                            data-te-dropdown-item-ref
                        >Promoções</a>
                    </li>
                    <li>
                        <a
                            class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                            href="#"
                            data-te-dropdown-item-ref
                            data-te-toggle="modal" :data-te-target="`#rules${id}Modal`"
                        >Regras</a>
                    </li>
                    <li>
                        <a
                            class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                            href="#"
                            data-te-dropdown-item-ref
                            data-te-toggle="modal" :data-te-target="`#image${id}Modal`"
                            >Imagens</a
                        >
                    </li>
                    <li>
                        <a
                            class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                            href="#"
                            data-te-dropdown-item-ref
                            data-te-toggle="modal" :data-te-target="`#winners${id}Modal`"
                        >Vencedores</a>
                    </li>
                    <li>
                        <NuxtLink
                        :to="`/dashboard/sorteios/editar/?id=${id}`"
                        class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        data-te-dropdown-item-ref>
                            Editar
                        </NuxtLink>
                    </li>
                    <li>
                        <a
                            class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                            href="#"
                            data-te-dropdown-item-ref
                            data-te-toggle="modal" :data-te-target="`#remove${id}Modal`"
                        >Excluir</a>
                    </li>
                </ul>
                </div>
                
            </div>
            <div
                class="border-t-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
                {{ availability ? "Disponível" : "Indisponível" }}
                <p>
                    {{ requestAmount }} bilhetes vendidos
                </p>
            </div>
        </div>
        <div class="modals">
            <div class="modal-share">
                <div data-te-modal-init class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none" :id="`share${id}Modal`" tabindex="-1" aria-labelledby="shareModalLabel" aria-hidden="true">
                    <div data-te-modal-dialog-ref class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
                        <div class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                            <div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                                <!--Modal title-->
                                <h5 class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">Compartilhe sua rifa</h5>
                                <!--Close button-->
                                <button type="button" class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none" data-te-modal-dismiss aria-label="Close">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <!--Modal body-->
                            <div class="relative flex-auto p-4" data-te-modal-body-ref>
                                <NuxtLink :to="`/sorteios/${id}`" target="_blank">{{ title }}</NuxtLink><br />
                                <input type="text" :value="`${useRequestURL().origin}/sorteios/${id}`" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-promotion">
                <div data-te-modal-init class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none" id="promotionModal" tabindex="-1" aria-labelledby="shareModalLabel" aria-hidden="true">
                    <div data-te-modal-dialog-ref class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
                        <div class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                            <div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                                <!--Modal title-->
                                <h5 class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">Compartilhe sua rifa</h5>
                                <!--Close button-->
                                <button type="button" class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none" data-te-modal-dismiss aria-label="Close">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <!--Modal body-->
                            <div class="relative flex-auto p-4" data-te-modal-body-ref>Promotion</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-rules">
                <div data-te-modal-init class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"  :id="`rules${id}Modal`" tabindex="-1" aria-labelledby="rulesModalLabel" aria-hidden="true">
                    <div data-te-modal-dialog-ref class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
                        <div class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                            <div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                                <!--Modal title-->
                                <h5 class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">Compartilhe sua rifa</h5>
                                <!--Close button-->
                                <button type="button" class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none" data-te-modal-dismiss aria-label="Close">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <!--Modal body-->
                            <div class="relative flex-auto p-4" data-te-modal-body-ref>
                                <form @submit.prevent="saveProductTicketPurchaseLimit">
                                    <span>Quantidade mínima de bilhetes por compra</span>
                                    <input type="number" v-model="minTicketsPerPurchase" />
                                    <span>Quantidade máxima de bilhetes por compra</span>
                                    <input type="number" v-model="maxTicketsPerPurchase" />
                                    <button
                                        type="submit"
                                        class="inline-block rounded bg-success px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                                        value=""
                                        >Salvar
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-image">
                <div data-te-modal-init class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none" :id="`image${id}Modal`" tabindex="-1" aria-labelledby="imageModalLabel" aria-hidden="true">
                    <div data-te-modal-dialog-ref class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px] min-[1200px]:max-w-[1140px]">
                        <div class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                            <div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                                <!--Modal title-->
                                <h5 class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">Posters</h5>
                                <!--Close button-->
                                <button type="button" class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none" data-te-modal-dismiss aria-label="Close">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <!--Modal body-->
                            <div class="relative flex-auto p-4 text-center" data-te-modal-body-ref>
                                <DropZone class="flex items-center justify-center" @files-dropped="addFiles" #default="{ dropZoneActive }">
                                    <div class="block w-full min-h-96 rounded-lg bg-neutral-800 text-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-600">
                                        <div class="pt-6 mb-6">
                                            <label :for="`${id}file-input`">
                                                <span v-if="dropZoneActive">
                                                    <h2 class="text-2xl font-extrabold">Solte a imagem aqui para adicionar</h2>
                                                </span>
                                                <span v-else>
                                                    <h2 class="text-2xl font-extrabold">Arraste e solte as imagens aqui</h2>
                                                </span>
                                                <input
                                                    class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                                    type="file" 
                                                    :id="`${id}file-input`" 
                                                    multiple 
                                                    @change="onPrizeImageUploadInputChange" 
                                                />
                                            </label>
                                        </div>
                                        <ul class="image-list" v-show="files.length">
                                            <FilePreview v-for="file of files" :key="file.id" :file="file" tag="li" @remove="removeFile" />
                                        </ul>
                                    </div>
                                </DropZone>
                                <button 
                                    @click.prevent="uploadPrizeImage(files)" 
                                    class="mt-5 inline-block rounded bg-success w-6/12 px-7 pb-2.5 pt-3 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(20,164,77,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.2),0_4px_18px_0_rgba(20,164,77,0.1)]"
                                >Fazer Upload</button>
                                <hr class="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
                                <span v-if="uploadedImages.length > 0" class="text-2xl text-center">Imagens atuais</span>
                                <div class="flex justify-center items-center">
                                    <div class="bg-white p-8 rounded shadow-md">
                                        <ul class="w-96 mt-5" v-for="image in uploadedImages" :key="image.id">
                                            <li class="w-full border-b-2 border-neutral-100 border-opacity-100 py-4 dark:border-opacity-50 text-center">
                                                <img :src="`${useStrapiMedia()}${image.url}`" class="mx-auto mb-4 w-32 rounded-lg">
                                                <button
                                                    @click="deletePrizeImage(image.id)"
                                                    type="button"
                                                    class="inline-block rounded bg-danger px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#dc4c64] transition duration-150 ease-in-out hover:bg-danger-600 hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:bg-danger-600 focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] focus:outline-none focus:ring-0 active:bg-danger-700 active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.3),0_4px_18px_0_rgba(220,76,100,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(220,76,100,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(220,76,100,0.2),0_4px_18px_0_rgba(220,76,100,0.1)]">
                                                Remover</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-winners">
                <div data-te-modal-init class="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none" :id="`winners${id}Modal`" tabindex="-1" aria-labelledby="winnersModalLabel" aria-hidden="true">
                    <div data-te-modal-dialog-ref class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px]">
                        <div class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                            <div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                                <!--Modal title-->
                                <h5 class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">Definir vencedores</h5>
                                <!--Close button-->
                                <button type="button" class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none" data-te-modal-dismiss aria-label="Close">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <!--Modal body-->
                            <div class="relative flex-auto p-4" data-te-modal-body-ref>
                                <div class="mb-4 w-full">
                                <label for="7e38f77e-c1b0-4890-ba87-dd241afa18e8"></label>
                                <input 
                                    placeholder="Número do bilhete" 
                                    type="number"
                                    v-model="winnerTicketNumberInput"
                                    id="7e38f77e-c1b0-4890-ba87-dd241afa18e8" 
                                    class="w-full block rounded-lg border dark:border-none dark:bg-neutral-600 py-[9px] px-3 pr-4 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none" 
                                />
                                </div>
                                <button 
                                    type="submit"
                                    @click="fetchBuyer"
                                    class="inline-block mb-4 w-full rounded-full bg-blue-500 text-black-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-blue-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0"
                                >
                                    Procurar
                                </button>
                                <div class="overflow-x-auto bg-white dark:bg-neutral-700" v-if="showWinnerInfos">
                                    <table class="min-w-full text-left text-sm whitespace-nowrap">
                                        <thead class="uppercase tracking-wider border-b-2 dark:border-neutral-600 border-t">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 border-x dark:border-neutral-600">
                                            Cliente
                                            </th>
                                            <th scope="col" class="px-6 py-3 border-x dark:border-neutral-600">
                                            Bilhete
                                            </th>
                                            <th scope="col" class="px-6 py-3 border-x dark:border-neutral-600">
                                            Data
                                            </th>
                                            <th scope="col" class="px-6 py-3 border-x dark:border-neutral-600">
                                            Ações
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr class="border-b dark:border-neutral-600">
                                            <th scope="row" class="px-6 py-3 border-x dark:border-neutral-600">
                                            {{ winnerInfo.full_name }} - 
                                                <a 
                                                    target="_blank" 
                                                    :href="`https://wa.me/55${winnerInfo.phone_number}`"
                                                    class="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                                                >Entrar em contato</a>
                                            </th>
                                            <td class="px-6 py-3 border-x dark:border-neutral-600">#{{  winnerInfo.ticket_number }}</td>
                                            <td class="px-6 py-3 border-x dark:border-neutral-600">{{ dayjs(winnerInfo.created_at).format('DD/MM/YYYY') }}</td>
                                            <td class="px-6 py-3 border-x dark:border-neutral-600 text-center">
                                            <button 
                                                @click="showDefineWinnerConfirm = true"
                                                type="button" 
                                                class="inline-block rounded bg-blue-500 text-black-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-blue-600 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-blue-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0"
                                            >Tornar ganhador</button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div v-if="showDefineWinnerConfirm" class="text-center mt-5">
                                    <p>Tem certeza que deseja tornar <span class="text-red-600 text-bold font-black">{{ winnerInfo.full_name }}</span> o vencedor?</p>
                                    <button 
                                        @click="defineWinner"
                                        type="button" 
                                        class="mt-3 inline-block rounded bg-red-500 text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-red-600 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-red-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-red-700 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0"
                                        >Definir vencedor!
                                    </button>
                                    <div v-if="defineWinnerResults !== null">{{ defineWinnerResults ? "Vencedor definido com sucesso!" : "Não foi possível definir o vencedor!" }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-remove">
                <div data-te-modal-init class="fixed text-center left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none" :id="`remove${id}Modal`" tabindex="-1" aria-labelledby="removeModalLabel" aria-hidden="true">
                    <div data-te-modal-dialog-ref class="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
                        <div class="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                            <div class="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                                <!--Modal title-->
                                <h5 class="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">Excluir rifa {{ title }}</h5>
                                <!--Close button-->
                                <button type="button" class="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none" data-te-modal-dismiss aria-label="Close">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <!--Modal body-->
                            <div class="relative flex-auto p-4" data-te-modal-body-ref>
                                <span class="text-2xl font-semibold">Tem certeza que deseja excluir a rifa <span class="underline decoration-2">{{ title }}</span>? A rifa será <span class="font-bold text-red-500 underline decoration-red-700 decoration-4">excluída permanentemente</span> e todos os dados das compras e bilhetes também serão perdidos.</span>
                                <hr class="my-12 h-0.5 border-t-0 bg-neutral-100 opacity-100 dark:opacity-50" />
                                <form @submit.prevent="removePrize">
                                    <div class="mb-4 w-full">
                                        <label for="cb773fd8-81b9-428b-8476-6e94a73b16c5"></label>
                                        <input required v-model="passwordDeletePrizeInput" placeholder="Digite sua senha" type="password" id="cb773fd8-81b9-428b-8476-6e94a73b16c5" class="w-full block rounded-lg border dark:border-none dark:bg-neutral-600 py-[9px] px-3 pr-4 text-sm focus:border-blue-400 focus:ring-1 focus:ring-blue-400 focus:outline-none" />
                                    </div>
                                    <button 
                                        type="submit" 
                                        class="block mb-4 w-full rounded-full bg-danger text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-danger hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-red-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-blue-700 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0">
                                        Excluir permanentemente!
                                    </button>
                                    <span class="text-xs font-extralight">Uma vez que você digitar sua senha e confirmar, a rifa será excluida permanentemente!</span>
                                    <Alert v-if="showDeleteRequestError">
                                        {{ deleteRequestError }}
                                    </Alert>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { setPrizeTicketPurchaseLimit, deletePrize } from "~/services/prizes";
    import { uploadFile, deleteFile } from "~/services/files";
    import { fetchBuyerByTicketAndPrizeId } from "~/services/tickets";
    import { defineWinnerByBuyerId } from "~/services/winners";
    import fileList from "~/services/misc/file-list";
    import { type IWinnerInfo, type Image } from "~/interface-types";

    import DropZone from "~/components/misc/DropZone.vue";
    import FilePreview from "~/components/misc/FilePreview.vue";
    import Alert from "~/components/misc/Alert.vue";
    const { files, addFiles, removeFile, clearFiles } = fileList();
    const props = defineProps<{
        id: Number, 
        title: String,
        invoicing: String,
        createdAt: String,
        availability: Boolean,
        requestAmount: Number,
        images: Image[],
        minTicketsPerPurchase: Number,
        maxTicketsPerPurchase: Number
    }>();
    const minTicketsPerPurchase: Ref<number> = ref(props.minTicketsPerPurchase);
    const maxTicketsPerPurchase: Ref<number> = ref(props.maxTicketsPerPurchase);
    const winnerTicketNumberInput: Ref<number> =  ref(0);
    const showWinnerInfos: Ref<boolean> = ref(false);
    const showDefineWinnerConfirm: Ref<boolean> = ref(false);
    const defineWinnerResults: Ref<boolean> = ref(null);
    const winnerInfo: Ref<IWinnerInfo> = ref({});
    const uploadedImages: Ref<Image[]> = ref(props.images || []);
    const passwordDeletePrizeInput: Ref<string> = ref("");
    const showDeleteRequestError: Ref<boolean> = ref(false);
    const deleteRequestError: Ref<string> = ref("");
    let dayjs, Modal;
    
    onMounted(() => {
        const { $initTE, $Modal, $Input: Input, $Toast: Toast, $Carousel: Carousel, $Popover, $dayjs } = useNuxtApp();
        dayjs = $dayjs;
        Modal = $Modal;
        $initTE({ Modal, Input, Toast, Carousel }, { allowReinits: true });
        /*Modal.getInstance(document.getElementById(`winners${props.id}Modal`)).addEventListener("hide.te.modal", () => {
            showWinnerInfos.value = false;
            showDefineWinnerConfirm.value = false;
            winnerInfo.value = {};
        })*///{todo}
    });

    function handleHide () {
        
    };

    async function saveProductTicketPurchaseLimit () {
        await setPrizeTicketPurchaseLimit(props.id, { 
            minTicketsPerPurchase: minTicketsPerPurchase.value, 
            maxTicketsPerPurchase: maxTicketsPerPurchase.value
        });
    };

    async function fetchBuyer () {
        try {
            winnerInfo.value = await fetchBuyerByTicketAndPrizeId(winnerTicketNumberInput.value, props.id);
            showWinnerInfos.value = !!winnerInfo.value;
            showDefineWinnerConfirm.value = false;
        } catch (err) {
            //{todo}
            showWinnerInfos.value = false;
            showDefineWinnerConfirm.value = false;
        };
    };

    async function defineWinner () {
        try {
            await defineWinnerByBuyerId(winnerInfo.value.user_id, props.id);
            defineWinnerResults.value = true;
        } catch (err) {
            defineWinnerResults.value = false;
        };
    };

    function onPrizeImageUploadInputChange (event: any) {
        addFiles(event.target.files);
        event.target.value = null
    };

    async function uploadPrizeImage (files: any[]) {
        try {
            const images: Image[] = (await Promise.all(files.map(({ file }) => {
                const formData = new FormData();
                formData.append("files", file);
                formData.append("ref", "api::prize.prize");
                formData.append("refId", props.id);
                formData.append("field", "images");
                return uploadFile(formData);
            }))).flat(Infinity);
            uploadedImages.value =  [ ... uploadedImages.value, ... images ];
            clearFiles();
        } catch (err) {
            console.log(err);
        };
    };

    async function deletePrizeImage (id: number) {
        try {
            await deleteFile(id);
            uploadedImages.value = uploadedImages.value.filter(image => image.id != id);
        } catch (err) {
            console.log(err);
        };
    };

    async function removePrize () {
        try {
            await deletePrize(props.id, passwordDeletePrizeInput.value);
            showDeleteRequestError.value = false;
        } catch (err) {
            console.log(err);
            deleteRequestError.value = err.data.error;
            showDeleteRequestError.value = true;
            setTimeout(() => {
                showDeleteRequestError.value = false;
            }, 2500);
        };
    };
</script>