<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import Swal from "sweetalert2";
import { useUserStore } from "@/stores/user";
import { useI18n } from "vue-i18n";
import { dakMemberList, deleteDakMember } from "@/utils/api/reference";
import { dakList } from "@/utils/api/additional";
import DakMemberFormModal from "@/components/modals/DakMemberFormModal.vue";
import { Modal } from "bootstrap";
import helpers from "@/utils/helper";
const userStore = useUserStore();
const deanId = computed(() => userStore?.user?.faculty?.name);
const currentUser = computed(() => useUserStore().getUser);
const isLoading = ref(false)
const { t } = useI18n();

//filterlar
const optionsDakList = await dakList().then((res) => res.result?.data);

onMounted(async () => { });

const apiData: any = reactive({
  current_page: 1,
  data: [],
  links: [],
});

const apiParams = reactive({
  faculty_id: currentUser.value?.result?.faculty?.id,
  dak_id: null,
  page: 1,
  per_page: helpers.pagePer
});

const emptyForm = ref({
  id: null,
  dak_id: null,
  name: null,
  work_place: null,
  position: null,
  role: null,
});

const form = ref(emptyForm);

await fetchList();

watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiParams.page = Number(newVal);
      await fetchList();
    }
  }
);
watch(
  () => apiParams.dak_id,
  async (newVal) => {
    apiParams.page = 1;
    await fetchList();
  }
);

function onModalClose() {
  form.value = emptyForm.value;
}

async function fetchList() {
  isLoading.value = true
  try {
    const res = await dakMemberList(apiParams);
    Object.assign(apiData, res.result);
  } catch (error) {
    console.log(error);

  } finally {
    isLoading.value = false
  }
}

// ------------delete modal oyna--------------------
async function onRemove(id: number) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger me-2",
      cancelButton: "btn btn-success",
    },
    buttonsStyling: false,
  });

  try {
    const res = await swalWithBootstrapButtons.fire({
      title: t("Are_you_sure_you_wantto_delete_this_item"),
      text: t("Delete_message.Action_irreversible"),
      icon: "warning",
      confirmButtonText: t("Delete_message.Yes_Delete"),
      cancelButtonText: t("Delete_message.Yo_Cancel"),
      showCancelButton: true,
    });

    if (res.isConfirmed) {
      await deleteDakMember(id);
      await fetchList();

      await swalWithBootstrapButtons.fire(
        t("Delete_message.Removed"),
        t("Delete_message.Record_deleted_successfull"),
        "success"
      );
    }
  } catch (error: any) {
    await swalWithBootstrapButtons.fire(
      t("Something_went_wrong"),
      error.message,
      "error"
    );
  }
}

//open form modal
function openFormModal(val?: any) {
  form.value = emptyForm.value;
  // form.value = val;
  form.value = {
    id: val.id,
    dak_id: val.dak_id,
    name: val.name,
    work_place: val.work_place,
    position: val.position,
    role: val.role,
  };
  const modal = Modal.getOrCreateInstance("#dakMemberFormModal");
  modal.show();
}
</script>

<template>
  <div pagetitle="'Reyting mezonlari'" class="certificate-committee-member">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("Managing DAK members") }}</h5>
          <div class="panel-toggles">
            <button class="btns c-save py-1.5 px-4 me-3" type="button" @click="openFormModal(emptyForm)">
              <i class="mdi mdi-plus font-size-14 align-middle me-1"></i>{{ $t("Create") }}
            </button>
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4 me-3">
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i>{{ $t("Filter") }}
              </button>
            </div>
            <router-link to="/archive/certificate-committee" class="btns black-c py-1.5 px-4">
              <i class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"></i>{{ $t("Back") }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-----------START FILTERS ------------------------>
    <div class="collapse__block">
      <b-collapse visible id="collapse-3">
        <b-card>
          <div class="row">
            <div class="my-2 col-md-6 form--item">
              <a-space>
                <a-select class="form--item" :value="deanId" disabled>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>
            <div class="my-2 col-md-6 form--item">
              <a-space>
                <a-select v-model:value="apiParams.dak_id" :field-names="{ value: 'id', label: 'name' }"
                  :options="optionsDakList" show-search allow-clear>
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Certificate_Committee") }}</label>
            </div>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="card">
      <div class="card-body">
        <LoadingOverlay v-if="isLoading" />
        <div class="table-responsive">
          <table class="content-table">
            <thead>
              <tr class="table-row w-100 d-grid">
                <th>#</th>
                <th>{{ $t("Performer") }}</th>
                <th>{{ $t("DAK") }}</th>
                <th>{{ $t("Work_place") }}</th>
                <th>{{ $t("by_Post") }}</th>
                <th>{{ $t("Role") }}</th>
                <th>{{ $t("Actions") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr class="table-row w-100 d-grid" v-for="(element, index1) in apiData?.data" :key="index1">
                <td>
                  {{
                    (apiData.current_page - 1) * apiData.per_page + index1 + 1
                  }}
                </td>
                <td>{{ element.name }}</td>
                <td>{{ element.dak }}</td>
                <td>{{ element.work_place }}</td>
                <td>{{ element.position }}</td>
                <td>{{ element.role }}</td>
                <!-- ---------START ACTIONS-------------- -->
                <td class="gridjs-td">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <div class="edit__project">
                        <a type="text" @click="openFormModal(element)">
                          <i class="mdi mdi-pencil font-size-18 text-primary"></i>
                        </a>
                      </div>
                    </li>
                    <li class="list-inline-item">
                      <div class="delete__project">
                        <a class="text-danger" type="danger" @click="onRemove(element.id)"><i
                            class="mdi mdi-delete font-size-18"></i></a>
                      </div>
                    </li>
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- ------start pagination-------------- -->
          <Pagination v-if="apiData.last_page > 1" class="mt-2" v-bind="{ ...apiData }"
            v-model:current-page="apiData.current_page" />
          <!-- --------------end pagination--------------------- -->
        </div>
      </div>
    </div>
    <span class="element-count mb-2" v-if="apiData?.total">{{ apiData?.current_page }}-{{
      apiData?.data.length + apiData.per_page * (apiData?.current_page - 1)
    }}/ {{ $t("Total_Point") }}: {{ apiData?.total }}</span>
    <DakMemberFormModal :modal-form="form" @update:list="fetchList" @close="onModalClose" />
  </div>
</template>

<style lang="scss">
.certificate-committee-member {
  .table-row {
    grid-template-columns: 50px 200px 150px auto 200px 100px 90px;

    @include mobile() {
      grid-template-columns: 50px 200px 150px 200px 200px 100px 70px;
    }
  }
}
</style>
