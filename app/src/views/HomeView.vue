<script setup lang="ts">
import Sales from "@/components/Sales.vue";
import Stats from "@/components/Stats.vue";
import RecentClients from "@/components/RecentClients.vue";
import { onMounted, ref } from "vue";
import type { Sale } from "@/types/sales";
import type { Client } from "@/types/Client";
import type { Stat } from "@/types/Stats";

const loading = ref(false);

const sales = ref<Sale[] | null>(null);
const lastClients = ref<Client[] | null>(null);
const totalCA = ref<Stat | null>(null);
const totalSales = ref<Stat | null>(null);
const totalClients = ref<Stat | null>(null);

async function getDashboardData() {
  try {
    const response = await fetch("http://localhost:3000/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  loading.value = true;
  const data = await getDashboardData();
  sales.value = data.sales;
  lastClients.value = data.lastClients;
  totalCA.value = data.totalCA;
  totalSales.value = data.totalSales;
  totalClients.value = data.totalClients;
  loading.value = false;
})
</script>

<template>
  <div>
    <div class="flex flex-col gap-10" v-if="!loading">
      <div>
        <Stats v-if="totalCA && totalSales && totalSales" :items="[totalCA, totalSales, totalSales]" name="Dashboard" />
      </div>
      <div class="flex flex-col md:flex-row gap-10" v-if="!!sales">
        <Sales :sales="sales" >
          <template v-slot:header>
            Liste des ventes effectuées par nos clients.
          </template>
        </Sales>
        <RecentClients :lastClients="lastClients" v-if="lastClients"/>
      </div>
    </div>
    <div v-else>
      <div class="flex justify-center items-center h-screen">
        <svg
          class="animate-spin h-10 w-10 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V4a10 10 0 00-1.93 2.3"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>

