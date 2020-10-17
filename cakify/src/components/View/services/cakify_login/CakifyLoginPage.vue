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
                <CakifyLoginForm />

                <!-- Form -->
            </div>
        </div>
        <!-- Main ends -->

    </div>
</div>
</template>

<script>
import Header from "@/components/View/common/Header";
import CakifyLoginForm from "@/components/View/services/cakify_login/CakifyLoginForm.vue";

export default {
    components: {
        Header,
        CakifyLoginForm
    }
};
</script>
