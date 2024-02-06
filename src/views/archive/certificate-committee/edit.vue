<template>
  <div pagetitle="`Aylanma varaqa`" class="createDAKPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/archive/certificate-committee"
              >{{ $t("DAK_results") }} /
            </router-link>
            {{ $t("Edit") }}
          </h5>
          <div class="panel-toggles">
            <router-link
              to="/archive/certificate-committee"
              class="btns black-c py-1.5 px-4"
            >
              <i
                class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"
              ></i
              >{{ $t("Back") }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-----------END PAGE LIST HEADER TOP ------------------------>

    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card">
      <div class="card-body">
        <ArchiveDakFormList :form="form" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { dakById } from "@/utils/api/additional";
import { reactive } from "vue";
import ArchiveDakFormList from "@/components/forms/ArchiveDakFormList.vue";
const form = reactive({});
const route: any = useRoute();
let res = await dakById(route.params?.id).then((res) => res.result);
Object.assign(form, res);
</script>

<style lang="scss"></style>
