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
          <Dashboard />
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
  import Dashboard from "@/components/View/services/LandingPage/Dashboard.vue";

  export default {
      components: { 
          Header, 
          Sidebar, 
          Dashboard
        }
    };
</script> 
