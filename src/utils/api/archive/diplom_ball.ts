import { useApi } from "@/composable/useApi";

const api = useApi();

export async function getListStudents(payload: any) {
    try {
        const { data } = await api({
            // url: `api/archive/diploma-scores?edu_type_id=284&edu_form_id=275&edu_plan_id=21&semester_id=67&academic_group_id=34&subject_id=25`,
            url: `api/archive/diploma-scores`,
            method: "GET",
            params: payload
        });
        return data;
    } catch (error) {
        throw error;
    }
}


//guruhga o'tkazish
export async function setBallStudent(payload: any[]) {
    try {
        const { data } = await api({
            url: `/api/archive/diploma-scores`,
            method: "PUT",
            data: {datas: payload},
        });

        return data;
    } catch (error) {
        throw error;
    }
}
