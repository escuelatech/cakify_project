<template>
  <div>
    <br />
    <ul class="actions">
      <li>
        <input
          type="button"
          value="Back"
          class="primary"
          @click="$router.push({ name: 'SearchPage' })"
        />
      </li>
    </ul>
    <br />
    <div>
      <div class="row gtr-uniform">
        <div class="col-6 col-12-xsmall">
          <select
            v-model="typeOfCake"
            class="col-12 col-12-xsmall"
            @change="findSearchedCake"
          >
            <option value="null" disabled>Select the type of cake</option>
            <option
              v-for="cakeType in cakeTypes"
              :key="cakeType.type"
              :value="cakeType"
            >
              {{ cakeType.type }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <br />
    <br />
    <section>
      <header class="major" v-show="cakeDisplay">
        <h2>Cakes in selected type</h2>
      </header>
      <div class="row gtr-50 gtr-uniform">
        <div
          class="col-4"
          v-for="cake in cakesByTypeForRegisteredBakery"
          :key="cake.cakeId"
        >
          <span class="image fit">
            <div class="container">
              <img
                :src="cake.cakeImage"
                alt=""
                :title="cake.description"
                @click="
                  $router.push({
                    name: 'CakeDetails',
                    params: { cakeId: cake.cakeId },
                  })
                "
              />
              <div class="content">
                <h4>
                  <span>{{ cake.cakeName }}</span>
                </h4>
                <p>
                  Price: <i class="fas fa-rupee-sign"></i>{{ cake.cakePrice }}
                </p>
              </div>
            </div>
          </span>
        </div>
      </div>
      <div v-show="searchDisplay" class="box">
        <p class="displyMessage">{{ searchReasult }}</p>
      </div>
    </section>
  </div>
</template>

<script>
import BakeryService from "@/apiservices/BakeryService.js";
export default {
  data() {
    return {
      bakeryEmail: "",
      typeOfCake: null,
      cakeTypes: [
        { id: 1, type: "Custom" },
        { id: 2, type: "Valentines" },
        { id: 3, type: "Birthday" },
        { id: 4, type: "Anniversary" },
      ],
      cakesByTypeForRegisteredBakery: [],
      searchReasult: "",
      searchDisplay: false,
      cakeDisplay: false,
    };
  },
  created() {
    this.bakeryEmail = this.$route.params.bakeryEmail;
  },

  methods: {
    findSearchedCake() {
      BakeryService.getCakeListByTypeForRegisteredBakery(
        this.bakeryEmail,
        this.typeOfCake.type
      ).then((response) => {
        this.cakesByTypeForRegisteredBakery = response.data.data;
        if (this.cakesByTypeForRegisteredBakery !== null) {
          this.cakeDisplay = true;
          this.searchDisplay = false;
        } else {
          this.searchReasult =
            " Bakery has not yet listed cakes in this selected type";
          this.searchDisplay = true;
        }
        console.log(
          "Registered Bakery cake list by type",
          this.cakesByTypeForRegisteredBakery
        );
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 736px) {
  .posts article {
    margin: 0 0 4.5em 4.5em;
    width: calc(33% - 4.5em);
  }
}
.image {
  cursor: pointer;
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
  margin: 0 auto;
}

.container .content {
  position: absolute;
  bottom: 0;
  background: rgb(0, 0, 0);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  width: 91.7%;
  padding: 20px;
  margin-bottom: 10px;
}

h4 {
  color: white;
}
.displyMessage {
  color: red;
  font-size: 23px;
  font-style: italic;
}
</style>