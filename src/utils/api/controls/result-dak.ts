
import { useApi } from "@/composable/useApi";

const api = useApi();

//list
export async function getList(payload: any) {
    try {
        const { data } = await api({
            url: `api/dak-results`,
            method: "GET",
            params: payload
        });

        return data;
    } catch (error) {
        throw error;
    }
}

export async function changeStatus(id: number) {
    try {
        const { data } = await api({
            url: `/api/dak-results/${id}/status`,
            method: "PUT",
        });

        return data;
    } catch (error) {
        throw error;
    }
}

export async function createDak(payload: any) {
    try {
        const { data } = await api({
            url: `/api/dak-results`,
            method: "POST",
            data: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}

//list
export async function studentListBy (payload: any) {
    try {
        const { data } = await api({
            url: `api/dak-results`,
            method: "GET",
            params: payload
        });

        return data;
    } catch (error) {
        throw error;
    }
}

export async function fetchDakById(id: number) {
    try {
      const { data } = await api({
        url: `api/dak-results/${id}`,
        method: "GET"
      });
  
      return data.result;
    } catch (error) {
      throw error;
    }
  }

  export async function updateDak(id: number, payload: any) {
    try {
      const { data } = await api({
        url: `api/dak-results/${id}`,
        method: "PUT",
        data: payload,
      });
  
      return data;
    } catch (error) {
      throw error;
    }
  }

//delete by id
export async function deleteDakById(id: number) {
    try {
        const { data } = await api({
            url: `api/dak-results/${id}`,
            method: "delete"
        });

        return data;
    } catch (error) {
        throw error;
    }
}
