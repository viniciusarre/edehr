<template lang="pug">
  div
    div(class="no-data" v-if="!hasData") There are no records or reports for this patient.
    div(v-else)
      table.table_horizontal
        thead
          tr
            th(v-for="stack in stacks", :class="tableColumnCss(stack)" :title="columnTitle(stack)")
              span(v-html="columnTitle(stack)")
        tbody
          tr(v-for="tblRow in stackedData")
            td(v-for="stack in tblRow", :class="getCellCss(stack)")
              div(v-for="cell in stack") {{ getCellData(cell) }} &nbsp;
</template>

<script>
import EhrCommonTable from './EhrCommonTable'

export default {
  name: 'EhrPageTableStacked',
  extends: EhrCommonTable,
  data: function () {
    return {
      // stackedData contains an array (of rows).
      // Each row contains an arrary of stacks.
      // Each stack contains an array of cells.
      // A Cell has label, inputType, elementKey and the current value
      stackedData: []
    }
  },
  computed: {
    hasData () {
      return this.stackedData.length > 0
    },
    stacks () { return this.tableDef.stacks}
  },
  methods: {
    columnTitle: function (stack) {
      return stack.primary ? stack.primary.label : 'not sure'
    },
    tableColumnCss: function (stack) {
      return stack.primary ? stack.primary.tableCss : 'stackedColumn'
    },
    refresh () {
      const tableDef = this.tableDef
      this.stackedData = tableDef.stackedData
      // console.log('table view refresh', tableDef)
    }
  },

}
</script>

