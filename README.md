# Vue2.0 Datatables
>Based on elemnet-ui, ES6

![preview](https://raw.githubusercontent.com/Dess-Li/vue-el-datatables/master/assets/demo.png)

## Install
```
npm install element-ui vue-el-datatables -save
```
## Get Started
```js
import ElementUI from 'element-ui'
import DataTables from 'vue-el-datatables'

Vue.use(ElementUI)
Vue.component(DataTables.name, DataTables)
```

or

```js
import { Row, Col, Card, Table, TableColumn, Input } from 'element-ui'
import DataTables from 'vue-el-datatables'

Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Input)
Vue.component(DataTables.name, DataTables)
```

## Usage
对于服务器接口返回数据形式，数据会建立本地缓存，已获取的分页数据将不会进行重新请求，但为了保证搜索功能数据的完整性，使用搜索时将进行接口请求，而清除搜索条件后表格会自动回到分页缓存数据

```html
<template>
  <DataTables :columnHead="columnHead" :tableData="tableData" :serverApi="serverApi" :searchBar="true" @apiError="apiError">
    <el-button type="primary" slot="toolBar">add User</el-button>
    <template scope="props">
      <el-button v-if="props.columnID === 'action'" @click.stop="apiError(props.ev.row.id)">Edit</el-button>
      <div v-if="props.columnID === 'status'" :class="formatStatus(props.ev.row.status)[0]">{{formatStatus(props.ev.row.status)[1]}}</div>
    </template>
  </DataTables>
</template>
```
#### slot
>DataTables 内容可使用分发内容
>toolBar 分发至表格顶部工具区域
>template 内部分发至表格数据行内容，可通过scope="props"，获取当前行的数据，并进行格式化数据


## Attributes
<table>
  <tr>
    <th>Property</th>
    <th>Type</th>
    <th>Desc</th>
    <th>Default values</th>
  </tr>
  <tr>
    <td>columnHead</td>
    <td>Array</td>
    <td>
    	表格头设置：
    	<table>
    	 <tr>
    	 	<th>property</th>
    	 	<th>Type</th>
    	 	<th>Desc</th>
    	 </tr>
    	 <tr>
    	 	<th>minWidth</th>
    	 	<th>Number</th>
    	 	<th>最小列宽度</th>
    	 </tr>
    	 <tr>
    	 	<th>width</th>
    	 	<th>Number</th>
    	 	<th>列宽度</th>
    	 </tr>
    	 <tr>
    	 	<th>prop</th>
    	 	<th>String</th>
    	 	<th>对应列内容的字段名</th>
    	 </tr>
    	 <tr>
    	 	<th>label</th>
    	 	<th>String</th>
    	 	<th>标题名</th>
    	 </tr>
    	 <tr>
    	 	<th>headSearch</th>
    	 	<th>Boolean</th>
    	 	<th>是否显示列搜索框</th>
    	 </tr>
    	 <tr>
    	 	<th>sortable</th>
    	 	<th>Boolean</th>
    	 	<th>是否显示排序按钮</th>
    	 </tr>
    	 <tr>
    	 	<th>slot</th>
    	 	<th>Boolean</th>
    	 	<th>是否可分发</th>
    	 </tr>
    	 <tr>
    	 	<th>fixed</th>
    	 	<th>String</th>
    	 	<th>列是否固定在左侧或者右侧，true 表示固定在左侧, 可选 left, right</th>
    	 </tr>
    	 <tr>
    	 	<th>filters</th>
    	 	<th>Array</th>
    	 	<th>数据过滤的选项,见element-ui文档</th>
    	 </tr>
    	 <tr>
    	 	<th>filterMethod</th>
    	 	<th>Function</th>
    	 	<th>数据过滤的方法,见element-ui文档</th>
    	 </tr>
    	</table>
    </td>
    <td></td>
  </tr>
  <tr>
    <td>tableData</td>
    <td>Array</td>
    <td>数据表值，使用serverApi参数时该项无用，结构：[{prop1: value, prop2: value}]</td>
    <td></td>
  </tr>
  <tr>
    <td>serverApi</td>
    <td>Function</td>
    <td>服务器数据获取接口方法，当使用该选项时，组件会调用该方法，传递参数：
    <table>
    	<tr>
    	 	<th>property</th>
    	 	<th>Type</th>
    	 	<th>Desc</th>
    	 </tr>
    	 <tr>
    	 	<th>offset</th>
    	 	<th>Number</th>
    	 	<th>数据分页起始值</th>
    	 </tr>
    	 <tr>
    	 	<th>limit</th>
    	 	<th>Number</th>
    	 	<th>数据分页长度</th>
    	 </tr>
    	 <tr>
    	 	<th>search</th>
    	 	<th>Object</th>
    	 	<th>当调用列搜索或表头模糊搜索框时传递，包含两个key：type(搜索裂隙)->fuzzy(模糊搜索),exact(精确搜索)</th>
    	 </tr>
    </table>
    接口方法返回数据格式：{data: [{prop1: value, prop2: value}], total: 100}
    <table>
    	<tr>
    	 	<th>property</th>
    	 	<th>Type</th>
    	 	<th>Desc</th>
    	 </tr>
    	 <tr>
    	 	<th>data</th>
    	 	<th>Array</th>
    	 	<th>接口返回数据，格式同tableData</th>
    	 </tr>
    	 <tr>
    	 	<th>total</th>
    	 	<th>Number</th>
    	 	<th>通过接口方法返回初始数据时需要（第一次调用需要），分页查询、模糊查询、列查询不需要返回</th>
    	 </tr>
    </table>
    </td>
    <td></td>
  </tr>
  <tr>
    <td>useStore</td>
    <td>Boolean</td>
    <td>是否使用缓存模式</td>
    <td>false</td>
  </tr>
  <tr>
    <td>searchBar</td>
    <td>Boolean</td>
    <td>是否显示模糊搜索框</td>
    <td>false</td>
  </tr>
  <tr>
    <td>rowClick</td>
    <td>Function</td>
    <td>行点击事件，见element-ui文档</td>
    <td>() => {}</td>
  </tr>
  <tr>
    <td>rowContextmenu</td>
    <td>Function</td>
    <td>行右键点击事件，见element-ui文档</td>
    <td>() => {}</td>
  </tr>
  <tr>
    <td>rowDblclick</td>
    <td>Function</td>
    <td>行双击事件，见element-ui文档</td>
    <td>() => {}</td>
  </tr>
  <tr>
    <td>apiError</td>
    <td>String</td>
    <td>监控数据表调用接口返回错误结果,msg => {console.log(msg)}</td>
    <td></td>
  </tr>
</table>

## Contact
The project's website is located at https://github.com/Dess-Li/vue-el-datatables
