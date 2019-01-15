<template>
    <div >
     <el-table :data='randerData' >
       <!-- headTitle渲染表格头，表格内部加入可渲染tag的选项，randerData数据渲染 -->
     <template v-for='content in headTitle'>
       <el-table-column  :prop='content.prop' :label='content.label' :key='content.prop+"normal"' v-if="content.prop !== 'tagType' && content.prop !=='switchType'">
       </el-table-column>
       <!-- 以下可渲染tag项 -->
        <el-table-column  :prop='content.prop' :label='content.label' :key='content.prop+"tag"' v-if="content.prop === 'tagType'">
          <template slot-scope="scope">
          <div slot="reference" >
            <el-tag size="medium" v-if="scope.row.tagColor === 'blue'">{{ scope.row.tagType }}</el-tag>
            <el-tag size="medium" type='success' v-if="scope.row.tagColor === 'green'">{{ scope.row.tagType }}</el-tag>
             <el-tag size="medium" type='danger' v-if="scope.row.tagColor === 'red'">{{ scope.row.tagType }}</el-tag>
          </div>
      </template>
       </el-table-column>
       <!-- 以下可渲染加粗项 -->
     </template>
    </el-table>
    </div>
</template>

<script>
export default {
  props: ['headTitle', 'randerData'],
  data () {
    return {
      switchVal: true
    }
  },
  methods: {
    switchWatcher () {
      this.$emit('switchstatus', this.switchVal)
    }
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
