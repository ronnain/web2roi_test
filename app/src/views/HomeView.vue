<script setup lang="ts">
import Sells from "@/components/Sells.vue";
import MainStats from "@/components/MainStats.vue";
import RecentClients from "@/components/RecentClients.vue";
import { onMounted } from "vue";

async function getLastSales() {
  try {
    const response = await fetch("http://localhost:3000/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  const data = await getLastSales();
})
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

