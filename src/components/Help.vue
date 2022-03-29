<template>
  <div id="helpModal" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            <icon :icon="['fas', 'question-circle']" class="me-1" />
            {{ t('help') }}
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';

export default defineComponent({
  name: 'Help',

  props: {
    text: {
      type: String,
      required: true
    }
  },

  setup(): Record<string, Store | Array<string> | any> {
    const { t } = useI18n();
    return { t };
  }
});
</script>
