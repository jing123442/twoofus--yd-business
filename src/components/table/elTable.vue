<template>
    <div >
     <el-table :data='randerData' >
     <template v-for='content in headTitle'>
       <el-table-column  :prop='content.prop' :label='content.label' :key='content.prop'>
       </el-table-column>
        <!-- <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.label }}</el-tag>
          </div> -->
        <!-- <el-table-column  :prop='content.prop' :label='content.label' :key='content.prop' v-if='randerData.isEnableString'>
        <el-tag v-if='content.tagBlue'></el-tag>
        <el-tag type="success" v-if='content.tagGreen'></el-tag>
       </el-table-column> -->
     </template> 
    </el-table>
    </div>
</template>

<script>
export default {
  props:['headTitle','randerData'] //headTitle--表格头；randerData--表格需要渲染的数据
        
}
</script>

<style scoped>

</style>