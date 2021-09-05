<template>
  <div class="auth-container" v-loading.fullscreen.lock="loading">
    <div class="lang-switch"></div>
    <el-row type="flex" justify="center" align="middle" style="height: 85%">
      <el-col :xs="16" :sm="12" :md="8" :lg="6" :xl="4">
        <el-card>
          <el-form :model="form" ref="form" :rules="formValidationRules">
            <el-form-item style="text-align: center">
              <img
                style="height: 170px"
                src="@/assets/images/kashkar-logo.png"
                alt="smart"
              />
            </el-form-item>
            <el-form-item prop="username">
              <el-input
                v-model="form.username"
                placeholder="Username"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                placeholder="Password"
                type="password"
                @keyup.enter.native="onSubmit"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width: 100%" @click="onSubmit">
                Login
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col class="copyright">
        &copy; KASHKAR {{ new Date().getFullYear() }}
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Auth",
  components: {},
  data() {
    return {
      loading: false,
      form: {
        username: "",
        password: "",
        trustedDevice: false
      },
      formValidationRules: {}
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid && !this.loading) {
          this.loading = true;
          this.retrieveAccessToken();
        }
      });
    },

    retrieveAccessToken() {
      let { username, password } = this.form;
      const token = window.btoa(username+":"+password)
      axios
        .get(
          `${process.env.VUE_APP_BASE_API_URL}/menu-api/meal-sections/`,
          {
            headers: {
              Authorization: `Basic ${token}`
            }
          }
        )
        .then(() => {
          this.$store.commit("authenticate", token);
          this.$router.push("/app")
        })
        .catch(() => {
          this.loading = false;
          this.$message({
            message: "Login or password is incorrect!",
            type: "warning"
          });
        });
    },
  }
};
</script>

<style scoped lang="scss">
.auth-container {
  height: 100%;
  width: 100%;
  background-color: #f1f1f1;

  .lang-switch {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    padding-top: 20px;
    padding-right: 20px;
  }
  .auth-switchers {
    text-align: center;
    margin-bottom: 10px;

    .auth-tab {
      border-radius: 7px;
      overflow: hidden;
      min-height: 440px;
    }
  }
  .el-tabs--border-card /deep/ {
    .el-tabs__header {
      margin-bottom: 20px;
      .el-tabs__nav {
        width: 100%;
        text-align: left;
      }
      #tab-eKey {
        border-right: none;
      }
      .el-tabs__item {
        width: 50%;
        text-align: center;
      }
    }
  }
  .copyright {
    text-align: center;
    color: #b7b7b7;
  }
}
</style>
