<template>
  <div style="padding: 25px;">
      <DataTableToolBar ref="toolBar" :searchBar="searchBar" :columnHead="columnHead" @query="toolBarSerachQuery" @queryItem="toolBarItemSerachQuery"><slot name="toolBar"></slot></DataTableToolBar>
      <el-row>
        <el-table class="mb-12" :data="viewTableData" stripe highlight-current-row
        v-loading="apiLoading"
        @sort-change="sortChange"
        @row-click="rowClick"
        @row-contextmenu="rowContextmenu"
        @row-dblclick="rowDblclick"
        >
        <el-table-column v-for="(item, index) in columnHead" :key="index"
          :fixed="item.fixed"
          :width="item.width?item.width:''"
          :min-width="item.minWidth?item.minWidth:''"
          :align="item.align?item.align:'center'"
          :prop="item.prop?item.prop:''"
          :label="item.label?item.label:''"
          :sortable="item.sortable?item.sortable:false"
          :sort-method="item.sortMethod?item.sortMethod:undefined"
          :filters="item.filters?item.filters:undefined"
          :filter-method="typeof item.filterMethod === 'function' ? item.filterMethod : undefined"
          ><template scope="scope"><slot :columnID="item.prop" :ev="scope" v-if="item.slot"></slot>{{!item.slot ? scope.row[item.prop] : ''}}</template></el-table-column>
        </el-table>
        <div class="vue-el-pagination-wrap">
          <el-pagination @current-change="handlePaginationPageChange" @size-change="handlePaginationSizeChange" :current-page="currentPage" :page-size="pageSize" :page-sizes="pageSizeList" layout="prev, pager, next, jumper, sizes, ->, total" :total="paginationTotal">
          </el-pagination>
        </div>
      </el-row>
    </div>
</template>

<script>
import DataTableToolBar from './tool-bar.cmtp'

