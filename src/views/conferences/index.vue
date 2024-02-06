<script setup lang="ts">
import Swal from "sweetalert2";
import { useNotyf } from "@/composable/useNotyf";
import { computed, onMounted, reactive, ref, watch } from "vue";
import {
  fetchConference,
  typeList,
  updateConferences,
  createConferences,
  deleteConference,
  createZoomById,
  audinceList,
} from "@/utils/api/conference/conference";
// statusChange
import { useI18n } from "vue-i18n";
import { Modal } from "bootstrap";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const loader = ref(true);

// ------- filterlar ----------

onMounted(async () => {
  sideFormOptions.typeOptions = await typeList().then((res) => res?.data);
  sideFormOptions.audinceOptions = await audinceList().then((res) => res?.data);
});

const apiData: any = reactive({
  conference_type_id: null,
  start_id: null,
  data: [],
  current_page: 1,
});

const errors: any = reactive({
  id: [],
  conference_type_id: [],
  name: [],
  description: [],
  date: [],
  status: [],
  duration: [],
});

const sideFormOptions = reactive({
  typeOptions: null,
  audinceOptions: null,
});

const modalData = reactive({
  id: null,
  conference_type_id: null,
  name: null,
  description: null,
  date: null,
  status: null,
  duration: null,
  audience_id: null,
});

// filter education year
watch(
  () => [apiData.conference_type_id, apiData.start_id],
  async () => {
    await fetchList();
  }
);

watch(
  () => apiData.current_page,
  async (newVal) => {
    if (Number(newVal)) {
      apiData.page = Number(newVal);
      await fetchList(newVal);
    }
  }
);

await fetchList();

async function fetchList(page?: number) {
  let datas: any = {
    page: apiData.page,
  };
  if (!page) {
    datas.page = 1;
  }
  if (apiData.conference_type_id)
    datas.conference_type_id = apiData.conference_type_id;
  if (apiData.start_id) datas.date = apiData.start_id;

  if (loader.value) {
    loader.value = false;
    const res = await fetchConference(datas);
    Object.assign(apiData, res.data);
    setTimeout(() => {
      loader.value = true;
    }, 100);
  }
}

async function openFormModal(element?: any) {
  clearErrors();
  const modal = Modal.getOrCreateInstance("#modalAudince");
  modalData.id = element?.id;
  modalData.conference_type_id = element?.conference_type_id;
  modalData.name = element?.name;
  modalData.description = element?.description;
  modalData.date = element?.date;
  modalData.duration = element?.duration;
  modalData.audience_id = element?.audience_id;
  modal.show();
}

function clearErrors() {
  Object.assign(errors, {
    conference_type_id: [],
    description: [],
    date: [],
    duration: [],
    name: [],
    audience_id: [],
  });
}

function clearError(field: string) {
  errors[field] = "";
}
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
      title: t("Delete_message.Are_you_sure"),
      text: t("Delete_message.Action_irreversible"),
      icon: "warning",
      confirmButtonText: t("Delete_message.Yes_Delete"),
      cancelButtonText: t("Delete_message.Yo_Cancel"),
      showCancelButton: true,
    });

    if (res.isConfirmed) {
      await deleteConference(id);
      await fetchList();

      await swalWithBootstrapButtons.fire(
        t("Delete_message.Removed"),
        t("Delete_message.Record_deleted_successfull"),
        "success"
      );
    }
  } catch (error: any) {
    await swalWithBootstrapButtons.fire(
      t("Something went wrong!"),
      error.message,
      "error"
    );
  }
}
async function createConference() {
  try {
    const modal = Modal.getOrCreateInstance("#modalAudince");
    isLoading.value = true;
    clearErrors();
    const res = modalData?.id
      ? await updateConferences(modalData?.id, modalData)
      : await createConferences(modalData);
    if (modalData?.id) {
      notif.success(t("success_update"));
    } else {
      notif.success(t("success_add"));
    }
    modal.hide();
    await fetchList();
  } catch (error: any) {
    console.log(error, "error");
    // notif.error(t('Dashboard_Error'));
    Object.assign(errors, error.response?.data?.errors);
  } finally {
    isLoading.value = false;
  }
}

function createZoom(id: number) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-danger me-2",
      cancelButton: "btn btn-success",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: t("start_miting"),
      // text: t("ha albatta boshqa nimayam qilardik"),
      icon: "warning",
      confirmButtonText: t("Yes"),
      cancelButtonText: t("No"),
      showCancelButton: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        createZoomById(id)
          .then((result) => {
            console.log(result);
            const link = document.createElement("a");
            link.setAttribute("target", "_blank");
            link.href = result?.result; // Your URL
            link.click();
            setTimeout(() => {
              location.reload();
            }, 5000);
          })
          .catch((e) => {
            console.log(e);
            notif.error(e?.response?.data?.errors);
          });
      }
    });
}
</script>

