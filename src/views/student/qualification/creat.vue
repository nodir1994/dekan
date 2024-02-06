<template>
  <div pagetitle="`Yaratish`" class="create-quvalificaion-page">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/student/qualification"
              >{{$t('Qualification')}}
            </router-link>
            / {{$t('Create')}}
          </h5>
          <div class="panel-toggles">
            <router-link to="/student/qualification"
              ><button class="btns black-c py-1.5 px-4" type="submit">
                <i
                  class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"
                ></i
                >{{ $t("Prev") }}
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card mb-5">
      <div class="card-body">
        <a-form
          :model="formCreateQualification"
          autocomplete="off"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <div class="row">
            <a-form-item class="mb-3" name="special">
              <label for="division-name-select" class="form-label"
                >{{ $t("by_Specialty") }}</label
              >
              <a-select
                v-model:value="formCreateQualification.special"
                show-search
                :options="allDate.optionsSpecialId"
                style="width: 100%; border-radius: 10px !important"
                @change="handleChange"
              >
              </a-select>
            </a-form-item>
            <a-form-item class="mb-3 col-md-4" name="nameUz">
              <label for="division-name-input" class="form-label"
                >{{ $t("Name_Uz")}}<sup> ⚬</sup></label
              >
              <a-input v-model:value="formCreateQualification.nameUz" />
            </a-form-item>
            <a-form-item class="mb-3 col-md-4" name="nameRu">
              <label for="division-name-input" class="form-label"
                >{{ $t("Name_RU")}}<sup> ⚬</sup></label
              >
              <a-input v-model:value="formCreateQualification.nameRu" />
            </a-form-item>
            <a-form-item class="mb-3 col-md-4" name="nameEn">
              <label for="division-name-input" class="form-label"
                >{{ $t("Name_EN")}}<sup> ⚬</sup></label
              >
              <a-input v-model:value="formCreateQualification.nameEn" />
            </a-form-item>
            <a-form-item class="mb-3 col-md-4" name="textarea__specialUz">
              <label for="division-name-input" class="form-label"
                >{{$t('Data')}} (UZ)<sup> ⚬</sup></label
              >
              <a-textarea
                v-model:value="formCreateQualification.textarea__specialUz"
                placeholder=""
                :auto-size="{ minRows: 4, maxRows: 5 }"
              />
            </a-form-item>
            <a-form-item class="mb-3 col-md-4" name="textarea__specialRu">
              <label for="division-name-input" class="form-label"
                >{{$t('Data')}} (RU)<sup> ⚬</sup></label
              >
              <a-textarea
                v-model:value="formCreateQualification.textarea__specialRu"
                placeholder=""
                :auto-size="{ minRows: 4, maxRows: 5 }"
              />
            </a-form-item>
            <a-form-item class="mb-3 col-md-4" name="textarea__specialEn">
              <label for="division-name-input" class="form-label"
                >{{$t('Data')}} (EN)<sup> ⚬</sup></label
              >
              <a-textarea
                v-model:value="formCreateQualification.textarea__specialEn"
                placeholder=""
                :auto-size="{ minRows: 4, maxRows: 5 }"
              />
            </a-form-item>
          </div>
          <!-- -------------------------------------------------- -->
          <div class="d-flex justify-content-end">
            <button class="btns c-delete me-1">
              <i class="mdi mdi-trash-can font-size-14 align-middle me-1"></i
              >{{ $t("Remove") }}
            </button>
            <button class="btns c-save" type="submit">
              <i
                class="mdi mdi-content-save font-size-14 align-middle me-1"
              ></i>
              {{ $t("Save") }}
            </button>
          </div>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script>

import { reactive } from "vue";
import { allDate, allTables } from "../../data";
export default {
  setup() {
    const formCreateQualification = reactive({
      groupName: "",
      nameTrainingPlan: undefined,
      educationLang: undefined,
      textarea__special: undefined,
    });
    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return {
      formCreateQualification,
      onFinish,
      onFinishFailed,
      allDate,
      allTables,
    };
  },
  components: {
    
    // AvatarInput,
  },
};
</script>

<style lang="scss">
</style>