export default {
  name: 'DataTables',
  components: {
    DataTableToolBar
  },
  props: {
    serverApi: {
      type: Function
    },
    useStore: {
      type: Boolean,
      default: false
    },
    userStore: {
      type: Object
    },
    searchBar: {
      type: Boolean,
      default: false
    },
    columnHead: {
      type: Array,
      default: () => { return [] }
    },
    rowClick: {
      type: Function,
      default: () => { }
    },
    rowContextmenu: {
      type: Function,
      default: () => { }
    },
    rowDblclick: {
      type: Function,
      default: () => { }
    },
    tableData: {
      type: Array,
      default: () => { return [] }
    },
    pageSizeList: {
      type: Array,
      default: () => { return [10, 50, 100] }
    },
    sortChange: {
      type: Function,
      default: () => { }
    }
  },
  data () {
    return {
      apiLoading: false,
      useApi: false,
      isServerEnd: false,
      lockAssociationQuery: false,
      dataStore: {
        data: [],
        area: [0, 0],
        isServerEnd: false,
        add (offset, limit, data) {
          let addAreaOffset = (offset - this.area[0] - 1)
          let addAreaLimit = (limit - this.area[1])
          this.area[0] += addAreaOffset > 0 ? addAreaOffset : 0
          this.area[1] += addAreaLimit > 0 ? addAreaLimit : 0
          if (data.length < limit) {
            this.isServerEnd = true
          }
          this.data.push(...data)
        },
        get (offset, limit) {
          let sStore = this.area[0] * this.area[1]
          let sGet = offset * limit
          if (sGet > sStore) {
            if (this.isServerEnd) {
              return [true, this.data]
            } else {
              return [false, 'need more data']
            }
          } else {
            let from = limit * (offset)
            let to = from + limit
            return [true, this.data.slice(from, to)]
          }
        }
      },
      currentPage: 1,
      pageSize: this.pageSizeList[0],
      paginationTotal: 0,
      headSearchList: {},
      data: [],
      searchToralCache: 0,
      fromSearchFlg: false,
      searchData: [],
      searchItem: {},
      cleanSearch: false
    }
  },
  beforeMount: async function () {
    if (typeof this.serverApi === 'function') {
      let apiRes
      try {
        this.apiLoading = true
        apiRes = await this.serverApi({offset: 0, limit: this.pageSize})
        this.apiLoading = false
      } catch (e) {
        this.$emit('apiError', e)
      }
      if (apiRes) {
        if (Object.prototype.toString.call(apiRes.data) === '[object Array]') {
          this.dataStore.add(this.currentPage - 1, this.pageSize, apiRes.data)
          this.useApi = true
          this.data = apiRes.data
          if (apiRes.total) {
            this.paginationTotal = apiRes.total
          } else {
            this.paginationTotal = this.data.length
          }
        } else {
          this.$emit('apiError', 'api response type error')
        }
      }
    } else {
      this.paginationTotal = this.tableData.length
      this.data = this.tableData
    }
  },
  computed: {
    getViewRange () {
      let from = this.pageSize * (this.currentPage - 1)
      let to = from + this.pageSize
      return [from, to]
    },
    viewTableData: {
      set: function (searchData) {
        this.searchData = searchData
        if (this.cleanSearch) {
          this.fromSearchFlg = false
          this.cleanSearch = false
          this.paginationTotal = this.searchToralCache
        } else {
          this.fromSearchFlg = true
          this.searchToralCache = this.paginationTotal
        }
        this.paginationTotal = searchData.length
      },
      get: function () {
        if (!this.fromSearchFlg) {
          if (this.useApi) {
            if (this.useStore) {
              return this.dataStore.get(this.currentPage - 1, this.pageSize)[1]
            } else {
              return this.data
            }
          } else {
            return this.data.slice(this.getViewRange[0], this.getViewRange[1])
          }
        } else {
          return this.searchData
        }
      }
    }
  },
  methods: {
    handlePaginationSizeChange: async function (size) {
      if (this.lockAssociationQuery) {
        return
      }
      if (this.useApi) {
        if (!this.dataStore.isServerEnd) {
          let dataStatus = this.dataStore.get(this.currentPage, size)
          if (!dataStatus[0]) {
            this.apiLoading = true
            this.lockAssociationQuery = true
            this.currentPage = 1
            this.pageSize = size
            let serverStatus = await this.getData()
            this.apiLoading = false
            if (!serverStatus) {
              this.$emit('apiError', 'Can not get more data from server')
            }
          }
        } else {
          this.paginationTotal = this.dataStore.data.length
        }
        this.lockAssociationQuery = false
      } else {
        this.pageSize = size
      }
    },
    handlePaginationPageChange: async function (val) {
      if (this.lockAssociationQuery) {
        return
      }
      if (this.useApi) {
        if (!this.dataStore.isServerEnd) {
          let dataStatus = this.dataStore.get(val, this.pageSize)
          if (!dataStatus[0]) {
            this.apiLoading = true
            this.lockAssociationQuery = true
            this.currentPage = val
            let serverStatus = await this.getData()
            this.apiLoading = false
            if (!serverStatus) {
              this.$emit('apiError', 'Can not get more data from server')
            }
          }
        } else {
          this.paginationTotal = this.dataStore.data.length
        }
        this.currentPage = val
        this.lockAssociationQuery = false
      } else {
        this.currentPage = val
      }
    },
    toolBarItemSerachQuery: async function ({status, data}) {
      if (this.useApi) {
        this.searchItem = {type: 'exact', data}
        this.lockAssociationQuery = true
        this.currentPage = 1
        const serverStatus = await this.getData()
        if (!serverStatus) {
          this.$emit('apiError', 'Can not get more data from server')
        }
        this.lockAssociationQuery = false
      } else {
        if (!status) {
          this.cleanSearch = true
          this.viewTableData = this.tableData
          return false
        }
        this.viewTableData = this.data.filter(item => {
          for (let i in data) {
            if (data[i] !== '') {
              if (item[i].toString() !== data[i]) {
                return false
              }
            }
          }
          return true
        })
      }
    },
    toolBarSerachQuery: async function (query) {
      if (query === '') {
        this.cleanSearch = true
        this.viewTableData = this.tableData
        this.searchItem = {}
        return
      }
      if (this.useApi) {
        this.searchItem = {type: 'fuzzy', query}
        this.lockAssociationQuery = true
        this.currentPage = 1
        const serverStatus = await this.getData()
        if (!serverStatus) {
          this.$emit('apiError', 'Can not get more data from server')
        }
        this.lockAssociationQuery = false
      } else {
        this.viewTableData = this.data.filter(item => {
          for (let i in this.columnHead) {
            if (item[this.columnHead[i].prop]) {
              if (item[this.columnHead[i].prop].toString().indexOf(query) !== -1) {
                return true
              }
            }
          }
          return false
        })
      }
    },
    reloadTable: async function () {
      this.$refs.toolBar.cleanItemSearch()
      if (this.useApi) {
        this.searchItem = {}
        this.lockAssociationQuery = true
        this.currentPage = 1
        this.pageSize = this.pageSizeList[0]
        const serverStatus = await this.getData()
        if (!serverStatus) {
          this.$emit('apiError', 'Can not get more data from server')
        }
        this.lockAssociationQuery = false
      } else {
        this.cleanSearch = true
        this.viewTableData = this.tableData
        this.searchItem = {}
      }
    },
    getData: async function () {
      let apiRes
      try {
        this.apiLoading = true
        apiRes = await this.serverApi({offset: (this.currentPage - 1) * this.pageSize, limit: this.pageSize, search: this.searchItem})
        this.apiLoading = false
      } catch (e) {
        return false
      }
      if (apiRes) {
        if (Object.prototype.toString.call(apiRes.data) === '[object Array]') {
          if (this.useStore) {
            this.dataStore.add(this.currentPage, this.pageSize, apiRes.data)
          } else {
            this.data = apiRes.data
          }
          return true
        } else {
          this.$emit('apiError', 'api return data type error')
          return false
        }
      } else {
        this.$emit('apiError', 'api error')
        return false
      }
    }
  }
}
</script>

<style>
.vue-el-pagination-wrap {
  text-align: center;
  margin-top: 20px;
}
</style>
