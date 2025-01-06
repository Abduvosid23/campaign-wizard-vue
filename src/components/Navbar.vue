<template>
  <div class="container py-3">
    <header>
      <div class="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">

        <a><router-link class="d-flex align-items-center text-dark text-decoration-none" to='/'>
          Campaign Wizard
        </router-link></a>

        <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <a><router-link class="me-3 py-2 text-dark text-decoration-none"  to='add-form'>
            Add Form
          </router-link></a>

          <a><router-link class="me-3 py-2 text-dark text-decoration-none" to='about'>
            About
          </router-link></a>

        </nav>
      </div>


    </header>


  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  }
}
</script>

<style>

</style>