<template>
  <div>
    <v-app id="inspire" class="app-background">
      <v-row justify="space-around">
        <v-card width="500" class="card" center>
          <v-card-title>Bakery Sign-Up</v-card-title>
          <section id="banner">
            <div class="content text-justify">
              <v-card-text>
                <v-form ref="form" v-model="valid" @submit.prevent="submit">
                  <v-container>
                    <v-col>
                      <v-text-field
                        v-model="bakeryname"
                        prepend-icon="mdi-store"
                        :rules="nameRules"
                        :counter="20"
                        label="Bakery Name"
                        required
                        autocomplete="off"
                      ></v-text-field>
                    </v-col>

                    <v-col>
                      <v-text-field
                        v-model="ownername"
                        prepend-icon="mdi-account-circle"
                        :rules="nameRules"
                        :counter="20"
                        label="Owner"
                        required
                        autocomplete="off"
                      ></v-text-field>
                    </v-col>

                    <v-col>
                      <v-text-field
                        v-model="password"
                        prepend-icon="mdi-lock"
                        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="passwordRules"
                        :type="show2 ? 'text' : 'password'"
                        label="Password"
                        value=""
                        @click:append="show2 = !show2"
                        required="required"
                        autocomplete="off"
                      ></v-text-field>
                    </v-col>

                    <v-col>
                      <v-text-field
                        v-model="location"
                        prepend-icon="mdi-map-marker"
                        :rules="nameRules"
                        :counter="20"
                        label="Location"
                        required
                        autocomplete="off"
                      ></v-text-field>
                    </v-col>

                    <v-col>
                      <v-text-field
                        v-model="phone"
                        type="tel"
                        :counter="12"
                        prepend-icon="mdi-phone"
                        :rules="phoneRules"
                        label="Phone"
                        required
                        autocomplete="off"
                      ></v-text-field>
                    </v-col>

                    <v-col>
                      <v-text-field
                        v-model="email"
                        prepend-icon="mdi-email"
                        :rules="emailRules"
                        label="E-mail"
                        required
                        autocomplete="off"
                      ></v-text-field>
                    </v-col>

                    <v-col>
                      <v-textarea
                        v-model="description"
                        label=" Description"
                        value=""
                        prepend-icon="mdi-pen"
                        :rules="descriptionRules"
                        autocomplete="off"
                      ></v-textarea>
                    </v-col>

                    <v-card-actions>
                      <v-btn
                        :disabled="!valid"
                        tile
                        outlined
                        color="primary"
                        class="mr-2"
                        @click="submit"
                      >
                        Submit
                      </v-btn>

                      <v-btn
                        tile
                        outlined
                        color=" success"
                        class="mr-2"
                        @click="reset"
                      >
                        Reset
                      </v-btn>

                      <v-btn
                        tile
                        outlined
                        color=" warning"
                        class="mr-2"
                        @click="$router.push({ name: 'CakifyLoginPage' })"
                      >
                        Cancel
                      </v-btn>
                    </v-card-actions>
                    <v-snackbar
                      v-model="snackbar"
                      :multi-line="multiLine"
                      top
                      center
                    >
                      {{ register }}
                      <template v-slot:action="{ attrs }"
                        ><v-btn
                          color="red"
                          text
                          v-bind="attrs"
                          @click="snackbar = false"
                          >Close
                        </v-btn></template
                      >
                    </v-snackbar>
                  </v-container>
                </v-form>
              </v-card-text>
            </div>
          </section>
        </v-card>
      </v-row>
    </v-app>
  </div>
</template>

<script>
import cakifyAdminService from "@/apiservices/cakifyAdminService.js";
export default {
  data() {
    return {
      valid: false,
      snackbar: false,
      bakeryname: "",
      ownername: "",
      password: "",
      location: "",
      phone: "",
      email: "",
      description: "",
      show2: false,
      multiLine: true,
      register: "",

      nameRules: [
        (v) => !!v || "Bakery Name is required",
        (v) =>
          (v && v.length <= 20) ||
          "Bakery Name must be less than 10 characters",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/.test(v) ||
          "Password must be valid (need 6 to 12 characters, one digit, one uppercase)",
      ],

      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      phoneRules: [
        (v) => !!v || "Phone Number is required",

        (v) => /^[0-9].{10,12}$/.test(v) || "Phone Number must be valid",
      ],
      descriptionRules: [
        (v) => !!v || "Description is required",
        (v) =>
          (v && v.length <= 50) ||
          "Description must be less than 50 characters",
      ],
    };
  },
  methods: {
    submit() {
      // ***code for connect with escuela database***//
      cakifyAdminService
        .bakeryregister({
          bakeryname: this.bakeryname,
          ownername: this.ownername,
          password: this.password,
          location: this.location,
          phone: this.phone,
          email: this.email,
          description: this.description,
        }).then((response) => {
          this.snackbar = true;
          response.data;
          this.register = response.data.data;
        });
      this.$refs.form.reset();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style lang="scss" scoped>
.app-background {
  background: rgba(0, 0, 0, 0);
  background-image: url("https://food.fnr.sndimg.com/content/dam/images/food/fullset/2019/9/6/FNM_100119-Black-Chocolate-Cake_s4x3.jpg.rend.hgtvcom.476.357.suffix/1567792790823.jpeg");
  background-size: cover;
}
.card {
  background-color: white !important;
  opacity: 0.85;
  border-color: transparent !important;
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
