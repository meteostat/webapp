export default {
  methods: {
    /**
     * Returns data of a single column as an array
     * 
     * @returns {Array} The column's values
     */
     fetchValues(column: string): Array<string|number|null> {
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
    anyData(): boolean {
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
    anyColData(column: string): boolean {
      return this.data?.some((record: Record<string, number>) => record[column] !== null)
    },

    /**
     * Check if any null data for parameter
     * 
     * @returns {Boolean}
     */
    anyColGaps(column: string): boolean {
      return this.data?.some((record: Record<string, number>) => record[column] === null)
    }
  }
}