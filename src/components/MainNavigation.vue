<template>
  <el-menu
    :default-active="$route.path"
    class="main-navigation"
    :collapse="collapsed"
    :collapse-transition="false"
    router
  >
    <template v-for="(item, index) in nav">
      <el-menu-item
        :key="index"
        v-if="!item.isSubmenu && item.main"
        :index="`/app/${item.path}`"
      >
        <i :class="item.icon" class="icon-setting"></i>
        <span>{{ item.title }}</span>
      </el-menu-item>
      <el-submenu
        :key="item.path"
        v-if="item.isSubmenu"
        :index="index.toString()"
      >
        <template slot="title">
          <i :class="item.icon" class="icon-setting"></i>
          <span>{{ item.title }}</span>
        </template>
        <template v-for="menu in item.children">
          <el-menu-item
            v-if="menu.main"
            :key="menu.path"
            :index="`/app/${menu.path}`"
          >
            <i :class="menu.icon" class="icon-setting"></i>
            <span>{{ menu.title }}</span>
          </el-menu-item>
        </template>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script>
import mainNav from "../router/navigation";
export default {
  name: "MainNavigation",
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    nav() {
      return mainNav;
    }
  }
};
</script>

<style scoped lang="scss">
.main-navigation {
  border-right: none;

  .icon-setting {
    margin-right: 5px;
  }
}
</style>
