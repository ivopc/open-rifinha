<template>
  <div>
    <div class="flex items-center justify-center h-screen">
      <DashboardHeader />
      <div class="md:w-6/10 flex-auto h-screen">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import DashboardHeader from "~/components/dashboard/DashboardHeader.vue";
</script>

<style scoped>
</style>
