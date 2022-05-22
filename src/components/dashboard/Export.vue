<template>
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">
        {{ t('export') }}
      </h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" :aria-label="t('close')" />
    </div>
    <div class="modal-body">
      <p>{{ t('$description') }}</p>
      <template v-if="data.length > 0">
        <form class="mb-3">
          <div class="form-floating mb-3">
            <select id="formatSelect" v-model="selectedFormat" class="form-select">
              <option v-for="format in formats" :key="format" :value="format.type">
                {{ format.name }}
              </option>
            </select>
            <label for="formatSelect">{{ t('format') }}</label>
          </div>
        </form>
        <div>
          <a
            data-bs-toggle="collapse"
            href="#exportColumnsCollapse"
            aria-expanded="false"
            aria-controls="exportColumnsCollapse"
          >
            {{ t('showColumns') }}
          </a>
          <div id="exportColumnsCollapse" class="collapse mt-2">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>{{ t('column') }}</th>
                  <th>{{ t('description') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(col, key) in Object.keys(data[0])" :key="col">
                  <th scope="row">
                    {{ key + 1 }}
                  </th>
                  <td class="font-monospace">{{ col }}</td>
                  <td>{{ t(`$params.${col}`) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" @click="save">
        {{ t('save') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import loadScript from '~/utils/scriptLoader';

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
    const { t } = useI18n();

    return { t };
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
    };
  },

  methods: {
    async save() {
      // Save
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.2/xlsx.full.min.js').then(() => {
        const wb = window.XLSX.utils.book_new();
        const ws = window.XLSX.utils.json_to_sheet(this.data);
        window.XLSX.utils.book_append_sheet(wb, ws, 'Export');
        window.XLSX.writeFile(wb, `export.${this.selectedFormat}`);
      });
    }
  }
});
</script>

<i18n>
{
  "en": {
    "$description": "Download selected weather data in the format of your choice.",
    "format": "Format",
    "showColumns": "Show columns",
    "column": "Column",
    "description": "Description"
  },
  "de": {
    "$description": "Laden Sie die ausgewählten Wetterdaten in einem Format Ihrer Wahl herunter.",
    "format": "Format",
    "showColumns": "Spalten anzeigen",
    "column": "Spalte",
    "description": "Beschreibung"
  },
  "it": {
    "$description": "Scarica i dati meteo selezionati nel formato di tua scelta.",
    "format": "Formato",
    "showColumns": "Mostra Colonne",
    "Column": "Colonna",
    "description": "Descrizione"
  },
  "es": {
    "$description": "Descarga los datos meteorológicos seleccionados en el formato que elijas.",
    "format": "Formato",
    "showColumns": "Mostrar Columnas",
    "column": "Columna",
    "description": "Descripción"
  },
  "nl": {
    "$description": "Download geselecteerde weergegevens in het formaat van uw keuze.",
    "format": "Formaat",
    "showColumns": "Toon kolommen",
    "column": "Column",
    "description": "Description"
  },
  "fr": {
    "$description" : "Télécharger les données météorologiques sélectionnées dans le format de votre choix.",
    "format" : "Format",
    "showColumns" : "Afficher les colonnes",
    "column" : "Colonne",
    "description" : "Description"
  },
  "pt": {
    "$description": "Descarregar dados meteorológicos seleccionados no formato da sua escolha.",
    "format": "Formato",
    "showColumns": "Mostrar Colunas",
    "column": "Coluna",
    "description": "Descrição"
  },
  "ru": {
    "$description": "Загрузить выбранные данные о погоде в выбранном вами формате.",
    "format": "Формат",
    "showColumns": "Показать столбцы",
    "column": "Колонка",
    "description": "Описание"
  }
}
</i18n>
