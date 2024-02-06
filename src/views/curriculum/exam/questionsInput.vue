<template>
  <div pagetitle="'Malaka oshirish'" class="examResultsPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/curriculum/exam"
              >Imtihonlar ro'yxati /
            </router-link>
            <router-link to="/curriculum/exam/subject"
              >Kompyuterni modellashtirish /
            </router-link>
            <router-link to="/curriculum/exam/result">Natijalar / </router-link>
            RAHMONOVA XURSANOY SHAVKATJON QIZI
          </h5>
          <div class="panel-toggles">
            <button class="btns c-save py-1.5 px-4 me-3" type="submit">
              <i class="fas fa-print me-1"></i>Chop etish
            </button>
            <router-link to="/curriculum/exam/questions"
              ><button class="btns black-c py-1.5 px-4" type="submit">
                <i class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"></i>{{ $t("Prev") }}
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>

    <!-------START TABLE---------------------------------------->
    <div class="row">
      <div class="col-md-7">
        <div class="card">
          <div class="card-body">
            <div class="mb-2 d-flex justify-content-between align-items-center">
              <div>
                <h4 class="card-title mb-0"><b>Test kiritish</b></h4>
              </div>
              <div>
                <button
                  class="btns c-save py-2 px-4"
                  data-bs-toggle="modal"
                  data-bs-target="#myModalStudents"
                >
                  Ko'rish<i class="fas fa-long-arrow-right ms-2"></i>
                </button>
              </div>
            </div>
            <a-form>
              <a-form-item class="mb-3" name="heiNameInput">
                <a-textarea
                  v-model:value="formHeiInfo"
                  placeholder="Question 1
====
Variant 1
====
Variant 2
====
#Variant 3 correct
====
Variant 4
++++
Question 2"
                  :auto-size="{ minRows: 20, maxRows: auto }"
                />
              </a-form-item>
            </a-form>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <a-form
                  ref="formRef"
                  name="dynamic_form_nest_item"
                  :model="dynamicValidateForm"
                  @finish="onFinish"
                >
                  <div
                    class="
                      mb-2
                      d-flex
                      justify-content-between
                      align-items-center
                    "
                  >
                    <div>
                      <h4 class="card-title mb-0"><b>Test kiritish</b></h4>
                    </div>
                    <div>
                      <button
                        class="btns c-save py-2 px-4"
                        data-bs-toggle="modal"
                        data-bs-target="#myModalStudents"
                      >
                        Ko'rish<i class="fas fa-long-arrow-right ms-2"></i>
                      </button>
                    </div>
                  </div>
                  <a-form-item
                    class="mb-2 w-100"
                    :name="['users', index, 'last']"
                    :rules="{
                      required: true,
                      message: 'Missing last name',
                    }"
                  >
                    <a-textarea
                      v-model:value="last"
                      :auto-size="{ minRows: 1, maxRows: auto }"
                      placeholder="Savolni kiriting"
                    />
                  </a-form-item>

                  <a-upload
                    v-model:file-list="fileList"
                    name="avatar"
                    list-type="picture-card"
                    :show-upload-list="false"
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    :before-upload="beforeUpload"
                    @change="handleChange"
                  >
                    <img
                      v-if="imageUrl"
                      :src="imageUrl"
                      alt="avatar"
                      class="testUpload"
                    />
                    <div v-else>
                      <loading-outlined v-if="loading"></loading-outlined>
                      <plus-outlined v-else></plus-outlined>
                      <div class="ant-upload-text">Rasm qo'shish</div>
                    </div>
                  </a-upload>
                  <hr>

                  <a-space
                    v-for="(user, index) in dynamicValidateForm.users"
                    :key="user.id"
                    style="display: flex; margin-bottom: 8px"
                    align="baseline"
                  >
                    <div class="row">
                      <div
                        class="
                          d-flex
                          justify-content-between
                          align-items-center
                        "
                      >
                        <a-radio v-model:checked="checked" class="me-3">{{
                          index + 1
                        }}</a-radio>
                        <a-form-item
                          class="mb-0 me-3 w-100"
                          :name="['users', index, 'last']"
                          :rules="{
                            required: true,
                            message: 'Missing last name',
                          }"
                        >
                          <a-textarea
                            v-model:value="user.last"
                            :auto-size="{ minRows: 1, maxRows: auto }"
                            placeholder="Variantni kiriting"
                          />
                        </a-form-item>
                        <MinusCircleOutlined @click="removeUser(user)" />
                      </div>
                    </div>
                  </a-space>
                  <a-form-item>
                    <a-button type="dashed" block @click="addUser">
                      <PlusOutlined />
                      Variant qo'shish
                    </a-button>
                  </a-form-item>
                  <a-form-item>
                    <a-button type="primary" html-type="submit"
                      >Submit</a-button
                    >
                  </a-form-item>
                </a-form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-5">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title mb-0"><b>Test savollari</b></h4>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table-vertical">
                <thead
                  v-for="(element, index) in allTables.tableQuestionsEdit"
                  :key="index"
                >
                  <tr class="table-row w-100 d-grid shadow-none">
                    <th>
                      <strong>{{ element.id }}</strong>
                    </th>
                    <th>
                      <strong>{{ element.question }}</strong>
                    </th>
                  </tr>
                  <tr
                    class="table-row w-100 d-grid"
                    v-for="(variant, indexV) in element.variants"
                    :key="indexV"
                    :class="
                      variant.value1 === 1
                        ? 'answerTrue'
                        : 'shadow-none bg-white'
                    "
                  >
                    <td>
                      <span v-if="indexV % 4 == 0">a)</span>
                      <span v-if="indexV % 4 == 1">b)</span>
                      <span v-if="indexV % 4 == 2">c)</span>
                      <span v-if="indexV % 4 == 3">d)</span>
                    </td>
                    <td>{{ variant.answer }}</td>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-------START TABLE---------------------------------------->
  </div>
