import { useApi } from "@/composable/useApi";

const api = useApi();

export async function getStudentList(payload: object) {
    try {
      const { data } = await api({
        url: `/api/attendances/students`,
        method: "GET",
        params: payload
      });
  
      return data;
    } catch (error) {
      throw error;
    }
  }

  export async function setStatus(payload: object) {
    try {
      const { data } = await api({
        url: `/api/attendances/status`,
        method: "POST",
        data: payload
      });
  
      return data;
    } catch (error) {
      throw error;
    }
  }