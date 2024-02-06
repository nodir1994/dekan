import { useApi } from "@/composable/useApi";

const api = useApi();

//list
export async function ratingSystemList(payload: any) {
    try {
        const { data } = await api({
            url: `/api/edu/rating_system`,
            method: "GET",
            params: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}
//yaratish
export async function createRatingSystem(payload: any) {
    try {
        const { data } = await api({
            url: `/api/edu/rating_system`,
            method: "POST",
            data: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}
//taxrirlash
export async function updateRatingSystemById(id: number, payload: any) {
    try {
        const { data } = await api({
            url: `/api/edu/rating_system/${id}`,
            method: "PUT",
            data: payload,
        });
        return data;
    } catch (error) {
        throw error;
    }
}
//delete
export async function deleteRatingSystem(id: number) {
    try {
        const { data } = await api({
            url: `/api/edu/rating_system/${id}`,
            method: "DELETE",
        });

        return data;
    } catch (error) {
        throw error;
    }
}

export async function fetchRatingSystemById(id: number) {
    try {
        const { data } = await api({
            url: `/api/edu/rating_system/${id}`,
            method: "GET"
        });

        return data;
    } catch (error) {
        throw error;
    }
}



export async function changeStatus(id: number) {
    try {
        const { data } = await api({
            url: `/api/edu/rating_system/${id}`,
            method: "POST",
        });

        return data;
    } catch (error) {
        throw error;
    }
}