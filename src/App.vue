<template>
  <div id="app" class="w-screen h-screen overflow-hidden">
    <Hangman />
  </div>
</template>

<script>
import Hangman from "./components/Hangman.vue";

export default {
  name: "App",
  components: {
    Hangman,
  },
};
</script>

<style>
body {
  background-color: #34495e;
}
#app {
  font-family: Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
/* .show-up-enter {
  transform: translateY(56px);
}

.show-up-enter-active {
  transition: transform 0.6s ease-out;
}

.show-up-leave-to {
  transform: translateY(-56px);
} */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(100px);
}
.fade-enter-to {
  transform: translateY(0);
  opacity: 1;
}
</style>
