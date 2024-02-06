

<script>

import appConfig from "@/app.config";
import { onMounted, ref, createVNode } from "vue";
import axios from "axios";
import { Modal } from "ant-design-vue";
import { ExclamationCircleOutlined } from "@ant-design/icons-vue";

export default {
  setup() {
    const nameKafedraInput = ref("");
    const kodKafedraInput = ref("");
    let postDetalis = ref("[]");
    const classCreat = ref("asd");
    let nameFaculty = ref(""); // fakultet nomi

    async function postGetDetails() {
      await axios
        .post("https://api.bepay.uz/api/app/create-comments", {
          name: nameFaculty,
          email: nameKafedraInput.value,
          message: kodKafedraInput.value,
        })
        .then((response) => {
          getPostDetails();
          console.log(response.data, "asdasdzsdass");
        });
    }

    function getPostDetails(current) {
      axios
        .get(
          `https://api.bepay.uz/api/app/comments-list?page=${current}&lang=ru`
        )
        .then((response) => {
          postDetalis.value = response.data.comments;
          console.log(postDetalis.value, "adasdasdasdasd");
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    // ----------------START SELECT-----------------------------

    const handleChange = (value) => {
      nameFaculty = value;
    };
    const options = ref([
      { value: "Gumanitar fanlar" },
      { value: "Pedagogika" },
      { value: "Boshlang'ich ta'lim" },
      { value: "Matematika va informatika" },
      { value: "Fizika va kimyo" },
    ]);
    const optionsDepartment = ref([
      { valueDepartment: "Gumanitar fanlar" },
      { valueDepartment: "Pedagogika" },
      { valueDepartment: "Boshlang'ich ta'lim" },
      { valueDepartment: "Matematika va informatika" },
      { valueDepartment: "Fizika va kimyo" },
    ]);
    // -----------------END SELECT---------------------------

    onMounted(() => {
      getPostDetails();
    });
    function classActiv() {
      classCreat.value = "activeRow";
    }
    //--------------START PAGENATION-------------------------

    const current = ref(1);
    const onChange = (pageNumber) => {
      getPostDetails(pageNumber);
    };
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

    //---------------SHOV MODAL--------------------
    // const showModal = () => {
    //   visible.value = true;
    // };

    // const showModalEdit = () => {
    //   visibleEdit.value = true;
    // };
    //---------------SHOV MODAL--------------------

    // -------------------ACTION---------------------

    //--------------END PAGENATION---------------------------

    return {
      value: ref([""]),
      valueDepartment: ref([""]),
      handleChange,
      options,
      classCreat,
      nameFaculty,
      classActiv,
      kodKafedraInput,
      nameKafedraInput,
      postGetDetails,
      getPostDetails,
      postDetalis,
      current,
      onChange,
      optionsDepartment,
    };
  },
  components: {
    
  },
  page: {
    title: "department",
    meta: [
      {
        name: "description",
        content: appConfig.description,
      },
    ],
  },
};
</script>

<template>
  <div pagetitle="'Kafedra'">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">Loyihalar listi</h5>
          <div class="panel-toggles">
            <div>
              <button
                type="button"
                class="btns c-save py-1.5 px-4 me-3"
                data-bs-toggle="modal"
                data-bs-target="#myModal"
              >
                <i class="mdi mdi-plus font-size-14 align-middle me-1"></i>Kafedra yaratish
              </button>
            </div>
            <div class="filterBlock">
              <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i>Filter
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
          <div class="row">
            <div class="my-2 col-xl-5 form--item">
              <a-space>
                <a-select
                  v-model:value="value"
                  :options="options"
                  @change="handleChange"
                >
                </a-select>
              </a-space>
              <label for="yu">{{$t('Hei_department')}}</label>
            </div>
            <div class="my-2 col-xl-5 form--item">
              <a-input id="yu" class="form-control" />
              <label for="yu">{{ $t("Search_by_Name") }}</label>
            </div>
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

    <!-------START MODAL---------------------------------------->
    <div
      id="myModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header bg-card-header">
            <h5 class="modal-title" id="myModalLabel">Kafedra yaratish</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal">
              <i class="mdi mdi-close font-size-18"></i>
            </button>
          </div>
          <div class="modal-body">
            <a-form @submit.prevent="postGetDetails">
              <div class="mb-1">
                <label for="fakultet-name-input" class="form-label"
                  >{{ $t("Structure_Faculty") }}</label
                >
                <a-select
                  v-model:value="valueDepartment"
                  :options="optionsDepartment"
                  style="width: 100%; border-radius: 10px !important"
                >
                  {{ options }}
                </a-select>
              </div>
              <div class="mb-1">
                <label for="kafedra-name-input" class="form-label">Nomi</label>
                <a-input
                  class="select"
                  tupe="email"
                  v-model:value="nameKafedraInput"
                  placeholder="Kafedra nomini kiriting"
                />
              </div>
              <div class="mb-3">
                <label for="kafedra-kod-input" class="form-label">{{ $t("Code")}}</label>
                <a-input type="text" v-model:value="kodKafedraInput" />
              </div>
              <div class="d-flex justify-content-end">
                <button
                  type="button"
                  class="btns c-cancel me-1"
                  data-bs-dismiss="modal"
                >
                   <i class="mdi mdi-close font-size-14 align-middle me-1"></i>
                  {{ $t("Close")}}
                </button>
                <button class="btns c-delete me-1"> <i class="mdi mdi-trash-can font-size-14 align-middle me-1"></i>{{ $t("Remove") }}</button>
                <button class="btns c-save" type="submit">
              <i class="mdi mdi-content-save font-size-14 align-middle me-1"></i>
              {{ $t("Save") }}
            </button>
              </div>
            </a-form>
          </div>
        </div>
      </div>
    </div>
    <!-------END MODAL---------------------------------------->

    <!-------START TABLE---------------------------------------->
    <div class="row">
      <div class="col-xl-12">
        <div class="card mb-1">
          <div class="card-body">
            <table class="content-table">
              <thead>
                <tr class="table-row-deportament">
                  <th>#</th>
                  <td><a-checkbox v-model:checked1="checked"></a-checkbox></td>
                  <th>Name</th>
                  <th>Points</th>
                  <th>Team</th>
                  <th>Actions</th>
                  <th>{{ $t("Enable") }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="postDetail in postDetalis"
                  :key="postDetail.id"
                  :class="classCreat"
                  class="table-row-deportament"
                >
                  <td>{{ postDetail.id }}</td>
                  <td><a-checkbox v-model:checked1="checked"></a-checkbox></td>
                  <td>
                    {{ postDetail.name }}
                  </td>
                  <td>{{ postDetail.message }}</td>
                  <td>{{ postDetail.date_cr }}</td>
                  <!-- ---------START ACTIONS-------------- -->
                  <td class="gridjs-td">
                    <ul class="list-inline mb-0">
                      <li class="list-inline-item">
                        <div class="edit__project">
                          <a
                            type="text"
                            data-bs-toggle="modal"
                            data-bs-target="#myModalDivision"
                          >
                            <i class="mdi mdi-pencil font-size-18 text-primary"></i>
                          </a>
                        </div>
                      </li>
                      <!-- <li class="list-inline-item">
                        <div class="edit__project">
                          <router-link to="/marketing/list-project">
                            <eva-icon
                              class="icon-md"
                              style="
                                transform: translateY(-7px);
                                font-size: 18px;
                                line-height: 1;
                                color: green;
                              "
                              name="eye-outline"
                            ></eva-icon>
                          </router-link>
                        </div>
                      </li> -->
                      <li class="list-inline-item">
                        <div class="delete__project">
                          <a
                            class="text-danger"
                            type="danger"
                            @click="showDeleteConfirm"
                            ><i class="mdi mdi-delete font-size-18"></i
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
            <div>
              <a-pagination
                class="mt-2 pagiNation"
                v-model:current="current"
                :total="100"
                @change="onChange"
              />
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
    <!-------END TABLE---------------------------------------->
  </div>
</template>

<style>
.table-row-deportament {
  width: 100% !important;
  display: grid;
  grid-gap: 0;
  grid-template-columns: 50px 50px auto 200px 200px 70px 70px !important;
}
.ant-pagination li.ant-pagination-item-active {
  background: #009879 !important;
  color: white !important;
}
.ant-pagination .ant-pagination-item {
  margin-right: 4px !important;
}
.btn-cancel {
  background: #b9e4f3;
  color: white;
  outline: none;
  border: none;
  padding: 5px 8px;
  border-radius: 5px 0 5px 0;
  transition: 0.3s ease;
}
.btn-cancel:hover {
  background-color: #a9d6e5;
}

.ant-select:not(.ant-select-customize-input) .ant-select-selector {
  border-radius: 10px;
}
</style>