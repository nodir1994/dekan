import { useApi } from "@/composable/useApi";

const api = useApi();

//list
export async function ratingTypeList(payload: any) {
    try {
        const { data } = await api({
            url: `/api/edu/rating-type`,
            method: "GET",
            params: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}
//yaratish
export async function createRatingType(payload: any) {
    try {
        const { data } = await api({
            url: `/api/edu/rating-type`,
            method: "POST",
            data: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}
//taxrirlash
export async function updateRatingTypeById(id: number, payload: any) {
    try {
        const { data } = await api({
            url: `/api/edu/rating-type/${id}`,
            method: "PUT",
            data: payload,
        });
        return data;
    } catch (error) {
        throw error;
    }
}
//delete
export async function deleteRatingType(id: number) {
    try {
        const { data } = await api({
            url: `/api/edu/rating-type/${id}`,
            method: "DELETE",
        });

        return data;
    } catch (error) {
        throw error;
    }
}

export async function fetchRatingTypeById(id: number) {
    try {
        const { data } = await api({
            url: `/api/edu/rating-type/${id}`,
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
            url: `/api/edu/rating-type/${id}`,
            method: "POST",
        });

        return data;
    } catch (error) {
        throw error;
    }
}
//baxolash tizimi
export async function ratingSystemList() {
    try {
      const { data } = await api({
        url: `/api/edu/rating_system`,
        method: "GET",
      });
  
      return data;
    } catch (error) {
      throw error;
    }
  }