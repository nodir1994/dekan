import { useApi } from "@/composable/useApi";

const api = useApi();

export async function getListDiploms(payload: any) {
    try {
        const { data } = await api({
            url: `api/archive/diploma-form`,
            method: "GET",
            params: payload
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export async function showBlankById(id: any) {
    try {
        const { data } = await api({
            url: `api/archive/diploma-form/${id}`,
            method: "GET"
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export async function changesBlankById(payload: any) {
    try {
        const { data } = await api({
            url: `api/archive/diploma-form/${payload.id}`,
            method: "PUT",
            data: payload
        });
        return data;
    } catch (error) {
        throw error;
    }
}

