<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";
import { useQuery } from '@tanstack/vue-query'
import type { ManagerStats } from "@/types/Manager";
import Sales from "@/components/Sales.vue";

const filter = ref('');

const queryKey = computed(() => ['managersStats', filter.value]);

const { status, data, error } = useQuery({
  queryKey,
  queryFn: () => getManagersStats(filter.value),
});

const selectedManagerStats = ref<ManagerStats | null>(null);

function selectManager(managerStats: ManagerStats) {
  if(!selectedManagerStats) {
    return;
  }
  selectedManagerStats.value = managerStats;
}


async function getManagersStats(filterName: string) {
  const response = await fetch(`http://localhost:3000/manager?name=${filterName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data.content.managersStats as Promise<ManagerStats[]>;
}

watchEffect(() => { // when the data changes, select the first manager
  if(status.value === 'success' && data.value) {
    selectManager(data.value[0]);
  }
});

</script>

<template>
  <p>Faire une recherche par nom:</p>
  <input v-model="filter" placeholder="Filtrer par nom" />

  <div class="flex flex-col h-full">
    <span v-if="status === 'pending'">Loading...</span>
  <span v-else-if="status === 'error'">Error: {{ error?.message }}</span>

  <div class="w-full" v-if="status === 'success'">
    <table class="min-w-full divide-y divide-gray-300">
      <thead>
      <tr>
        <th scope="col" class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Nom</th>
        <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Nb de ventes</th>
        <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">CA</th>
      </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
      <tr v-for="managerStats in data" :key="managerStats.manager.id" @click="selectManager(managerStats)" class="cursor-pointer">
        <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{{ managerStats.manager.firstName + ' ' + managerStats.manager.lastName }}</td>
        <td class="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">{{ managerStats.totalSales.value }}</td>
        <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ managerStats.totalSales.value.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</td>
      </tr>
      </tbody>
    </table>
  </div>

  <div class="flex flex-col md:flex-row gap-10" v-if="selectedManagerStats">
    <Sales :sales="selectedManagerStats.lastSales" >
      <template v-slot:header>
        Liste des ventes effectuées par {{ selectedManagerStats.manager.firstName + ' ' + selectedManagerStats.manager.lastName }}.
      </template>
    </Sales>
  </div>


    <!-- Enlever cette partie et la remplacer par votre code -->
    <h1 class="text-xl font-semibold text-gray-900">
      Vous devez implémenter la vue Gestionnaire ici
    </h1>
    <ul class="list-disc mt-4">
      <li>
        Afficher la liste des employés (Seulement les employés avec le rôle "Gestionnaire")
      </li>
      <li>
        Afficher les statistiques des gestionnaires
        (nombre de ventes, chiffre d'affaires total, dernières ventes en utilisant les clients qui lui sont associés)
      </li>
      <li>
        Implémenter un filtre pour afficher les employés par nom
      </li>
    </ul>
    <!-- Fin de la partie à remplacer -->
  </div>
</template>
