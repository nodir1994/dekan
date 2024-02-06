<template>
  <div pagetitle="'Kordinator'" class="career_block">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title py-2">{{ $t("points") }}</h5>
          <div class="panel-toggles">
            <div class="filterBlock"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-6">
        <TableCareerPoints
          :is-loading="isLoading"
          :table-data="{
            name: $t('state_award'),
            data: apiData.state_award,
          }"
          @updateElelemntValue="updateElelemntValues"
        />
        <TableCareerPoints
          :is-loading="isLoading"
          :table-data="{
            name: $t('reactions'),
            data: apiData.action,
          }"
          @updateElelemntValue="updateElelemntValues"
        />
      </div>
      <div class="col-xl-6">
        <TableCareerPoints
          :is-loading="isLoading"
          :table-data="{
            name: $t('state_scholarship'),
            data: apiData.state_scholarship,
          }"
          @updateElelemntValue="updateElelemntValues"
        />
        <TableCareerPoints
          :is-loading="isLoading"
          :table-data="{
            name: $t('scientific_career'),
            data: apiData.scientific_career,
          }"
          @updateElelemntValue="updateElelemntValues"
        />
        <TableCareerPoints
          :is-loading="isLoading"
          :table-data="{
            name: $t('Additional'),
            data: apiData.additional,
          }"
          @updateElelemntValue="updateElelemntValues"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useNotyf } from "@/composable/useNotyf";
import { useI18n } from "vue-i18n";
// api functions
import { list, update } from "@/utils/api/careers";
import TableCareerPoints from "@/components/tables/TableCareerPoints.vue";

const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);
const apiData = reactive({
  additional: [],
  scientific_career: [],
  state_scholarship: [],
  state_award: [],
  action: [],
});

fetchList();
async function fetchList() {
  isLoading.value = true;
  apiData.additional = [];
  apiData.scientific_career = [];
  apiData.state_scholarship = [];
  apiData.state_award = [];
  apiData.action = [];
  let val = await list();
  val.result.forEach((element) => {
    if (element.reward_type?.code === "additional")
      apiData.additional.push(element);
    if (element.reward_type?.code === "scientific-career")
      apiData.scientific_career.push(element);
    if (element.reward_type?.code === "state-scholarship")
      apiData.state_scholarship.push(element);
    if (element.reward_type?.code === "state-award")
      apiData.state_award.push(element);
    if (element.reward_type?.code === "action") apiData.action.push(element);
  });
  console.log("sasas", apiData);

  isLoading.value = false;
}

async function updateElelemntValues(elementData: any) {
  try {
    isLoading.value = true;
    await update(elementData.id, {
      name: elementData.name,
      reward_type_id: elementData.reward_type?.id,
      status: elementData.status,
      value: elementData.value,
      _method: "PUT",
    });
    await fetchList();
    notif.success(t("Data_stored_successfully"));
  } catch (error: any) {
    notif.error(t("Request_failed1"));
  } finally {
    isLoading.value = false;
  }
}
</script>

<style lang="scss">
.career_block {
  .table-row-career {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 40px auto 80px 120px;

    @include mobile() {
      grid-template-columns: 40px auto 80px 120px;
    }
  }

  input {
    max-width: 100%;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 5px;
    outline: none;
    text-align: center;

    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  .c-save {
    border-radius: 6px;
    padding: 5px;

    &:hover {
      color: #fff;
    }
  }

  .mb-6 {
    margin-bottom: 35px;
  }
}
</style>
