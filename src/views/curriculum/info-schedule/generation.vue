<template>
  <div pagetitle="'Malaka oshirish'" class="generationPage">
    <!-----------START PAGE LIST HEADER TOP ------------------------>
    <div class="card panel-header-bg">
      <div class="card-body">
        <div class="panel-header">
          <h5 class="card-title">
            <router-link to="/curriculum/info-schedule/schedule"
              >{{ $t("Curriculum_Schedule") }}
            </router-link>
            /
            {{ $t("Curriculum_Schedule_enerate_Weekly") }}
          </h5>
          <div class="panel-toggles">
            <router-link to="/curriculum/info-schedule/schedule"
              ><button class="btns black-c py-1.5 px-4" type="submit">
                <i
                  class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"
                ></i
                >{{ $t("Back") }}
              </button></router-link
            >
          </div>
        </div>
      </div>
    </div>
    <!--------------------------------------->

    <div class="row">
      <div class="col-xl-8">
        <div class="card">
          <div class="card-body">
            <div class="table-responsive">
              <table class="content-table">
                <thead>
                  <tr class="table-row">
                    <th>{{ $t("Week_position") }}</th>
                    <th>{{ $t("Week") }}</th>
                    <th>{{ $t("Semester_Name") }}</th>
                    <th>{{ $t("Count_lesson") }}</th>
                    <th>{{ $t("Download") }}</th>
                    <th></th>
                    <th>
                      <a-checkbox v-model:checked1="checked"></a-checkbox>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="table-row"
                    v-for="element in allTables.optionsWeekTempelate"
                    :key="element.id"
                  >
                    <td>{{ element.weekPsition }}</td>
                    <td>
                      {{ element.week }}
                    </td>
                    <td>
                      {{ element.semester }}
                    </td>
                    <td>
                      {{ element.countLesson }}
                    </td>
                    <td>
                      <a class="text-bluee" type="danger">
                        <i class="fas fa-download"></i
                      ></a>
                    </td>
                    <td class="gridjs-td">
                      <ul class="list-inline mb-0">
                        <li class="list-inline-item">
                          <div class="delete__project">
                            <a class="text-danger" type="danger" @click="cancel"
                              ><i class="mdi mdi-delete font-size-18"></i
                            ></a>
                          </div>
                        </li>
                      </ul>
                    </td>
                    <td>
                      <a-checkbox v-model:checked1="checked"></a-checkbox>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-4">
        <div class="card">
          <div class="card-body">
            <a-form-item class="mb-3" name="nameFaculty">
              <label for="division-name-select" class="form-label">{{
                $t("Template_Week")
              }}</label>
              <a-select
                v-model:value="value"
                :options="allDate.optionsWeeksDete"
                style="width: 100%; border-radius: 10px !important"
                @change="handleChange"
                :placeholder="$t('Choose')"
              >
              </a-select>
            </a-form-item>

            <div class="d-flex justify-content-end">
              <button class="btns c-save" type="submit">
                <i class="mdi mdi-check font-size-14 align-middle me-1"></i
                >{{ $t("academic_Mobile") }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { allDate, allTables } from "../../data";
import Swal from "sweetalert2";

export default {
  setup() {
    // ------------delete modal oyna--------------------
    function cancel() {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-danger me-2",
          cancelButton: "btn btn-success",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Aminmisiz?",
          text: "Siz buni qaytara olmaysiz!",
          icon: "warning",
          confirmButtonText: "Ha, o'chirish!",
          cancelButtonText: "Yo'q, bekor qilish!",
          showCancelButton: true,
        })
        .then((result) => {
          if (result.value) {
            swalWithBootstrapButtons.fire(
              "O'chirildi!",
              "Xaftalikni o'chirish muvaffaqiyatli amalga oshirildi!",
              "success"
            );
          }
        });
    }
    const filterOption = (input, option) => {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };
    return {
      cancel,
      current: ref(1),
      filterOption,
      allDate,
      allTables,
    };
  },
  components: {},
};
</script>

<style lang="scss">
.generationPage {
  .table-row {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 120px auto 100px 100px 100px 50px 50px;
    @media (max-width: 767px) {
      grid-template-columns: 100px 200px 100px 100px 100px 50px 50px;
    }
    th,
    td {
      &:nth-child(1) {
        justify-content: start;
      }
      &:nth-last-child(3) {
        justify-content: center;
      }
    }
  }
}
.modal-data-tip {
  background-color: #dee2e6;
  padding: 10px;
}
</style>
