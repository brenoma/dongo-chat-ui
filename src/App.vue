<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
</script>

<style>

#app {
  /* font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif; */
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 100%;
  height: 100vh;

  /* background: url("./assets/bg.jpg") no-repeat fixed center; */
  /* background: linear-gradient(90deg, rgba(113,133,186,1) 5%, rgba(81,145,149,1) 44%, rgba(128,132,203,1) 100%);  */
  background: linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5);
}

#content {
  overflow: hidden;
  height: 100%;
  width: 100%;
}
</style>
