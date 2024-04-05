<script setup lang="ts">
import { type PropType, ref } from "vue";

type SalesByMonth = {
  xaxis: string[];
  yaxis: number[];
}

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  salesByMonth: {
    type: Object as PropType<SalesByMonth>,
    required: true,
  },
})

const chartOptions = {
  chart: {
    id: "area",
    type: "area",
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
    background: "transparent",
  },
  plotOptions: {
    area: {
      fillTo: "end",
    },
  },
  fill: {
    type: "gradient",
    gradient: {
      shade: "dark",
      shadeIntensity: 0.1,
      opacityFrom: 0,
      opacityTo: 0,
      stops: [0, 90, 100],
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 2,
  },
  grid: {
    show: false,
    borderColor: "#f2f3f4",
  },
  markers: {
    size: 0,
    style: "hollow",
  },
  xaxis: {
    categories: props.salesByMonth.xaxis,
  },
  yaxis: {
    labels: {
      formatter: (value: number) => {
        return value.toLocaleString("fr-FR", {
          style: "currency",
          currency: "EUR",
        });
      },
    },
    decimalsInFloat: 2
  },
};
</script>

<template>
  <div>
    <h3 class="text-lg font-semibold text-gray-700 mb-4">
      {{ name }}
    </h3>
    <div class="relative">
      <div class="dot-pattern"></div>
      <apexchart
          id="chart"
          ref="chart"
          height="350"
          type="area"
          :options="chartOptions"
          :series="[{ name: 'Ventes', data: salesByMonth.yaxis }]"
      />
    </div>
  </div>
</template>

<style scoped>
.dot-pattern {
  --dot-pattern-color: #9f9fa1;
  position: absolute;
  inset: 0;

  background-image: radial-gradient(var(--dot-pattern-color) 1px, transparent 1px);
  background-size: 7px 7px;
  background-position: -8.5px -8.5px;
  opacity: 40%;

  mask-image: radial-gradient(ellipse at center, rgba(0, 0, 0, 1), transparent 85%);
}
</style>
