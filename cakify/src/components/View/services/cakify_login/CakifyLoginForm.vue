<template>
<div>
       
       <div> <h4 v-show="!sendingSuccessful">LOGIN</h4></div>
        <div class="box loginContainer element" >
        <form @reset="reset" @submit.prevent=" submitLogin" v-show="!sendingSuccessful">
         <div class="row gtr-uniform">
            <template v-if="!processing">
               <div class="col-6 col-12-xsmall">
                 <input
                  type="text"
                   name="email"
                   value="Your Email"
                   placeholder="Your Email"
                   autocomplete="off"
                   v-model="email"
                  />
               </div>
                <div class="col-6 col-12-xsmall"></div>
                <div class="col-6 col-12-xsmall">
                <input
                type="password"
                name="password"
                placeholder="Password"
                autocomplete="off"
                v-model="password"
                />
               </div>
               <div class="col-12">
               <small
                ><router-link :to="{ name: 'forgotPassword' }"
                >Forgot password?</router-link
               ></small
                >
              </div>
           </template>
          <div v-else class="col-6 col-12-xsmall loading">
            <Spinner :centered="true" size="80" />
          </div>
            <!-- Break -->
          <div class="col-12">
            <div class="errNotific" v-if="error">Wrong credentials</div>
         </div>
           <!-- Break -->
        <div class="col-12">
          <ul class="actions">
            <li>
              <input
                type="submit"
                :disabled="processing"
                value="Login"
                class="primary"
              />
            </li>
            <li>
              <input type="reset" :disabled="processing" value="Cancel" />
            </li>
          </ul>
        </div>
        <div class="col-12">
          <small
            >
            <router-link :to="{ name: 'CakifyRegistrationPage' }"
              >Ready to sell your cakes?Sign Up</router-link
            ></small
          ><br />
        </div>
      </div>
      
     </form>
     </div>
     
          
    </div>
</template>

<script>
import Spinner from "@/components/UI/Spinner";
import { mapActions } from "vuex";
    export default {
        data() {
            return {
                sendingSuccessful: false,
                error: false,
                processing: false,
                validateLogin: false,
                email: '',
                password:'',
                logingData:"",
                  }
        },
    
       components: {
          Spinner, 
          
          },
        methods: {
      
        ...mapActions({
      login: "auth/login",
    }),
    reset() {
      this.email = "";
      this.password = "";
      this.error = false;
    },
    async submitLogin() {
      
      this.error = false;
      this.processing = true;
      try {
        await this.login({
          email: this.email,
          password: this.password
        });
         this.sendingSuccessful = true;
         this.$router.push({ name: "Dashboard"}).catch(err => console.log(err));
         } catch (error) {
        this.sendingSuccessful = false;
        this.error = true;
      } finally {
        this.processing = false;
      }
    },
    }
    }
</script>

<style lang="scss" >
@import "@/design/main.scss";

.errNotific {
  color: red;
}
.loading {
  min-height: 170px;
  position: relative;

  .spinner {
    left: 20%;
  }
}
// .app-background {
//   background: rgba(0, 0, 0, 0);
//   background-image: url("https://media.istockphoto.com/videos/homemade-chocolate-cake-and-coffee-video-id1058331642?s=640x640");
//   //  background-image: url(images="images");
//   background-size: cover;
// }
.loginContainer{
  height: 100%;
  width : 100%;
  background-image: url("https://media.istockphoto.com/videos/homemade-chocolate-cake-and-coffee-video-id1058331642?s=640x640");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition:5s;
  animation-name: animate;
  animation-direction: alternate-reverse;
  animation-duration: 20s;
  animation-fill-mode: forwards;
  animation-iteration-count:infinite;
  animation-play-state: running;
  animation-timing-function: ease-in-out;
  transform: perspective(1px) scale(1) translateZ(0);
   -webkit-font-smoothing: subpixel-antialiased;
 -webkit-transform: perspective(1000px);
}
@keyframes animate {
  0%{
    background-image: url("https://images.pexels.com/photos/827513/pexels-photo-827513.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
  }
  20%{
    background-image: url("https://images.pexels.com/photos/1120970/pexels-photo-1120970.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
  }
  40%{
    background-image: url("https://images.pexels.com/photos/14107/pexels-photo-14107.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
  }
    40%{
    background-image: url("https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500");
  }
    40%{
    background-image: url("https://images.unsplash.com/photo-1563076429-c04cbe68da3a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60");
  }
    40%{
    background-image: url("https://images.unsplash.com/photo-1546856139-46fb2b57ff21?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60");
  }

}
.element {
    filter: blur(0);
}
</style>