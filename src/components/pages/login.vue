<template>
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click="goBack()"
    />
    <div class="login-panel">
      <van-field
        v-model="userName"
        label="用户名"
        clearable
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="userName = ''"
        :error-message="usernameErrorMsg"
      />
      <van-field
        v-model="passWord"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMsg"
      />
      <div class="login-button">
        <van-button
          type="primary"
          @click="loginAction"
          size="large"
          :loading="openLoading"
          >登录</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import url from "@/serviceApi.config.js";
import axios from "axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      userName: "",
      passWord: "",
      openLoading: false, //是否开启用户的Loading
      usernameErrorMsg: "", //当用户名出现错误的时候
      passwordErrorMsg: "", //当密码出现错误的时候
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    axiosLogin() {
      this.openLoading = true;
      axios({
        url: url.login,
        method: "post",
        data: {
          userName: this.userName,
          passWord: this.passWord,
        },
      })
        .then((response) => {
          if (response.data.code == 200 && response.data.message) {
            new Promise((resolve, reject) => {
              localStorage.userInfo = { userName: this.username };
              setTimeout(() => {
                resolve();
              }, 500);
            })
              .then(() => {
                Toast.success("登录成功");
                this.$router.push("/");
              })
              .catch((err) => {
                Toast.fail("登录状态保存失败");
                console.log(err);
              });
          } else {
            Toast.fail("登录失败");
            this.openLoading = false;
          }
        })
        .catch((error) => {
          console.log(error);
          Toast.fail("登录失败");
          this.openLoading = false;
        });
    },
    checkForm() {
      let isOk = true;
      if (this.userName.length < 5) {
        this.usernameErrorMsg = "用户名不能小于5位";
        isOk = false;
      } else {
        this.usernameErrorMsg = "";
      }
      if (this.passWord.length < 6) {
        this.passwordErrorMsg = "密码不能少于6位";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }
      return isOk;
    },
    loginAction() {
      this.checkForm() && this.axiosLogin();
    },
  },
  created() {
    if (localStorage.userInfo) {
      Toast.success("您已经登录");
      this.$router.push("/");
    }
  }
};
</script>

<style  scoped>
.login-panel {
  width: 96%;
  border-radius: 0.266667rem;
  margin: 1.066667rem auto;
  padding-bottom: 2.666667rem;
}
.login-button {
  padding-top: 0.533333rem;
}
</style>