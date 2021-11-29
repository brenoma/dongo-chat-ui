<template>
  <div id="LoginPanel" class="login-panel">
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
      <button label="LOGIN" class="button-login" v-on:click="signUp()" primary>
        Cadastrar
      </button>
    </div>
    <a v-on:click="handleComponent" class="signuplink">Voltar para Login</a>
  </div>
</template>

<script>
import cfg from "../../../../configs/configs.json";
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
          role: "user",
        })
        .then((response) => {
          this.makeToast(
            "success",
            `Usuário ${response.data.name} cadastrado com sucesso.`
          );
          this.handleComponent();
        })
        .catch(() => {
          this.makeToast(
            "error",
            `Não foi possível cadastrar usuário, tente novamente`
          );
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
.login-panel {
  display: flex;
  flex-direction: column;
  width: 30%;
  margin: 0em auto;
  position: relative;
  background-color: #ffffff;
  text-indent: 2em;
  border-radius: 0 0 15px 15px !important;
  border-top: 0 !important;
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
  text-indent: 0em;
}

.login-panel .login-info .input {
  display: flex;
  position: relative;
  width: 80%;
  height: 2rem;
  margin-bottom: 15px;
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
  margin: 1rem;
}

.signuplink {
  margin-bottom: 1rem;
  color: #78e08f;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}

.signuplink:hover {
  color: rgba(0, 0, 0, 0.4);
}

button.button-login {
  width: 70%;
  height: 5vh;
  border-radius: 0 0 7px 7px !important;
  border-top: 0 !important;
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
  transition: 0.5s;
}

:focus::placeholder {
  color: #78e08f;
}
</style>
