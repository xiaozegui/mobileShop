<template>
  <div>
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click="goBack()"
    />
    <div class="register-panel">
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
      <div class="register-button">
        <van-button
          type="primary"
          @click="registerAction"
          size="large"
          :loading="openLoading"
          >马上注册</van-button
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
    axiosRegisterUser() {
      this.openLoading = true;
      axios({
        url: url.registerUser,
        method: "post",
        data: {
          userName: this.userName,
          passWord: this.passWord,
        },
      })
        .then((response) => {
          console.log(response);
          //如果返回code为200，代表注册成功，我们给用户作Toast提示
          if (response.data.code == 200) {
            Toast.success("注册成功");
            this.$router.push("/login");
          } else {
            console.log(response.data.message);
            Toast.fail("注册失败");
            this.openLoading = false;
          }
          console.log(response.data.code);
        })
        .catch((error) => {
          Toast.fail("注册失败");
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
    registerAction() {
      this.checkForm() && this.axiosRegisterUser();
    }
  },
};
</script>

<style  scoped>
.register-panel {
  width: 96%;
  border-radius: 0.266667rem;
  margin: 1.066667rem auto;
  padding-bottom: 2.666667rem;
}
.register-button {
  padding-top: 0.533333rem;
}
</style>