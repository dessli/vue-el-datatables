<template>
  <DataTables
  :columnHead="columnHead"
  :tableData="tableData"
  :serverApi="serverApi"
  :searchBar="true"
  :sortChange="sortChange"
  :rowClick="rowClick"
  :rowContextmenu="rowContextmenu"
  :rowDblclick="rowDblclick"
  @apiError="apiError">
    <el-button type="primary" slot="toolBar">add User</el-button>
    <template scope="props">
      <el-button v-if="props.columnID === 'action'" @click.stop="apiError(props.ev.row.id)">Edit</el-button>
      <div v-if="props.columnID === 'status'" :class="formatStatus(props.ev.row.status)[0]">{{formatStatus(props.ev.row.status)[1]}}</div>
    </template>
  </DataTables>
</template>

<script>
import DataTables from '@'

export default {
  components: {
    DataTables
  },
  data () {
    return {
      columnHead: [
        {width: 120, prop: 'status', label: 'Status', slot: true, fixed: 'left', filters: [{ text: 'start', value: 0 }, { text: 'stop', value: 1 }], filterMethod: (value, row) => { return row.status === value }},
        {width: 260, prop: 'id', label: 'Nickname', headSearch: true, sortable: true},
        {width: 260, prop: 'username', label: 'username', headSearch: true, sortable: true},
        {width: 380, prop: 'email', label: 'email', sortable: true},
        {width: 260, prop: 'sector', label: 'sector', headSearch: true, sortable: true},
        {minWidth: 60, prop: 'action', label: 'action', fixed: 'right', sortable: false, slot: true}
      ],
      tableData: [{status: 0, id: 1, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, id: 2, 'name': 222, 'username': 'user2', 'email': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, id: 3, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, id: 4, 'name': 222, 'username': 'user2', 'email': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, id: 5, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, id: 6, 'name': 222, 'username': 'user2', 'email': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, id: 7, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, id: 8, 'name': 222, 'username': 'user2', 'email': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, id: 9, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, id: 10, 'name': 222, 'username': 'user2', 'email': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, id: 11, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, id: 12, 'name': 222, 'username': 'user2', 'email': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, id: 13, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, id: 14, 'name': 222, 'username': 'user2', 'email': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, id: 15, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, id: 16, 'name': 222, 'username': 'user2', 'email': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, id: 17, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, id: 18, 'name': 222, 'username': 'user2', 'email': 'xxxxx@xx.xxx', 'sector': 'sector2'}]
    }
  },
  methods: {
    apiError (msg) {
      console.log(msg)
    },
    sortChange ({ column, prop, order }) {
      console.log('sortChange')
    },
    rowClick (row, event, column) {
      console.log('rowClick')
    },
    rowContextmenu (row, event) {
      console.log('rowContextmenu')
    },
    rowDblclick (row, event) {
      console.log('rowDblclick')
    },
    serverApi (args) {
      if (args.offset >= 10 && args.offset < 20) {
        return {data: [{status: 0, id: 11, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, id: 12, 'name': 222, 'username': 'user2', 'email': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, id: 13, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, id: 14, 'name': 222, 'username': 'user2', 'email': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, id: 15, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, id: 16, 'name': 222, 'username': 'user2', 'email': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, id: 17, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, id: 18, 'name': 222, 'username': 'user2', 'email': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, id: 19, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 0, id: 20, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}], total: 160}
      } else if (args.offset >= 20) {
        return {data: [{status: 0, id: 21, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, id: 22, 'name': 222, 'username': 'user2', 'email': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, id: 23, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, id: 24, 'name': 222, 'username': 'user2', 'email': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, id: 25, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}], total: 160}
      } else {
        return {data: [{status: 0, id: 1, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, id: 2, 'name': 222, 'username': 'user2', 'email': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, id: 3, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, id: 4, 'name': 222, 'username': 'user2', 'email': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, id: 5, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, id: 6, 'name': 222, 'username': 'user2', 'email': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, id: 7, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, id: 8, 'name': 222, 'username': 'user2', 'email': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, id: 9, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 0, id: 10, 'name': 111, 'username': 'user1', 'email': 'xxxx@xx.xxx', 'sector': 'sector'}], total: 160}
      }
    },
    formatStatus (status) {
      switch (status) {
        case 0:
          return ['text-accent', 'start']
        case 1:
          return ['text-accent', 'end']
        default:
          return ['text-accent', 'unknow']
      }
    }
  }
}
</script>

<style>

</style>
