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
                <CakifyRegistrationForm />

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
import CakifyRegistrationForm from "@/components/View/services/cakify_registration/CakifyRegistrationForm.vue";

export default {
    components: {
        Header,
        Sidebar,
        CakifyRegistrationForm,

    }
};
</script>
