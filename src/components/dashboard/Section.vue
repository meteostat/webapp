<template>
  <section :id="id" class="card card-full-width mt-3 p-3 bg-light rounded">
    <div class="card-header card-header-main px-0 rounded-0 bg-light">
      <h2 class="card-header-title lead">
        {{ title }}
      </h2>
    </div>
    <div class="card-body px-0 pb-0">
      <slot />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'Section',

  props: {
    id: String,
    title: String
  }
})
</script>