<template>
  <div class="certificatePage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">{{ $t("list_conference") }}</h5>
          <div class="panel-toggles">
            <a
              type="text"
              class="btns c-save py-1.5 px-4 me-3"
              @click="openFormModal(null)"
            >
              <i class="mdi mdi-plus font-size-14 align-middle me-1"></i
              >{{ $t("Create") }}
            </a>
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i
                >{{ $t("Filter") }}
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
          <div class="row">
            <div class="my-2 col-6 form--item">
              <a-space>
                <a-select
                  v-model:value="apiData.conference_type_id"
                  :options="sideFormOptions.typeOptions"
                  :field-names="{ value: 'id', label: 'name' }"
                  allow-clear
                  show-search
                >
                </a-select>
              </a-space>
              <label for="yu">{{ $t("Type") }}</label>
            </div>

            <!-- //o'quv yili  -->
            <div class="my-2 col-6 form--item">
              <a-space>
                <a-date-picker
                  v-model:value="apiData.start_id"
                  placeholder="DD.MM.YYYY"
                  type="date"
                  format="DD.MM.YYYY"
                  value-format="DD.MM.YYYY "
                />
              </a-space>
              <label for="yu">{{ $t("Begin_Date") }}</label>
            </div>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="row table-division">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-body">
            <div v-if="apiData.data.length" class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row">
                    <th>#</th>
                    <th>{{ $t("Type") }}</th>
                    <th>{{ $t("Title") }}</th>
                    <th>{{ $t("Explanation") }}</th>
                    <th>{{ $t("Begin_Date") }}</th>
                    <th>{{ $t("Actions") }}</th>
                    <th>{{ $t("Contract_Status") }}</th>
                    <th>{{ $t("duration") }}</th>
                    <th>{{ $t("auditorium") }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row last_td"
                    v-for="(element, index1) in apiData?.data"
                    :key="element.id"
                  >
                    <td>
                      {{
                        (apiData.current_page - 1) * apiData.per_page +
                        index1 +
                        1
                      }}
                    </td>
                    <td>
                      {{ element?.conference_type }}
                    </td>
                    <td>
                      {{ element?.name }}
                    </td>
                    <td>
                      {{ element?.description }}
                    </td>
                    <td>
                      {{ element?.date }}
                    </td>

                    <td class="gridjs-td">
                      <ul class="list-inline mb-0">
                        <li class="list-inline-item">
                          <a
                            type="text"
                            v-if="
                              element?.is_creator &&
                              element?.status == 'inactive'
                            "
                            @click="openFormModal(element)"
                          >
                            <i class="mdi mdi-pencil text-primary"></i>
                          </a>
                        </li>
                        <li class="list-inline-item">
                          <div class="delete__project">
                            <a
                              class="text-danger"
                              type="danger"
                              @click="onRemove(element.id)"
                              ><i class="mdi mdi-delete font-size-18"></i
                            ></a>
                          </div>
                        </li>
                        <li
                          class="list-inline-item"
                          v-if="
                            element?.is_creator && element?.status == 'inactive'
                          "
                        >
                          <div class="delete__project" v-if="element?.status">
                            <router-link
                              :to="{ path: '/conferences/' + element.id }"
                              class="text-info"
                              type="info"
                            >
                              <i
                                class="mdi mdi-forward font-size-18 text-primary"
                              ></i>
                            </router-link>
                          </div>
                        </li>
                      </ul>
                    </td>
                    <td>
                      <template v-if="element?.status == 'completed'">
                        <div v-if="element?.conference_files">
                          <div
                            v-if="
                              element?.conference_files.length &&
                              element?.conference_files
                            "
                          >
                            <template
                              v-for="(items, ind) in element.conference_files"
                              :key="items"
                            >
                              <a
                                :href="items"
                                :class="ind > 0 ? 'mt-1' : ''"
                                target="_blank"
                                class="btns c-save"
                                style="color: #fff"
                                >{{ $t("Download") }}</a
                              >
                            </template>
                          </div>
                          <span v-else>
                            {{ $t("Loading") }}
                          </span>
                        </div>
                      </template>
                      <template v-else-if="element?.status == 'active'">
                        <a
                          :href="element?.url"
                          target="_blank"
                          v-if="element?.is_creator"
                          class="btns c-save"
                          style="color: #fff"
                          >{{ $t("continue_miting") }}</a
                        >
                        <a
                          target="_blank"
                          :href="element?.url"
                          v-else
                          class="btns c-save"
                          >{{ $t("join_miting") }}</a
                        >
                      </template>
                      <template v-else-if="element?.status == 'inactive'">
                        <a
                          v-if="!element?.is_creator"
                          :href="element?.url"
                          disabled
                          class="text text-black"
                          >{{ $t("start_yet") }}</a
                        >
                        <a
                          @click="createZoom(element?.id)"
                          v-else
                          class="btns c-save"
                          >{{ $t("start_miting") }}</a
                        >
                      </template>
                      <template v-else>
                        <span>{{ $t("not_helth") }}</span>
                      </template>
                    </td>
                    <td>
                      {{ element?.duration }}
                    </td>
                    <td>
                      {{ element?.audience }}
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-------------START PAGINATION-------------->
              <PaginationMsg
                v-if="apiData.last_page > 1"
                class="mt-2"
                v-bind="{ ...apiData }"
                v-model:current-page="apiData.current_page"
                :loading="isLoading"
              />
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
        <span class="element-count mb-2" v-if="apiData?.total"
          >{{ apiData?.current_page }}-{{
            apiData?.data.length +
            apiData.per_page * (apiData?.current_page - 1)
          }}/ {{ $t("Total_Point") }}: {{ apiData?.total }}</span
        >
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
    <div
      id="modalAudince"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">
              {{ $t("list_conference_one") }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <div class="card-body">
              <div class="row">
                <div class="col-lg-6">
                  <a-form-item class="mb-3" name="nameFaculty">
                    <label for="division-name-select" class="form-label">{{
                      $t("Type")
                    }}</label>
                    <a-select
                      v-model:value="modalData.conference_type_id"
                      :options="sideFormOptions.typeOptions"
                      :field-names="{ value: 'id', label: 'name' }"
                    >
                    </a-select>
                    <span
                      v-if="errors.conference_type_id"
                      class="text-danger small"
                    >
                      {{ errors.conference_type_id[0] }}
                    </span>
                  </a-form-item>
                </div>
                <div class="col-lg-6">
                  <a-form-item class="mb-3" name="nameFaculty">
                    <label for="division-name-select" class="form-label">{{
                      $t("Name")
                    }}</label>
                    <a-input v-model:value="modalData.name" placeholder="" />
                    <span v-if="errors.name" class="text-danger small">
                      {{ errors.name[0] }}
                    </span>
                  </a-form-item>
                </div>
                <div class="col-lg-6">
                  <a-form-item class="mb-3" name="nameFaculty">
                    <label for="division-name-select" class="form-label">{{
                      $t("auditorium")
                    }}</label>
                    <a-select
                      v-model:value="modalData.audience_id"
                      :options="sideFormOptions.audinceOptions"
                      :field-names="{ value: 'id', label: 'name' }"
                    >
                    </a-select>
                    <span v-if="errors.audience_id" class="text-danger small">
                      {{ errors.audience_id[0] }}
                    </span>
                  </a-form-item>
                </div>
                <div class="col-lg-6">
                  <a-form-item class="mb-3" name="nameFaculty">
                    <label for="division-name-select" class="form-label">{{
                      $t("duration")
                    }}</label>
                    <a-input
                      :disabled="modalData?.id"
                      type="number"
                      v-model:value="modalData.duration"
                      placeholder=""
                    />
                    <span v-if="errors.duration" class="text-danger small">
                      {{ errors.duration[0] }}
                    </span>
                  </a-form-item>
                </div>
              </div>
              <a-form-item class="mb-3" name="nameFaculty">
                <label for="division-name-input" class="form-label">{{
                  $t("Explanation")
                }}</label>
                <a-textarea
                  :auto-size="{ minRows: 4.5, maxRows: 6 }"
                  v-model:value="modalData.description"
                />
                <span v-if="errors.description" class="text-danger small">
                  {{ errors.description[0] }}
                </span>
              </a-form-item>
              <a-form-item class="mb-3" name="nameFaculty">
                <label for="division-name-select" class="form-label">{{
                  $t("Begin_Date")
                }}</label>
                <a-date-picker
                  :disabled="modalData?.id"
                  show-time
                  v-model:value="modalData.date"
                  placeholder="DD.MM.YYYY"
                  format="DD.MM.YYYY HH:mm"
                  value-format="DD.MM.YYYY HH:mm"
                  type="date"
                />
                <span v-if="errors.date" class="text-danger small">
                  {{ errors.date[0] }}
                </span>
              </a-form-item>

              <div class="d-flex justify-content-end">
                <button
                  class="btns c-save"
                  type="button"
                  @click="createConference"
                >
                  <template v-if="modalData.id"
                    ><i class="mdi mdi-check font-size-14 align-middle me-1"></i
                    >{{ $t("Save") }}</template
                  >
                  <template v-else
                    ><i class="mdi mdi-check font-size-14 align-middle me-1"></i
                    >{{ $t("Create") }}</template
                  >
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.certificatePage {
  .table-row {
    display: grid;
    width: 100% !important;
    min-width: 1550px;
    grid-gap: 0;
    grid-template-columns: 50px 150px 20% 20% 140px 140px 160px 160px 120px;
  }
}

#modalAudince {
  .modal-dialog {
    max-width: 900px;
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
.last_td {
  td:last-child {
  }
}
</style>
