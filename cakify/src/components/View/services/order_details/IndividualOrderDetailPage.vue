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
          <IndividualOrderDetail />
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
  import IndividualOrderDetail from "@/components/View/services/order_details/IndividualOrderDetail.vue";

  export default {
      components: { 
          Header, 
          Sidebar, 
          IndividualOrderDetail
        }
    };
</script> 
