<template>
    <div>
        <section :class="`${template} pt-10 mt-20`" id="steps">
            <div class="max-w-7xl mx-auto flex flex-col items-start">
            <div class="flex flex-col md:flex-row items-start text-neutral-400">
                <div class="flex-1 relative p-4 min-h-[180px]">
                    <span class="absolute font-extrabold texxt-opacity text-[180px] font-sans -top-[100px] -left-[5px]">1</span>
                    <h2 class="uppercase font-bold text-lg mb-4">
                    <i class="fas fa-search" aria-hidden="true"></i>
                    ESCOLHA A AÇÃO
                    </h2>
                    <p class="text-sm">Escolha a ação que gostaria de concorrer, verifique a descrição, regulamento
                    da ação e fotos. Em caso de dúvidas entre em contato com o administrador.</p>
                </div>
                <div class="flex-1 p-4 relative min-h-[180px]">
                    <span class="absolute font-extrabold texxt-opacity text-[180px] font-sans -top-[100px] -left-[5px]">2</span>
                    <h2 class="uppercase font-bold text-lg mb-4">
                    <i class="fas fa-check-circle" aria-hidden="true"></i>
                    SELECIONE SEUS BILHETES
                    </h2>
                    <p class="text-sm">Você pode escolher quantos bilhetes desejar!
                    Mais bilhetes, mais chances de ganhar.</p>
                </div>
                <div class="flex-1 p-4 relative min-h-[180px]">
                    <span class="absolute font-extrabold texxt-opacity text-[180px] font-sans -top-[100px] -left-[5px]">3</span>
                    <h2 class="uppercase font-bold text-lg mb-4">
                    <i class="fas fa-money-bill-wave" aria-hidden="true"></i>
                    FAÇA O PAGAMENTO
                    </h2>
                    <p class="z-20 text-sm">Faça o pagamento no(s) método(s) de pagamento(s) disponíveis no site.</p>
                </div>
                <div class="flex-1 p-4 relative min-h-[180px]">
                    <span class="absolute font-extrabold texxt-opacity text-[180px] font-sans -top-[100px] -left-[5px] ">4</span>
                    <h2 class="uppercase font-bold text-lg mb-4">
                    <i class="fas fa-hourglass-half" aria-hidden="true"></i>
                    AGUARDE O RESULTADO
                    </h2>
                    <p class="z-20 text-sm">Aguarde a ação. Cruze os dedos! Você pode ser o próximo sorteado.</p>
                </div>
            </div>
            </div>
        </section>
        <section class="pb-5 mt-auto bg-white">
            <div class="flex flex-col items-center p-2">
            <nav class="flex">
            <a :href="insta" v-if="insta !== ''" target="_blank" class="p-3 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 24 24">
                    <path d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z"></path>
                </svg>
            </a>
            <a :href="whats" v-if="whats !== ''" target="_blank" class="p-3 cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 30 30">
                    <path d="M 15 3 C 8.373 3 3 8.373 3 15 C 3 17.251208 3.6323415 19.350068 4.7109375 21.150391 L 3.1074219 27 L 9.0820312 25.431641 C 10.829354 26.425062 12.84649 27 15 27 C 21.627 27 27 21.627 27 15 C 27 8.373 21.627 3 15 3 z M 10.892578 9.4023438 C 11.087578 9.4023438 11.287937 9.4011562 11.460938 9.4101562 C 11.674938 9.4151563 11.907859 9.4308281 12.130859 9.9238281 C 12.395859 10.509828 12.972875 11.979906 13.046875 12.128906 C 13.120875 12.277906 13.173313 12.453437 13.070312 12.648438 C 12.972312 12.848437 12.921344 12.969484 12.777344 13.146484 C 12.628344 13.318484 12.465078 13.532109 12.330078 13.662109 C 12.181078 13.811109 12.027219 13.974484 12.199219 14.271484 C 12.371219 14.568484 12.968563 15.542125 13.851562 16.328125 C 14.986562 17.342125 15.944188 17.653734 16.242188 17.802734 C 16.540187 17.951734 16.712766 17.928516 16.884766 17.728516 C 17.061766 17.533516 17.628125 16.864406 17.828125 16.566406 C 18.023125 16.268406 18.222188 16.319969 18.492188 16.417969 C 18.766188 16.515969 20.227391 17.235766 20.525391 17.384766 C 20.823391 17.533766 21.01875 17.607516 21.09375 17.728516 C 21.17075 17.853516 21.170828 18.448578 20.923828 19.142578 C 20.676828 19.835578 19.463922 20.505734 18.919922 20.552734 C 18.370922 20.603734 17.858562 20.7995 15.351562 19.8125 C 12.327563 18.6215 10.420484 15.524219 10.271484 15.324219 C 10.122484 15.129219 9.0605469 13.713906 9.0605469 12.253906 C 9.0605469 10.788906 9.8286563 10.071437 10.097656 9.7734375 C 10.371656 9.4754375 10.692578 9.4023438 10.892578 9.4023438 z"></path>
                </svg>
            </a>
            </nav>
            </div>
            <div class="px-2 text-center text-raffle-500 dark:text-gray-300 bg-raffle dark:bg-[#161616]" x-init="checkLogoTheme">
                <small class="text-black">
                © 2023 ~ {{ year }} - Open Rifinha - Todos os direitos reservados
                </small>
                <div class="flex justify-center items-center mt-4">
                    <img style="max-height: 80px" src="/img/logo-2.png" alt="">
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts" setup>
    import { fetchConfig } from '~/services/config';
    const year: Ref<number> = ref(new Date().getFullYear());
    const whats: Ref<string> = ref("");
    const insta: Ref<string> = ref("");
    const template: Ref<string> = ref("");
    fetchConfig().then(({ whatsapp, instagram, theme }) => {

        template.value = theme;
        whats.value = whatsapp;
        insta.value = instagram;
    });
</script>

<style scoped>
    .texxt-opacity {
        color: rgba(114, 114, 114, 0.3);
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>