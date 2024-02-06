<template>
    <div pagetitle="`Akademik ma'lumotnoma yaratish`" class="createStudentPage adf">
        <!-----------START PAGE LIST HEADER TOP ------------------------>
        <div class="card panel-header-bg">
            <div class="card-body">
                <div class="panel-header">
                    <h5 class="card-title">
                        <router-link to="/archive/academic-reference">
                            Akademik ma'lumotnoma /
                        </router-link>
                        Akademik ma'lumotnoma yaratish
                    </h5>
                    <div class="panel-toggles">
                        <router-link to="/archive/academic-reference/create"
                            class="btns black-c py-1.5 px-4 d-inline-block">
                            <i class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"></i>{{ $t("Prev") }}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <!-----------END PAGE LIST HEADER TOP ------------------------>
        <div class="card">
            <div class="card-body">
                <a-form :model="formCreateStudent" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
                    <h5 class="modal-title modal-data-tip mb-2">Talaba ma'lumotlari</h5>
                    <div class="row">
                        <div class="col-md-4">
                            <a-form-item>
                                <label for="">Familiya</label>
                                <a-input></a-input>
                            </a-form-item>
                        </div>
                        <div class="col-md-4">
                            <a-form-item>
                                <label for="">Ismi</label>
                                <a-input></a-input>
                            </a-form-item>
                        </div>
                        <div class="col-md-4">
                            <a-form-item>
                                <label for="">Otasining ismi</label>
                                <a-input></a-input>
                            </a-form-item>
                        </div>
                        <div class="col-md-4">
                            <a-form-item>
                                <label for="">Talaba tug'ilgan sanasi</label>
                                <a-date-picker placeholder="YYYY-MM-DD" type="date" value-format="YYYY-MM-DD" />
                            </a-form-item>
                        </div>
                        <div class="col-md-4">
                            <a-form-item>
                                <label for="">Guruh nomi</label>
                                <a-input></a-input>
                            </a-form-item>
                        </div>
                    </div>
                    <h5 class="modal-title modal-data-tip mb-2">OTM ma'lumotlari</h5>
                    <div class="row">
                        <div class="col-md-6">
                            <a-form-item>
                                <label for="">OTM nomi</label>
                                <a-input></a-input>
                            </a-form-item>
                            <div class="row">
                                <div class="col-sm-6">
                                    <a-form-item>
                                        <label for="">O'qish boshlanish sanasi (hozirgi OTM)</label>
                                        <a-date-picker placeholder="YYYY-MM-DD" type="date" value-format="YYYY-MM-DD" />
                                    </a-form-item>
                                </div>
                                <div class="col-sm-6">
                                    <a-form-item>
                                        <label for="">O'qish tugash sanasi (hozirgi OTM)</label>
                                        <a-date-picker placeholder="YYYY-MM-DD" type="date" value-format="YYYY-MM-DD" />
                                    </a-form-item>
                                </div>
                            </div>
                            <a-form-item>
                                <label for="">Rektor F.I.SH.</label>
                                <a-input></a-input>
                            </a-form-item>
                            <a-form-item>
                                <label for="">Kotib(a) F.I.SH.</label>
                                <a-input></a-input>
                            </a-form-item>
                            <a-form-item>
                                <label for="">Hozirgi OTM dagi ta'lim shakli</label>
                                <a-input></a-input>
                            </a-form-item>
                        </div>
                        <div class="col-md-6">
                            <a-form-item>
                                <label for="">Fakultet nomi</label>
                                <a-input></a-input>
                            </a-form-item>
                            <a-form-item>
                                <label for="">Dekan F.I.SH.</label>
                                <a-input></a-input>
                            </a-form-item>
                            <a-form-item>
                                <label for="">O'qishni ko'chirib kelgan OTM nomi</label>
                                <a-input></a-input>
                            </a-form-item>
                            <div class="row">
                                <div class="col-sm-6">
                                    <a-form-item>
                                        <label for="">O'qish boshlanish sanasi (Oldingi OTM)</label>
                                        <a-date-picker placeholder="YYYY-MM-DD" type="date" value-format="YYYY-MM-DD" />
                                    </a-form-item>
                                </div>
                                <div class="col-sm-6">
                                    <a-form-item>
                                        <label for="">O'qish tugash sanasi (Oldingi OTM)</label>
                                        <a-date-picker placeholder="YYYY-MM-DD" type="date" value-format="YYYY-MM-DD" />
                                    </a-form-item>
                                </div>
                            </div>
                            <a-form-item>
                                <label for="">O'qish ko'chirilgan OTM dagi ta'lim shakli</label>
                                <a-input></a-input>
                            </a-form-item>
                        </div>

                    </div>
                    <h5 class="modal-title modal-data-tip mb-2">Ta'lim ma'lumotlari</h5>
                    <div class="row">
                        <div class="col-md-3">
                            <a-form-item>
                                <label for="">Shifr</label>
                                <a-input></a-input>
                            </a-form-item>
                        </div>
                        <div class="col-md-4">
                            <a-form-item>
                                <label for="">Mutaxassislik nomi</label>
                                <a-input></a-input>
                            </a-form-item>
                        </div>
                        <div class="col-md-5">
                            <a-form-item>
                                <label for="">Avvalgi ta'lim</label>
                                <a-input></a-input>
                            </a-form-item>
                        </div>
                        <div class="col-md-3">
                            <a-form-item>
                                <label for="">Chetlashtirish buyrug'i</label>
                                <a-select></a-select>
                            </a-form-item>
                        </div>
                        <div class="col-md-3">
                            <a-form-item>
                                <label for="">Chetlashtirish sababi</label>
                                <a-select></a-select>
                            </a-form-item>
                        </div>
                        <div class="col-md-3">
                            <a-form-item>
                                <label for="">To'plagan ball</label>
                                <a-input></a-input>
                            </a-form-item>
                        </div>
                        <div class="col-md-3">
                            <a-form-item>
                                <label for="">O'tish bali</label>
                                <a-input></a-input>
                            </a-form-item>
                        </div>

                    </div>
                    <h5 class="modal-title modal-data-tip mb-2">Akademik ma'lumotnoma parametrlari</h5>
                    <div class="row">
                        <div class="col-md-3">
                            <a-form-item>
                                <label for="">Diplom berilgan joy</label>
                                <a-input></a-input>
                            </a-form-item>
                        </div>
                        <div class="col-md-3">
                            <a-form-item>
                                <label for="">Blank raqami</label>
                                <a-input></a-input>
                            </a-form-item>
                        </div>
                        <div class="col-md-3">
                            <a-form-item>
                                <label for="">Qayd raqami</label>
                                <a-input></a-input>
                            </a-form-item>
                        </div>
                        <div class="col-md-3">
                            <a-form-item>
                                <label for="">Qayd sanasi</label>
                                <a-date-picker placeholder="YYYY-MM-DD" type="date" value-format="YYYY-MM-DD" />
                            </a-form-item>
                        </div>
                        <div class="col-md-3 offset-md-9">
                            <a-form-item class="mb-6" name="nameSpecial" :rules="[
                              {
                                required: false,
                                message: `Semestr bo'sh bolishi mumkin emas!`,
                              },
                            ]">
                                <label for="division-name-select" class="form-label"><b
                                        style="color: green">Semestr</b></label>
                                <a-select :options="allDate.optionsSemestr"
                                    style="width: 100%; border-radius: 10px !important" :placeholder="t('Choose_Semester')">
                                </a-select>
                            </a-form-item>
                        </div>
                    </div>
                    <div class="top__system__raiting">
                        <h5 class="modal-title modal-data-tip mb-2">
                            <b>Fanlar ro'yhati</b>
                            <span>* 5 baholik baholash tizimi</span>
                        </h5>
                    </div>
            <div class="table-responsive">

                    <table class="content-table mb-3">
                        <thead>
                            <tr class="table-row-acamemic-reference-id">
                                <th>
                                    <a-checkbox></a-checkbox>
                                </th>
                                <th>#</th>
                                <th>{{$t('Subjects')}}</th>
                                <th>{{$t('Semester_Name')}}</th>
                                <th>{{ $t('Total_Acload') }}</th>
                                <th>{{ $t('Credit') }}</th>
                                <th>{{$t('Score')}}</th>
                                <th>{{ $t('gradeSome') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="table-row-acamemic-reference-id" v-for="element in allTables.tableStudents"
                                :key="element.id">
                                <td>
                                    <a-checkbox></a-checkbox>
                                </td>
                                <td>{{ element.id }}</td>
                                <td>
                                    {{ element.specialitys }}</td>
                                <td>
                                    {{ element.semestr }} </td>

                                <td>
                                    100
                                </td>
                                <td>{{ element.id * 10 }}</td>
                                <td>{{ element.id * 10 + 6 }}</td>
                                <td>{{element.id%5}}</td>

                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <div class="d-flex justify-content-end">
                        <button class="btns c-save" type="submit">
              <i class="mdi mdi-content-save font-size-14 align-middle me-1"></i>
              {{ $t("Save") }}
            </button>
                    </div>
                </a-form>
            </div>
        </div>
    </div>
</template>
  
<script>

import { allDate, allTables } from "../../data";

export default {
    setup() {

        // --------------form-------------------------
        return {
            allDate: allDate,
            allTables
            //--------------------------
        };
    },
    components: {
        
    },
    methods: {

    },
};
</script>
  
<style lang="scss">
.createStudentPage.adf {
    .modal-data-tip {
        background-color: #dee2e6;
        padding: 10px;
    }
}

.table-row-acamemic-reference-id {
    display: grid;
    grid-template-columns: 40px 50px auto 150px 140px 120px 70px 60px;
}

.top__system__raiting {
    h5 {
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
            @include mobile {
                font-size: 12px;
            }
        }
    }
}
</style>