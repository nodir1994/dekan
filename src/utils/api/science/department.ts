import { useApi } from "@/composable/useApi";

const api = useApi();

//list
export async function departmentList(payload: any) {
    try {
        const { data } = await api({
            url: `/api/ratings/departments`,
            method: "GET",
            params: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}
