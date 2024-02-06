import { useApi } from "@/composable/useApi";

const api = useApi();

//list buyruqlar
export async function getQualificationList(payload: any) {
    try {
        const { data } = await api({
            url: `api/qualifications`,
            method: "GET",
            params: payload,
        });
        return data;
    } catch (error) {
        throw error;
    }
}

//delete
export async function deleteQualificationById(id: number) {
    try {
        const { data } = await api({
            url: `api/qualifications/${id}`,
            method: "DELETE",
        });

        return data;
    } catch (error) {
        throw error;
    }
}

//change Status
export async function changeStatus(id: number) {
    try {
        const { data } = await api({
            url: `/api/qualifications/${id}/status`,
            method: "PUT",
        });

        return data;
    } catch (error) {
        throw error;
    }
}

//change Status
export async function getQualitificationById(id: number) {
    try {
        const { data } = await api({
            url: `/api/qualifications/${id}`,
            method: "GET",
        });

        return data;
    } catch (error) {
        throw error;
    }
}

//yaratish
export async function createQualitification(payload: any) {
    try {
        const { data } = await api({
            url: `api/qualifications`,
            method: "POST",
            data: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}
//taxrirlash
export async function updateQualitificationById(id: number, payload: any) {
    try {
        const { data } = await api({
            url: `api/qualifications/${id}`,
            method: "PUT",
            data: payload,
        });
        return data;
    } catch (error) {
        throw error;
    }
}