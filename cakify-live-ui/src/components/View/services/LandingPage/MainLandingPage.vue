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
                
                <SearchPage />

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
import SearchPage from "@/components/View/services/LandingPage/SearchPage.vue";
// import BakeryPage from "@/components/View/services/LandingPage/BakeryPage.vue";

export default {
    components: {
        Header,
        Sidebar,
        SearchPage, 
        // BakeryPage
    }
};
</script>
