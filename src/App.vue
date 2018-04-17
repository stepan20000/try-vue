<template>
  <div id="app">
    <header class="header"></header>
    <main class="content">
      <router-view/>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="scss" rel="stylesheet/scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
