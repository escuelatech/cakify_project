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
          <CakifySearchCake />

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
import CakifySearchCake from "@/components/View/services/search_cakes/CakifySearchCake.vue";

export default {
  components: {
    Header,
    Sidebar,
    CakifySearchCake,
  },
};
</script>
