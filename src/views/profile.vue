<template>
  <div pagetitle="'Barcha xabarlar'" class="my-profile">
    <div class="card">
      <div class="card-header bg-card-header">
        <h4 class="card-title mb-0">{{ $t("My_Profile") }}</h4>
      </div>
      <div class="card-body">
        <MyProfileForm
          :form-state="formState"
          :errors="errors"
          :is-loading="isLoading"
          @submit="onSubmit"
          @clear-error="clearError"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss"></style>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { useRoute, useRouter } from "vue-router";
import { getProfile, editProfile } from "@/utils/api/user";
const route = useRoute();
const router = useRouter();

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const formState = reactive({
  email: "",
  phone: "",
  password: "",
  password_confirmation: "",
  language_id: null,
  image: null,
  username: "",
  fullname: "",
  status: "",
});
const errors: any = reactive({
  email: [],
  phone: [],
  password: [],
  password_confirmation: [],
  language_id: [],
  image: [],
});

// const paramsID = route.params?.id ?? null;

// await fetchData();

// async function fetchData() {
//   const res = await fetchCommandById(paramsID);
//   Object.assign(formState, res.result);
// }
await fetchData();

async function fetchData() {
  const res = await getProfile();
  Object.assign(formState, res.result);
  // console.log("formState", res.result);
}
async function onSubmit() {
  try {
    isLoading.value = true;
    Object.assign(errors, {});

    const formData = new FormData();
    let datas: any = {
      email: formState.email,
      phone: formState.phone,
      password: formState.password,
      password_confirmation: formState.password_confirmation,
      language_id: formState.language_id,
      image: formState.image,
      _method: "PUT",
    };
    Object.getOwnPropertyNames(datas).forEach((prop) => {
      if (!["id", "citizenship", "user_id"].includes(prop) && datas[prop])
        formData.append(prop, datas[prop]);
    });

    const res = await editProfile(formData);
    notif.success(t("Your_profile_updated_successfully"));
    setTimeout(() => {
      location.reload();
    }, 500);

    // router.push(`/employees/base/employee/${res.data.id}`)
  } catch (error: any) {
    console.log(error, "error");
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
