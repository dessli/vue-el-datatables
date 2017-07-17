<template>
  <DataTables
  :columnHead="columnHead"
  :serverApi="serverApi"
  :searchBar="true"
  :sortChange="sortChange"
  :rowClick="rowClick"
  :rowContextmenu="rowContextmenu"
  :rowDblclick="rowDblclick"
  :useStore="false"
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
import { getUserList } from './api'

export default {
  components: {
    DataTables
  },
  data () {
    return {
      columnHead: [
        {width: 120, prop: 'uid', label: 'UID', sortable: true, fixed: 'left'},
        {width: 160, prop: 'nickname', label: '昵称', headSearch: true, sortable: false},
        {width: 160, prop: 'username', label: '用户名', headSearch: true, sortable: false},
        {width: 160, prop: 'jobsName', label: '部门名称', sortable: true},
        {minWidth: 60, prop: 'action', label: '操作', fixed: 'right', sortable: false, slot: true}
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
    serverApi: async function (args) {
      let resUserList = await getUserList()
      if (resUserList.errcode === 0) {
        return {data: resUserList.data, total: resUserList.total}
      } else {
        throw resUserList.errmsg
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
