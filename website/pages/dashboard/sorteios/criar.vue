<template>
  <div>
    <PrizeUpsert :queryType="PrizeUpsertTypes.Insert" />
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({
    layout: "dashboard"
  });
  import { PrizeUpsertTypes } from '~/interface-types';
  import PrizeUpsert from '~/components/prizes/PrizeUpsert.vue';
</script>