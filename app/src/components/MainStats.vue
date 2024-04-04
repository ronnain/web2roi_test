<script setup lang="ts">
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/20/solid'

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
  { name: 'Total CA', stat: props.totalCa, previousStat: '€ 1,200,000', change: '12%', changeType: 'increase' },
  { name: 'Total Vente', stat: props.totalSales, previousStat: '€ 1,000,000', change: '10%', changeType: 'increase' },
  { name: 'Total Clients', stat: props.totalClients, previousStat: '1,200', change: '5%', changeType: 'decrease' },
]
</script>

<template>
  <div class="w-full">
    <h3 class="text-base font-semibold leading-6 text-gray-900">
      Dashboard
    </h3>
    <dl class="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">
      <div v-for="item in stats" :key="item.name" class="px-4 py-5 sm:p-6">
        <dt class="text-base font-normal text-gray-900">{{ item.name }}</dt>
        <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
          <div class="flex items-baseline text-2xl font-semibold text-indigo-600">
            {{ parseInt(item.stat as string).toLocaleString('fr-FR', { style: item.name === 'Total CA' ? 'currency' : 'decimal', currency: 'EUR' }) }}
          </div>

          <div :class="[item.changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800', 'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0']">
            <ArrowUpIcon v-if="item.changeType === 'increase'" class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
            <ArrowDownIcon v-else class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
            <span class="sr-only"> {{ item.changeType === 'increase' ? 'Increased' : 'Decreased' }} by </span>
            {{ item.change }}
          </div>
        </dd>
      </div>
    </dl>
  </div>
</template>

<style scoped>

</style>
