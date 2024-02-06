<script setup lang="ts">
  import type {
    EmployeeInterface,
    EmployeeRoleInterface,
  } from "@/utils/interfaces";
  import { ref } from "vue";

  const props = defineProps<{
    employeeData: EmployeeInterface;
  }>();

  const isLoading = ref(false);
  const employeeStatuses = ref([]);
  const optionsLanguage = ref([]);
  const userRoles = ref<EmployeeRoleInterface[]>([]);

  async function clearFields() {
    // Object.getOwnPropertyNames(formState).forEach((prop) => {
    //   formState[prop] = "";
    // });
  }
</script>

<template>
  <div class="row">
    <div class="col-xl-7">
      <div class="card">
        <div class="card-body">
          <a-form>
            <div class="row">
              <div class="col-md-4">
                <AvatarInput />
              </div>
              <div class="col-md-8">
                <div class="mb-3">
                  <label for="division-name-input" class="form-label">
                    {{ $t("Login") }}
                  </label>
                  <a-input />
                </div>
                <div class="mb-3">
                  <label for="division-name-input" class="form-label">
                    {{ $t("Fullname") }}
                  </label>
                  <a-input />
                </div>
                <div class="mb-3">
                  <label for="division-name-input" class="form-label">
                    {{ $t("Email") }}
                  </label>
                  <a-input />
                </div>
                <div class="mb-3">
                  <label for="otm-name-input" class="form-label">
                    {{ $t("Contact") }}
                  </label>
                  <a-input
                    class="select"
                    tupe="tel"
                    v-model:value="employeeData.phone"
                    placeholder="+998## ###-##-##"
                    v-maska="['+998## ###-##-##', '+998## ###-##-##']"
                  />
                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="division-name-select" class="form-label">
                        {{ $t("Status") }}
                      </label>
                      <a-select
                        v-model:value="employeeData.status"
                        :options="employeeStatuses"
                      >
                      </a-select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="division-name-select" class="form-label">
                        {{ $t("Language") }}
                      </label>
                      <a-select
                        v-model:value="employeeData.language"
                        :options="optionsLanguage"
                      >
                      </a-select>
                    </div>
                  </div>
                </div>
                <div class="mb-3">
                  <label for="division-name-input" class="form-label">
                    <a-checkbox class="me-2" />
                    {{ $t("Change_password") }}
                  </label>
                  <a-input-password
                    :disabled="true"
                    :placeholder="$t('Enter_password')"
                  />
                </div>
                <div class="mb-3">
                  <label for="division-name-input" class="form-label">
                    {{ $t("Confirm_password") }}
                  </label>
                  <a-input-password
                    :disabled="true"
                    :placeholder="$t('Confirm_password')"
                  />
                </div>
              </div>
              <div class="d-flex justify-content-end">
                <button
                  type="button"
                  class="btns c-cancel me-1"
                  data-bs-dismiss="modal"
                >
                  {{ $t("Close") }}
                </button>
                <button
                  type="button"
                  class="btns c-delete me-1"
                  @click="clearFields"
                >
                  {{ $t("Clear") }}
                </button>
                <SubmitButton :loading="isLoading" />
              </div>
            </div>
          </a-form>
        </div>
      </div>
    </div>
    <div class="col-xl-5">
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="content-table">
              <thead>
                <tr class="table-row-user-roles">
                  <th>
                    <b>{{ $t("Name") }}</b>
                  </th>
                  <th>
                    <b>{{ $t("Code") }}</b>
                  </th>
                  <th>
                    <b>{{ $t("Active") }}</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="table-row-user-roles"
                  v-for="element in userRoles"
                  :key="element.id"
                >
                  <td>{{ element.name }}</td>
                  <td>{{ element.code }}</td>
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
            <!-- -----------------end-pagenation--------------------- -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .ant-select {
    width: 100%;
    border-radius: 10px !important;
  }
</style>
