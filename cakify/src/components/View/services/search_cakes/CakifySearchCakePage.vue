<template>
  <div>
    <!-- Wrapper -->
    <div id="wrapper">
      <!-- Main -->
      <div id="main">
        <div class="inner">
          <!-- Header -->
          <Header />
          <!-- Header -->
          <!-- Form -->

          
          <CakifySearchCakeForm />

          <!-- Form -->
        </div>
      </div>
      <!-- Main ends -->

      <Sidebar />
    </div>
  </div>
</template>

<script>
import Header from "@/components/View/common/Header";
import Sidebar from "@/components/View/common/Sidebar";
import CakifySearchCakeForm from "@/components/View/services/search_cakes/CakifySearchCakeForm.vue";

export default {
  components: {
    Header,
    Sidebar,
    CakifySearchCakeForm,
  },
};
</script>
