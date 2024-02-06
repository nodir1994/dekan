<template>
  <div pagetitle="`Diplomlar royxati`" class="diploma-list">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Diplomlar royxati</h5>
          <div class="panel-toggles">
            <button class="btns c-save py-1.5 px-4 me-3" type="submit">
              <i class="mdi mdi-download font-size-14 align-middle me-1"></i>{{$t('Download')}}
            </button>
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i>{{ $t("Filter") }}
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
            <!-- //o'quv yili  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="optionsEducationYear"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_Education_Year") }}</label>
            </div>

            <!-- //fakultetlar  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="optionsFaculty"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label for="yu">{{ $t("Choose_faculty") }}</label>
            </div>

            <!-- //mutaxassislikni tanlang  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="optionsSpecialty"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label for="yu">{{$t('select__specialty')}}</label>
            </div>

            <!-- //guruh  -->
            <div class="my-2 col-xl-4 form--item">
              <a-space>
                <a-select
                  class="form--item"
                  v-model:value="value"
                  show-search
                  :options="optionsGroup"
                  :filter-option="filterOption"
                  @focus="handleFocus"
                  @blur="handleBlur"
                  @change="handleChange"
                ></a-select>
              </a-space>
              <label>{{$t('Choose_Group')}}</label>
            </div>

            <!-- //izlash  -->
            <div class="my-2 col-xl-6 form--item">
              <a-input id="yu" class="form-control" />
              <label for="yu">{{$t('choose__fish__passport__code')}}</label>
            </div>

            <!-- //search button  -->
            <div class="my-2 col-xl-2">
              <button class="btn-search search-color">
                <i class="mdi mdi-magnify font-size-14 align-middle me-1"></i>{{ $t("Search") }}
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
                  <tr class="table-row-diploma-list">
                    <th>#</th>
                    <th>{{ $t("Student") }}</th>
                    <th>Mutaxassislik nomi</th>
                    <th>Diplom raqami</th>
                    <th>Qayd raqami</th>
                    <th>Fayllar</th>
                    <th>Nashr</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row-diploma-list"
                    v-for="element in objDiplomaList"
                    :key="element.id"
                  >
                    <td>{{ element.id }}</td>
                    <td>
                      {{ element.student }} <br />
                      {{ element.academicYear }} /
                      {{ element.typeOfEducation }} ,
                      {{ element.formOfEducation }}
                    </td>
                    <td>
                      {{ element.specialtyName }} <br />
                      {{ element.specialtyId }}
                    </td>
                    <td>
                      {{ element.diplomaNumber }} <br />
                      {{ element.diplomaType }} / {{ element.diplomStatus }}
                    </td>
                    <td>
                      {{ element.diplomRegisterNumber }} ({{
                        element.diplomRegisterDate
                      }})
                    </td>
                    <td>
                      <button
                        class="btns diploma-color py-1 px-2 me-1"
                        type="submit"
                      >
                        <i class="mdi mdi-download me-1"></i>Diplom
                      </button>
                      <button
                        class="btns application-color py-1 px-2"
                        type="submit"
                      >
                        <i class="mdi mdi-download me-1"></i>Ilova
                      </button>
                    </td>
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
  </div>
</template>

<script>

// import { Modal } from "ant-design-vue";
import { ref /*createVNode*/ } from "vue";
// import { ExclamationCircleOutlined } from "@ant-design/icons-vue";

