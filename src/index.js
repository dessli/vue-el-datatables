import DataTables from './components/data-tables.cmtp'

DataTables.install = function (Vue) {
  Vue.component(DataTables.name, DataTables)
}

export default DataTables
