<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import SelectMenu from "@/components/SelectMenu.vue";
import Stats from "@/components/Stats.vue";
import Chart from "@/components/Chart.vue";

const loading = ref(false);
const clients = ref(null);
const selectedClient = ref(null);
const selectOptions = ref(null);
const lastSales = ref(null);
const totalCA = ref(null);
const totalSales = ref(null);
const salesByMonth = ref(null);

async function getClients() {
  try {
    const response = await fetch("http://localhost:3000/client", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    selectOptions.value = data.content.clients.map((client) => ({
      id: client.id,
      name: client.name,
      image: client.logo,
    }));
    return data.content;
  } catch (error) {
    console.error(error);
  }
}

async function getClientsData(id) {
  try {
    const response = await fetch(`http://localhost:3000/client/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    lastSales.value = data.content.lastSales;
    totalCA.value = data.content.totalCA;
    totalSales.value = data.content.totalSales;
    salesByMonth.value = data.content.salesByMonth;
  } catch (error) {
    console.error(error);
  }
}

watch(() => selectedClient.value, (value) => {
    if (value) {
      getClientsData(value.id);
    }
});

onMounted(async () => {
  loading.value = true;
  const data = await getClients();
  clients.value = data.clients;
  loading.value = false;
});
</script>

<template>
  <div>
    <div class="flex flex-col gap-10" v-if="!loading">
      <SelectMenu v-if="selectOptions" :items="selectOptions" @update:selectedItem="selectedClient = $event" label="Sélectionner un client" />
      <div v-if="selectedClient">
        <div class="flex flex-col gap-4">
          <img :src="selectedClient.image" alt="" class="size-12 rounded-full" />
          <Stats :name="`${selectedClient.name}`" :items="[totalCA, totalSales]" />
        </div>
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
            <tr>
              <th scope="col" class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Vente ID</th>
              <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Prix</th>
              <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">ROI</th>
              <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Quantité</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="sale in lastSales" :key="sale.id">
              <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{{ sale.id }}</td>
              <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ sale.amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</td>
              <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ sale.roi.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</td>
              <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ sale.quantity }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-10">
          <Chart v-if="salesByMonth" name="Ventes mensuelles" :salesByMonth="salesByMonth" />
        </div>
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
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 014 12H0c0 6.627 5.373 12 12 12v-4c-2.084 0-4.042-.818-5.497-2.29l1.414-1.414z"
          ></path>
        </svg>
      </div>
    </div>
  </div>
</template>
