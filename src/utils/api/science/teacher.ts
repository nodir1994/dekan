import { useApi } from "@/composable/useApi";

const api = useApi();

//list
export async function teachersList(payload: any) {
    try {
        const { data } = await api({
            url: `/api/ratings/teachers`,
            method: "GET",
            params: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}

//taxrirlash
export async function teacherById(id: number) {
    try {
        const { data } = await api({
            url: `api/ratings/teacher/${id}`,
            method: "GET"
        });
        return data;
    } catch (error) {
        throw error;
    }
}

