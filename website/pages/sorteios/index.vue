<template>
    <div class="max-w-7xl mx-auto flex flex-col items-start">
        <PrizesPrizeTitle />
        <div class="w-full grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 px-4">
            <div v-for="(prize, index) in prizes" :key="prize.id">
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
</template>
  
<script lang="ts" setup>
    import { type IPrize } from '~/interface-types';
    import PrizeBasicCard from '~/components/prizes/PrizeBasicCard.vue';
    import { fetchPrizes } from '~/services/prizes';
    const prizes: Ref<IPrize[]> = ref([]);
    fetchPrizes().then(data => prizes.value = data);
</script>
  
  <style>
  .container {
    max-width: 960px;
  }
  </style>