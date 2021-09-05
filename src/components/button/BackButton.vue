<template>
  <el-button @click="back" :type="type" :size="size" :icon="icon">
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  name: "BackButton",
  props: {
    type: {
      type: String,
      default: "plain"
    },
    size: {
      type: String,
      default: "mini"
    },
    icon: {
      type: String,
      // default: ""
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped></style>
