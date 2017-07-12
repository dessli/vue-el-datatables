<template>
  <div class="vue-el-dt-tool-bar">
    <el-row type="flex" justify="end" :gutter="24">
      <el-col :sm="searchBar ? 18 : 24">
      <slot></slot>
      </el-col>
      <el-col :sm="6" v-if="searchBar">
        <el-input placeholder="Search" v-model="query"><el-button slot="append" icon="search" @click="handleBtnClick"></el-button></el-input>
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
    }
  },
  data () {
    return {
      query: ''
    }
  },
  methods: {
    handleBtnClick () {
      this.$emit('query', this.query)
    }
  }
}
</script>

<style>
.vue-el-dt-tool-bar {
  margin-bottom: 20px;
}
</style>
