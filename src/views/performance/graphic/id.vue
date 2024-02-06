<script setup lang="ts">
import { allDate, allTables } from "../../data";

import { onMounted, ref, reactive, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useNotyf } from "@/composable/useNotyf";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import { getStudentById, teacherList, orderList, deleteGraphById, editGraphById, exportGraphById } from "@/utils/api/performance/graph";

const route = useRoute();
const id = route.params.id;
const router = useRouter();


const { t } = useI18n();
const notif = useNotyf();
const isLoading = ref(false);

const apiData = reactive({
    number: null,
    date: null,
    command_id: null,
    student_id: null,
    semester_id: null,
    subjects: [],
    arr: []
});

const sideFormOptions = reactive({
    teacherOptions: null,
    orderOptions: null,

});

const plains = ref([])

const loader = ref(true)

onMounted(async () => {
    let res = await getStudentById(id).then(res => res.result)
    Object.assign(apiData, res);
    res?.subjects.forEach(element => {
        plains.value.push({
            subject_id: element.subject_id,
            ball: element.ball,
            employee_id: element.employee_id
        })
    });
    sideFormOptions.orderOptions = await orderList().then((res) => res.result.data);
    sideFormOptions.teacherOptions = await teacherList().then((res) => res.result.data.map(item => {
        return {
            id: item.employee_id,
            name: item.fullname
        }
    }));
});

async function deleteSubject() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-danger me-2",
            cancelButton: "btn btn-success",
        },
        buttonsStyling: false,
    });
    try {
        const res = await swalWithBootstrapButtons.fire({
            title: t("Delete_message.Are_you_sure"),
            text: t("Delete_message.Action_irreversible"),
            icon: "warning",
            confirmButtonText: t("Delete_message.Yes_Delete"),
            cancelButtonText: t("Delete_message.Yo_Cancel"),
            showCancelButton: true,
        });

        if (res.isConfirmed) {
            await deleteGraphById(id);
            isLoading.value = true;
            notif.success(t("Delete_message.Record_deleted_successfull"));
            router.push(`/performance/graphic`);
        }
    } catch (error: any) {
        notif.error(t('Dashboard_Error'));
        // Object.assign(errors, error.response?.data?.errors);
    } finally {
        isLoading.value = false;
    }
}

async function submitData() {
    try {
        let params = {
            id: id,
            number: apiData.number,
            date: apiData.date,
            command_id: apiData.command_id
        }

        let datas = []
        plains.value.forEach(element => {
            if (element.ball >= apiData?.rating_system?.min && element.ball <= apiData?.rating_system?.max && element.employee_id) {
                datas.push(element)
            }
        });
        params.datas = datas
        if (loader.value && params.datas.length) {
            loader.value = false
            const res = await editGraphById(params);
            notif.success(t(res.result));
            setTimeout(() => {
                loader.value = true
            }, 100);
        } if (params.datas.length == 0) {
            notif.error(t('grade_false'))
        }
    } catch (err) {
        console.error(err)
    }
}

function saveByteArray(pdfUrl: any) {
    // set the blog type to final pdf
    const file = new Blob([pdfUrl], { type: "application/pdf" });

    // process to auto download it
    const fileURL = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = "FileName" + new Date() + ".pdf";
    link.click();
}

async function downloadGraphicById() {
    let byte = await exportGraphById(id);
    saveByteArray(byte);
}
</script>

