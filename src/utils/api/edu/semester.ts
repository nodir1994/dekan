import { useApi } from "@/composable/useApi";

const api = useApi();

//list
export async function semesterList(payload: any) {
    try {
        const { data } = await api({
            url: `/api/semesters`,
            method: "GET",
            params: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}
//yaratish
export async function createSemester(payload: any) {
    try {
        const { data } = await api({
            url: `/api/semesters`,
            method: "POST",
            data: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}
//taxrirlash
export async function updateSemester(id: number, payload: any) {
    try {
        const { data } = await api({
            url: `/api/semesters/${id}`,
            method: "PUT",
            data: payload,
        });
        return data;
    } catch (error) {
        throw error;
    }
}
//delete
export async function deleteSemester(id: number) {
    try {
        const { data } = await api({
            url: `/api/semesters/${id}`,
            method: "DELETE",
        });

        return data;
    } catch (error) {
        throw error;
    }
}

export async function fetchSemesterById(id: number) {
    try {
        const { data } = await api({
            url: `/api/semesters/${id}`,
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
            url: `/api/semesters/${id}/status`,
            method: "PUT",
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