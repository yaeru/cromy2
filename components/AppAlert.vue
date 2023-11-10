<script setup>
  defineProps({
    state: String
  })
</script>

<template>
  <div :class="'uk-text-center uk-alert uk-alert-' + state">
    <slot />
  </div>
</template>