<template>
    <div pagetitle="`Talaba ma'lumotlari`" class="diploma-list">
        <!-----------START PAGE LIST HEADER TOP ------------------------>
        <div class="card mb-3">
            <div class="card-body">
                <div class="mb-3">
                    <router-link to="/performance/graphic"><button class="btns back-c py-1.5 px-4" type="submit">
                            <i class="mdi mdi-arrow-left font-size-14 align-middle me-1 me-1"></i>{{ $t("Prev") }}
                        </button></router-link>
                </div>
                <h5 class="card-title mb-3">{{ $t('Student_information') }}</h5>
                <div class="table-responsive">
                    <table class="content-table">
                        <thead>
                            <tr class="table-rowed">
                                <th>{{ $t("Student") }}</th>
                                <th>{{ $t("Education_Type") }}</th>
                                <th>{{ $t("by_Specialty") }}</th>
                                <th>{{ $t('Group') }}</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr class="table-rowed">
                                <td>{{ apiData.student }}</td>
                                <td>
                                    <div>
                                        {{ apiData?.edu_type }} <br>
                                        <span style="color: #ccc; font-size: inherit;">{{ apiData?.edu_form
                                        }}</span>
                                    </div>
                                </td>
                                <!-- {{ element.specialitys }} -->
                                <td>{{ apiData?.specialty?.name }}</td>
                                <td>
                                    {{ apiData?.academic_group }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="card panel-header-bg">
            <div class="card-body">
                <div class="panel-header">
                    <h5 class="card-title">{{ $t('Personal_graph') }}</h5>
                    <div class="panel-toggles">
                        <div class="filterBlock">
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
                        <div class="my-2 col-xl-3">
                            <label class="form-label" for="yu">{{ $t('Ptt_Number') }}</label>
                            <a-input id="yu" v-model:value="apiData.number" class="form-control" />
                        </div>
                        <div class="my-2 col-xl-3">
                            <label for="division-name-input" class="form-label">{{ $t('apply_Date') }}</label>
                            <a-date-picker v-model:value="apiData.date" placeholder="YYYY-MM-DD" type="date"
                                value-format="YYYY-MM-DD" />
                        </div>
                        <div class="my-2 col-xl-3">
                            <label for="division-name-select" class="form-label">{{ $t('Decree') }}</label>
                            <a-select :field-names="{ value: 'id', label: 'name' }" :options="sideFormOptions.orderOptions"
                                :placeholder="t('Choose')" v-model:value="apiData.command_id">
                            </a-select>
                        </div>
                        <div class="my-2 col-xl-3">
                            <label for="division-name-select" class="form-label">{{ $t('Semester_Name') }}</label>
                            <a-select disabled :value="apiData.semester_id" :placeholder="t('Choose_Semester')"
                                :field-names="{ value: 'id', label: 'name' }" allow-clear>
                            </a-select>
                        </div>
                    </div>
                </b-card>
            </b-collapse>
        </div>
        <!-----------END FILTERS ------------------------>

        <!-------START TABLE---------------------------------------->
        <div class="row table-division">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div class="top d-flex justify-content-between mb-4">
                            <h5 class="mb-0">{{ $t('Self plan_courses') }}</h5>
                            <span>{{ apiData?.rating_system?.name }}</span>
                        </div>
                        <div class="table-responsive">
                            <table class="content-table">
                                <thead>
                                    <tr class="table-key-elements">
                                        <th>#</th>
                                        <th>{{ $t('Subjects') }}</th>
                                        <th>{{ $t('Semester_Name') }}</th>
                                        <th>{{ $t('sciense_type') }}</th>
                                        <th>{{ $t('acload/credit') }}</th>
                                        <th>{{ $t('Score') }}</th>
                                        <th>{{ $t('gradeSome') }}</th>
                                        <th>{{ $t('Teacher_Name1') }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="table-key-elements" v-for="(element, ind) in apiData.subjects" :key="ind">
                                        <td>{{ ind + 1 }}</td>
                                        <td>
                                            {{ element?.subject }}
                                        </td>
                                        <td>
                                            {{ apiData?.semester?.semester }}-{{ $t('semestr') }}
                                        </td>
                                        <td>
                                            {{ element?.subject_type }}
                                        </td>
                                        <td>
                                            {{ element?.load }}/{{ element?.credit }}
                                        </td>
                                        <td>
                                            <a-input type="number" required v-model:value="plains[ind].ball"
                                                class="form-control" />
                                        </td>
                                        <td>
                                            <a-input type="text" disabled :value="element.grade" class="form-control" />
                                        </td>
                                        <td>
                                            <a-form-item class="mb-0" name="nameFaculty" style="width: 100%;">
                                                <a-select v-model:value="plains[ind].employee_id"
                                                    :field-names="{ value: 'id', label: 'name' }"
                                                    :options="sideFormOptions.teacherOptions">
                                                </a-select>
                                            </a-form-item>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="d-flex justify-content-end mt-3">
                            <button class="btns c-delete me-2" @click="deleteSubject" type="button">
                                <i class="mdi mdi-content-save font-size-14 align-middle me-1"></i>
                                {{ $t("Delete") }}
                            </button>
                            <button @click="downloadGraphicById" class="btns application-color py-1 px-2" type="button">
                                <i class="mdi mdi-download"></i>{{ $t('Download') }}
                            </button>
                            <button class="btns c-save ms-2" type="button" @click="submitData"
                                :disabled="!apiData.number || !apiData.date || !apiData.command_id">
                                <i class="mdi mdi-check font-size-14 align-middle me-1"></i>{{ $t('Save') }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-------END TABLE---------------------------------------->
    </div>
</template>
 
<style lang="scss">
.table-rowed {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: auto 250px 240px 250px;
}

.table-key-elements {
    display: grid;
    width: 100% !important;
    grid-gap: 0;
    grid-template-columns: 50px auto 140px 100px 150px 100px 100px 300px;
}


.c-save {
    &:hover {
        color: #fff;
    }
}
</style>