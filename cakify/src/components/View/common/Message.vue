<template>
<!-- v-show="isError" -->
    <div class="box text-justify" v-html = "message">
    </div>
</template>
<script>

export default {
    computed: {
        message() {
        return this.$store.state.message
    }
    }
}
</script>