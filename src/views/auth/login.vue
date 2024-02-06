<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const { t } = useI18n();
const isLoading = ref(false);
const router = useRouter();
const route = useRoute();
const notyf = useNotyf();
const redirect = route.query.redirect as string;
const errors: any = reactive({
  username: "",
  password: "",
  message: "",
});

if (userStore.isLoggedIn) {
  router.push("/");
}

const handleLogin = async (event: Event) => {
  try {
    isLoading.value = true;
    Object.assign(errors, {
      username: "",
      password: "",
      message: "",
    });
    const values = Object.fromEntries(new FormData(event.target));

    await userStore.loginUser(values);

    notyf.success(`${t("Welcome_back")} ${values.username}`);

    if (redirect) {
      router.push(redirect);
    } else {
      router.push("/");
    }
  } catch (error: any) {
    // if (error.statusCode == 500) {
    //   notyf.error("Serverda hatolik");
    // }
    if (typeof error.response?.data.message === "string") {
      errors.message = error.response?.data.message;
      notyf.error(error.response?.data?.message);
    } else Object.assign(errors, error.response?.data?.message);
    // error.response?.data?.errors.message &&
  } finally {
    isLoading.value = false;
  }
};

function clearErrors(event: any) {
  errors[event.target.name] = "";
}
</script>

<template>
  <div class="loginPage">
    <div class="loginContent">
      <div class="card login-page-form">
        <div class="card mb-0">
          <div class="card-body">
            <div class="auth-full-page-content rounded d-flex p-3 my-2">
              <div class="w-100">
                <div class="d-flex flex-column">
                  <div class="d-block auth-logo mb-4">
                    <img
                      src="@/assets/images/Logo-Type-sRGB-PNG.png"
                      alt=""
                      height="50"
                      class="auth-logo-dark me-start"
                    />
                  </div>
                  <div class="auth-content my-auto">
                    <div class="text-center">
                      <h5 class="mb-0">{{ $t("Login_title") }}</h5>
                    </div>
                    <form class="mt-4 pt-2" @submit.prevent="handleLogin">
                      <div class="form-floating form-floating-custom mb-4">
                        <input
                          type="text"
                          class="form-control"
                          name="username"
                          :placeholder="$t('Username')"
                          autocomplete="username"
                          @input="clearErrors"
                          :class="{
                            'is-invalid': errors.username || errors.message,
                          }"
                        />
                        <!-- <span
                          v-if="errors.message"
                          style="color: red; margin-top: 5px"
                          >{{ errors.message }}</span
                        > -->
                        <label for="input-username">{{ $t("Login") }}</label>
                        <div class="form-floating-icon">
                          <i class="mdi mdi-account-multiple-outline"></i>
                        </div>
                        <div class="invalid-feedback animated fadeIn">
                          {{ errors.username[0] }}
                        </div>
                      </div>

                      <div
                        class="form-floating form-floating-custom mb-4 auth-pass-inputgroup"
                      >
                        <input
                          type="password"
                          class="form-control pe-5"
                          id="password-input"
                          name="password"
                          :placeholder="$t('Password')"
                          autocomplete="current-password"
                          @input="clearErrors"
                          :class="{
                            'is-invalid': errors.password || errors.message,
                          }"
                        />
                        <!-- <span
                          v-if="errors.message"
                          style="color: red; margin-top: 5px"
                          >{{ errors.message }}</span
                        > -->
                        <button
                          type="button"
                          class="btn btn-link position-absolute h-100 end-0 top-0"
                          id="password-addon"
                        >
                          <!-- <i
                            class="mdi mdi-eye-outline font-size-18 text-muted"
                          ></i> -->
                        </button>
                        <label for="password-input">{{ $t("Password") }}</label>
                        <div class="form-floating-icon">
                          <i class="mdi mdi-lock-outline" size="1.5rem"></i>
                        </div>
                        <div class="invalid-feedback animated fadeIn">
                          {{ errors.password[0] }}
                        </div>
                      </div>
                      <div class="mb-3">
                        <button
                          class="btn btn-sign-in w-100 waves-effect waves-light"
                          type="submit"
                          :disabled="isLoading"
                        >
                          <span
                            v-if="isLoading"
                            class="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          {{ $t("Sign_In") }}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loginPage {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginContent {
    max-width: 500px;
    width: 100%;
    max-height: 80vh;
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    background-image: url("@/assets/images/login.jpg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: rigth center;
  }
  .login-page-form {
    z-index: 1;
    background-color: rgba(255, 255, 255, 0.9) !important;
  }
  .card {
    --bs-card-bg: none;
  }
  input {
    font-size: 16px;
  }
}
.btn-sign-in {
  background: #00264b;
  color: #fff;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:active,
input:-webkit-autofill:focus {
  background-color: #ffffff !important;
  color: #555 !important;
  -webkit-box-shadow: 0 0 0 1000px white inset !important;
  -webkit-text-fill-color: #555555 !important;
}
</style>
