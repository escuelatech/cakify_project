<template>
  <div>
    <header class="major">
         <h2>Hospital Search</h2>
    </header>   
    <div class="text-justify">
        <p>Health care is in a time of intense change: exciting new treatments are available, and patient safety and quality is improving. There are also significant challenges. The population is aging and personnel, infrastructure and technology costs are increasing.</p>
        <p>A major goal of the Pranama is to encourage the separate pieces of the health care system to collaborate better to help patients get high-quality, coordinated care. </p>
        <p>We, at Pranama, offers services in various hospitals in the Kozhikode area. For more information, please visit our Contact Us Page.</p>
         <h5>
            <input type="button" value="Contact US" @click="$router.push({ name: 'ContactEmailPage' })" />
         </h5>
    </div>
  </div>
</template>
<script>
export default {
  
}
</script>

<style lang="scss" scoped>
@import "@/design/main.scss";
</style>