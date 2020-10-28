<template>
  <div >
  <section>
  <div v-for="image in favCakeImage" :key="image.cakeId"  class="mini-posts">
  <article>
  <a href="" ><img height="250" width="250" :src="image.cakeImage" alt="photo" /></a>
  <p>{{image.cakeName}}</p>
   </article>
    </div>
    </section>
  </div>
</template>

<script>
import cakifyAdminService from "@/apiservices/cakifyAdminService.js";
export default {
  data() {
    return {
      favouriteCake: "",
      error: "",
      cakeImage: "",
      favCakeImages: [],
      favCakeImage:"",
      favImages:""
    };
  },
  mounted() {
    this.getBestSellingCakes();
  },

  methods: {
    // 
    getBestSellingCakes() {
      cakifyAdminService
        .getAllCakes(JSON.stringify(this.cakeId))
        .then((response) => {
          this.favCakeImage = response.data.apiResponse;
          console.log(this.favCakeImage, "assinged to FavecakeImage from response");
         })
        .catch((error) => {
          console.log("Error reported from endpoints :", error.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>