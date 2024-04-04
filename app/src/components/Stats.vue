<script setup lang="ts">
import StatCard from "@/components/StatCard.vue";
import type { Stat } from "@/types/Stats";
import type { PropType } from "vue";

defineProps({
  name: {
    type: String,
    required: true,
  },
  items: {
    type: Array as PropType<Stat[]>,
  },
})
</script>

<template>
  <div class="w-full">
    <h3 class="text-base font-semibold leading-6 text-gray-900">
      {{ name }}
    </h3>
    <dl class="mt-5 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow flex flex-row md:divide-x md:divide-y-0">
      <StatCard v-for="item in items" :key="item?.name" :item="item" />
    </dl>
  </div>
</template>

<style scoped>

</style>
