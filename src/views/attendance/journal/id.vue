<script setup lang="ts">
import { onMounted, ref, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { useRoute } from "vue-router";
import { getDataById } from "@/utils/api/attendance/journal";

const route = useRoute();
const id = route.query;

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);

const apiData: any = reactive({
  data: [],
});

onMounted(async () => {
  if (id) {
    isLoading.value = true;
    apiData.data = await getDataById(id).then((res) => res?.result);
    isLoading.value = false;
  }
});
</script>

<template>
  <div pagetitle="'Davomat-jurnal'" class="academicGroupPage-journal-id">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/attendance/journal">{{ $t("attendance_Attendance_Journal") }}
            </router-link>
            - {{ apiData?.data?.title?.academic_group }}
          </h5>
          <div class="panel-toggles">
            <div class="filterBlock">
              <router-link to="/attendance/journal"><button class="btns black-c py-1.5 px-4" type="submit">
                  <i class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"></i>{{ $t("Prev") }}
                </button></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <!-------START TABLE---------------------------------------->
    <div class="row">
      <div class="col-xl-8">
        <div class="card">
          <div class="card-body">
            <LoadingOverlay v-if="isLoading" />
            <div class="table-responsive">
              <table class="tableChangeCol">
                <thead>
                  <tr>
                    <th style="
                                      position: sticky;
                                      left: 0;
                                      background-color: rgb(32, 139, 58);
                                    ">№</th>
                    <th style="
                                      position: sticky;
                                      left: 50px;
                                      background-color: rgb(32, 139, 58);
                                    ">
                      {{ $t("Fullname_of_Student") }}
                    </th>
                    <th>{{ $t("Reasonably_s") }}</th>
                  <th>{{ $t("uncaused_s") }}</th>
                  <th class="my_th">
                      <div class="top__table" v-for="item in apiData?.data?.schedule_topic">
                        <span>{{ $t("Lesson_Date") }}</span>
                        <span>{{ item?.date }}</span>
                        <span>{{ item?.pair?.position }}-{{ $t("Couple") }} <br />
                          {{ item?.pair?.time_start }}-{{
                            item?.pair?.time_end
                          }}</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in apiData?.data?.students" :key="item.id">
                    <td style="position: sticky; left: 0; background-color: #fff">{{ index + 1 }}</td>
                    <td style="position: sticky; left: 50px; background-color: #fff">
                      {{ item?.fullname }}
                    </td>
                    <td class="text-center">
                      {{ item?.attendance_caused }}
                    </td>
                    <td class="text-center">
                      {{ item?.attendance_uncaused }}
                    </td>
                    <td></td>
                    <!-- <template v-for="item in apiData?.data?.schedule_topic">
                                    <td>{{ item?.date }}</td>
                                  </template> -->
                  </tr>
                </tbody>
              </table>
            </div>
            <hr class="mt-3" />
            <div class="science__topics">
              <div class="top">
                <span>{{ $t("Curriculum_Subject_Topic") }}</span>
                <button v-b-toggle.collapseBlock class="btns c-save">
                  <i class="mdi mdi-plus"></i>
                </button>
              </div>
              <b-collapse visible id="collapseBlock">
                <table>
                  <thead>
                    <tr>
                      <th style="width: 35px">№</th>
                      <th>{{ $t("Subject_Topic") }}</th>
                      <th style="width: 105px">{{ $t("Lesson_Date") }}</th>
                      <th style="width: 105px">{{ $t("Checked") }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in apiData.data?.lesson_topics">
                      <td style="width: 35px">{{ index + 1 }}</td>
                      <td style="text-align: left">
                        {{ item?.name }}
                      </td>
                      <td style="width: 105px">
                        {{ item?.date }}
                      </td>
                      <td style="width: 105px">
                        <span v-if="item?.topic_done">
                          <i class="mdi mdi-check"></i>
                        </span>
                        <span v-else>
                          <i class="mdi mdi-close"></i>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </b-collapse>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <h5>{{ $t("Data") }}</h5>
              <table class="data__table">
                <tbody>
                  <tr>
                    <td>{{ $t("Group") }}</td>
                    <td>{{ apiData.data?.title?.academic_group }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t("Subjects") }}</td>
                    <td>{{ apiData.data?.title?.subject }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t("Training") }}</td>
                    <td>{{ apiData.data?.title?.lesson_activity }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t("Employee") }}</td>
                    <td>{{ apiData.data?.title?.teacher }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-------START TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.my_th {
  display: flex;
  max-width: 100%;
  overflow-x: auto;
}

.top__table {
  display: flex;
  flex-direction: column;
  width: 180px;
  border-right: 1px solid rgba(238, 238, 238, 0.1294117647) !important;
}

.academicGroupPage-journal-id {
  .table-row-academic-group {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px auto 120px 120px 160px 160px;
  }
}

.tableChangeCol {
  width: 100%;
  min-width: 450px;

  thead {
    background-color: rgb(32, 139, 58);
    color: #fff;
  }

  tbody {
    tr {
      &:nth-child(2n) {
        background-color: #eeeeee73;
      }
    }
  }

  td,
  th {
    border: 1px solid #eeeeee21 !important;
    padding: 5px;
    min-width: 50px;
  }

  th {
    font-weight: 600;
    text-align: center;

    i {
      font-size: 0.7rem;
    }
  }
}

.data__table {
  font-size: 12px;
  width: 100%;

  tr {
    &:nth-child(2n) {
      background-color: #eee;
    }

    td {
      padding: 7px 5px;
    }
  }
}

.science__topics {
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;

    span {
      font-size: 20px;
      font-weight: 700;
      color: #b6c5d9;
    }
  }

  table {
    width: 100%;
    text-align: center;

    thead {
      background-color: rgb(32, 139, 58);
      color: #fff;
    }

    td,
    th {
      border: 1px solid #eeeeee21 !important;
      padding: 5px;
    }

    th {
      font-weight: 600;
      text-align: center;

      i {
        font-size: 0.7rem;
      }
    }
  }
}
</style>
