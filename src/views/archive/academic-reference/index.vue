
<template>
    <div pagetitle="`Akademik ma'lumotnoma`" class="diploma-list">
        <!-----------START PAGE LIST HEADER TOP ------------------------>
        <div class="card panel-header-bg">
            <div class="card-body">
                <div class="panel-header">
                    <h5 class="card-title">Akademik ma'lumotnoma</h5>
                    <div class="panel-toggles">
                        <div class="filterBlock">
                            <router-link to="/archive/academic-reference/create" class="btns d-inline-block c-save py-1.5 px-4 me-3">
                                <i class="mdi mdi-plus font-size-14 align-middle me-1"></i>{{ $t("add") }}
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

                        <!-- //Mutaxassislik  -->
                        <div class="my-2 col-xl-4 form--item">
                            <a-space>
                                <a-select v-model:value="value" :options="allDate.optionsSpecial"
                                    @change="handleChange">
                                </a-select>
                            </a-space>
                            <label for="yu">{{$t('select__specialty')}}</label>
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
                                    <tr class="table-row-transcript-index">
                                        <th>#</th>
                                        <th>{{ $t("Student") }}</th>
                                        <th>{{ $t("Education_Type") }}</th>
                                        <th>{{ $t("by_Specialty") }}</th>
                                        <th>{{$t('Group')}}</th>
                                        <th>Blank raqami</th>
                                        <th>{{$t('action')}}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="table-row-transcript-index"
                                        v-for="(element, index) in allTables.tableStudents" :key="element.id">
                                        <td>{{ element.id }}</td>
                                        <td>
                                            <div>{{ element.secondName }} <br />
                                                <span style="color: #ccc;">{{element.studentId}}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                Bakalavr<br>
                                                <span style="color: #ccc;">{{element.formOfEducaton}}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                {{ element.specialitys }}<br />
                                                <span style="color: #ccc;">{{element.groupName}}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                {{ element.groupName }}<br />
                                                <span style="color: #ccc;">{{element.specialitys}}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div>MI_{{index+ (index+1)*2}} <br />
                                                <span style="color: #ccc;">28.02.2022</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="action__td">
                                                <router-link class="btns c-save py-1 px-2 me-2 "
                                                    to="/archive/academic-reference/id">
                                                    <i class="far fa-eye font-size-14"></i>
                                                    Ko'rish
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
.table-row-transcript-index {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px auto 200px 140px 150px 120px 120px;
}

.c-save {
    &:hover {
        color: #fff;
    }
}
</style>