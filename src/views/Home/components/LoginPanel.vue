<template>
  <div class="login-panel">
    <p class="login-title">Dongo Chat</p>
    <div @keydown.enter="handleLogin()" id="Logininfo" class="login-info">
      <input placeholder="E-mail" label="EMAIL" class="input" v-model="email" />

      <input
        placeholder="Senha"
        label="PASSWORD"
        class="input"
        v-model="password"
        type="password"
      />
    </div>
    <div class="login-submit">
      <button
        type="submit"
        label="LOGIN"
        class="button-login"
        v-on:click="handleLogin()"
        primary
      >
        Entrar
      </button>
    </div>
    <p class="signupText">
      Não tem conta?
      <a v-on:click="handleComponent" class="signuplink">Fazer Cadastro</a>
    </p>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import cfg from "../../../../configs/configs.json";
import axios from "axios";
import _ from "lodash";
export default {
  name: "LoginPanel",
  props: {
    login: {
      type: Boolean,
    },
  },
  data() {
    return {
      email: "",
      password: "",
      Toast: Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      }),
    };
  },
  methods: {
    handleComponent: function () {
      this.$emit("handleComponent", false);
    },

    handleLogin() {
      this.email = this.email.trim();
      this.password = this.password.trim();

      if (this.email === "" || this.password === "") {
        return;
      }
      this.loginIn();
    },

    loginIn: _.throttle(async function () {
      await axios
        .post(cfg.baseUrl + "users/login", {
          username: this.email,
          password: this.password,
        })
        .then((response) => {
          this.makeToast("success", `Bem vindo, ${response.data.user}`);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", response.data.user);
          localStorage.setItem("userId", response.data.id);
          this.$router.push({ path: "/dashboard" });
        })
        .catch((err) => {
          this.makeToast("error", err.response.data.message);
        });
    }, 3000),

    makeToast(type, msg) {
      this.Toast.fire({
        icon: type,
        title: msg,
      });
    },
  },
};
</script>

<style scoped>
.login-panel {
  display: flex;
  flex-direction: column;
  width: 30%;
  margin: 0em auto;
  position: relative;
  background-color: #ffffff;
  border-radius: 0 0 15px 15px !important;
  border-top: 0 !important;
  animation: animate 0.5s linear forwards;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
}

.login-panel .login-title {
  display: flex;
  justify-content: center;
  padding-top: 1.5rem;
  font-size: 24px;
  line-height: 3em;
  color: #ffffff;
  background-color: #78e08f;
  transition: 0.2s ease-in-out;

  @media screen and (max-width: 768px) {
    font-size: 1.5em;
  }
}

.login-panel .login-info {
  padding: 2em 2em 0 2em;
}

.login-panel .login-info .input {
  position: relative;
  width: 100%;
  height: 2rem;
  margin-bottom: 1.25rem;
  transition: 0.5s;
  border: hidden;
  border-block-end-style: inset;
  border-color: rgba(0, 0, 0, 0.4);
  outline: none;
  font-weight: 600;
}

.login-panel .login-info .input:focus {
  transform: scale(1.05);
  border-color: #78e08f;
  color: #78e08f;
}
.login-panel .login-submit {
  padding-bottom: 1rem;
}

.signupText {
  margin-bottom: 1rem;
  font-size: 12px;
}

.signuplink {
  color: #78e08f;
  font-weight: 500;
  cursor: pointer;
}

.signuplink:hover {
  color: rgba(0, 0, 0, 0.4);
}

button.button-login {
  width: 50%;
  height: 5vh;
  border-radius: 10px;
  border-color: #82ccdd;
  background: #78e08f;
  color: #ffffff;
  transition: 0.1s ease-in-out;
}

button:hover {
  transform: scale(1.1);
  background: #82ccdd;
}

@keyframes animate {
  0% {
    opacity: 0;
    transform: rotateY(90deg);
    filter: blur(5px);
  }
  100% {
    opacity: 1;
    transform: (0deg);
    filter: blur(0px);
  }
}

::placeholder {
  text-align: center;
  transition: 0.5s;
}

:focus::placeholder {
  color: #78e08f;
}
</style>
