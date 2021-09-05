<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="scss">

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  height: 100vh;
  width: 100%;
}
*::-webkit-scrollbar {
  background-color: #fff;
  width: 16px;
}
*::-webkit-scrollbar-track {
  background-color: #fff;
}
*::-webkit-scrollbar-track:hover {
  background-color: #f4f4f4;
}
*::-webkit-scrollbar-thumb {
  background-color: #babac0;
  border-radius: 16px;
  border: 5px solid #fff;
}
*::-webkit-scrollbar-thumb:hover {
  background-color: #a0a0a5;
  border: 4px solid #f4f4f4;
}
*::-webkit-scrollbar-button {
  display: none;
}
</style>
