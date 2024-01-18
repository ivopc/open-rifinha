<script lang="ts" setup>
  interface INavBar {
    name: string,
    path: string
  };

  const routes: Ref<INavBar[]> = ref([
    {
      name: "Início",
      path: "/dashboard"
    },
    {
      name: "Sorteios",
      path: "/dashboard/sorteios"
    },
    {
      name: "Pedidos",
      path: "/dashboard/pedidos"
    },
    {
      name: "Ranking",
      path: "/dashboard/ranking"
    },
    {
      name: "Layout",
      path: "/dashboard/layout"
    },
    {
      name: "Configurações",
      path: "/dashboard/config"
    }
  ]);
</script>

<template>
    <div class="flex items-center justify-center h-screen">
        <div class="dark:bg-neutral-900 md:w-4/10 h-screen flex-1">
            <div class="flex flex-col justify-start items-center   px-6 border-b border-gray-600 w-full  ">
                <button class="focus:outline-none focus:text-indigo-400 text-left  text-white flex justify-between items-center w-full py-5 space-x-14  ">
                    <p class="text-sm leading-5  uppercase">Menu de Navegação</p>
                    <svg id="icon1" class="transform" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 15L12 9L6 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
                <div id="menu1" class="flex justify-start flex-col w-full md:w-auto items-start pb-1">
                    <div v-for="(route, index) in routes" :key="index">
                        <NuxtLink :to="route.path" class="flex justify-start items-center space-x-6 hover:text-white focus:dark:bg-neutral-700 focus:text-white hover:dark:bg-neutral-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
                            <p class="text-base leading-4">{{ route.name }}</p>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
