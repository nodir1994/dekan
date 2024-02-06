<script setup lang="ts">
  import type { EmployeeInterface } from "@/utils/interfaces";

  const props = defineProps<{
    employeeData: EmployeeInterface;
  }>();
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-md-3">
          <img
            class="img-thumbnail"
            alt="200x200"
            :src="employeeData.image"
            data-holder-rendered="true"
          />
        </div>
        <div class="col-md-9">
          <div class="table-responsive">
            <table class="table-vertical">
              <tr class="table-row-infoEmployee">
                <th><strong>ID</strong></th>
                <td>{{ employeeData.id }}</td>
              </tr>
              <tr class="table-row-infoEmployee">
                <th>
                  <strong>{{ $t("Name") }}</strong>
                </th>
                <td>{{ employeeData.name }}</td>
              </tr>
              <tr class="table-row-infoEmployee">
                <th>
                  <strong>{{ $t("Surname") }}</strong>
                </th>
                <td>{{ employeeData.surname }}</td>
              </tr>
              <tr class="table-row-infoEmployee">
                <th>
                  <strong>{{ $t("Patronymic") }}</strong>
                </th>
                <td>{{ employeeData.patronymic }}</td>
              </tr>
              <tr class="table-row-infoEmployee">
                <th>
                  <strong>{{ $t("Birthdate") }}</strong>
                </th>
                <td>{{ employeeData.birthdate }}</td>
              </tr>
              <tr class="table-row-infoEmployee">
                <th>
                  <strong>{{ $t("Passport_number") }}</strong>
                </th>
                <td>{{ employeeData.passport_number }}</td>
              </tr>
              <tr class="table-row-infoEmployee">
                <th>
                  <strong>{{ $t("jshshir_kod") }}</strong>
                </th>
                <td>{{ employeeData.pinfl }}</td>
              </tr>
              <tr class="table-row-infoEmployee">
                <th>
                  <strong>{{ $t("Specialty") }}</strong>
                </th>
                <td>{{ employeeData.speciality }}</td>
              </tr>
              <tr class="table-row-infoEmployee">
                <th>
                  <strong>{{ $t("Academic_degree") }}</strong>
                </th>
                <td>{{ employeeData.academic_title_id }}</td>
              </tr>
              <tr class="table-row-infoEmployee">
                <th>
                  <strong>{{ $t("Academic_title") }}</strong>
                </th>
                <td>{{ employeeData.academic_degree_id }}</td>
              </tr>
              <tr class="table-row-infoEmployee">
                <th>
                  <strong>{{ $t("Role") }}</strong>
                </th>
                <td>{{ employeeData.role }}</td>
              </tr>
              <tr class="table-row-infoEmployee">
                <th>
                  <strong>{{ $t("Created_at") }}</strong>
                </th>
                <td>{{ employeeData.created_at }}</td>
              </tr>
              <tr class="table-row-infoEmployee">
                <th>
                  <strong>{{ $t("Updated_at") }}</strong>
                </th>
                <td>{{ employeeData.updated_at }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <!-- ------------------end xodim ma'lumotlari------------------ -->
  </div>
</template>
