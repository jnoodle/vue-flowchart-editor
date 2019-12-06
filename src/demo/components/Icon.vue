<template>
  <i class="action" :title="text">
    <svg width="1em" height="1em" fill="currentColor">
      <use :xlink:href="'#' + type" />
    </svg>
  </i>
</template>

<script>
export default {
  name: 'EditorIcon',
  props: ['type', 'text'],
}
</script>
