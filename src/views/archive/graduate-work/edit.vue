<template>
  <div pagetitle="`Aylanma varaqa`" class="createDAKPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/archive/graduate-work"
            >{{ $t('archive_Graduate_Work') }} /
            </router-link>
            {{ $t('add') }}
          </h5>
          <div class="panel-toggles">
            <router-link
                to="/archive/graduate-work"
                class="btns black-c py-1.5 px-4">
              <i class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"></i>
              {{ $t("Back") }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-----------END PAGE LIST HEADER TOP ------------------------>

    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card">
      <div class="card-body">
        <DefenceThemeForm :form="form"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DefenceThemeForm from "@/components/forms/DefenceThemeForm.vue";
import {useRoute} from "vue-router";
import {defenseById} from "@/utils/api/archive/bmi";

const route = useRoute();
const form = await defenseById(route.params?.id).then(res => res.result);

</script>

<style lang="scss"></style>
