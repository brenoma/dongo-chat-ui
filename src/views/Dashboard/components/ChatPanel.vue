<template>
  <div class="login-panel">
    <div class="material-icons md-24">
      <span>{{ username }}</span>
      <i class="fas fa-times-circle" v-on:click="handleLogout()"></i>
    </div>

    <div class="chat-card" data-scroll-el>
      <div data-scrolling style="overflow: hidden; overflow-y: auto">
        <div class="message" v-for="message in messages" :key="message.id">
          <div v-if="message.user === username" class="message-bubble">
            <strong class="sender">{{ message.user }}:</strong>
            {{ message.content }}
            <!-- <p class="date-time">we</p> -->
          </div>
          <div v-else class="message-bubble-recive">
            <strong class="sender">{{ message.user }}:</strong>
            {{ message.content }}
            <!-- <p class="date-time">we</p> -->
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="input-group">
        <input
          class="form-control type_msg"
          v-model="text"
          placeholder="Digite sua mensagem e aperte enter"
          type="text"
          v-on:keyup.enter="sendMessage"
        />
        <div class="input-group-text send_btn">
          <i class="fas fa-location-arrow" v-on:click="sendMessage()"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import SocketioService from "../../../services/socketio.service.js";

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
    handleLogout() {
      const username = localStorage.getItem("username");
      localStorage.clear();
      this.$router.push({ path: "/" });

      SocketioService.disconnect();

      this.makeToast("success", `Usuário ${username} deslogado com sucesso.`);
    },

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
        id: localStorage.getItem("userId"),
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

    scrollToEnd() {
      const el = document.querySelector("[data-scroll-el]");
      const scrolling = document.querySelector("[data-scrolling]");
      el.scroll({
        top: scrolling.scrollHeight * 2,
        behavior: "smooth",
      });
    },
  },
  created() {
    SocketioService.setupSocketConnection();
    SocketioService.socket.on("msgToServer", (data) => {
      this.messages.push(data);
      this.$nextTick(() => this.scrollToEnd());
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
  margin-right: 1rem;
  margin-left: auto;
  word-break: break-all;
  max-width: 70%;
  background-color: #78e08f;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border-radius: 150px 150px 0 150px !important;
}

.message-bubble-recive {
  word-break: break-all;
  max-width: 70%;
  background-color: #82ccdd;
  padding: 0.75rem;
  margin-bottom: 0.75rem;
  border-radius: 150px 150px 150px 0 !important;
}

.chat-card {
  overflow: auto;
  margin: 1rem;
  height: 60vh;
}

.material-icons.md-24 {
  padding-right: 2rem;
  padding-left: 2rem;
  display: flex;
  justify-content: space-between;
  height: 5vh;
  display: flex;
  align-items: center;
  position: relative;
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: left;
  font-size: 20px;
  color: #ffffff;
  background-color: rgba(0, 0, 0, 0.4) !important;
}

.login-panel {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0rem auto;
  border-radius: 0 0 15px 15px !important;
  animation: animate 0.5s linear forwards;
  background-color: rgba(0, 0, 0, 0.4) !important;
  @media screen and (max-width: 768px) {
    width: 80%;
  }
}

.sender {
  font-weight: 600;
}

.card-footer {
  border-radius: 0 0 15px 15px !important;
  border-top: 0 !important;
}

.input-group {
  border-radius: 0 0 15px 15px !important;
  border-top: 0 !important;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
}

.type_msg {
  padding-left: 1rem;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3) !important;
  border: 0 !important;
  color: white !important;
  height: 60px !important;
  border-top: 0 !important;
  border-radius: 0 0 0 15px !important;
}

.type_msg:focus {
  box-shadow: none !important;
  outline: 0px !important;
}

.send_btn {
  width: 5vw;
  padding-right: 10px;
  justify-content: center;
  align-items: center;
  height: 3.85rem;
  display: flex;
  border-radius: 0 0 15px 0;
  border-top: 0 !important;
  background-color: rgba(0, 0, 0, 0.3) !important;
  color: #78e08f !important;
  cursor: pointer;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
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
