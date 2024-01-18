<template>
  <div class="max-w-7xl mx-auto flex flex-col items-start">
    <WinnerTitle />
    <div class="w-full grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 px-4">
      <div v-for="(winner, index) in winners" :key="winner.id">
        <WinnerCard
          :ticket="winner.ticket"
          :winnerName="winner.winnerName"
          :prizeName="winner.prizeName"
          :prizeImageURL="winner.prizeImageURL"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
    layout: "default"
  });
  import { IWinner } from "~/interface-types";
  import WinnerCard from "~/components/winners/WinnerCard.vue";
  import WinnerTitle from "~/components/winners/WinnerTitle.vue";
  import { fetchWinners } from "~/services/winners";
  const winners: Ref<IWinner[]> = ref(null);
  fetchWinners().then(data => winners.value = data);
</script>