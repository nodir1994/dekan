<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { getAwardLists, deleteAward, changeStatus } from "@/utils/api/students/award";
import { academicYearsList, archiveMentList } from "@/utils/api/reference/index";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";

const selectedId = ref<number | null>(null);
const notif = useNotyf();
const { t } = useI18n();
const isLoading = ref(false);
const optionsAcademicYear = await academicYearsList().then((res) => res.result.data);
const optionsArchiveMentList = await archiveMentList().then((res) => res.result);

const apiData = reactive({
  current_page: 1,
  data: [],
  links: [],
  per_page: 20
});

const apiParams = reactive({
  year: null,
  category_id: null,
});

await fetchList();

//filter
watch(
  () => apiParams.year,
  async (newVal, oldVal) => {
    await fetchList();
  }
);

watch(
  () => apiParams.category_id,
  async (newVal, oldVal) => {
    await fetchList();
  }
);

watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiParams.page = Number(newVal);
      await fetchList();
    }
  }
);

//update status
async function updateStatus(id: number) {
  try {
    isLoading.value = true;
    await changeStatus(id);
    await fetchList();
    notif.success(t("Data_stored_successfully"));
  } catch (error: any) {
    notif.error(error.message);
  } finally {
    isLoading.value = false;
  }
}

async function fetchList() {
  isLoading.value = true;
  const res = await getAwardLists(apiParams);
  Object.assign(apiData, res.result);
  isLoading.value = false;
}

//actions delete
async function handleDelete(id: number) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger ml-2",
    },
    buttonsStyling: false,
  });

  try {
    const res = await swalWithBootstrapButtons.fire({
      title: t("Delete_message.Are_you_sure"),
      text: t("Delete_message.Action_irreversible"),
      icon: "warning",
      confirmButtonText: t("Delete_message.Yes_Delete"),
      cancelButtonText: t("Delete_message.Yo_Cancel"),
      showCancelButton: true,
    });

    if (res.isConfirmed) {
      await deleteAward(id);
      await fetchList();

      swalWithBootstrapButtons.fire(
        t("Delete_message.Removed"),
        t("Delete_message.Record_deleted_successfull"),
        "success"
      );
    }
  } catch (error: any) {
    swalWithBootstrapButtons.fire(
      t("Dashboard_Error"),
      error.message,
      "error"
    );
  }
}
</script>


<template>
  <div pagetitle="`Talaba yutug'i`" class="award-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t('Student_Award') }}</h5>
          <div class="panel-toggles">
            <router-link :to="{ path: '/student/award/' + 'create' }" class="btns c-save py-1.5 px-4 me-3">
              <i class="mdi mdi-plus font-size-14 align-middle me-1"></i>{{ $t('Create') }}
            </router-link>
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i>{{ $t("Filter") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <form class="row">
            <!-- //fakultetlar  -->
            <div class="my-2 col-xl-6 form--item">
              <a-space>
                <a-select class="form--item" v-model:value="apiParams.year" allow-clear>
                  <a-select-option v-for="(item, index) in 20" :value="item + 2014">{{ item + 2014 }}-{{ $t('year')
                  }}</a-select-option>
                </a-select>
              </a-space>
              <label for="yu">{{ $t('Choose_Year') }}</label>
            </div>
            <div class="my-2 col-xl-6 form--item">
              <a-space>
                <a-select class="form--item" v-model:value="apiParams.category_id" :options="optionsArchiveMentList"
                  :field-names="{ value: 'id', label: 'name' }" allow-clear>
                </a-select>
              </a-space>
              <label for="yu">{{ $t('Choose_Award_Category') }}</label>
            </div>
          </form>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="card">
      <div class="card-body">
        <div v-if="apiData.data.length" class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row d-grid w-100">
                <th>#</th>
                <th>{{ $t("Student") }}</th>
                <th>{{ $t('Group') }}</th>
                <th>{{ $t("Education_Type") }}</th>
                <th>{{ $t("Education_Form") }}</th>
                <th>{{ $t('Specialty_code') }}</th>
                <th>{{ $t('award_Category') }}</th>
                <th>{{ $t('award_Year') }}</th>
                <th>{{ $t('action') }}</th>
                <th>{{ $t("Enable") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-row d-grid w-100" v-for="(element, index) in apiData.data" :key="element.id">
                <td>{{ (apiData.current_page - 1) * apiData.per_page + index + 1 }}</td>
                <td>
                  {{ element?.student?.name }} {{
                      element?.student?.surname
                  }}
                </td>
                <td>{{ element?.student?.academic_group?.name }}</td>
                <td>{{ element?.student?.specialty?.edu_type?.name }}</td>
                <td>{{ element?.student?.edu_form }}</td>
                <td>{{ element?.student?.pinfl }}</td>
                <td>{{ element?.type }}</td>
                <td>{{ element?.year }}</td>
                <!-- <td>{{ element. }}</td> -->
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div class="edit__project">
                        <router-link :to="{ path: '/student/award/create/' + element.id }">
                          <i class="mdi mdi-pencil font-size-18 text-primary"></i>
                        </router-link>
                      </div>
                    </li>
                    <li class="list-inline-item">
                      <div class="delete__project">
                        <a class="text-danger" type="danger" @click="handleDelete(element.id)"><i
                            class="mdi mdi-delete font-size-18"></i></a>
                      </div>
                    </li>
                  </ul>
                </td>
                <td>
                  <div class="form-check form-switch my-auto">
                    <input class="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                      :checked="element.status" :disabled="isLoading" @change="updateStatus(element.id)" />
                  </div>
                </td>

              </tr>
            </tbody>
          </table>
          <!-------------START PAGINATION-------------->
          <Pagination v-if="apiData.last_page > 1" class="mt-2" v-bind="{ ...apiData }"
            v-model:current-page="apiData.current_page" />
          <!-------------END PAGINATION-------------->
        </div>
        <div v-else>
          <h5 class="text-center">{{ $t("No_data") }}</h5>
          <p class="text-center">
            {{ $t("No_information_found") }}
          </p>
        </div>
      </div>
    </div>
    <span class="element-count mb-2">{{ apiData?.current_page }}-{{
        apiData?.data.length + apiData.per_page * (apiData?.current_page - 1)
    }}/ {{ $t("Total_Point") }}: {{ apiData?.total }}</span>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style lang="scss">
.award-page {
  .table-row {
    grid-template-columns: 40px auto 100px 110px 130px 130px 250px 130px 110px 90px;

    @include mobile() {
      grid-template-columns: 50px auto 100px 110px 130px 90px 200px 130px 70px 60px;
    }

    td,
    th {
      &:first-child {
        justify-content: start;
      }
    }
  }
}
</style>