export default {
  setup() {
    //o'quv yili
    const optionsEducationYear = ref([
      { value: "2021-2022" },
      { value: "2020-2021" },
      { value: "2019-2020" },
      { value: "2018-2019" },
      { value: "2017-2018" },
    ]);
    //mutaxassisliklar
    const optionsSpecialty = ref([
      { value: "Maktabgacha ta’lim" },
      { value: "Fizika va astronomiya o‘qitish metodikasi" },
      { value: "Boshlang‘ich ta’lim va sport-tarbiyaviy ish" },
      { value: "Maxsus pedagogika, defektologiya (surdopedagogika)" },
      { value: "Maxsus pedagogika, defektologiya (surdopedagogika)" },
      { value: "O‘zbek tili va adabiyoti" },
    ]);
    // fakultetlar
    const optionsFaculty = ref([
      { value: "Gumanitar fanlar" },
      { value: "Pedagogika" },
      { value: "Sport va chaqiriqqacha harbiy ta'lim" },
      { value: "San'atshunoslik" },
      { value: "Maktabgacha ta'lim" },
      { value: "	Fizika va kimyo" },
    ]);
    // guruh
    const optionsGroup = ref([
      { value: "IO'M_19-2" },
      { value: "MO'M_20-2" },
      { value: "GO'M_21-1" },
      { value: "KO'M_21-3 (r)" },
    ]);
    //jadval diplomlar
    const objDiplomaList = [
      {
        id: 1,
        student: "ABDUQODIROV BOBURJON ABDUXALILOVICH",
        academicYear: "2021-2022",
        typeOfEducation: "Bakalavr",
        formOfEducation: "Kunduzgi",
        specialtyName: "Biologiya o‘qitish metodikasi",
        specialtyId: 543543,
        diplomaNumber: "A001221100",
        diplomaType: "Oddiy",
        diplomStatus: "Orginal",
        diplomRegisterNumber: 1,
        diplomRegisterDate: "2021-10-09",
      },
      {
        id: 2,
        student: "	NORIMBOYEV XAYOT XAYRULLA O‘G‘LI",
        academicYear: "2021-2022",
        typeOfEducation: "Bakalavr",
        formOfEducation: "Kunduzgi",
        specialtyName: "Biologiya o‘qitish metodikasi",
        specialtyId: 543543,
        diplomaNumber: "A001221100",
        diplomaType: "Oddiy",
        diplomStatus: "Orginal",
        diplomRegisterNumber: 1,
        diplomRegisterDate: "2021-10-09",
      },

      {
        id: 3,
        student: "MUXAMEDEYEV SIYOVUSH MUROD O‘G‘LI",
        academicYear: "2021-2022",
        typeOfEducation: "Bakalavr",
        formOfEducation: "Kunduzgi",
        specialtyName: "Biologiya o‘qitish metodikasi",
        specialtyId: 543543,
        diplomaNumber: "A001221100",
        diplomaType: "Oddiy",
        diplomStatus: "Orginal",
        diplomRegisterNumber: 1,
        diplomRegisterDate: "2021-10-09",
      },

      {
        id: 4,
        academicYear: "2021-2022",
        typeOfEducation: "Bakalavr",
        formOfEducation: "Kunduzgi",
        specialtyName: "Biologiya o‘qitish metodikasi",
        specialtyId: 543543,
        diplomaNumber: "A001221100",
        diplomaType: "Oddiy",
        diplomStatus: "Orginal",
        diplomRegisterNumber: 1,
        diplomRegisterDate: "2021-10-09",
      },

      {
        id: 5,
        student: "XAYDARALIYEVA AYSULU ADIL QIZI",
        academicYear: "2021-2022",
        typeOfEducation: "Bakalavr",
        formOfEducation: "Kunduzgi",
        specialtyName: "Biologiya o‘qitish metodikasi",
        specialtyId: 543543,
        diplomaNumber: "A001221100",
        diplomaType: "Oddiy",
        diplomStatus: "Orginal",
        diplomRegisterNumber: 1,
        diplomRegisterDate: "2021-10-09",
      },

      {
        id: 6,
        student: "PARDAYEV BEKZOD JO‘RABEK O‘G‘LI",
        academicYear: "2021-2022",
        typeOfEducation: "Bakalavr",
        formOfEducation: "Kunduzgi",
        specialtyName: "Biologiya o‘qitish metodikasi",
        specialtyId: 543543,
        diplomaNumber: "A001221100",
        diplomaType: "Oddiy",
        diplomStatus: "Orginal",
        diplomRegisterNumber: 1,
        diplomRegisterDate: "2021-10-09",
      },
    ];

    // --------------form-------------------------
    const handleChange = (value) => {
      console.log(`selected ${value}`);
    };

    const handleBlur = () => {
      console.log("blur");
    };

    const handleFocus = () => {
      console.log("focus");
    };

    const filterOption = (input, option) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    //-----------------------------------
    // const showDeleteConfirm = () => {
    //   Modal.confirm({
    //     title: "Siz rostdan shu bo'limni o'chirmoqchimisiz?",
    //     icon: createVNode(ExclamationCircleOutlined),
    //     content: "",
    //     okText: "Ha",
    //     okType: "danger",
    //     cancelText: "Yo'q",

    //     onOk() {
    //       console.log("OK");
    //     },

    //     onCancel() {
    //       console.log("Cancel");
    //     },
    //   });
    // };
    return {
      // showDeleteConfirm,
      optionsEducationYear, //o'quv yili
      optionsFaculty, //fakultetlar
      optionsSpecialty, //mutaxassisliklar
      optionsGroup, //guruh
      objDiplomaList, // diplomlar
      //--------------------------
      filterOption,
      handleBlur,
      handleFocus,
      handleChange,
    };
  },
  components: {
    
  },
};
</script>

<style lang="scss">
.table-row-diploma-list {
  display: grid;
  width: 100% !important;
  grid-gap: 0;
  grid-template-columns: 50px auto 250px 140px 150px 180px 70px;
  @media (max-width: 767px) {
      grid-template-columns: 50px 200px 200px 140px 150px 180px 70px;
    }
}
</style>