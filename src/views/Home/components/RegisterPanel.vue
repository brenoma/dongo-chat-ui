<template>
  <div id="LoginPanel" class="login-panel">
    <span class="material-icons md-24">chat</span>
    <p class="login-title">Faça seu cadastro</p>
    <div id="Logininfo" class="login-info">
      <input
        placeholder="Nome Completo"
        label="NAME"
        class="input"
        v-model="name"
      />

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
      <a v-on:click="handleComponent" class="signuplink">Voltar para Login</a>
      <button label="LOGIN" class="button-login" v-on:click="signUp()" primary>
        Cadastrar
      </button>
    </div>
  </div>
</template>

<script>
import cfg from '../../../../configs/configs.json'
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "RegisterPanel",
  data() {
    return {
      activeNameClass: false,
      name: "",
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
  props: {
    login: {
      type: Boolean,
    },
  },
  methods: {
    async signUp() {
      await axios
        .post(cfg.baseUrl + "users/create", {
          name: this.name,
          email: this.email,
          password: this.password,
          role: 'user'
        })
        .then((response) => {
          this.makeToast("success", `Usuário Cadastrado com sucesso: ${response.data.email}`);
        })
        .catch(() => {
          this.makeToast("error", `Não foi possível cadastrar usuário, tente novamente`);
        });
    },
    makeToast(type, msg) {
      this.Toast.fire({
        icon: type,
        title: msg,
      });
    },
    handleComponent: function () {
      this.$emit("handleComponent", true);
    },
  },
};
</script>

<style scoped>
  .material-icons.md-24 {
  position: relative;
  margin-top: 20px;
  text-align: left;
  font-size: 2px;
  color: #ffffff;
}

.login-panel {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0em auto;
  position: relative;
  background-color: #ffffff;
  top: calc(50% - 18em);
  text-indent: 2em;
  border-radius: 8px;
  animation: animate 0.5s linear forwards;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
}

.login-panel .login-title {
  display: flex;
  justify-content: left;
  width: 100%;
  padding-top: 1.5em;
  font-size: 2em;
  line-height: 3em;
  color: #ffffff;
  background-color: #1976d2;

  @media screen and (max-width: 768px) {
    font-size: 1.5em;
  }
}

.login-panel .login-info {
  padding: 2em 2em 0 2em;
  text-indent: 0em;
}

.login-panel .login-info .input {
  display: flex;
  position: relative;
  width: 50%;
  height: 2rem;
  overflow: visible;
  margin-bottom: 15px;
  transition: 0.5s;
  border: hidden;
  border-block-end-style: inset;
  border-color: #1976d2;
  outline: none;
}

.login-panel .login-info .input:focus {
  transform: scale(1.05);
}
.login-panel .login-submit {
  padding: 2em;
}

.signuplink {
  margin-right: 10px;
  color: #1976d2;
}

.sender {
  font-weight: 600;
}

button.button-login {
  width: 70px;
  border-radius: 10px;
  background: #1976d2;
  color: #ffffff;
  transition: 0.1s ease-in-out;
}

button:hover {
  transform: scale(1.2);
  opacity: 0.8;
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

  .signuplink { 
    cursor: pointer;
  }
</style>
