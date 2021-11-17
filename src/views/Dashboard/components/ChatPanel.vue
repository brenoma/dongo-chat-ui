<template>
  <div class="login-panel">
    <span class="material-icons md-24">{{ username }}</span>
    <div class="chat-card">
      <div class="message" v-for="message in messages" :key="message.id">
        <div v-if="message.user === username" class="message-bubble">
          <strong class="sender">{{ message.user }} disse:</strong> {{ message.content }}
          <!-- <p class="date-time">we</p> -->
        </div>
        <div v-else class="message-bubble-recive">
          <strong class="sender">{{ message.user }} disses:</strong> {{ message.content }}
          <!-- <p class="date-time">we</p> -->
        </div>
      </div>
    </div>
    <input
      v-model="text"
      placeholder="Digite sua mensagem e aperte enter"
      type="text"
      v-on:keyup.enter="sendMessage"
    />
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
      username: localStorage.getItem("username"),
      messages: [],
      text: "",
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
      this.text = this.text.trim();
      if (this.text === "") {
        return;
      }
      this.addMessage();

      this.text = "";
    },

    addMessage() {
      const message = {
        id: new Date().getTime(),
        content: this.text,
        user: localStorage.getItem("username"),
      };
      SocketioService.socket.emit("msgToServer", message);
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
    SocketioService.socket.on("msgToServer", (data) => {
      this.messages.push(data)
    });
  },
  beforeUnmount() {
    SocketioService.disconnect();
  },
};
</script>

<style scoped>
.message {
  color: #000000;
  display: flex;
  font-size: 14px;
}

.message-bubble {
  background-color: #78e08f;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border-radius: 10px;
}

.message-bubble-recive {
  /* right: 1rem; */
  background-color: #82ccdd;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border-radius: 10px;
}

.chat-card {
  margin: 1rem;
  height: 60vh;
}

.material-icons.md-24 {
  position: relative;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: left;
  font-size: 20px;
  color: #ffffff;
  background: #1976d2;
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
  background-color: rgba(0,0,0,0.4) !important;
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
  /* transform: scale(1.05); */
}
.login-panel .login-submit {
  padding: 2em;
}

.sender {
  font-weight: 600;
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
