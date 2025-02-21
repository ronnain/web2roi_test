<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisHorizontalIcon } from '@heroicons/vue/20/solid'
import type { Client } from "@/types/Client";
import type { PropType } from "vue";

defineProps({
  lastClients: {
    type: Array as PropType<Client[]>,
  },
})
</script>

<template>
  <div class="w-full">
    <div class="flex items-center justify-between">
      <h2 class="text-base font-semibold leading-7 text-gray-900">
        Derniers clients
      </h2>
      <a href="#" class="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
        Voir tout
      </a>
    </div>
    <ul role="list" class="mt-6 flex flex-col gap-y-4">
      <li v-for="client in lastClients" :key="client.id" class="overflow-hidden rounded-xl border border-gray-200">
        <div class="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-2">
          <img :src="client.logo" :alt="client.name" class="size-8 flex-none rounded-lg bg-white p-1.5 ring-1 ring-gray-900/10" />
          <div class="text-sm font-medium leading-6 text-gray-900">{{ client.name }}</div>
          <Menu as="div" class="relative ml-auto">
            <MenuButton class="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
              <span class="sr-only">Open options</span>
              <EllipsisHorizontalIcon class="h-5 w-5" aria-hidden="true" />
            </MenuButton>
            <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
              <MenuItems class="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']"
                  >View<span class="sr-only">, {{ client.name }}</span></a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a href="#" :class="[active ? 'bg-gray-50' : '', 'block px-3 py-1 text-sm leading-6 text-gray-900']"
                  >Edit<span class="sr-only">, {{ client.name }}</span></a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
        <dl class="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
          <div class="flex justify-between gap-x-4 py-3">
            <dt class="text-gray-500">Dernière vente</dt>
            <dd class="text-gray-700">
              <time :datetime="client.lastSale">
                {{ new Date(client.lastSale).toLocaleDateString() }}D
              </time>
            </dd>
          </div>
          <div class="flex justify-between gap-x-4 py-3">
            <dt class="text-gray-500">CA Total</dt>
            <dd class="flex items-start gap-x-2">
              <div class="font-medium text-gray-900">{{ client.totalCA.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' }) }}</div>
            </dd>
          </div>
        </dl>
      </li>
    </ul>
  </div>
</template>

<style scoped>

</style>
