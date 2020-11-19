<template>
  <div class="home">
   <SplashScreen />
  </div>
</template>

<script>
// @ is an alias to /src
import SplashScreen from "@/components/SplashScreen.vue";

export default {
  name: "Home",
  components: {
    SplashScreen
  }
};
</script>
