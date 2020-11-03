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
                <Payment />

                <!-- Form -->
            </div>
        </div>
        <!-- Main ends -->

    </div>
</div>
</template>

<script>
import Header from "@/components/View/common/Header";
import Payment from "@/components/View/services/payment/Payment.vue";

export default {
    components: {
        Header,
        Payment
    }
};
</script>
