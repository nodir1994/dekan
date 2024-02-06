<script setup lang="ts">
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { useRoute } from "vue-router";
import {
  getTranscriptById,
  getTranscriptByIdStudent,
} from "@/utils/api/archive/transcript";

const { t } = useI18n();
const isLoading = ref(false);
const route = useRoute();

const formState = reactive({
  student_id: null,
  number: null,
  given_date: null,
  token: null,
  semester: null,
  full_name: null,
  label: null,
  birthdate: null,
  academic_group: null,
  eduni_name: null,
  faculty: null,
  rector: null,
  dean: null,
  edu_type: null,
  edu_form: null,
  shifr: null,
  intered_year: null,
  graduation_year: null,
  specialty: null,
});

const errors = reactive({
  student_id: [],
  number: [],
  given_date: [],
  token: [],
  semester: [],
  full_name: [],
  label: [],
  birthdate: [],
  academic_group: [],
  eduni_name: [],
  faculty: [],
  rector: [],
  dean: [],
  edu_type: [],
  edu_form: [],
  shifr: [],
  intered_year: [],
  graduation_year: [],
  specialty: [],
});
const paramsID = route.query?.id ?? null;
const student_id = route.query?.student_id ?? null;

async function fetchDataByID(id: number) {
  const res = await getTranscriptById(id);
  Object.assign(formState, res.result);
}

async function fetchDataByIDStudent(id: number) {
  const res = await getTranscriptByIdStudent(id);
  Object.assign(formState, res.result);
}

if (paramsID) {
  await fetchDataByID(paramsID);
} else {
  await fetchDataByIDStudent(student_id);
}

function clearError(error: string) {
  errors[error] = [];
}
</script>
<template>
  <div pagetitle="`Transkript yaratish`" class="createStudentPage adf">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/archive/transcript">
              {{ $t("archive_Transcript") }} /
            </router-link>
            {{ $t("archive_Transcript_Edit") }}
          </h5>
          <div class="panel-toggles">
            <router-link
              to="/archive/transcript"
              class="btns black-c py-1.5 px-4 d-inline-block"
            >
              <i
                class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"
              ></i
              >{{ $t("Prev") }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-----------END PAGE LIST HEADER TOP ------------------------>
    <div class="card">
      <div class="card-body">
        <TranscriptForm
          :form="formState"
          :errors="errors"
          :is-loading="isLoading"
          @submit="onSubmit"
          @clear-error="clearError"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.createStudentPage.adf {
  .modal-data-tip {
    background-color: #dee2e6;
    padding: 10px;
  }
}

.edit {
  .table-row-transkript-id {
    display: grid;
    grid-template-columns: 40px auto 150px 140px 120px 70px 100px;
  }
}

.table-row-transkript-id {
  display: grid;
  grid-template-columns: 40px 50px auto 150px 140px 120px 70px 60px;
}

.top__system__raiting {
  h5 {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      @include mobile {
        font-size: 12px;
      }
    }
  }
}
</style>
