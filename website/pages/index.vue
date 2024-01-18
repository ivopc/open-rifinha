<template>
  <div>
    <div class="max-w-7xl mx-auto flex flex-col items-start">
      <PrizeTitle />
      <div class="w-full grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 px-4">
        <div v-for="prize in prizes" :key="prize.id">
          <PrizeBasicCard
            :id="prize.id"
            :title="prize.title"
            :subtitle="prize.subtitle"
            :availability="prize.availability"
            :image="prize.images[0]"
          />
        </div>
      </div>
    </div>
    <div class="max-w-7xl mx-auto flex flex-col items-start">
      <WinnerTitle />
      <div class="w-full grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 px-4">
        <div v-for="winner in winners" :key="winner.id">
            <WinnerCard
              :ticket="winner.ticket"
              :winnerName="winner.winnerName"
              :prizeName="winner.prizeName"
              :prizeImageURL="winner.prizeImageURL"
            />
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts" setup>
  definePageMeta({
    layout: "default"
  });
  import { fetchWinners } from '~/services/winners';
  import { fetchPrizes } from '~/services/prizes';
  import { type IPrize, type IWinner } from '~/interface-types';
  import WinnerCard from '~/components/winners/WinnerCard.vue';
  import WinnerTitle from '~/components/winners/WinnerTitle.vue';
  import PrizeBasicCard from '~/components/prizes/PrizeBasicCard.vue';
  import PrizeTitle from '~/components/prizes/PrizeTitle.vue'; 
  const CONTENT_FETCH_LENGTH = 3;
  const prizes: Ref<IPrize[]> = ref([]);
  const winners: Ref<IWinner[]> = ref([]);
  fetchPrizes().then(data => prizes.value = data.filter((prize, index) => index < CONTENT_FETCH_LENGTH));
  fetchWinners().then(data => winners.value = data.filter((winner, index) => index < CONTENT_FETCH_LENGTH));
</script>