<template>
  <div>
    <PrizeUpsert :queryType="PrizeUpsertTypes.Update" :prizeId="prizeId" />
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
    layout: "dashboard"
  });
  import { PrizeUpsertTypes } from '~/interface-types';
  import PrizeUpsert from '~/components/prizes/PrizeUpsert.vue';
  const prizeId: Ref<number> = ref(useRoute().query.id);
</script>