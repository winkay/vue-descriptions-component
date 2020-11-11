<template>
  <div>
    <descriptions :column="2" :bordered='true'>
      <template v-slot:title>
        <span style="color:red">Descriptions Title Slot</span>
      </template>
      <descriptions-item label="name" span="2">
        <span :title='longName'>{{longName}}</span>
      </descriptions-item>
      <descriptions-item label="ColSpan" span="3">span=======3</descriptions-item>
      <descriptions-item label="Button">
        <button @click='onclick'>Button</button>
      </descriptions-item>
      <descriptions-item label="email3">email@test.com</descriptions-item>
      <descriptions-item label="Red Text">
        <span style="color:red">Text is red.</span>
      </descriptions-item>
      <descriptions-item label="email1">email@test.com</descriptions-item>
      <descriptions-item label="email2">email@test.com</descriptions-item>
      <descriptions-item label="email3">email@test.com</descriptions-item>
      <descriptions-item label="name">User Name</descriptions-item>
      <descriptions-item label="email4">email@test.com</descriptions-item>
      <descriptions-item label="email5">email@test.com</descriptions-item>
    </descriptions>
  </div>
</template>

<script>
export default {
  name: 'Demo',
  data() {
    return {
      longName: 'User Name User Name User Name User Name User Name ' +
        'User Name User Name User Name User Name User Name User Name' +
        'User Name User Name User Name User Name User Name User Name ' +
        'User Name User Name User Name User Name User Name User Name User Name'
    }
  },
  methods: {
    onclick() {
      alert(1)
    }
  }
}
</script>

<style scoped>

</style>
