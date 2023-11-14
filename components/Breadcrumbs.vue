

<template>
  <nav class="inline-flex items-center text-sm font-normal font-body">
    <ol class="">
      <li v-for="(item, index) in breadcrumbs" :key="item.name">
        <NuxtLink v-if="index === 0" :to="item.path">
          🏠
        </NuxtLink>
        <NuxtLink v-else :to="item.path">
          {{ item.name }}
        </NuxtLink>
      </li>
      <li>
        pepe
      </li>
    </ol>
  </nav>
</template>

<script lang="ts" setup>

import { ref } from 'vue';

import { resolveComponent } from 'vue';

const NuxtLink = resolveComponent('NuxtLink');

const props = defineProps({
  breadcrumbs: {
    type: Array,
    required: true,
  },
});

</script>