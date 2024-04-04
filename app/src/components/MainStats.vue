<script setup lang="ts">
import StatCard from "@/components/StatCard.vue";

const props = defineProps({
  totalCa: {
    type: Number,
  },
  totalSales: {
    type: Number,
  },
  totalClients: {
    type: Number,
  },
})

const stats = [
  { name: 'Total CA', stat: props.totalCa, previousStat: '€ 1,200,000', variation: 10 },
  { name: 'Total Vente', stat: props.totalSales, previousStat: '€ 1,000,000', variation: -5 },
  { name: 'Total Clients', stat: props.totalClients, previousStat: '1,200', variation: 5 },
]
</script>

<template>
  <div class="w-full">
    <h3 class="text-base font-semibold leading-6 text-gray-900">
      Dashboard
    </h3>
    <dl class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
      <StatCard v-for="item in stats" :key="item.name" :item="item" />
    </dl>
  </div>
</template>

<style scoped>

</style>
