<template>
  <div class="login-panel">
    <span class="material-icons md-24">Bem vindo, {{username}}</span>
    <div class="chat-card">
      <div class="message" v-for="message in messages" :key="message.id">
        <div><b>{{message.user}} disse:</b> {{message.content}}</div>
      </div>
    </div>
    <input v-model="text" placeholder="Digite sua mensagem e aperte enter" type="text" v-on:keyup.enter="sendMessage"/>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import SocketioService from "../../../services/socketio.service.js";
// import io from 'socket.io-client'
// import cfg from '../../../../configs/configs.json'
// import axios from "axios";
// io('http://localhost:3000')

export default {
  name: "LoginPanel",
  props: {
    login: {
      type: Boolean,
    },
  },
  data() {
    return {
      connection: null,
      username: localStorage.getItem('username'),
      messages: [],
      text: '', 
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
    sendMessage() {
      this.text = this.text.trim()
      if(this.text === '') {
        return
      }
      this.addMessage()
      SocketioService.socket.emit('msgToServer', this.text)
      this.text = ''
    },

    addMessage() {
      const message = {
        id: new Date().getTime(),
        content: this.text,
        user: localStorage.getItem('username'),
      }

      this.messages = this.messages.concat(message)
      // this.text = '';
    },
    makeToast(type, msg) {
      this.Toast.fire({
        icon: type,
        title: msg,
      });
    },
  },
  created() {
    SocketioService.setupSocketConnection();
  },
  beforeUnmount() {
    SocketioService.disconnect();
  },
};
</script>

<style>
.message {
  display: flex;
}

.chat-card {
  margin: 1rem;
  height: 60vh;
}

.material-icons.md-24 {
  position: relative;
  margin-top: 20px;
  text-align: left;
  font-size: 24px;
  color: #1976d2;
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
</style>
