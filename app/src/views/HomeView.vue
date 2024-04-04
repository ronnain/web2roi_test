<script setup lang="ts">
import Sells from "@/components/Sells.vue";
import MainStats from "@/components/MainStats.vue";
import RecentClients from "@/components/RecentClients.vue";
</script>

<template>
  <div class="flex flex-col gap-10">
    <div>
      <MainStats />
    </div>
    <div class="flex flex-col md:flex-row gap-10">
      <Sells />
      <RecentClients />
    </div>
  </div>
</template>

