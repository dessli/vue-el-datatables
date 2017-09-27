<template>
  <div>
    <DataTables
    ref="datatables"
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
  </div>
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
        {width: 120, prop: 'uid', label: 'UID', sortable: 'custom', fixed: 'left'},
        {width: 160, prop: 'nickname', label: '昵称', headSearch: true, sortable: false},
        {width: 160, prop: 'username', label: '用户名', headSearch: true, sortable: false},
        {width: 160, prop: 'jobsName', label: '部门名称', sortable: 'custom'},
        {minWidth: 60, prop: 'action', label: '操作', fixed: 'right', sortable: false, slot: true}
      ],
      tableData: [{status: 0, uid: 1, 'nickname': 111, 'username': 'user1', 'jobsName': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, uid: 2, 'nickname': 222, 'username': 'user2', 'jobsName': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, uid: 3, 'nickname': 111, 'username': 'user1', 'jobsName': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, uid: 4, 'nickname': 222, 'username': 'user2', 'jobsName': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, uid: 5, 'nickname': 111, 'username': 'user1', 'jobsName': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, uid: 6, 'nickname': 222, 'username': 'user2', 'jobsName': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, uid: 7, 'nickname': 111, 'username': 'user1', 'jobsName': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, uid: 8, 'nickname': 222, 'username': 'user2', 'jobsName': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, uid: 9, 'nickname': 111, 'username': 'user1', 'jobsName': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, uid: 10, 'nickname': 222, 'username': 'user2', 'jobsName': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, uid: 11, 'nickname': 111, 'username': 'user1', 'jobsName': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, uid: 12, 'nickname': 222, 'username': 'user2', 'jobsName': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, uid: 13, 'nickname': 111, 'username': 'user1', 'jobsName': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, uid: 14, 'nickname': 222, 'username': 'user2', 'jobsName': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, uid: 15, 'nickname': 111, 'username': 'user1', 'jobsName': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, uid: 16, 'nickname': 222, 'username': 'user2', 'jobsName': 'xxxxx@xx.xxx', 'sector': 'sector2'}, {status: 0, uid: 17, 'nickname': 111, 'username': 'user1', 'jobsName': 'xxxx@xx.xxx', 'sector': 'sector'}, {status: 1, uid: 18, 'nickname': 222, 'username': 'user2', 'jobsName': 'xxxxx@xx.xxx', 'sector': 'sector2'}]
    }
  },
  methods: {
    apiError (msg) {
      console.log(msg)
    },
    sortChange () {
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
      console.log(args, 'serverApi args');
      let resUserList = await getUserList(args.offset, args.limit, args.search, args.order)
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
