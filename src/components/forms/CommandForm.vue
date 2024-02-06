<script setup lang="ts">
import { orderList } from "@/utils/api/reference/index";
import { computed, onMounted, ref, reactive } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores/user";
import helpers from "@/utils/helper";
const userStore = useUserStore();
const route: any = useRoute();
const paramsID = route.params?.id ?? null;
const deanId = computed(() => userStore?.user?.faculty?.name);
const cunterFile = ref(false);
const props = defineProps<{
  formState: [];
  errors: any;
  isLoading: boolean;
}>();
const emits = defineEmits<{
  (e: "submit"): void;
  (e: "updateCount", obj: {}): void;
  (e: "clearError", value: string): void;
}>();
const { t } = useI18n();

const optionsCommantType = ref([]);
const computedFormState: any = computed({
  get() {
    return props.formState;
  },
  set(val) {
    emits("update:formState", val);
  },
});

onMounted(async () => {
  optionsCommantType.value = await orderList().then((res) => res?.result);
});

//-------file upload-----
function onChangeFile(val: any, name: string) {
  emits("clearError", "file");
  cunterFile.value = true;
  computedFormState.value.file = val;
}

function onSubmit() {
  emits("submit");
}
</script>

<template>
  <a-form @finish="onSubmit" :model="computedFormState">
    <div class="row">
      <h5 class="modal-title modal-data-tip mb-2">
        {{ $t("command_structure") }}
      </h5>
      <div class="mb-3 col-md-4">
        <label for="division-name-select" class="form-label">{{
          $t("Structure_Faculty")
        }}</label>
        <a-select class="form--item" :value="deanId" disabled> </a-select>
        <span v-if="errors.department_id" class="text-danger small">
          {{ errors.department_id[0] }}
        </span>
      </div>
      <div class="mb-3 col-md-4">
        <label for="division-name-select" class="form-label">{{
          $t("Decree_Type")
        }}</label>
        <a-select :filter-option="helpers.filterOptionByName" show-search
          v-model:value="computedFormState.command_type_id" :options="optionsCommantType"
          :field-names="{ value: 'id', label: 'name' }" @change="emits('clearError', 'command_type_id')"
          :placeholder="$t('Choose_Decree_Type')">
        </a-select>
        <span v-if="errors.command_type_id" class="text-danger small">
          {{ errors.command_type_id[0] }}
        </span>
      </div>
      <div class="mb-3 col-md-4">
        <label for="division-name-input" class="form-label">{{ $t("Title") }}
        </label>
        <a-input v-model:value="computedFormState.name" @change="emits('clearError', 'name')"
          :placeholder="$t('Enter_name')" />
        <span v-if="errors.name" class="text-danger small">
          {{ errors.name[0] }}
        </span>
      </div>
      <div class="mb-3 col-md-6">
        <label for="email-address-input" class="form-label">{{
          $t("command_target")
        }}</label>
        <a-textarea v-model:value="computedFormState.target" :auto-size="{ minRows: 2, maxRows: 6 }"
          @change="emits('clearError', 'target')" :placeholder="$t('Enter_command_target')" />
        <span v-if="errors.target" class="text-danger small">
          {{ errors.target[0] }}
        </span>
      </div>
      <div class="mb-3 col-md-6">
        <label for="email-address-input" class="form-label">{{
          $t("command_body")
        }}</label>
        <a-textarea v-model:value="computedFormState.body" :auto-size="{ minRows: 2, maxRows: 6 }"
          @change="emits('clearError', 'body')" :placeholder="$t('Enter_command_body')" />
        <span v-if="errors.body" class="text-danger small">
          {{ errors.body[0] }}
        </span>
      </div>
      <div class="mb-3">
        <label for="email-address-input" class="form-label">{{
          $t("command_summary")
        }}</label>
        <a-textarea v-model:value="computedFormState.conclusion" :auto-size="{ minRows: 2, maxRows: 6 }"
          @change="emits('clearError', 'conclusion')" :placeholder="$t('Enter_command_summary')" />
        <span v-if="errors.conclusion" class="text-danger small">
          {{ errors.conclusion[0] }}
        </span>
      </div>
      <h5 class="modal-title modal-data-tip mb-2">
        {{ $t("Command_informations") }}
      </h5>
      <div class="col-md-9">
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="division-name-input" class="form-label">{{
              $t("Decree_Date")
            }}</label>
            <a-date-picker v-model:value="computedFormState.date" value-format="YYYY-MM-DD"
              @change="emits('clearError', 'date')" :placeholder="$t('select_the_data')" />
            <span v-if="errors.date" class="text-danger small">
              {{ errors.date[0] }}
            </span>
          </div>
          <div class="mb-3 col-md-6">
            <label for="division-name-input" class="form-label">{{ $t("Command_number") }}
            </label>
            <a-input type="text" v-model:value="computedFormState.number" @change="emits('clearError', 'number')"
              :placeholder="$t('Enter')" />
            <span v-if="errors.number" class="text-danger small">
              {{ errors.number[0] }}
            </span>
          </div>
        </div>
        <div class="mb-3">
          <label for="email-address-input" class="form-label">{{
            $t("Status")
          }}</label>
          <a-select v-model:value="computedFormState.status" @change="emits('clearError', 'status')"
            :placeholder="t('Qualification_Name')">
            <a-select-option :value="true" label="active">{{
              $t("Active")
            }}</a-select-option>
            <a-select-option :value="false" label="noActive">{{
              $t("Disable")
            }}</a-select-option>
          </a-select>
          <span v-if="errors.status" class="text-danger small">
            {{ errors.status[0] }}
          </span>
        </div>
      </div>
      <div class="col-md-3">
        <label for="division-name-input" class="form-label">{{ $t("Decree_File") }}
        </label>
        <UploadFile :on-upload="onChangeFile" />
        <span v-if="errors.file" class="text-danger small">
          {{ errors.file[0] }}
        </span>
        <a :href="computedFormState.file" target="_blank" v-if="paramsID && !cunterFile"
          class="text-primary text-end w-100 d-inline-block my-2 p-2">{{ $t("View_Academic_Sheet") }}<i
            class="mdi mdi-eye ms-2"></i></a>
      </div>
    </div>

    <div class="d-flex justify-content-end mt-2">
      <SubmitButton :loading="isLoading" :icon="'content-save'" />
    </div>
  </a-form>
</template>

<style scoped></style>
