<script setup lang="ts">
  import { Modal } from "ant-design-vue";
  import { ref, createVNode, reactive } from "vue";
  import { ExclamationCircleOutlined } from "@ant-design/icons-vue";

  const formState = reactive({});
  //xolat turi
  const optionsTypeOfCondition = ref([
    { value: "Ishlamoqda" },
    { value: "Ta'tilda" },
    { value: "Xizmat safarida" },
    { value: "Bo'shagan" },
  ]);
  //lavozim
  const optionsPositionTecher = ref([
    { value: "Katta o'qituvchi" },
    { value: "Dotsent" },
    { value: "Professor" },
    { value: "Kafedra mudiri" },
    { value: "Stajwer-o'qituvchi" },
    { value: "Assistent" },
  ]);
  //kafedra / bo'lim
  const optionsDepartment = ref([
    { value: "Sport va chaqiriqqacha harbiy ta'lim" },
    { value: "Fizika va kimyo" },
    { value: "Tarix" },
    { value: "Tasviriy sanat" },
    { value: "Umumiy pedagogika" },
  ]);
  //o'qituvchi turi
  const optionsTeacherType = ref([
    { value: "Boshqa" },
    { value: "Professior-o'qituvchi xodim" },
    { value: "O'qituvchi" },
    { value: "Mutaxasis" },
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
  //jadval xodim
  const objTeachers = [
    {
      id: 1,
      name: "ABDUQODIROV BOBURJON ABDUXALILOVICH",
      department: "Umumiy pedagogika",
      position: "Dotsent",
      stavka: "Asosiy ish joyi",
      status: "Ishlamoqda",
    },
    {
      id: 2,
      name: "SOBIROVA SAIDA RAVSHANBEKOVNA",
      department: "Geografiya",
      position: "Stajer-o‘qituvchi",
      stavka: "Asosiy ish joyi",
      status: "Ishlamoqda",
    },
    {
      id: 3,
      name: "TADJIBAYEV IKRAM URALBAYEVICH",
      department: "Fakultetlar'aro jismoniy tarbiya",
      position: "Kafedra mudiri",
      stavka: "Asosiy ish joyi",
      status: "Ishlamoqda",
    },
    {
      id: 4,
      name: "ABDURAHIMOVA DILSHODA ABDUXALIM QIZI",
      department: "Boshlang'ich ta'lim metodikasi",
      position: "Stajer-o‘qituvchi",
      stavka: "Asosiy ish joyi",
      status: "Ishlamoqda",
    },
    {
      id: 5,
      name: "ABDURAXMANOV NIYATULLA ABDULLAYEVICH",
      department: "Fizika va astronomiya o'qitish metodikasi",
      position: "Katta o‘qituvchi",
      stavka: "Asosiy ish joyi",
      status: "Ishlamoqda",
    },
    {
      id: 6,
      name: "ABDURAHIMOVA DILSHODA ABDUXALIM QIZI",
      department: "Pedagogika va menejment",
      position: "Katta o‘qituvchi",
      stavka: "Asosiy ish joyi",
      status: "Ishlamoqda",
    },
  ];
  //fakultet filter
  const optionsFakulty = ref([
    { value: "Umumiy pedagogika" },
    { value: "Boshlang'ich ta'lim" },
    { value: "Fizika va kimyo" },
    { value: "Bugalteriya" },
    { value: "Gumanitar fanlar" },
    { value: "Pedagogika" },
  ]);
  const optionsDivisions = ref([
    { value: "Boshlang'ich ta'lim metodikasi" },
    { value: "Bolalar sporti" },
    { value: "Fizika va astronomiya o'qitish metodikasi" },
    { value: "Informatika va axborot texnologiyalari" },
    { value: "Maktabgacha ta'lim metodikasi" },
    { value: "Milliy g'oya, ma'naviyat asoslari va huquq ta'limi" },
  ]);
  const showDeleteConfirm = () => {
    Modal.confirm({
      title: "Siz rostdan shu bo'limni o'chirmoqchimisiz?",
      icon: createVNode(ExclamationCircleOutlined),
      content: "",
      okText: "Ha",
      okType: "danger",
      cancelText: "Yo'q",

      onOk() {
        console.log("OK");
      },

      onCancel() {
        console.log("Cancel");
      },
    });
  };
</script>

<template>
  <div class="employeeStatusPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Xodimlar xolati</h5>
          <div class="panel-toggles">
            <button class="btns c-save py-1.5 px-4 me-3" type="submit">
              <i class="mdi mdi-download me-2"></i>{{$t('Download')}}
            </button>
            <button
              class="btns c-save py-1.5 px-4 me-3"
              type="submit"
              data-bs-toggle="modal"
              data-bs-target="#myModalEmployeeStatus"
            >
              <i class="mdi mdi-check me-2"></i>Xodim xolati
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
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="optionsDivisions"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">{{$t("choose__depart__and__cafedra")}}</label>
            </div>
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="optionsCocktailForm"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">Mexnat shaklini tanlang</label>
            </div>
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="optionsTypeOfCondition"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">Statusni tanlang</label>
            </div>
            <div class="my-2 col-xl-9 form--item">
              <a-input id="yu" class="form-control" />
              <label for="yu">{{$t('Search_by_Name_Passport_Employee_ID')}}</label>
            </div>
            <div class="my-2 col-xl-3">
              <button class="btn-search search-color">
                <i class="mdi mdi-magnifying-glass me-2"></i>Qidirish
              </button>
            </div>
          </div>
        </b-card>
      </b-collapse>
    </div>
    <!-----------END FILTERS ------------------------>

    <!-------START MODAL---------------------------------------->
    <div
      id="myModalEmployeeStatus"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">Xodim xolati</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-xmark"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form>
              <div class="mb-3">
                <label for="division-name-select" class="form-label"
                  >Xolat turi</label
                >
                <a-select
                  v-model:value="value"
                  :options="optionsTypeOfCondition"
                  style="width: 100%; border-radius: 10px !important"
                  @change="handleChange"
                >
                </a-select>
              </div>

              <div class="mb-3">
                <label for="division-name-input" class="form-label"
                  >Xujjat raqami raqami</label
                >
                <a-input v-model:value="value2" />
              </div>
              <div class="mb-3">
                <label for="division-name-input" class="form-label"
                  >Kontrakt sanasi</label
                >
                <a-form-item name="date-picker" v-bind="config">
                  <a-date-picker
                    placeholder="YYYY-MM-DD"
                    v-model:value="formState['date-picker']"
                    value-format="YYYY-MM-DD"
                  />
                </a-form-item>
              </div>
              <!-- ----------------------------------------- -->
              <div class="d-flex justify-content-end">
                <button
                  type="button"
                  class="btns c-cancel me-1"
                  data-bs-dismiss="modal"
                >
                  Yopish
                </button>
                <button class="btns c-save">OK</button>
              </div>
            </a-form>
          </div>
        </div>
      </div>
    </div>
    <!-------END MODAL---------------------------------------->

    <!-------START TABLE---------------------------------------->
    <div class="row table-division">
      <div class="col-xl-12">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row-employee-status">
                    <th>#</th>
                    <th>
                      <a-checkbox v-model:checked1="checked"></a-checkbox>
                    </th>
                    <th>{{$t("Employee")}}</th>
                    <th>{{$t("Hei_department")}}</th>
                    <th>{{$t("by_Post")}}</th>
                    <th>{{$t("Employment_Staff")}}</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row-employee-status"
                    v-for="element in objTeachers"
                    :key="element.id"
                  >
                    <td>{{ element.id }}</td>
                    <td>
                      <a-checkbox v-model:checked1="checked"></a-checkbox>
                    </td>
                    <td>{{ element.name }}</td>
                    <td>{{ element.department }}</td>
                    <td>{{ element.position }}</td>
                    <td>{{ element.stavka }}</td>
                    <td>{{ element.status }}</td>
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
  </div>
</template>

<style lang="scss">
  
  .employeeStatusPage {
    .table-row-employee-status {
      display: grid;
      width: 100% !important;
      grid-gap: 0;
      grid-template-columns: 50px 40px auto 200px 150px 150px 100px;
      @include mobile() {
        grid-template-columns: 50px 40px 200px auto 130px 130px 100px;
      }
    }
  }
</style>
