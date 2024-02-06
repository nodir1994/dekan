import { useApi } from "@/composable/useApi";

const api = useApi();

//fakultetlar listi
export async function getListStudents(payload: any) {
    try {
        const { data } = await api({
            url: `api/archive/reference`,
            method: "GET",
            params: payload
        });
        return data;
    } catch (error) {
        throw error;
    }
}
