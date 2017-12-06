<template>
  <div class="vue-el-dt-tool-bar">
    <el-row type="flex" justify="end" :gutter="24">
      <el-col :sm="searchBar ? 18 : 24">
      <slot></slot>
      </el-col>
      <el-col :sm="12" v-if="searchBar">
        <el-input placeholder="Search" v-model="query"><el-button slot="prepend"  icon="el-icon-refresh" @click="handleReloadClick"></el-button><el-button slot="append" icon="search" @click="handleVagueClick">模糊查询</el-button></el-input>
      </el-col>
    </el-row>
    <el-row type="flex" justify="between" :gutter="12" style="padding-top:1.2em;" v-if="searchHeadItem.length">
      <el-col :sm="16" >
        <el-row type="flex" justify="between" :gutter="12" v-for="(item, index) in searchHeadItem" :key="index" :style="index !==0 ? 'padding-top:1.2em;' : '' ">
          <el-col v-for="(item2, index2) in item" :key="index2">
            <div v-if="searchItemType[item2.prop] === 'datetime'" class="el-input el-input-group el-input-group--prepend">
              <div tabindex="0" class="el-input-group__prepend"><span>{{item2.label}}</span></div>
              <el-date-picker v-model="searchItem[item2.prop]" type="date" placeholder="Select Date"></el-date-picker>
            </div>
            <el-input v-else placeholder="Search" v-model="searchItem[item2.prop]"><span slot="prepend">{{item2.label}}</span></el-input>
          </el-col>
        </el-row>
      </el-col>
      <el-col :sm="8">
        <el-button-group style="float:right;">
          <el-button icon="search" type="info" @click="handleItemClick">分项查询</el-button>
          <el-button icon="delete" type="danger" @click="handleReloadClick">清除查询</el-button>
        </el-button-group>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'DataTableToolBar',
  props: {
    searchBar: {
      type: Boolean,
      default: false
    },
    columnHead: {
      type: Array,
      default: () => { return [] }
    }
  },
  beforeMount () {
    let flg = 0
    let searchHeadItemLength = -1
    for (let i in this.columnHead) {
      if (this.columnHead[i]['headSearch']) {
        if (flg % 3 === 0) {
          searchHeadItemLength++
          this.searchHeadItem[searchHeadItemLength] = []
        }
        this.searchHeadItem[searchHeadItemLength].push(this.columnHead[i])
        this.searchItem[this.columnHead[i].prop] = ''
        if (this.columnHead[i]['searchType']) {
          this.searchItemType[this.columnHead[i].prop] = this.columnHead[i]['searchType']
        } else {
          this.searchItemType[this.columnHead[i].prop] = 'text'
        }
        flg++
      }
    }
  },
  data () {
    return {
      query: '',
      searchHeadItem: [],
      searchItem: {},
      searchItemType: {}
    }
  },
  methods: {
    handleVagueClick () {
      this.$emit('query', this.query)
    },
    handleItemClick () {
      let canSearch = false
      let searchItemData = {}
      for (let i in this.searchItem) {
        if (this.searchItem[i] !== '') {
          searchItemData[i] = this.searchItem[i]
          canSearch = true
        }
      }
      this.$emit('queryItem', {status: canSearch, data: searchItemData})
    },
    handleReloadClick () {
      for (let i in this.searchItem) {
        this.searchItem[i] = ''
      }
      this.$emit('reloadSearch')
    }
  }
}
</script>

<style>
.vue-el-dt-tool-bar {
  margin-bottom: 20px;
}
</style>
