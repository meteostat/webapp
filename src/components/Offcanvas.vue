<template>
  <div class="offcanvas-header">
    <h5 id="offcanvasExampleLabel" class="offcanvas-title">
      {{ title }}
    </h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" :aria-label="t('close')" />
  </div>
  <div class="offcanvas-body">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'Offcanvas',

  props: {
    title: String
  },

  setup(): Record<string, any> {
    const { t } = useI18n();

    return { t };
  }
});
</script>