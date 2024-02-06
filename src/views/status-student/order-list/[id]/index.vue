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
            {{ formState.name }}
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
import {
  updateCommand,
  fetchCommandById,
} from "@/utils/api/status-student/order-list";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { useRoute } from "vue-router";
import router from "@/router";
const route: any = useRoute();

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const formState: any = reactive({
  name: "",
  target: "",
  body: "",
  date: "",
  number: "",
  file: null,
  status: "",
  command_type_id: null,
  department_id: null,
  conclusion: "",
  _method: "PUT",
});
const errors: any = reactive({
  name: [],
  target: [],
  body: [],
  date: [],
  number: [],
  file: [],
  status: [],
  command_type_id: [],
  department_id: [],
  conclusion: [],
});

const paramsID: any = route.params?.id ?? null;

await fetchData();

async function fetchData() {
  console.log(paramsID);
  const res = await fetchCommandById(paramsID);
  Object.assign(formState, res.result);
}

async function onSubmit() {
  try {
    isLoading.value = true;
    Object.assign(errors, {});

    const formData = new FormData();

    let datas: any = {
      name: formState.name,
      target: formState.target,
      body: formState.body,
      date: formState.date,
      status: formState.status,
      number: formState.number,
      file: typeof formState.file === "string" ? "" : formState.file,
      command_type_id: formState.command_type_id,
      department_id: formState.department_id,
      conclusion: formState.conclusion,
      _method: formState._method,
    };
    if (!formState.status) {
      datas.status = "false";
    }
    Object.getOwnPropertyNames(datas).forEach((prop) => {
      if (!["id", "citizenship", "user_id"].includes(prop) && datas[prop])
        formData.append(prop, datas[prop]);
    });
    // Object.getOwnPropertyNames(formState).forEach((prop) => {
    //   if (
    //     ![typeof formState.file === "string" ? "" : formState.file].includes(
    //       prop
    //     ) &&
    //     formState[prop]
    //   )
    //     formData.append(prop, formState[prop]);
    // });

    // if (formImage.value && typeof formImage.value !== "string")
    //   formData.append("image", formImage.value);

    const res = await updateCommand(paramsID, formData);
    notif.success(t("Data_stored_successfully"));
    // router.push(`/employees/base/employee/${res.data.id}`)
  } catch (error: any) {
    Object.assign(errors, error.response?.data?.errors);
  } finally {
    isLoading.value = false;
  }
}

function clearError(error: string) {
  errors[error] = [];
}
</script>
