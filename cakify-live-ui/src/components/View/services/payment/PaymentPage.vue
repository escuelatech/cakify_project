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
                <section>
                    <Payment />
                </section>

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
import Payment from "@/components/View/services/payment/Payment.vue";

export default {
    components: {
        Header,
        Sidebar,
        Payment
    }
};
</script>
