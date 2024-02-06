import { useApi } from "@/composable/useApi";

const api = useApi();

//studentlar list
export async function getListStudents(payload: any) {
    try {
        const { data } = await api({
            url: `api/archive/writing/filter`,
            method: "GET",
            params: payload
        });
        return data;
    } catch (error) {
        throw error;
    }
}

//studentlar list ichki ko'rish
export async function getListStudentsShow(payload: any) {
    try {
        const { data } = await api({
            url: `api/archive/writing/show`,
            method: "GET",
            params: payload
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export async function changeStatus(id: number) {
    try {
        const { data } = await api({
            url: `/api/archive/writing/status/${id}`,
            method: "PUT",
        });
        return data;
    } catch (error) {
        throw error;
    }
}

//studentlar listi optionda
export async function students(id: number) {
    try {
        const { data } = await api({
            url: `api/students?academic_group_id=${id}`,
            method: "GET"
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export async function transfer(payload: any) {
    try {
        const { data } = await api({
            url: `/api/archive/writing/transfer`,
            method: "PUT",
            data: payload
        });
        return data;
    } catch (error) {
        throw error;
    }
}
