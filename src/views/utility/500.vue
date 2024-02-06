<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <section class="authentication-bg min-vh-100 py-5 py-lg-0">
    <div class="bg-overlay bg-light"></div>
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="row">
            <div class="col-lg-12">
              <div class="text-center mb-5">
                <h1 class="error-title">
                  <span class="blink-infinite">500</span>
                </h1>
                <h4 class="text-uppercase">
                  {{ $t("An_internal_server_error_occurred") }}
                </h4>
                <p class="font-size-15 mx-auto text-muted w-50 mt-4">
                  {{ $t("No_connection_with_LMS_server") }}
                </p>
                <div class="mt-5 text-center">
                  <router-link
                    class="btn btn-primary waves-effect waves-light"
                    to="/"
                    ><i class="mdi mdi-home me-1"></i>
                    {{ $t("back_to_Home") }}</router-link
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-md-8 col-xl-7">
              <div class="mt-2">
                <img
                  src="/src/assets/images/error-img.png"
                  alt=""
                  class="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
