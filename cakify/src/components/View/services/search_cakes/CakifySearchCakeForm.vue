<template>
  <div>
    <v-app>
      <div>
        <header class="major">
          <h2>Search</h2>
        </header>
      </div>

      <div>
        <!-- <form > -->
        <!-- <div class="row gtr-uniform box"> -->
        <!-- <div class="col-6 col-12-xsmall">
                        <label>Your cake type </label>
                            <vue-bootstrap-typeahead
                             class="mb-4"
                             v-model="queryByType"
                             :data="cakeTypes"
                             :serializer="(cakeTypes) => cakeTypes.type"
                            @hit="selectedTypes = $event"
                            />
                       </div> -->
        <div class="col-6 col-12-xsmall">
          <label>Your cake type </label>
          <select
            v-model="queryByType"
            class="boxBorder"
            @change="findSearchedCake"
          >
            <option value="null" disabled>Select your cake type</option>
            <option v-for="type in cakeTypes" :key="type.type" :value="type">
              {{ type.type }}
            </option>
          </select>
        </div>

        <!-- <div class="col-12">
                        <ul class="actions">
                           <li>
                            <input type="submit" value="FIND" class="primary" />
                           </li>
                       </ul>
                    </div> -->
        <!-- </div> -->
        <!-- </form> -->
      </div>

      <div class="box alt" v-show="!cakeDisplay && !searchDisplay">
        <header class="major">
          <h2>Cakes in your account</h2>
        </header>
        <div class="row gtr-50 gtr-uniform">
          <div
            class="col-4"
            v-for="cake in cakeListOfLoggedInBakery"
            :key="cake.cakeId"
            :value="cake"
          >
            <span class="image fit">
              <div class="container">
                <img :src="cake.cakeImage" alt="" style="cursor: default" />
                <h4>
                  <span>{{ cake.cakeName }}</span>
                </h4>
              </div>
            </span>
          </div>
        </div>
      </div>
      <!--Listin by type-->
      <div class="box alt" v-show="cakeDisplay && !searchDisplay">
        <header class="major">
          <h2>Cakes in selected type</h2>
        </header>
        <div class="row gtr-50 gtr-uniform">
          <div
            class="col-4"
            v-for="caketype in cakesByTypeForLoggedInBakery"
            :key="caketype.cakeId"
            :value="caketype"
          >
            <span class="image fit">
              <div class="container">
                <img
                  :src="caketype.cakeImage"
                  alt=""
                  @click="
                    $router.push({
                      name: 'EditCake',
                      params: { cakeId: caketype.cakeId },
                    })
                  "
                />
                <h4>
                  <span>{{ type.cakeName }}</span>
                </h4>
              </div>
            </span>
          </div>
        </div>
      </div>

      <div v-show="searchDisplay" class="box">
        <p class="displyMessage">{{ searchReasult }}</p>
      </div>
    </v-app>
  </div>
</template>

<script>
import SearchPageServices from "@/apiservices/SearchPageServices.js";
export default {
  data() {
    return {
      cakeListOfLoggedInBakery: [],
      cakesByTypeForLoggedInBakery: [],
      cakeTypes: [
        { id: 1, type: "Custom" },
        { id: 2, type: "Valentines" },
        { id: 3, type: "Birthday" },
        { id: 4, type: "Anniversary" },
      ],
      cake: "",
      type: "",
      bakeryEmail: "",
      queryByType: "",
      cakeDisplay: false,
      searchReasult: "",
      searchDisplay: false,
    };
  },

  mounted() {
    // Getting email from local storage
    this.bakeryEmail = JSON.parse(localStorage.getItem("email"));

    // calling function of logged in bakeries cake list
    this.displayCakesOfLoggedInBakery();
  },
  methods: {
    // Getting logged in bakeries cake list
    displayCakesOfLoggedInBakery() {
      SearchPageServices.getCakeListForLoggedInBakery(this.bakeryEmail)
        .then((response) => {
          this.cakeListOfLoggedInBakery = response.data.data;
          console.log(
            "Logged in Bakery CakeList",
            this.cakeListOfLoggedInBakery
          );
        })
        .catch((error) => {
          console.log(error, "error.response");
        });
    },
    // Getting logged in bakeries cake list by type

    findSearchedCake() {
      SearchPageServices.getCakeListByTypeForLoggedInBakery(
        this.bakeryEmail,
        this.queryByType.type
      )
        .then((response) => {
          this.cakesByTypeForLoggedInBakery = response.data.data;
          console.log(
            "selected type cake list",
            this.cakesByTypeForLoggedInBakery
          );
          if (this.cakesByTypeForLoggedInBakery !== null) {
            this.cakeDisplay = true;
            this.searchDisplay = false;
          } else {
            this.searchReasult =
              " You have not yet added any cakes in your searched type";
            this.searchDisplay = true;
          }
          console.log(
            "Logged in Bakery cake list by type",
            this.cakesByTypeForLoggedInBakery
          );
        })
        .catch((error) => {
          console.log(error, "error.response");
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.image {
  cursor: pointer;
  max-width: 100%;
  height: 100%;
  width: auto;
}
select {
  height: 50px;
}
.image.fit img {
  width: 100%;
  height: 275px;
}
.container {
  position: relative;
  width: 100%;
}
h4 {
  position: absolute;
  top: 8px;
  left: 16px;
  color: rgb(250, 242, 242);
  padding-left: 5px;
  padding-top: 5px;
}
.displyMessage {
  color: red;
  font-size: 23px;
  font-style: italic;
}
</style>