</template>

<script>

import { allDate, allTables } from "../../data";
import {
  PlusOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import { ref, reactive } from "vue";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  setup() {
    //-------create variant--------
    const formRef = ref();
    const dynamicValidateForm = reactive({
      users: [],
    });

    const removeUser = (item) => {
      let index = dynamicValidateForm.users.indexOf(item);

      if (index !== -1) {
        dynamicValidateForm.users.splice(index, 1);
      }
    };

    const addUser = () => {
      dynamicValidateForm.users.push({
        first: "",
        last: "",
        id: Date.now(),
      });
    };

    const onFinish = (values) => {
      console.log("Received values of form:", values);
      console.log("dynamicValidateForm.users:", dynamicValidateForm.users);
    };
    //---------upload-------
    const fileList = ref([]);
    const loading = ref(false);
    const imageUrl = ref("");

    const handleChange = (info) => {
      if (info.file.status === "uploading") {
        loading.value = true;
        return;
      }

      if (info.file.status === "done") {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (base64Url) => {
          imageUrl.value = base64Url;
          loading.value = false;
        });
      }

      if (info.file.status === "error") {
        loading.value = false;
        message.error("upload error");
      }
    };

    const beforeUpload = (file) => {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";

      if (!isJpgOrPng) {
        message.error("You can only upload JPG file!");
      }

      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        message.error("Image must smaller than 2MB!");
      }

      return isJpgOrPng && isLt2M;
    };
    //----------------------
    return {
      allTables,
      allDate,
      fileList,
      loading,
      imageUrl,
      handleChange,
      beforeUpload,
      formRef,
      dynamicValidateForm,
      onFinish,
      removeUser,
      addUser,
    };
  },
  components: {
    
    LoadingOutlined,
    PlusOutlined,
    MinusCircleOutlined,
  },
};
</script>

<style lang="scss">
.examResultsPage {
  .table-row {
    grid-template-columns: 50px auto;
  }
  .student-result {
    grid-template-columns: 100px auto;
  }
  .table-vertical {
    td {
      display: flex;
      align-items: center;
      padding: 12px 15px;
      &:first-child {
        display: flex;
        justify-content: right;
      }
    }
  }
  .answerTrue {
    background-color: #c2dfe3 !important;
  }
}
</style>





