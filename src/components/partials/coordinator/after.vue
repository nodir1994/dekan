<template>
  <div class="coordinator-after">
    <div class="table-responsive table-statistical">
      <table>
        <thead>
          <tr>
            <th rowspan="3" style="min-width: 50px" class="fixed-table">№</th>
            <th rowspan="3" style="min-width: 300px" class="fixed-table tr2">
              {{ $t("Student_Full_name") }}
            </th>
            <th rowspan="3" style="min-width: 40px" class="fixed-table tr3">
              {{ $t("Does_the_student_have_a_telegram") }}
            </th>

            <th :colspan="props.date1?.subjects.length * 3 + 1">
              {{ $t("student_Sciences") }}
            </th>
          </tr>
          <th
            class="coor-before-odd"
            colspan="3"
            v-for="(supCategory, idSC) in props.date1?.subjects"
            :key="idSC"
          >
            {{ supCategory.name }}
          </th>

          <tr>
            <th v-for="index1 in props.date1?.subjects.length * 3" :key="index1">
              <span v-if="index1 % 3 == 1" style="width: 50px">{{
                $t("Current_control")
              }}</span>
              <span v-if="index1 % 3 == 2" style="min-width: 50px">{{
                $t("Midterm_Examtable")
              }}</span>
              <span v-if="index1 % 3 == 0" style="min-width: 50px">{{
                $t("Final_Examtable")
              }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(student, idD) in props.date1?.extramural_students" :key="idD">
            <td class="fixed-table">
              {{ idD + 1 }}
            </td>
            <td style="text-align: start" class="fixed-table tr2">
              {{ student.fullname }}
            </td>
            <td class="fixed-table tr3">
              {{ student.telegram_group }}
            </td>
            <template v-for="item in student?.session_controls" :key="item" :rowspan="props.date1?.extramural_students.length">
              <td>
                {{ item.current_control }}
              </td>
              <td>
                {{ item.intermediate_control }}
              </td>
              <td>
                {{ item.final_control }}
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
  date1: {}
});
</script>

<style lang="scss">
.coordinator-after {
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
      left: 50px !important;
    }
    .tr3 {
      left: 350px !important;
    }
    .tr4 {
      left: 439px !important;
    }
    .coor-before-odd {
      &:nth-child(odd) {
        background-color: #38a3a5;
        opacity: 0.7;
        color: #fff;
      }
      &:nth-child(even) {
        background: #57cc99;
        color: white;
        opacity: 0.7;
      }
    }
  }
}
</style>
