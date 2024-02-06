<template>
  <div pagetitle="'Malaka oshirish'" class="create-order-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/status-student/order-list"
              >{{ $t("Decree") }} /
            </router-link>
            {{ $t("create__order") }}
          </h5>
          <div class="panel-toggles">
            <router-link to="/status-student/order-list"
              ><button class="btns black-c py-1.5 px-4" type="submit">
                <i
                  class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"
                ></i
                >{{ $t("Back") }}
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-------------------create command------------------------->
  <div class="card">
    <div class="card-body">
      <CommandForm
        :form-state="formState"
        :errors="errors"
        :is-loading="isLoading"
        @submit="onSubmit"
        @clear-error="clearError"
      />
    </div>
  </div>
  <!-------------------create command------------------------->
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { createCommand } from "@/utils/api/status-student/order-list";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import router from "@/router";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const file = reactive({});
const formState = reactive({
  name: "",
  target: "",
  body: "",
  date: "",
  number: "",
  file: null,
  status: true,
  command_type_id: null,
  department_id: null,
  conclusion: "",
});
const errors = reactive({
  name: [],
  target: [],
  body: [],
  date: [],
  number: [],
  file: [],
  status: [],
  command_type_id: [],
  department_id: [],
  conclusion: "",
});

async function onSubmit() {
  try {
    isLoading.value = true;
    Object.assign(errors, {});

    const formData = new FormData();

    Object.getOwnPropertyNames(formState).forEach((prop) => {
      if (!["id", "citizenship", "user_id"].includes(prop) && formState[prop])
        formData.append(prop, formState[prop]);
    });

    // if (formImage.value && typeof formImage.value !== "string")
    //   formData.append("image", formImage.value);

    const res = await createCommand(formData);
    notif.success(t("success_created"));
    router.back();
    // router.push(`/employees/base/employee/${res.data.id}`)
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
    if (error.response.status == 422) {
      notif.error(
        t("Dashboard_Error") + ": " + t("Fill_in_the_required_fields")
      );
    } else {
      notif.error(t("Dashboard_Error") + ": " + error.message);
    }
  } finally {
    isLoading.value = false;
  }
}

function clearError(error: string) {
  errors[error] = [];
}
</script>

<style lang="scss"></style>
