<template>
  <div>
    <Navbar/>
    <router-view/>
  </div>


</template>

<script>
import {Navbar} from "@/components/index.js";
import {RouterView} from "vue-router";

export default {
  components: {Navbar,}
}
</script>
<style>

</style>
