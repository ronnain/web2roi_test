<script setup>
const transactions = [
  {
    id: '1',
    client: 'Acme Corporation',
    price: '$3,509.00',
    roi: '+$4.37',
  },
  {
    id: '2',
    client: 'Umbrella Corporation',
    price: '$3,509.00',
    roi: '+$4.37',
  },
  {
    id: '3',
    client: 'Wayne Enterprises',
    price: '$3,509.00',
    roi: '+$4.37',
  },
  {
    id: '1',
    client: 'Acme Corporation',
    price: '$3,509.00',
    roi: '+$4.37',
  },
  {
    id: '2',
    client: 'Umbrella Corporation',
    price: '$3,509.00',
    roi: '+$4.37',
  },
  {
    id: '3',
    client: 'Wayne Enterprises',
    price: '$3,509.00',
    roi: '+$4.37',
  },
  {
    id: '1',
    client: 'Acme Corporation',
    price: '$3,509.00',
    roi: '+$4.37',
  },
  {
    id: '2',
    client: 'Umbrella Corporation',
    price: '$3,509.00',
    roi: '+$4.37',
  },
  {
    id: '3',
    client: 'Wayne Enterprises',
    price: '$3,509.00',
    roi: '+$4.37',
  },
  {
    id: '1',
    client: 'Acme Corporation',
    price: '$3,509.00',
    roi: '+$4.37',
  },
  {
    id: '2',
    client: 'Umbrella Corporation',
    price: '$3,509.00',
    roi: '+$4.37',
  },
  {
    id: '3',
    client: 'Wayne Enterprises',
    price: '$3,509.00',
    roi: '+$4.37',
  },
]
</script>

<template>
  <div class="w-full">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">Sells</h1>
        <p class="mt-2 text-sm text-gray-700">Here you can see all the sells made by our clients.</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button type="button" class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Export</button>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table class="min-w-full divide-y divide-gray-300">
            <thead>
            <tr>
              <th scope="col" class="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Client ID</th>
              <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Client</th>
              <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">Prix</th>
              <th scope="col" class="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">ROI</th>
            </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td class="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">{{ transaction.id }}</td>
              <td class="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">{{ transaction.client }}</td>
              <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ transaction.price }}</td>
              <td class="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{{ transaction.roi }}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
