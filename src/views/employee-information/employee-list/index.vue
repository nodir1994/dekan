<script setup lang="ts">
  import { computed, ref, reactive } from "vue";
  import Swal from "sweetalert2";
  import { fetchList } from "@/utils/api/employee";

  //select date
  const formState1 = reactive({});
  const formState2 = reactive({});

  function onDelete() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger ml-2",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Aminmisiz?",
        text: "Siz buni qaytara olmaysiz!",
        icon: "warning",
        confirmButtonText: "Ha, o'chirish!",
        cancelButtonText: "Yo'q, bekor qilish!",
        showCancelButton: true,
      })
      .then((result) => {
        if (result.value) {
          swalWithBootstrapButtons.fire(
            "O'chirildi!",
            "Xabarni o'chirish muvaffaqiyatli amalga oshirildi!",
            "success"
          );
        }
      });
  }

  //lavozim
  const optionsPosition = ref([
    { value: "Tyutor" },
    { value: "Dispetcher" },
    { value: "Dekan muovini" },
    { value: "Kabinet mudiri" },
    { value: "Uslubchi" },
  ]);

  //kafedra / bo'lim
  const optionsDepartment = ref([
    { value: "Sport va chaqiriqqacha harbiy ta'lim" },
    { value: "Fizika va kimyo" },
    { value: "Buxgalteriya" },
    { value: "Gumanitar fanlar" },
    { value: "O'quv uslubiy boshqarma" },
  ]);

  //xodim turi
  const optionsEmployeeType = ref([
    { value: "Boshqa" },
    { value: "Adminstariv-boshqaruv xodimi" },
    { value: "O'quv-yordamchi va texnik xodim" },
    { value: "Xizmat ko'rsatuvchi xodim" },
  ]);

  //mexnat shakli
  const optionsCocktailForm = ref([
    { value: "Asosiy ish joyi" },
    { value: "O'rindoshlik (tashqi)" },
    { value: "Soatbay" },
    { value: "O'rindoshlik (ichki-qo'shimcha)" },
    { value: "O'rindoshlik (ichki-asosiy)" },
  ]);

  //stavka
  const optionsRate = ref([
    { value: "1,00 stavka" },
    { value: "0,75 stavka" },
    { value: "0,50 stavka" },
    { value: "0,25 stavka" },
  ]);

  //bo'lim filter
  const optionsSection = ref([
    { value: "Axborot resurs markazi" },
    { value: "Boshlang'ich ta'lim" },
    { value: "Fizika va kimyo" },
    { value: "Bugalteriya" },
    { value: "Gumanitar fanlar" },
    { value: "Pedagogika" },
  ]);

  const apiData = reactive({});

  const currentPage = computed({
    get: () => {
      return apiData.current_page;
    },
    set: async (page) => {
      await fetchData(page);
    },
  });

  await fetchData();

  async function fetchData(page = 1) {
    const res = await fetchList({
      page,
      search_string: "san",
      department_id: 1,
    });
    Object.assign(apiData, res.data);
  }

  function onEdit(rowId) {
    selectedId.value = rowId;
    isFormModalOpen.value = true;
  }

  async function onRemove(id) {
    selectedId.value = id;
    mainStore.$patch({ confirmModalState: true });
  }

  async function handleRemoveAction() {
    await removeById(selectedId.value);
    fetchData();
  }

  function handleChange() {
    //
  }
</script>

