<script setup lang="ts">
import { onMounted, ref } from "vue";
import SelectMenu from "@/components/SelectMenu.vue";
import Stats from "@/components/Stats.vue";

const loading = ref(false);
const clients = ref(null);
const selectedClient = ref(null);
const selectOptions = ref(null);

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
    return data.content;
  } catch (error) {
    console.error(error);
  }
}

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
      <SelectMenu :items="selectOptions" @update:selectedItem="selectedClient = $event" label="Sélectionner un client" />
      <div v-if="selectedClient">
        <Stats :name="`${selectedClient.name}`" :items="[]" />
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
