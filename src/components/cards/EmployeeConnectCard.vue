<script setup lang="ts">
  import type { EmployeeInterface } from "@/utils/interfaces";
  import { ref } from "vue";

  const props = defineProps<{
    employeeData: EmployeeInterface;
  }>();

  const isLoading = ref(false);
  const optionsEmployeeType = ref([]);
  const optionsTeacher = ref([]);
  const optionsPosition = ref([]);
  const optionsPositionTeacher = ref([]);
  const optionsDepartment = ref([]);
  const optionsTeacherType = ref([]);
  const optionsCocktailForm = ref([]);
  const optionsRate = ref([]);
  //xodim ishlari
  const tableDepartmentEmployee = [
    {
      id: 1,
      department: "Umumiy pedagogika",
      employmentStaff: "1,00 stavka",
      position: "Dotsent",
      employeeStatus: "Ishlamoqda",
    },
    {
      id: 2,
      department: "Umumiy pedagogika",
      employmentStaff: "0,25 stavka",
      position: "Dotsent",
      employeeStatus: "Bo‘shagan",
    },
    {
      id: 3,
      department: "Qo'shma ta'lim",
      employmentStaff: "0,25 stavka",
      position: "Stajer-o‘qituvchi",
      employeeStatus: "Bo‘shagan",
    },
  ];

  function clearFields() {}
</script>

<template>
  <div class="row">
    <div class="col-md-6">
      <div class="card">
        <!-- Nav tabs -->
        <div class="tab-department-division">
          <ul
            class="nav nav-tabs nav-tabs-custom nav-justified tab-department-division"
            role="tablist"
          >
            <li class="nav-item">
              <a
                class="nav-link active"
                data-bs-toggle="tab"
                href="#home-1"
                role="tab"
              >
                <i class="mdi mdi-plus me-2"></i>Bo'linma
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link"
                data-bs-toggle="tab"
                href="#profile-1"
                role="tab"
              >
                <i class="mdi mdi-plus me-2"></i>Kafedra
              </a>
            </li>
          </ul>
        </div>

        <!-- Tab panes -->
        <div class="card-body">
          <div class="tab-content text-muted">
            <div class="tab-pane active" id="home-1" role="tabpanel">
              <a-form>
                <div class="row">
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label">{{
                      $t("Employee")
                    }}</label>
                    <a-select
                      v-model:value="employeeData.type"
                      :options="optionsEmployeeType"
                    >
                    </a-select>
                  </div>
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label">
                      {{ $t("Position") }}
                    </label>
                    <a-select :options="optionsPosition"> </a-select>
                  </div>
                </div>
                <!-- -------------------------------------------------- -->

                <div class="row">
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label">
                      {{ $t("Department") }}
                    </label>
                    <a-select :options="optionsDepartment"> </a-select>
                  </div>
                  <div class="mb-3">
                    <label for="division-name-select" class="form-label">
                      {{ $t("Employee_type") }}
                    </label>
                    <a-select :options="optionsCocktailForm"> </a-select>
                  </div>
                </div>
                <!-- ------------------------------------------------------------ -->

                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="division-name-select" class="form-label">
                        {{ $t("Job_type") }}
                      </label>
                      <a-select
                        :options="optionsPosition"
                        style="width: 100%; border-radius: 10px !important"
                      >
                      </a-select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="division-name-select" class="form-label">
                        {{ $t("Rate") }}
                      </label>
                      <a-select
                        :options="optionsRate"
                        style="width: 100%; border-radius: 10px !important"
                      >
                      </a-select>
                    </div>
                  </div>
                </div>

                <!-- ------------------------------------------------------------- -->

                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="division-name-input" class="form-label">
                        {{ $t("Contract_number") }}
                      </label>
                      <a-input />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="division-name-input" class="form-label">
                        {{ $t("Contract_date") }}
                      </label>
                      <a-date-picker
                        placeholder="YYYY-MM-DD"
                        v-model:value="employeeData.contract_date"
                        value-format="YYYY-MM-DD"
                      />
                    </div>
                  </div>
                </div>
                <!-- ----------------------------------------- -->

                <div class="row">
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="division-name-input" class="form-label">
                        {{ $t("") }}
                      </label>
                      <a-input />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="mb-3">
                      <label for="division-name-input" class="form-label">
                        {{ $t("Order_number") }}
                      </label>
                      <a-date-picker
                        placeholder="YYYY-MM-DD"
                        v-model:value="employeeData.order_number"
                        value-format="YYYY-MM-DD"
                      />
                    </div>
                  </div>
                </div>
                <!-- ------------------------------------------------ -->
                <div class="d-flex justify-content-end">
                  <button
                    type="button"
                    class="btns c-delete me-1"
                    @click="clearFields"
                  >
                    {{ $t("Clear") }}
                  </button>
                  <SubmitButton :loading="isLoading" />
                </div>
              </a-form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <div class="table-responsive">
            <table class="content-table">
              <thead>
                <tr class="table-row-employee-department">
                  <th><b>#</b></th>
                  <th><b>Kafedra / Bo'lim</b></th>
                  <th><b>Stavka</b></th>
                  <th><b>Lavozim</b></th>
                  <th><b>Status</b></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  class="table-row-employee-department"
                  v-for="element in tableDepartmentEmployee"
                  :key="element.id"
                >
                  <td>{{ element.id }}</td>
                  <td>{{ element.department }}</td>
                  <td>{{ element.employmentStaff }}</td>
                  <td>{{ element.position }}</td>
                  <td>{{ element.employeeStatus }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
