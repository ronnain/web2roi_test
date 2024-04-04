<script setup lang="ts">
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/vue/20/solid";
import type { PropType } from "vue";

defineProps({
  item: {
    type: Object as PropType<{
      name: string;
      stat: number;
      previousStat: string;
      variation: number;
    }>,
  },
});
</script>

<template>
  <div class="px-4 py-5 sm:p-6">
    <dt class="text-base font-normal text-gray-900">{{ item.name }}</dt>
    <dd class="mt-1 flex items-baseline justify-between md:block lg:flex">
      <div class="flex items-baseline text-2xl font-semibold text-indigo-600">
        {{ parseInt(item.stat as string).toLocaleString('fr-FR', { style: item.name === 'Total CA' ? 'currency' : 'decimal', currency: 'EUR' }) }}
      </div>

      <div :class="[item.variation > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800', 'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0']">
        <ArrowUpIcon v-if="item.variation > 0" class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500" aria-hidden="true" />
        <ArrowDownIcon v-else class="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500" aria-hidden="true" />
        {{ item.variation }}
      </div>
    </dd>
  </div>
</template>

<style scoped>

</style>
