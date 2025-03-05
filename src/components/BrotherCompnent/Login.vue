<template>
  <!-- 遮罩层 -->
  <div class="modal-mask" v-show="showLogin" @click="closeLogin">
    <!-- 登录框 -->
    <div class="modal-container" @click.stop>
      <div class="login-box">
        <h2 class="login-title">登录</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="username">账号</label>
            <input type="text" id="username" v-model="username" placeholder="请输入账号" required />
            <button type="button" class="generate-button" @click="generateUsername">
              生成随机账号
            </button>
          </div>
          <div class="form-group">
            <label for="password">密码</label>
            <input id="password" v-model="password" placeholder="请输入密码" required />
            <button type="button" class="generate-button" @click="generatePassword">
              生成随机密码
            </button>
          </div>
          <div class="button-content">
            <button type="submit" class="login-button" @click="login">登录</button>
            <button type="submit" class="login-button register-color" @click="regist">注册并登录</button>
          </div>
        </form>
        <!-- 关闭按钮 -->
        <button class="close-button" @click="closeLogin">×</button>
      </div>
    </div>
  </div>
</template>

<script>
import Store from '../../store';

export default {
  name: "Login",
  data() {
    return {
      username: "", // 账号
      password: "", // 密码
      nameId: 0, // 随机用户名在表中的id 
    };
  },
  computed: {
    showLogin() {
      return Store.state.showLogin;
    },
  },
  methods: {
    // 生成随机账号
    generateUsername() {
      let That = this;
      That.SQFrontAjax({
        Url: "/api/getUserName",
        Success: function (data) {
          That.nameId = data.id;
          That.username = data.name; // 添加前缀
        },
      });
    },
    // 生成随机密码
    generatePassword() {
      const chars = "0123456789";
      let password = "";
      for (let i = 0; i < 4; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length)); // 生成4位随机密码
      }
      this.password = password;
    },
    login() {
      let That = this;
      // 登录逻辑
      if (this.username && this.password) {
        That.SQFrontAjax({
          Url: "/api/login",
          UploadData: {
            username: That.username,
            password: That.password
          },
          Success: function (data) {
            Store.commit("ChangeTip", {
              Show: true,
              Title: "登录成功",
            });
            Store.commit('ChangeLogin', false);

            // 登录成功后，填充留言页面的用户名
            Store.commit('ChangeMessageLeaveName', data.userInfo.name);

            // 存储token
            That.SetLocalStorage('SunqBlog', {
              Key: 'token',
              Value: data.token
            });
            That.SetLocalStorage('SunqBlog', {
              Key: 'userInfo',
              Value: data.userInfo
            });
          }
        });
      } else {
        alert("请输入账号和密码");
      }
    },
    closeLogin() {
      // 关闭登录框
      Store.commit('ChangeLogin', false);
    },
    regist(){
      let That = this;
      // 注册逻辑
      if (this.username && this.password) {
        That.SQFrontAjax({
          Url: "/api/regist",
          UploadData: {
            username: That.username,
            password: That.password
          },
          Success: function (data) {
            Store.commit("ChangeTip", {
              Show: true,
              Title: "注册并登录成功",
            });
            Store.commit('ChangeLogin', false);

            // // 注册成功后，填充留言页面的用户名
            Store.commit('ChangeMessageLeaveName', data.userInfo.name);

            // 存储token
            That.SetLocalStorage('SunqBlog', {
              Key: 'token',
              Value: data.token
            });
            That.SetLocalStorage('SunqBlog', {
              Key: 'userInfo',
              Value: data.userInfo
            });

            if(That.nameId > 0){
              // 删除已经使用的随机用户名
              That.SQFrontAjax({
                Url: "/api/markNameAsUsed",
                UploadData: {
                  id: That.nameId
                },
                Success: function (data) {
                  console.log('删除已经使用的随机用户名');
                }
              });
            }
          }
        });
      } else {
        alert("请输入账号和密码");
      }
    }
  },
};
</script>

<style scoped>
/* 遮罩层 */
.modal-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  /* 半透明黑色背景 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1999;
  /* 确保遮罩层在最上层 */
}

/* 登录框容器 */
.modal-container {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  position: relative;
}

/* 登录框 */
.login-box {
  position: relative;
}

/* 关闭按钮 */
.close-button {
  position: absolute;
  top: -30px;
  right: -10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.close-button:hover {
  color: #333;
}

/* 其他样式保持不变 */
.login-title {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  box-sizing: border-box;
  background-color: white !important;
}

.form-group input:focus {
  border-color: #007bff;
}

.button-content {
  display: flex;
  justify-content: space-around;
}

.login-button {
  width: 40%;
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.register-color {
  background-color: #f56c6c;
}

.login-button:hover {
  background-color: #0056b3;
}

/* 输入框和按钮的容器 */
.input-with-button {
  display: flex;
  align-items: center;
}

/* 输入框 */
.input-with-button input {
  flex: 1;
  margin-right: 0.5rem;
  /* 输入框和按钮之间的间距 */
}

/* 生成按钮 */
.generate-button {
  font-size: 0.9rem;
  cursor: pointer;
  position: absolute;
  width: 100px;
  right: 2px;
  border: none;
  color: #01aaed;
  top: 40px;
  background-color: white;
}
</style>