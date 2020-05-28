/**
* 详情描述组件
*/
<template>
  <div>
    <div class="description-title">
      <slot name='title'>{{title}}</slot>
    </div>
    <div class="description-view">
      <table class="description-table">
        <tbody>
          <tr :key="key" class="description-tr" v-for="(row, key) in rows">
            <template v-for="(item, index) in row">
              <th class="description-label" :key="'label-' + key + '-' + index">
                {{item.label}}
              </th>
              <td class="description-content" :colSpan="item.span*2-1" :key="'content-' + key + '-' + index">
                <description-content :item="item"></description-content>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Descriptions',
  components: {
    // 描述内容子组件渲染
    DescriptionContent: {
      props: {
        item: Object
      },
      render(h) {
        return this.item.children
      }
    }
  },
  props: {
    title: null, // 描述内容标题
    column: { // 每行显示的项目个数
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      rows: []
    }
  },
  watch: {
    column(value) {
      this.generateChildrenRow(this.$slots.default || [])
    }
  },
  mounted() {
    this.generateChildrenRow(this.$slots.default || [])
  },
  methods: {
    // 获取描述内容子项
    generateChildrenRow(dataSource) {
      const dataList = dataSource.filter(item => item.tag === 'descriptions-item')
      this.rows = []
      let leftSpan = this.column
      let children = []
      dataList.forEach((item, index) => {
        const itemAttrs = item.data.attrs || {}
        leftSpan -= itemAttrs.span || 1
        children.push({
          span: itemAttrs.span || 1,
          label: (item.data && itemAttrs.label) || '',
          ...item
        })
        if (leftSpan <= 0) {
          leftSpan = this.column
          this.$set(this.rows, this.rows.length, children)
          children = []
        }
        if (dataList.length % this.column < this.column && index === (dataList.length - 1)) {
          this.$set(this.rows, this.rows.length, children)
        }
      })
    }
  }
}
</script>

<style scoped>
  .description-title {
    margin-bottom: 20px;
    color: rgba(0,0,0,.85);
    font-weight: 700;
    font-size: 16px;
    line-height: 1.5;
  }
  .description-view {
    width: 100%;
    border: 1px solid #e8e8e8;
  }
  .description-view .description-table {
    width: 100%;
    /* border: 1px solid #e8e8e8; */
    border-collapse: collapse;
    table-layout: fixed;
  }
  .description-view .description-tr {
    border-bottom: 1px solid #e8e8e8;
    width: 100%;
  }
  .description-view .description-tr:last-child {
    border-bottom: none;
  }
  .description-view .description-label {
    border-right: 1px solid #e8e8e8;
    background-color: #fafafa;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    /* margin-right: 8px; */
    padding: 12px 16px;
    white-space: nowrap;
    display: table-cell;
  }
  .description-view .description-label:after {
    content: ""; /** content: ":" */
    margin: 0 8px 0 2px;
    position: relative;
    top: -0.5px;
  }
  .description-view .description-content {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    border-right: 1px solid #e8e8e8;
    font-size: 14px;
    line-height: 1.5;
    padding: 12px 16px;
    color: rgba(0, 0, 0, 0.65);
    display: table-cell;
  }
  .description-tr .description-content:last-child {
    border-right: none;
  }
</style>
