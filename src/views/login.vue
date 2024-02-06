<script>
export default {};
</script>

<template>
  <div class="loginPage">
    <div class="loginContent">
      <div class="card">
        <div class="card mb-0">
          <div class="card-body">
            <div class="auth-full-page-content rounded d-flex p-3 my-2">
              <div class="w-100">
                <div class="d-flex flex-column">
                  <div class="d-block auth-logo mb-4">
                    <img
                      src="profi.jpg"
                      alt=""
                      height="50"
                      class="auth-logo-dark me-start"
                    />
                  </div>
                  <div class="auth-content my-auto">
                    <div class="text-center">
                      <h5 class="mb-0">Profi University</h5>
                      <p class="text-muted mt-1">EDUNI OTM axborot tizimi</p>
                    </div>
                    <form class="mt-4 pt-2">
                      <div class="form-floating form-floating-custom mb-4">
                        <input
                          type="text"
                          class="form-control"
                          id="input-username"
                          placeholder="Enter User Name"
                        />
                        <label for="input-username">Username</label>
                        <div class="form-floating-icon">
                          <eva-icon name="people-outline"></eva-icon>
                        </div>
                      </div>

                      <div
                        class="
                          form-floating form-floating-custom
                          mb-4
                          auth-pass-inputgroup
                        "
                      >
                        <input
                          type="password"
                          class="form-control pe-5"
                          id="password-input"
                          placeholder="Enter Password"
                        />

                        <button
                          type="button"
                          class="
                            btn btn-link
                            position-absolute
                            h-100
                            end-0
                            top-0
                          "
                          id="password-addon"
                        >
                          <i
                            class="mdi mdi-eye-outline font-size-18 text-muted"
                          ></i>
                        </button>
                        <label for="password-input">Password</label>
                        <div class="form-floating-icon">
                          <eva-icon name="lock-outline"></eva-icon>
                        </div>
                      </div>

                      <div class="row mb-4">
                        <div class="col">
                          <div class="form-check font-size-15">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="remember-check"
                            />
                            <label
                              class="form-check-label font-size-13"
                              for="remember-check"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                      </div>
                      <div class="mb-3">
                        <button
                          class="btn btn-primary w-100 waves-effect waves-light"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>
                    </form>

                    <!-- <div class="mt-4 pt-3 text-center">
                      <div class="signin-other-title">
                        <h5 class="font-size-14 mb-4 text-muted fw-medium">
                          - Or you can join with -
                        </h5>
                      </div>

                      <div class="d-flex gap-2">
                        <button
                          type="button"
                          class="
                            btn btn-soft-primary
                            waves-effect waves-light
                            w-100
                          "
                        >
                          <i
                            class="bx bxl-facebook font-size-16 align-middle"
                          ></i>
                        </button>
                        <button
                          type="button"
                          class="
                            btn btn-soft-info
                            waves-effect waves-light
                            w-100
                          "
                        >
                          <i
                            class="bx bxl-linkedin font-size-16 align-middle"
                          ></i>
                        </button>
                        <button
                          type="button"
                          class="
                            btn btn-soft-danger
                            waves-effect waves-light
                            w-100
                          "
                        >
                          <i
                            class="bx bxl-google font-size-16 align-middle"
                          ></i>
                        </button>
                      </div>
                    </div> -->

                    <!-- <div class="mt-4 pt-3 text-center">
                      <p class="text-muted mb-0">
                        Don't have an account ?
                        <router-link
                          to="/auth/register"
                          class="text-primary fw-semibold"
                        >
                          Signup now
                        </router-link>
                      </p>
                    </div> -->
                  </div>
                  <!-- <div class="mt-4 text-center">
                    <p class="mb-0">
                      © {{ new Date().getFullYear() }} Borex . Crafted with
                      <i class="mdi mdi-heart text-danger"></i> by Themesbrand
                    </p>
                  </div> -->
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
  background-color: #eaedf2 !important;
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
}
</style>
