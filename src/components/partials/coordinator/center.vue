<template>
  <div class="coordinator-center">
    <div class="table-responsive table-statistical">
      <table>
        <thead>
          <tr>
            <th rowspan="3" class="fixed-table" style="min-width: 40px">№</th>
            <th rowspan="3" style="min-width: 300px" class="fixed-table tr2">
              {{ $t("Student_Full_name") }}
            </th>
            <th rowspan="3" style="min-width: 40px" class="fixed-table tr3">
              {{ $t("Does_the_student_have_a_telegram") }}
            </th>

            <th
              style="text-align: left; padding-left: 30px"
              :colspan="props.date2.dates?.length * 5"
            >
              {{ $t("Student_attendance") }}
            </th>
          </tr>
          <tr>
            <th
              style="text-align: left; padding-left: 30px"
              :colspan="props.date2.dates.length * 5"
            >
              {{ $t("The_date") }}
            </th>
          </tr>

          <tr>
            <th
              style="width: 100px !important"
              class="font-size-14"
              v-for="el in props.date2.dates"
              :key="el"
            >
              {{ el.date }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(student, idD) in props.date2?.extramural_students"
            :key="idD"
          >
            <td class="fixed-table">
              {{ idD + 1 }}
            </td>
            <td style="text-align: start" class="fixed-table tr2">
              {{ student.fullname }}
            </td>
            <td class="fixed-table tr3">
              {{ student.telegram_group }}
            </td>
            <!-- <td class="fixed-table tr4">
              {{ student.student_called_session }}
            </td> -->
            <template
              v-for="item in student?.session_attendances"
              :key="item"
              :rowspan="props.date2?.session_attendances.length"
            >
              <td>
                {{ item.is_coming }}
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  date2: {},
});
</script>

<style lang="scss">
.coordinator-center {
  .table-statistical {
    .fixed-table {
      position: -webkit-sticky;
      position: sticky;
      left: 0px;
      background-color: #fff;
      border: 0;
      z-index: 2;
      width: 200px;
      &:after {
        content: "";
        position: absolute;
        left: 1px;
        right: 1px;
        bottom: 1px;
        top: 1px;
        border: 1px solid #dee2e6;
      }
    }
    .tr2 {
      left: 40px !important;
    }
    .tr3 {
      left: 340px !important;
    }
    .tr4 {
      left: 439px !important;
    }
  }
  .table-row {
    grid-template-columns: 40px auto 150px 100px;
    @include mobile() {
      grid-template-columns: 40px 200px 150px 100px;
    }
    th,
    td {
      &:nth-last-child(1) {
        justify-content: start;
      }
    }
  }
  .table-row-sub {
    grid-template-columns: 110px auto;
    @include mobile() {
      grid-template-columns: 120px auto !important;
    }
  }
}
</style>
