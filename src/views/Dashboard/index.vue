<template>
  <div id="content">
    <chat-panel />
  </div>
</template>

<script>
import ChatPanel from "./components/ChatPanel.vue";

export default {
  components: { ChatPanel },
  name: "Dashboard",
  data() {
    return {
      title: 'Chat Messages',
      login: true,
    };
  },
  methods: {
    updateComponent: function (updatedLogin) {
      this.login = updatedLogin;
    },
  },
};
</script>

<style scoped />
