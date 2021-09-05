<template>
  <el-container class="main-container">
    <el-aside class="main-sidebar" :class="{ collapsed: collapsedSidebar }">
      <div class="main-sidebar-title" :class="{ collapsed: collapsedSidebar }">
        <img
          v-if="collapsedSidebar"
          src="@/assets/images/logo-small.png"
          alt="KASHKAR"
        />
        <img
          v-else
          src="@/assets/images/kashkar-logo.png"
          alt="KAHSKAR"
        />
      </div>
      <main-navigation :collapsed="collapsedSidebar"></main-navigation>
    </el-aside>
    <el-container>
      <el-header class="main-header" height="60px">
        <div class="to-left">
          <el-button
            type="text"
            :icon="menuIcon"
            @click="onSidebarToggle"
          ></el-button>
        </div>
        <div class="to-right">
          <el-button type="text" icon="el-icon-message-solid"> </el-button>
          <el-dropdown @command="onHeaderDropdownCommand">
            <span class="el-dropdown-link">
              <i class="las la-lg la-user-tie"></i> Admin
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                divided
                icon="las la-lg la-arrow-left"
                command="sign-out"
              >
                Sign-out
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <div class="main-content">
        <div class="main-content-wrapper">
          <router-view></router-view>
        </div>
      </div>
    </el-container>
  </el-container>
</template>

<script>
import MainNavigation from "@/components/MainNavigation";
export default {
  name: "Main",
  components: { MainNavigation },
  data() {
    return {
      collapsedSidebar: this.$store.state.mainSidebarCollapsed
    };
  },
  computed: {
    menuIcon() {
      return this.collapsedSidebar ? "el-icon-s-unfold" : "el-icon-s-fold";
    },
    userData() {
      return this.$store.state.user;
    }
  },
  methods: {
    onSidebarToggle() {
      this.collapsedSidebar = !this.collapsedSidebar;
      this.$store.commit("toggleMainSidebar", this.collapsedSidebar);
    },
    onHeaderDropdownCommand(command) {
      switch (command) {
        case "sign-out": {
          this.signOut();
          break;
        }
      }
    },
    signOut() {
      this.$confirm(
        "Are you sure to exit?",
        "Warning!",
        {
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          type: "warning"
        }
      )
        .then(() => {
          this.$store.commit("signOut");
          this.$router.push("/auth");
        })
        .catch(() => {});
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
$wrapper-padding: 18px;
$header-item-margin: 16px;
.el-dropdown-link {
  cursor: pointer;
  color: #2a3098;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.change-password {
  display: block;
  text-align: center;
  word-break: break-word;
}

.main {
  &-container {
    width: 100%;
    height: 100%;
    background-color: #f5f6fa;
  }
  &-header {
    background-color: #fff;
    box-shadow: 0 4px 8px 0 rgba(43, 45, 55, 0.04);
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 999;
    .to-left > * {
      margin-right: $header-item-margin;
    }
    .to-right > * {
      margin-left: $header-item-margin;
    }
  }
  &-sidebar {
    background-color: #fff;
    box-shadow: 4px 0 4px 0 rgba(43, 45, 55, 0.03);
    z-index: 1000;
    width: 300px;
    &.collapsed {
      width: 64px !important;
    }
    &-title {
      display: flex;
      height: 60px;
      align-items: center;
      justify-content: center;
      &.collapsed img {
        height: 32px;
      }
      img {
        height: 50px;
      }
      .name{
        color: #2a3098;
        font-size: 35px;
        font-weight: bold;
        margin-left: 10px;
      }
    }
  }
  &-content {
    height: calc(100vh - 60px);
    position: relative;
    &-wrapper {
      position: absolute;
      left: $wrapper-padding;
      right: $wrapper-padding;
      top: $wrapper-padding;
      bottom: $wrapper-padding;
      & > .el-card {
        min-height: 100%;
        & /deep/ .el-card__body {
        }
      }
    }
  }
}
</style>
