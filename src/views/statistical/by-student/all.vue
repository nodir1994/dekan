<script setup lang="ts">
import type { StatisticalStudentAll } from "@/utils/interfaces";
import type { PaginationProps } from "@/components/partials/Pagination.vue";
import { onMounted, reactive, ref, watch } from "vue";
import { facultyList } from "@/utils/api/reference/index";
import { StudentCourseAll } from "@/utils/api/statistical/by-student/index";
import { useI18n } from "vue-i18n";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
const isLoading = ref(false);
const { t } = useI18n();

const apiData: {
  result: StatisticalStudentAll[];
} = reactive({
  result: [],
});

const optionsList: any = reactive({
  optionFacultyList: null,
  optionSpecialtyList: null,
});

const apiParams = reactive({
  faculty_id: null, // fakultet
  specialty_id: null, // Mutaxasislik
});

// hooks

onMounted(async () => {
  optionsList.optionFacultyList = await facultyList().then((res) => res.result); // Fakultet
  // optionsList.optionSpecialtyList = await specialtyList().then(
  //   (res) => res.result
  // ); // Mutaxasislik
}),
  // function

  async function onSearch() {
    await fetchList();
  };

async function fetchList() {
  isLoading.value = true;
  const res = await StudentCourseAll(apiParams);
  Object.assign(apiData, res);
  console.log(res.result);
  isLoading.value = false;
}
</script>
<template>
  <div pagetitle="`O'qituvchi reytingi`" class="teacherRatingPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/statistical/student"
              >{{ $t("all_student_static") }} /
            </router-link>
            {{ $t("All_Statistics") }}
          </h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <router-link to="/statistical/student"
                ><button class="btns black-c py-1.5 px-4 me-3" type="submit">
                  <i class="mdi mdi-arrow-left me-2"></i>{{ $t("Back") }}
                </button></router-link
              >
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter me-2"></i>{{ $t("Filtr") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------END PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <form class="row" @submit.prevent="onSearch">
            <a-form-item class="my-2 col-md-5" name="faculty">
              <a-select
                class="form--item"
                v-model:value="apiParams.faculty_id"
                :options="optionsList.optionFacultyList"
                :field-names="{ value: 'id', label: 'name' }"
                :placeholder="t('Choose_faculty')"
                allowClear
              >
              </a-select>
            </a-form-item>

            <a-form-item class="my-2 col-md-5" name="special">
              <a-select
                class="form--item"
                v-model:value="apiParams.specialty_id"
                :options="optionsList.optionSpecialtyList"
                :field-names="{ value: 'id', label: 'name' }"
                :placeholder="t('Choose_a_specialty')"
                allowClear
              >
              </a-select>
            </a-form-item>
            <div class="my-2 col-md-2">
              <button class="btn-search c-save" type="submit">
                <i class="mdi mdi-eye me-2"></i>{{ $t("View") }}
              </button>
            </div>
          </form>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE---------------------------------------->
    <!-- <div class="card">
      <div class="card-body">
        <div class="table-responsive aaaa">
          <table>
            <thead>
              <tr>
                <th rowspan="2" style="min-width: 50px">#</th>
                <th rowspan="2" style="min-width: 250px; width: 100%">
                  {{ $t("Faculty") }}
                </th>
                <th rowspan="2" style="min-width: 250px">
                  {{ $t("by_Specialty") }}
                </th>
                <th rowspan="2" style="min-width: 70px">{{ $t("by_Level") }}</th>
                <th colspan="3">{{ $t("budget_Student") }}</th>
                <th colspan="3">{{ $t("Contract_Student") }}</th>
                <th colspan="3">{{ $t("all_Student") }}</th>
              </tr>
              <tr>
                <th style="min-width: 60px">{{ $t("Female") }}</th>
                <th style="min-width: 60px">{{ $t("Male") }}</th>
                <th style="min-width: 60px">{{ $t("Total_Point") }}</th>
                <th style="min-width: 60px">{{ $t("Female") }}</th>
                <th style="min-width: 60px">{{ $t("Male") }}</th>
                <th style="min-width: 60px">{{ $t("Total_Point") }}</th>
                <th style="min-width: 60px">{{ $t("Female") }}</th>
                <th style="min-width: 60px">{{ $t("Male") }}</th>
                <th style="min-width: 60px">{{ $t("Total_Point") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(element, index) in apiData.result" :key="index">
                <td rowspan="5">{{ +index + 1 }}</td>
                <td rowspan="5">{{ element.faculty }}</td>
                <td rowspan="5">{{ element.specialty }}</td>
                <td>
                  <b
                    >{{ element.faculty.specialty.lavels.lavel1.name }}-{{
                      $t("Course1")
                    }}</b
                  >
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel1.grant.girls }}
                </td>
                <td>{{ element.faculty.specialty.lavels.lavel1.grant.men }}</td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel1.grant.all }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel1.shartnoma.girls }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel1.shartnoma.men }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel1.shartnoma.all }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel1.all.girls }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel1.all.men }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel1.all.all }}
                </td>
              </tr>

              <tr>
                <td>
                  <b
                    >{{ element.faculty.specialty.lavels.lavel2.name }}-{{
                      $t("Course1")
                    }}</b
                  >
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel2.grant.girls }}
                </td>
                <td>{{ element.faculty.specialty.lavels.lavel2.grant.men }}</td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel2.grant.all }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel2.shartnoma.girls }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel2.shartnoma.men }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel2.shartnoma.all }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel2.all.girls }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel2.all.men }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel2.all.all }}
                </td>
              </tr>
              <tr>
                <td>
                  <b
                    >{{ element.faculty.specialty.lavels.lavel3.name }}-{{
                      $t("Course1")
                    }}</b
                  >
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel3.grant.girls }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel3.grant.men }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel3.grant.all }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel3.shartnoma.girls }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel3.shartnoma.men }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel3.shartnoma.all }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel3.all.girls }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel3.all.men }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel3.all.all }}
                </td>
              </tr>
              <tr>
                <td>
                  <b
                    >{{ element.faculty.specialty.lavels.lavel4.name }}-{{
                      $t("Course1")
                    }}</b
                  >
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel4.grant.girls }}
                </td>
                <td>{{ element.faculty.specialty.lavels.lavel4.grant.men }}</td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel4.grant.all }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel4.shartnoma.girls }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel4.shartnoma.men }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel4.shartnoma.all }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel4.all.girls }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel4.all.men }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel4.all.all }}
                </td>
              </tr>
              <tr>
                <td>
                  <b
                    >{{ element.faculty.specialty.lavels.lavel5.name }}-{{
                      $t("Course1")
                    }}</b
                  >
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel5.grant.girls }}
                </td>
                <td>{{ element.faculty.specialty.lavels.lavel5.grant.men }}</td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel5.grant.all }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel5.shartnoma.girls }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel5.shartnoma.men }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel5.shartnoma.all }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel5.all.girls }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel5.all.men }}
                </td>
                <td>
                  {{ element.faculty.specialty.lavels.lavel5.all.all }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div> -->
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.teacherRatingPage {
  .table-row {
    grid-template-columns: 50px auto 150px 150px 90px 90px 90px 90px 90px 90px 90px 90px 90px;
    @include mobile() {
      grid-template-columns: 50px auto 100px 100px 200px 200px 200px;
    }
  }
  .table-row-1 {
    grid-template-columns: 30% 30% 40%;
  }
  .table-row-modal {
    grid-template-columns: 50px 100px 120px auto 70px;
    @include mobile() {
      grid-template-columns: 50px 100px 120px 200px 70px;
    }
  }
  .modal-dialog {
    max-width: $ipad !important;
  }
}

.teacherRatingPage .content-table {
  th,
  td {
    display: flex;
    align-items: center;
    padding: 12px 15px;
    &:nth-last-child(1) {
      justify-content: left;
      display: flex;
    }
    &:nth-child(1) {
      display: flex;
      justify-content: left;
    }
  }
}
.table-error {
  font-size: 25px;
  color: #999999;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: #faf9f9;
}
.aaaa {
  table {
    border-collapse: collapse;
    width: 100%;
    th,
    td {
      width: 7%;
      border: 0.3px solid #f3eaf4;
      padding: 10px;
      text-align: center;
    }
    th {
      font-weight: 700;
      background-color: #faf9f9;
    }
  }
}
</style>
