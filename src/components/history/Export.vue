<template>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">
          {{ t('export') }}
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          :aria-label="t('close')"
        />
      </div>
      <div class="modal-body">
        <p>{{ t('description') }}</p>
        <template
          v-if="data.length > 0"
        >
          <form class="mb-3">
            <div class="form-floating mb-3">
              <select
                id="formatSelect"
                v-model="selectedFormat"
                class="form-select"
              >
                <option
                  v-for="format in formats"
                  :key="format"
                  :value="format.type"
                >
                  {{ format.name }}
                </option>
              </select>
              <label for="formatSelect">Format</label>
            </div>
          </form>
          <div>
            <a
              data-bs-toggle="collapse"
              href="#exportColumnsCollapse"
              aria-expanded="false"
              aria-controls="exportColumnsCollapse"
            >
              Show Columns
            </a>
            <div
              id="exportColumnsCollapse"
              class="collapse mt-2"
            >
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Column</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(col, key) in Object.keys(data[0])"
                    :key="col"
                  >
                    <th scope="row">
                      {{ key + 1 }}
                    </th>
                    <td>{{ col }}</td>
                    <td>{{ t(col) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </template>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          {{ t('close') }}
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="save"
        >
          {{ t('save') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import loadScript from '~/utils/scriptLoader'

export default defineComponent({
  name: 'Export',

  props: {
    data: {
      type: Array,
      default: () => []
    }
  },

  setup() {
    // Translations
    const { t } = useI18n()

    return { t }
  },

  data() {
    return {
      formats: [
        {
          name: 'Excel',
          type: 'xlsx'
        },
        {
          name: 'Open Document',
          type: 'ods'
        },
        {
          name: 'HTML',
          type: 'html'
        },
        {
          name: 'CSV',
          type: 'csv'
        }
      ],
      selectedFormat: 'xlsx'
    }
  },

  methods: {
    async save() {
      // Loading
      this.$loading('export')
      // Save
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.2/xlsx.full.min.js').then(() => {
        const wb = window.XLSX.utils.book_new()
        const ws = window.XLSX.utils.json_to_sheet(this.data)
        window.XLSX.utils.book_append_sheet(wb, ws, 'Export')
        window.XLSX.writeFile(wb, `export.${this.selectedFormat}`)
        this.$loaded('export')
      })
    }
  }
})
</script>

<i18n>
{
  "en": {
    "description": "Download selected weather data in the format of your choice.",
    "includeHeader": "Include header row"
  }
}
</i18n>