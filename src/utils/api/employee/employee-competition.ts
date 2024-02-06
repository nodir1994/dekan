import { useApi } from "@/composable/useApi";

const api = useApi();

//list
export async function employeeCompetitionList(payload: any) {
    try {
        const { data } = await api({
            url: `/api/selections`,
            method: "GET",
            params: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}
//yaratish
export async function createEmployeeCompetition(payload: any) {
    try {
        const { data } = await api({
            url: `/api/selections`,
            method: "POST",
            data: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}
//taxrirlash
export async function updateEmployeeCompetitionById(id: number, payload: any) {
    try {
        const { data } = await api({
            url: `/api/selections/${id}`,
            method: "PUT",
            data: payload,
        });
        return data;
    } catch (error) {
        throw error;
    }
}
//delete
export async function deleteEmployeeCompetition(id: number) {
    try {
        const { data } = await api({
            url: `/api/selections/${id}`,
            method: "DELETE",
        });

        return data;
    } catch (error) {
        throw error;
    }
}

export async function fetchEmployeeCompetitionById(id: number) {
    try {
        const { data } = await api({
            url: `/api/selections/${id}`,
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
            url: `/api/selections/${id}/status`,
            method: "PUT",
        });

        return data;
    } catch (error) {
        throw error;
    }
}
//o'quv yili
export async function EmployeeCompetitionTypeList() {
    try {
      const { data } = await api({
        url: `/api/selections`,
        method: "GET",
      });
  
      return data;
    } catch (error) {
      throw error;
    }
  }

//monitoring
export async function employeeCompetitionMonitoringList(payload: any) {
    try {
        const { data } = await api({
            url: `/api/selections/monitoring`,
            method: "GET",
            params: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}

