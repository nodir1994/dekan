<template>
  <div pagetitle="'DAK yaratish'" class="dak-id-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Manage_Certificate_Committee") }}</h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <router-link to="/teacher/certificate-committee-result"
                ><button class="btns black-c py-1.5 px-4" type="submit">
                  <i
                    class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"
                  ></i
                  >{{ $t("Prev") }}
                </button></router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card">
      <div class="card-body">
        <DakForm :formState="formState" :isLoading="isLoading" />
      </div>
      <!-- @submit="onSubmit" -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { createDak } from "@/utils/api/controls/result-dak";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import router from "@/router";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);

const formState = reactive({
  student_id: null,
  dak_id: null,
  dak_order: null,
  date: null,
  theme_id: null,
  subject_id: null,
  mark: null,
  ball: null,
  academic_year_id: null,
  department_id: null,
  edu_type_id: null,
  specialty_id: null,
  academic_group_id: null,
});
</script>

<style lang="scss">
.createStudentPage.adf {
  .modal-data-tip {
    background-color: #dee2e6;
    padding: 10px;
  }
}
</style>
