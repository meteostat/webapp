<template>
  <div ref="group" class="input-group copy-input">
    <slot />
    <button :class="`btn ${btn}`" type="button" @click="copy()">
      <icon v-if="justCopied" :icon="['fas', 'check']" class="text-success" />
      <icon v-else :icon="['fas', 'copy']" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CopyInput',

  props: {
    btn: {
      type: String,
      default: 'btn-outline-dark btn-copy'
    }
  },

  data() {
    return {
      justCopied: false
    };
  },

  methods: {
    copy() {
      const input = (this.$refs as any).group.querySelector('input') as HTMLInputElement;
      navigator.clipboard.writeText(input.value);
      this.justCopied = true;
      setTimeout(() => {
        this.justCopied = false;
      }, 3000);
    }
  }
});
</script>

<style lang="scss">
@import '~/style/variables';
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';
@import 'bootstrap/scss/mixins';

.copy-input {
  .form-floating {
    flex: 1;
  }

  button {
    width: 50px;

    &.btn-copy {
      background: white;
      border-color: $input-border-color;

      &:hover {
        color: $primary;
      }
    }
  }

  input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
}
</style>
