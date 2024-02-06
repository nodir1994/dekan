import { useApi } from "@/composable/useApi";

const api = useApi();

export async function getListAccreditations(payload: any) {
    try {
        const { data } = await api({
            url: `api/archive/accreditation`,
            method: "GET",
            params: payload
        });
        return data;
    } catch (error) {
        throw error;
    }
}


//status ozgartirish
export async function changeStatus(id: any) {
    try {
        const { data } = await api({
            url: `/api/archive/accreditation/status/${id}`,
            method: "PUT"
        });

        return data;
    } catch (error) {
        throw error;
    }
}

export async function fetchById(id: any) {
    try {
        const { data } = await api({
            url: `api/archive/accreditation/${id}`,
            method: "GET"
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export async function deleteSubjectById(id: number) {
    try {
        const { data } = await api({
            url: `api/archive/accreditation/subject/${id}`,
            method: "DELETE"
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export async function showSubjectById(id: any) {
    try {
        const { data } = await api({
            url: `api/archive/accreditation/subject/${id}`,
            method: "GET"
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export async function changesSubjectById(payload: any) {
    try {
        const { data } = await api({
            url: `api/archive/accreditation/subject/${payload.id}`,
            method: "PUT",
            data: payload
        });
        return data;
    } catch (error) {
        throw error;
    }
}
