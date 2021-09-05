<template>
  <el-button
    @click="routedLink"
    :type="type"
    :icon="icon"
    :size="size"
    :route="route"
    :params="params"
    :query="query"
    :disabled="disabled"
    class="link-button"
  >
    <slot></slot>
  </el-button>
</template>

<script>
export default {
  name: "LinkedButton",
  props: {
    route: {
      type: String,
      required: true
    },
    params: {
      type: Object,
      required: false
    },
    query: {
      type: Object,
      required: false
    },
    type: {
      type: String,
      default: "success"
    },
    size: {
      type: String,
      default: "mini"
    },
    icon: {
      type: String,
      default: "las la-lg la-plus"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    routedLink() {
      this.$router.push({
        name: this.route,
        params: this.params,
        query: this.query
      });
    }
  }
};
</script>

<style scoped lang="scss"></style>
