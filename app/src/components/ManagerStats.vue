<script setup lang="ts">
import type { ManagerStats } from '@/types/Manager';
import type { PropType } from 'vue';


defineProps({
  managerStats: {
    type: Object as PropType<ManagerStats>,
    required: true
  },
})
</script>

<template>

</template>

<style scoped>

</style>
