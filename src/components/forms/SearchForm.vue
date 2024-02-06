<script setup lang="ts">
  //
</script>

<template>
  <a-form class="row" @finish="onSearch">
    <a-form-item class="my-2 col-xl-5 form--item">
      <a-space>
        <a-select
          v-model:value="searchForm.selectedFaculty"
          :options="facultyOptions"
        >
        </a-select>
      </a-space>
      <label for="yu">{{ $t("Select_faculty") }}</label>
    </a-form-item>
    <a-form-item class="my-2 col-xl-5 form--item">
      <a-input id="yu" class="form-control" />
      <label for="yu">{{ $t("Search_by_name") }}</label>
    </a-form-item>
    <div class="my-2 col-xl-2">
      <button class="btn-search search-color" type="submit">
        <i class="mdi mdi-magnifying-glass me-2"></i>
        {{ $t("Search") }}
      </button>
    </div>
  </a-form>
</template>
