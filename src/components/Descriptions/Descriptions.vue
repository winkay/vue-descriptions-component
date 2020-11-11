/**
* 详情描述组件
*/
<template>
  <div
    :class="[, {
    'descriptions-bordered': bordered,
    'descriptions': size==='default',
    'descriptions-middle': size==='middle',
    'descriptions-small': size==='small'}]"
  >
    <div class="descriptions-title" v-if="title">
      <slot name="title">{{title}}</slot>
    </div>
    <div class="descriptions-view">
      <table class="descriptions-table">
        <tbody>
          <tr :key="key" class="descriptions-row" v-for="(row, key) in rows">
            <template v-for="(item, index) in row">
              <template v-if="bordered">
                <th
                  :key="'label-' + key + '-' + index"
                  class="descriptions-item-label"
                >{{item.label}}</th>
                <td
                  :colSpan="item.span*2-1"
                  :key="'content-' + key + '-' + index"
                  class="descriptions-item-content"
                >
                  <description-content :item="item"></description-content>
                </td>
              </template>
              <template v-else>
                <td
                  :colSpan="item.span*2-1"
                  :key="'content-' + key + '-' + index"
                  class="descriptions-item"
                >
                  <span class="descriptions-item-label">{{item.label}}</span>
                  <span class="descriptions-item-content">
                    <description-content :item="item"></description-content>
                  </span>
                </td>
              </template>
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
    size: {
      // 尺寸
      type: String,
      default: 'default'
    },
    bordered: {
      // 是否显示边框
      type: Boolean,
      default: true
    },
    column: {
      // 每行显示的项目个数
      type: Number,
      default: 3
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
        // 处理column与span之间的关系
        console.log('before====', leftSpan, itemAttrs.span || 1)
        if (leftSpan <= (itemAttrs.span || 1) || index === (dataList.length - 1)) {
          // 剩余的列数小于设置的span个数, 或者最后一行的最后一列。自动补全，避免最后一列出现残缺的情况
          itemAttrs.span = leftSpan
          leftSpan = 0
        } else {
          leftSpan -= itemAttrs.span || 1
        }
        children.push({
          span: itemAttrs.span || 1,
          label: (item.data && itemAttrs.label) || '',
          ...item
        })
        console.log('after====', leftSpan, itemAttrs.span || 1)
        if (leftSpan <= 0) {
          leftSpan = this.column
          children.length > 0 && this.$set(this.rows, this.rows.length, children)
          children = []
        }
        // 最后一行
        if (dataList.length % this.column < this.column && index === (dataList.length - 1)) {
          children.length > 0 && this.$set(this.rows, this.rows.length, children)
        }
      })
    }
  }
}
</script>

<style lang="scss">
.descriptions-title {
  margin-bottom: 20px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 700;
  font-size: 16px;
  line-height: 1.5715;
}

.descriptions-view {
  width: 100%;
  overflow: hidden;
  border-radius: 2px;

  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  &:last-child {
    border-bottom: none;
  }

  .descriptions-row > th, .descriptions-row > td {
    padding-bottom: 16px;
  }

  .descriptions-row, .descriptions-item-label {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 400;
    font-size: 14px;
    line-height: 1.5715;
    text-align: start;
  }

  .descriptions-item-label::after {
    content: ':';
    position: relative;
    top: -0.5px;
    margin: 0 8px 0 2px;
  }

  .descriptions-item-label.descriptions-item-no-colon::after {
    content: ' ';
  }

  .descriptions-item-no-label::after {
    margin: 0;
    content: '';
  }

  .descriptions-item-content {
    display: table-cell;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    line-height: 1.5715;
  }

  .descriptions-item {
    padding-bottom: 0;
  }

  .descriptions-item > span {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: baseline;
    -ms-flex-align: baseline;
    align-items: baseline;
  }

  .descriptions-middle .descriptions-row > th, .descriptions-middle .descriptions-row > td {
    padding-bottom: 12px;
  }

  .descriptions-small .descriptions-row > th, .descriptions-small .descriptions-row > td {
    padding-bottom: 8px;
  }
}

.descriptions-bordered {
  .descriptions-view {
    border: 1px solid #f3f3f3;
  }

  .descriptions-view > table {
    table-layout: auto;
  }

  .descriptions-item-label, .descriptions-item-content {
    padding: 16px 24px;
    border: 1px solid #e8e8e8;
  }

  .descriptions-item-label:last-child, .descriptions-item-content:last-child {
    border-right: none;
  }

  .descriptions-item-label {
    background-color: #f3f3f3;
  }

  .descriptions-item-label::after {
    display: none;
  }

  .descriptions-row {
    border: 1px solid #e8e8e8;
  }

  .descriptions-row:last-child {
    border-bottom: none;
  }
}

.descriptions-bordered.descriptions-middle .descriptions-item-label, .descriptions-bordered.descriptions-middle .descriptions-item-content {
  padding: 12px 24px;
}

.descriptions-bordered.descriptions-small .descriptions-item-label, .descriptions-bordered.descriptions-small .descriptions-item-content {
  padding: 8px 16px;
}

.descriptions-rtl {
  direction: rtl;
}

.descriptions-rtl .descriptions-item-label::after {
  margin: 0 2px 0 8px;
}
</style>