<template>
  <div class="employeeListPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Xodimlar ro'yxati</h5>
          <div class="panel-toggles">
            <button class="btns c-save py-1.5 px-4 me-3" type="submit">
              <i class="mdi mdi-download me-2"></i>{{$t('Download')}}
            </button>
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter me-2"></i>Filtr
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
            <div class="my-2 col-xl-5 form--item">
              <a-space>
                <a-select :options="optionsSection" @change="handleChange">
                </a-select>
              </a-space>
              <label for="yu">Bo'limni tanlang</label>
            </div>
            <div class="my-2 col-xl-5 form--item">
              <a-input id="yu" class="form-control" />
              <label for="yu">Ism / Pasport / Xodim bo'yicha qidirish</label>
            </div>
            <div class="my-2 col-xl-2">
              <button class="btn-search search-color">
                <i class="mdi mdi-magnifying-glass me-2"></i>Qidirish
              </button>
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
            <div class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row-employee-list">
                    <th>#</th>
                    <th>
                      <a-checkbox />
                    </th>
                    <th>{{$t("Employee")}}</th>
                    <th>Bo'linma</th>
                    <th>{{$t("by_Post")}}</th>
                    <th>{{$t("Employment_Staff")}}</th>
                    <th>Status</th>
                    <th>{{$t("Command_number")}}</th>
                    <th>{{$t('action')}}</th>
                    <th>Faol</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row-employee-list"
                    v-for="(element, elIndex) in apiData.data"
                    :key="elIndex"
                  >
                    <td>{{ element["ID raqami"] }}</td>
                    <td>
                      <a-checkbox />
                    </td>
                    <td>{{ element.employee }}</td>
                    <td>{{ element.department }}</td>
                    <td>{{ element.position }}</td>
                    <td>{{ element.work_rate }}</td>
                    <td>{{ element.status }}</td>
                    <td>{{ element.command_date }}</td>
                    <!-- ---------START ACTIONS-------------- -->
                    <td class="gridjs-td">
                      <ul class="list-inline mb-0">
                        <li class="list-inline-item">
                          <div class="edit__project">
                            <a
                              type="text"
                              data-bs-toggle="modal"
                              data-bs-target="#employeeMiniFormModal"
                            >
                              <i class="bx bx-pencil font-size-18"></i>
                            </a>
                          </div>
                        </li>
                        <li class="list-inline-item">
                          <div class="delete__project">
                            <a
                              class="text-danger"
                              type="danger"
                              @click="onDelete"
                              ><i class="bx bx-trash-alt font-size-18"></i
                            ></a>
                          </div>
                        </li>
                      </ul>
                    </td>
                    <!-- ---------END ACTIONS-------------- -->
                    <td>
                      <div class="form-check form-switch">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckChecked"
                          checked
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-------------START PAGINATION-------------->
              <div class="mt-2">
                <nav aria-label="...">
                  <ul class="pagination">
                    <li class="page-item disabled">
                      <span class="page-link"
                        ><i class="mdi mdi-chevron-left"></i
                      ></span>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">1</a>
                    </li>
                    <li class="page-item active">
                      <span class="page-link">
                        2
                        <span class="sr-only">(current)</span>
                      </span>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">3</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#"
                        ><i class="mdi mdi-chevron-right"></i
                      ></a>
                    </li>
                  </ul>
                </nav>
              </div>
              <!-------------END PAGINATION-------------->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-------END TABLE---------------------------------------->

    <!-------START MODAL---------------------------------------->
    <div
      id="employeeMiniFormModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="employeeMiniFormModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="employeeMiniFormModalLabel">
              ABDUQODIROV BOBURJON ABDUXALILOVICH
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-xmark"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form>
              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label"
                      >Xodim</label
                    >
                    <a-select
                      :options="optionsEmployeeType"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label"
                      >Lavozim</label
                    >
                    <a-select
                      :options="optionsPosition"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </div>
                </div>
              </div>
              <!-- -------------------------------------------------- -->

              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label"
                      >Kafedra / Bo'lim</label
                    >
                    <a-select
                      :options="optionsDepartment"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label"
                      >Xodim turi</label
                    >
                    <a-select
                      :options="optionsCocktailForm"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </div>
                </div>
              </div>
              <!-- ------------------------------------------------------------ -->

              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label"
                      >Mexnat shakli</label
                    >
                    <a-select
                      :options="optionsPosition"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label"
                      >Stavka</label
                    >
                    <a-select
                      :options="optionsRate"
                      style="width: 100%; border-radius: 10px !important"
                      @change="handleChange"
                    >
                    </a-select>
                  </div>
                </div>
              </div>

              <!-- ------------------------------------------------------------- -->

              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="division-name-input" class="form-label"
                      >Kontrakt raqami</label
                    >
                    <a-input />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="division-name-input" class="form-label"
                      >Kontrakt sanasi</label
                    >
                    <a-form-item name="date-picker">
                      <a-date-picker
                        placeholder="YYYY-MM-DD"
                        v-model:value="formState1['date-picker']"
                        value-format="YYYY-MM-DD"
                      />
                    </a-form-item>
                  </div>
                </div>
              </div>
              <!-- ----------------------------------------- -->

              <div class="row">
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="division-name-input" class="form-label"
                      >Buyruq raqami</label
                    >
                    <a-input />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="mb-3">
                    <label for="division-name-input" class="form-label"
                      >Buyruq sanasi</label
                    >
                    <a-form-item name="date-picker">
                      <a-date-picker
                        placeholder="YYYY-MM-DD"
                        v-model:value="formState2['date-picker']"
                        value-format="YYYY-MM-DD"
                      />
                    </a-form-item>
                  </div>
                </div>
              </div>
              <!-- ------------------------------------------------ -->
              <div class="d-flex justify-content-end">
                <button
                  type="button"
                  class="btns c-cancel me-1"
                  data-bs-dismiss="modal"
                >
                  Yopish
                </button>
                <button class="btns c-delete me-1">O'chirish</button>
                <button class="btns c-save">Saqlash</button>
              </div>
            </a-form>
          </div>
        </div>
      </div>
    </div>
    <!-------END MODAL---------------------------------------->
  </div>
</template>

<style lang="scss">
  
  .employeeListPage {
    .table-row-employee-list {
      display: grid;
      width: 100% !important;
      grid-gap: 0;
      grid-template-columns: 50px 40px auto 150px 150px 150px 100px 130px 80px 60px;
      @include mobile() {
        grid-template-columns: 50px 40px 200px auto auto 120px 100px 130px 80px 60px;
      }
    }
    .modal-dialog {
      max-width: $ipad;
    }
  }
</style>
