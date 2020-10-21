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
          <!-- <section> -->
          <div class="text-justify">
          <!-- Section -->
            <section>
                <div class="posts">
                    <article  v-for="cake in cakes" :key='cake.cakeId' :value='cake'>
                        <a href="#" class="image">
                            <img height="300" width="150"
                                :src="cake.cakeImage" alt="" />
                        </a>
                        <h3>{{cake.cakeName}}</h3>
                        <h3>Price:   {{cake.cakePrice}}</h3>
                        <p>{{cake.description}}</p>
                        <button class="primary" @click="$router.push({name: 'EditCake', params: {cakeId: cake.cakeId}})">View</button>
                        
                    </article>
                </div>
            </section>
					
            <div class="row">
                <div class="col-4 col-12-small">
                    <input type="button"  value="Our Offered Services" class="primary"  @click="$router.push({name: 'OurOfferedServices'})" />
                </div>
            </div>
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
import cakifyAdminService from "@/apiservices/cakifyAdminService.js"
export default {
    components: { 
        Header, 
        Sidebar  
    },
    data() {
          return {
            cakes: [],
            dialog: false,
            // selectedCakeId: null,
            cake: '',
            egglessOption: '',
            cakeName: '',
            price: '',
            description: '',
            cakeType: null,
            formData: null,
            items: [
                'Custom',
                'Valentines',
                'Birthday',
                'Anniversary'
            ],
            options: [
                'Yes',
                'No'
            ],
            valid: ""
          }
      },
      mounted() {
              this.displayAllCakes();
        },
      methods: {
          displayAllCakes() {
              cakifyAdminService.getAllCakes()
                .then( response => {
                    this.cakes = response.data.apiResponse;
                    console.log('Cakes: ', this.cakes);
                })
                .catch( error => {
                    console.log("Error: ", error.response);
                })
            },
            getSelectedCake(cakeId) {
                cakifyAdminService.getCake(cakeId)
                    .then(response => {
                        this.cake = response.data.apiResponse;
                        console.log('Selected Cake: ', this.cake);
                        this.dialog = true;
                    })
                    .catch(error => {
                        console.log('Error', error.response)
                    })
            },
            submitEditCake(){
                cakifyAdminService.updateCake({
                    cakeName: this.cake.cakeName,
                    price: this.cake.price,
                    description: this.cake.description,
                    cakeType: this.cake.cakeType,
                    egglessOption: this.cake.egglessOption
                })
                .then(response => {
                    this.cake = response.data.apiResponse;
                    console.log('Editted Cake: ', this.cake)
                })
                .catch(error => {
                    console.log('Error in edit cake: ', error.response)
                })
            } 
      }
    
};
</script>

<style lang="scss" scoped>
</style>