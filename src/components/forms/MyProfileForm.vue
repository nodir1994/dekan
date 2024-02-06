<script setup lang="ts">
// import { facultyTrueList, commantTypeList } from "@/utils/api/reference/index";
import { computed, onMounted, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
// import UploadFile from "../UploadFile.vue";
import { systemLanguageList } from "@/utils/api/reference/index";
const checkRadio = ref(false);
const eduLanguageOptions = ref([]);
const props = defineProps<{
  formState: any;
  errors: any;
  isLoading: boolean;
}>();
const emits: any = defineEmits<{
  (e: "submit"): void;
  (e: "updateCount", obj: {}): void;
  (e: "clearError", value: string): void;
}>();
const { t } = useI18n();

const computedFormState: any = computed({
  get() {
    return props.formState;
  },
  set(val) {
    emits("update:formState", val);
  },
});
onMounted(async () => {
  eduLanguageOptions.value = [];
  eduLanguageOptions.value = await systemLanguageList().then(
    (res) => res.result
  );
  console.log(computedFormState, "computedFormState");
});
//-------file upload-----
// function onChangeFile(val: any, name: string) {
//   console.log("val", val);
//   computedFormState.value.file = val;
// }
function onSubmit() {
  emits("submit");
}
</script>

<template>
  <a-form @finish="onSubmit" :model="computedFormState">
    <div class="row">
      <div class="col-xl-2 d-flex justify-content-center">
        <AvatarInput
          :img-url="computedFormState.image"
          @input="computedFormState.image = $event"
        />
      </div>
      <div class="col-xl-5">
        <div class="mb-3">
          <label for="division-name-input" class="form-label">{{
            $t("Login")
          }}</label>
          <a-input v-model:value="formState.username" disabled />
        </div>
        <div class="mb-3">
          <label for="division-name-input" class="form-label">{{
            $t("Full_name")
          }}</label>
          <a-input v-model:value="formState.fullname" disabled />
        </div>
        <div class="mb-3">
          <label for="division-name-input" class="form-label">{{
            $t("Email")
          }}</label>
          <a-input v-model:value="computedFormState.email" />
        </div>
      </div>
      <div class="col-xl-5">
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="division-name-select" class="form-label">{{
              $t("Education_Language")
            }}</label>
            <a-select
              v-model:value="computedFormState.language_id"
              :options="eduLanguageOptions"
              :field-names="{ value: 'id', label: 'name' }"
              :placeholder="$t('Choose_Education_Lang')"
            >
            </a-select>
            <span v-if="errors.language_id" class="text-danger small">
              {{ errors.language_id[0] }}
            </span>
          </div>
          <div class="mb-3 col-md-6">
            <label for="otm-name-input" class="form-label">{{
              $t("Contact")
            }}</label>
            <a-input
              class="select"
              tupe="tel"
              v-model:value="computedFormState.phone"
              placeholder="+998## ###-##-##"
              v-maska="['+998## ###-##-##', '+998## ###-##-##']"
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="division-name-input" class="form-label"
            ><a-checkbox v-model:checked="checkRadio" class="me-2"></a-checkbox
            >{{ $t("Change_Password") }}</label
          >
          <a-input-password
            :disabled="!checkRadio"
            v-model:value="computedFormState.password"
            :placeholder="$t('New_Password')"
          />
          <span v-if="errors.password" class="text-danger small">
            {{ errors.password[0] }}
          </span>
        </div>
        <div class="mb-3">
          <label for="division-name-input" class="form-label">{{
            $t("Confirm_password")
          }}</label>
          <a-input-password
            :disabled="!checkRadio"
            v-model:value="computedFormState.password_confirmation"
            :placeholder="$t('Confirm_password')"
          />
          <span v-if="errors.password_confirmation" class="text-danger small">
            {{ errors.password_confirmation[0] }}
          </span>
        </div>
        <div class="d-flex justify-content-end">
          <button class="btns c-save py-2 px-3">
            <i class="mdi mdi-account-edit font-size-14 align-middle me-2"></i
            >{{ $t("Edit") }}
          </button>
        </div>
      </div>
    </div>
  </a-form>
</template>

<style scoped></style>
