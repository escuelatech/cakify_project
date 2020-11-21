<template>
    <v-app id="inspire">
        <section id="banner">
            <v-card width="400" class="mx-auto mt-5">
            <v-card-title>
                <h2 class="display-1">Login</h2>
            </v-card-title>
            <v-card-text>
                <v-form ref="loginForm" 
                    v-model="validateLogin"
                    @submit.prevent="login" v-show="!sendingSuccessful"
                >
                    <v-text-field
                        label="Email"
                        prepend-icon="mdi-account-circle"
                        v-model="email"
                        :rules="emailRules"
                    />
                    <v-text-field 
                        label="Password"
                        prepend-icon="mdi-lock"
                        type="password"
                        v-model="password"
                        :rules="passwordRules"
                    />
                </v-form>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn tile outlined 
                    color="primary" 
                    class="mr-2"
                    @click="$router.push({name: 'CakifyRegistrationPage'})"
                >Register</v-btn>
                <v-spacer></v-spacer>
                <v-btn tile outlined
                    color="success"
                    class="mr-2"
                    @click="login"
                    :disabled="processing"
                >Login</v-btn>
            </v-card-actions>
           
        </v-card>
        </section>
    </v-app>
</template>

<script>
import axios from 'axios';
import { mapActions } from "vuex";
    export default {
        data() {
            return {
                sendingSuccessful: false,
                error: false,
                processing: false,
                validateLogin: false,
                email: '',
                emailRules: [
                    value => !!value || 'Enter an Email Address',
                    value => /.+@.+/.test(value) || 'Enter a valid Email Address',
                ],
                password: '',
                passwordRules: [
                    value => !!value || 'Enter password',
                    value => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/.test(value) || 'Password must be valid (Password should have 6 to 12 charecters, atleast one digit, atleast one uppercase)',
                ]
            }
        },
        methods: {
        //     loginSubmit(){
        //         axios.post(" http://localhost:3000/login",{ 
        //             "email": this.email,
        //             "password": this.password,
        //     }).
        //     then (response=>{console.log( response.data)
        //      } ).
        //     catch(error=>{console.log('there was an error' + error.response)});
        // //      if(this.$refs.loginForm.validate()){
        //           console.log(this.email, this.password)
        //         this.$router.push({name: 'AddCakePage'})
        //      }
        //      else {
        //          this.$router.push({name: 'CakifyLoginPage'})
        //      }
                
        // },
        ...mapActions({
      login: "auth/login",
    }),
    reset() {
      this.email = "";
      this.password = "";
      this.error = false;
    },
    async login() {
        axios.post(" http://localhost:3000/login",{ 
                    "email": this.email,
                    "password": this.password,
            }),
      this.error = false;
      this.processing = true;
      try {
        await this.login({
          email: this.email,
          password: this.password
        });
        this.sendingSuccessful = true;
        this.$router.push({ name: "MainLandingPage" }).catch(err => console.log(err));
      } catch (error) {
        this.sendingSuccessful = false;
        this.error = true;
      } finally {
        this.processing = false;
      }
    }
    }
    }
</script>

<style lang="scss" >
@import "@/design/main.scss";
</style>