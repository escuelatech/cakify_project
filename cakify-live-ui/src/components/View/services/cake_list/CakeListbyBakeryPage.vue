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
          <CakeListByBakery />
          <!-- Form -->
        </div>
      </div>
      <!-- Main ends -->

      <!-- Sidebar -->
      <Sidebar />
      <!-- Sidebar -->
    </div>
  </div>
</template>
<script>
  import Header from "@/components/View/common/Header";
  import Sidebar from "@/components/View/common/Sidebar";
  import CakeListByBakery from "@/components/View/services/cake_list/CakeListByBakery.vue";

  export default {
      components: { 
          Header, 
          Sidebar, 
          CakeListByBakery
        }
    };
</script> 
