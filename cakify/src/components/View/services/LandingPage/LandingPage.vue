<template>
  <div>
    <v-app>
      <!-- Wrapper -->
      <div id="wrapper">
        <!-- Main -->
        <div id="main">
          <div class="inner">
            <!-- Header -->
            <Header />
            <!-- Header -->
            <!-- Form -->
            <h4>welcome !!! {{loggedInBakeryEmail}}</h4>
              <div align="right"> 
           <ul class="icons">
           <li>
            <button class="button small" @click="$router.push({ name: 'CakifySearchCakePage', params:{bakeryEmail:cake.bakeryEmail,cakeId: cake.cakeId}})" >
                 Search your cake
                </button>
           </li>
           </ul>
          </div> 
         
           
            <!-- <section> -->
            
           <div class="text-justify">
            <!-- Section -->
    
              <section>
                <div class="posts">
                  <article
                    v-for="cake in cakeListOfLoggedInBakery"
                    :key="cake.cakeId"
                    :value="cake"
                  >
                  
                    <a href="#" class="image">
                      <img
                        height="300"
                        width="150"
                        :src="cake.cakeImage"
                        alt=""
                      />
                    </a>
                   <!-- <h3>{{ cake.bakeryEmail }}</h3>-->
                   <!-- <h3>{{ cake.cakeName }}</h3>
                    <h3>Price: {{ cake.cakePrice }}</h3>
                    <p>{{ cake.description }}</p>-->
                    <button
                      class="primary"
                      @click="
                        $router.push({
                          name: 'EditCake',
                          params: { cakeId: cake.cakeId },
                        })
                      "
                    >
                      View
                    </button>
                  </article>
                </div>
              </section>
           
              <div>
              </div>
            </div>
            <!-- </section> -->
            <!-- Form -->
          </div>
        </div>
        <!-- Main ends -->

        <!-- Sidebar -->
        <Sidebar />
        <!-- Sidebar -->
      </div>
    </v-app>
  </div>
</template>

<script>
import Header from "@/components/View/common/Header";
import Sidebar from "@/components/View/common/Sidebar";
import cakifyAdminService from "@/apiservices/cakifyAdminService.js";



export default {
  components: {
    Header,
    Sidebar,
    },

  data() {
    return {
      loggedInBakeryEmail: "",
      cakeListOfLoggedInBakery: [],
      dialog: false,
      // selectedCakeId: null,
      cake: "",
      egglessOption: "",
      cakeName: "",
      price: "",
      description: "",
      cakeType: null,
      formData: null,
      items: ["Custom", "Valentines", "Birthday", "Anniversary"],
      options: ["Yes", "No"],
      valid: "",
      query: "",
      bakeryEmail: "",
      cakes:""
    };
  },

 
  created() {
        
    },
  mounted() {
     this.bakeryEmail = JSON.parse(localStorage.getItem('email'));
     this.displayLoggedInBakeryCakes();
  },


  methods: {
    displayLoggedInBakeryCakes() {
      this.loggedInBakeryEmail = this.bakeryEmail;
      cakifyAdminService
        .getCakeListForLoggedInBakery(this.loggedInBakeryEmail)
        .then((response) => {
          this.cakeListOfLoggedInBakery = response.data.data;
          console.log("Cakes: ", this.cakeListOfLoggedInBakery);
        })
        .catch((error) => {
          console.log("Error: ", error.response);
        });
    },

    //------------------------------------------------------------------------------------------------------
//    getSelectedCake(cakeId) {
//       cakifyAdminService
//         .getCake(cakeId)
//         .then((response) => {
//           this.cake = response.data.apiResponse;
//           console.log("Selected Cake: ", this.cake);
//           this.dialog = true;
//         })
//         .catch((error) => {
//           console.log("Error", error.response);
//         });
//     },
    submitEditCake() {
      cakifyAdminService
        .updateCake({
          cakeName: this.cake.cakeName,
          price: this.cake.price,
          description: this.cake.description,
          cakeType: this.cake.cakeType,
          egglessOption: this.cake.egglessOption,
        })
        .then((response) => {
          this.cake = response.data.apiResponse;
          console.log("Editted Cake: ", this.cake);
        })
        .catch((error) => {
          console.log("Error in edit cake: ", error.response);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>