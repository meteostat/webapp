import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    /**
     * Returns data of a single column as an array
     * 
     * @returns {Array} The column's values
     */
     fetchValues(this: any, column: string): Array<string|number|null> {
      if (this.data) {
        return this.data.map((record: Record<string, number>) => {
          return record[column]
        })
      }
      return []
    },

    /**
     * Check if any non-null data
     * 
     * @returns {Boolean}
     */
    anyData(this: any): boolean {
      return this.data?.some(
        (record: Record<string, number>) => Object.values(record).slice(1).some(
          parameter => parameter !== null
        )
      )
    },

    /**
     * Check if any non-null data for parameter
     * 
     * @returns {Boolean}
     */
    anyColData(this: any, col: string | string[]): boolean {
      if (typeof col === 'string') {
        return this.data?.some((record: Record<string, number>) => record[col] !== null)
      }
      else if (col.length) {
        for (let i = 0; i < col.length; i++) {
          const anyData = this.data?.some((record: Record<string, number>) => record[col[i]] !== null)
          if (anyData) {
            return true
          }
        }
      }
      return false
    },

    /**
     * Check if any null data for parameter
     * 
     * @returns {Boolean}
     */
    anyColGaps(this: any, column: string): boolean {
      return this.data?.some((record: Record<string, number>) => record[column] === null)
    }
  }
})