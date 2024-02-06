
<template>
    <div pagetitle="`Akademik ma'lumotnoma`" class="diploma-list">
        <!-----------START PAGE LIST HEADER TOP ------------------------>
        <div class="card panel-header-bg">
            <div class="card-body">
                <div class="panel-header">
                    <h5 class="card-title">
                        <router-link to="/archive/academic-reference">Akademik ma'lumotnoma</router-link> / Akademik
                        ma'lumotnoma qo'shish
                    </h5>
                    <div class="panel-toggles">
                        <div class="filterBlock">
                            <router-link to="/archive/academic-reference"
                                class="btns black-c py-1.5 px-4 me-2 d-inline-block">
                                <i class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"></i>{{ $t("Prev") }}
                            </router-link>
                            <button v-b-toggle.collapse-3 class="btns c-filter py-1.5 px-4">
                                <i class="mdi mdi-filter font-size-14 align-middle me-1"></i>{{ $t("Filter") }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-----------END PAGE LIST HEADER TOP ------------------------>

        <!-----------START FILTERS ------------------------>
        <div class="collapse__block">
            <b-collapse visible id="collapse-3">
                <b-card>
                    <div class="row">
                        <!-- //o'Fakultetni tanlang  -->
                        <div class="my-2 col-xl-4 form--item">
                            <a-space>
                                <a-select v-model:value="value" :options="allDate.optionsFaculty"
                                    @change="handleChange">
                                </a-select>
                            </a-space>
                            <label for="yu">{{ $t("Choose_faculty") }}</label>
                        </div>
                        <!-- //Ta'lim turi  -->
                        <div class="my-2 col-xl-4 form--item">
                            <a-space>
                                <a-select v-model:value="value" :options="allDate.optionsEducationType"
                                    @change="handleChange">
                                </a-select>
                            </a-space>
                            <label for="yu">{{ $t("Choose_Education_Type") }}</label>
                        </div>

                        <!-- //Ta'lim shakli  -->
                        <div class="my-2 col-xl-4 form--item">
                            <a-space>
                                <a-select v-model:value="value" :options="allDate.optionsEducationForm"
                                    @change="handleChange">
                                </a-select>
                            </a-space>
                            <label>{{$t('Choose_Education_Form')}}</label>
                        </div>

                        <!-- //o'quv reja  -->
                        <div class="my-2 col-xl-4 form--item">
                            <a-space>
                                <a-select v-model:value="value" :options="allDate.optionsTrainingPlan"
                                    @change="handleChange">
                                </a-select>
                            </a-space>
                            <label for="yu">{{ $t("Choose_Curriculum") }}</label>
                        </div>

                        <!-- //Guruhni tanlang  -->
                        <div class="my-2 col-xl-4 form--item">
                            <a-space>
                                <a-select class="form--item" v-model:value="value" show-search
                                    :options="allDate.optionsGroup" :filter-option="filterOption" @focus="handleFocus"
                                    @blur="handleBlur" @change="handleChange">
                                </a-select>
                            </a-space>
                            <label for="yu">{{$t('Choose_Group')}}</label>
                        </div>
                        <!-- //Mutaxassislik  -->
                        <div class="my-2 col-xl-4 form--item">
                            <a-input id="yu" class="form-control" />
                            <label for="yu">F.I.O / Talaba raqami / Pasport bo'yicha qidirish</label>
                        </div>
                    </div>
                </b-card>
            </b-collapse>
        </div>
        <!-----------END FILTERS ------------------------>

        <!-------START TABLE---------------------------------------->
        <div class="row table-division">
            <div class="col-xl-12">
                <div class="card">
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="content-table">
                                <thead>
                                    <tr class="table-row-academic-reference-create">
                                        <th>#</th>
                                        <th>{{ $t("Student") }}</th>
                                        <th>{{ $t("Education_Type") }}</th>
                                        <th>{{ $t("by_Specialty") }}</th>
                                        <th>{{$t('edu_plan')}}</th>
                                        <th>{{$t('action')}}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="table-row-academic-reference-create"
                                        v-for="element in allTables.tableStudents" :key="element.id">
                                        <td>{{ element.id }}</td>
                                        <td>
                                            <div>{{ element.secondName }} <br />
                                                <span style="color: #ccc;">{{ element.studentId }}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                Bakalavr<br>
                                                <span style="color: #ccc;">{{ element.formOfEducaton }}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                {{ element.specialitys }}<br />
                                                <span style="color: #ccc;">{{ element.groupName }}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                MI(Kunduzgi)_2020-2021<br />
                                                <span style="color: #ccc;">5-baholik baholash tizimi</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="action__td">
                                                <router-link class="btns d-inline-block c-save py-1 px-2 me-2 "
                                                    to="/archive/academic-reference/id">
                                                    <i class="fa fa-plus font-size-12"></i>
                                                    Qo'shish
                                                </router-link>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-------------START PAGINATION-------------->
                            <div class="mt-2">
                                <nav aria-label="...">
                                    <ul class="pagination">
                                        <li class="page-item disabled">
                                            <span class="page-link"><i class="mdi mdi-chevron-left"></i></span>
                                        </li>
                                        <li class="page-item">
                                            <a class="page-link" href="#">1</a>
                                        </li>
                                        <li class="page-item active">
                                            <span class="page-link">
                                                2
                                                <span class="sr-only">(current)</span>
                                            </span>
                                        </li>
                                        <li class="page-item">
                                            <a class="page-link" href="#">3</a>
                                        </li>
                                        <li class="page-item">
                                            <a class="page-link" href="#"><i class="mdi mdi-chevron-right"></i></a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                            <!-------------END PAGINATION-------------->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-------END TABLE---------------------------------------->
    </div>
</template>
  
<script>

import { allDate, allTables } from "../../data";

export default {
    setup() {

        // --------------form-------------------------
        const handleChange = (value) => {
            console.log(`selected ${value}`);
        };

        const handleBlur = () => {
            console.log("blur");
        };

        const handleFocus = () => {
            console.log("focus");
        };

        const filterOption = (input, option) => {
            return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
        };
        return {
            allDate,
            allTables,
            //--------------------------
            filterOption,
            handleBlur,
            handleFocus,
            handleChange,
        };
    },
    components: {
        
    },
};
</script>
    
<style lang="scss">
.table-row-academic-reference-create {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px auto 200px 140px 200px 150px;
}

.c-save {
    &:hover {
        color: #fff;
    }
}
</style>