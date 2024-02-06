import { useApi } from "@/composable/useApi";

const api = useApi();

//list
export async function pairList(payload: any) {
    try {
        const { data } = await api({
            url: `/api/edu/pair`,
            method: "GET",
            params: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}
//yaratish
export async function createPair(payload: any) {
    try {
        const { data } = await api({
            url: `/api/edu/pair`,
            method: "POST",
            data: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}
//taxrirlash
export async function updatePairById(id: number, payload: any) {
    try {
        const { data } = await api({
            url: `/api/edu/pair/${id}`,
            method: "PUT",
            data: payload,
        });
        return data;
    } catch (error) {
        throw error;
    }
}
//delete
export async function deletePair(id: number) {
    try {
        const { data } = await api({
            url: `/api/edu/pair/${id}`,
            method: "DELETE",
        });

        return data;
    } catch (error) {
        throw error;
    }
}

export async function fetchPairById(id: number) {
    try {
        const { data } = await api({
            url: `/api/edu/pair/${id}`,
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
            url: `/api/edu/pair/${id}`,
            method: "POST",
        });

        return data;
    } catch (error) {
        throw error;
    }
}
//o'quv yili list
export async function academicYearList() {
    try {
      const { data } = await api({
        url: `/api/edu/academic_year`,
        method: "GET",
      });
  
      return data;
    } catch (error) {
      throw error;
    }
  }