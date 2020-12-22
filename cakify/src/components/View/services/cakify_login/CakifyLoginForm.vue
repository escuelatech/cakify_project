<template>
  <div>
    <div><h4 v-show="!sendingSuccessful">LOGIN</h4></div>
    <div class="box loginContainer element">
      <form
        @reset="reset"
        @submit.prevent="submitLogin"
        v-show="!sendingSuccessful"
      >
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
            <small>
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
      email: "",
      password: "",
      logingData: "",
    };
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
          password: this.password,
        });
        this.sendingSuccessful = true;
        this.$router
          .push({ name: "DashboardPage" })
          .catch((err) => console.log(err));
      } catch (error) {
        this.sendingSuccessful = false;
        this.error = true;
      } finally {
        this.processing = false;
      }
    },
  },
};
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

.loginContainer {
  height: 100%;
  width: 100%;
  background-image: url("https://tse3.explicit.bing.net/th?id=OIP.xel46bmVjJGy_9VdtLtgAQHaGi&pid=Api&P=0&w=181&h=161");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: 5s;
  animation-name: animate;
  animation-direction: alternate-reverse;
  animation-duration: 20s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-play-state: running;
  animation-timing-function: ease-in-out;
  transform: perspective(1px) scale(1) translateZ(0);
  -webkit-font-smoothing: subpixel-antialiased;
  -webkit-transform: perspective(1000px);
}
@keyframes animate {
  0% {
    background-image: url("https://tse1.mm.bing.net/th?id=OIP.SepgvnsHPYaCSE7-8CYYjgHaKC&pid=Api&P=0&w=300&h=300");
  }
  20% {
    background-image: url("https://tse4.mm.bing.net/th?id=OIP.I3emi1JTVE_Opw7-ttSZyAAAAA&pid=Api&P=0&w=300&h=300");
  }
  40% {
    background-image: url("https://tse4.mm.bing.net/th?id=OIP.I3emi1JTVE_Opw7-ttSZyAAAAA&pid=Api&P=0&w=300&h=300");
  }
  60% {
    background-image: url("https://tse1.mm.bing.net/th?id=OIP.2nEQMmEw9gP0Uwg4Fv3FOAHaGn&pid=Api&P=0&w=187&h=168");
  }
  80% {
    background-image: url("https://tse1.mm.bing.net/th?id=OIP.EenrPCgKniwWBt9T96oquQEsEs&pid=Api&P=0&w=300&h=300");
  }
  90% {
    background-image: url("https://tse4.mm.bing.net/th?id=OIP.Ekgq8KJAOAKJSsZJtx147QHaFH&pid=Api&P=0&w=243&h=169");
  }
}
.element {
  filter: blur(0);
}
</style>