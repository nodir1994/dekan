import { useApi } from "@/composable/useApi";

const api = useApi();

//list
export async function trainingList(payload: any) {
    try {
        const { data } = await api({
            url: `/api/trainings`,
            method: "GET",
            params: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}
//yaratish
export async function createTraining(payload: any) {
    try {
        const { data } = await api({
            url: `/api/trainings`,
            method: "POST",
            data: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}
//taxrirlash
export async function updateTrainingById(id: number, payload: any) {
    try {
        const { data } = await api({
            url: `/api/trainings/${id}`,
            method: "PUT",
            data: payload,
        });
        return data;
    } catch (error) {
        throw error;
    }
}
//delete
export async function deleteTraining(id: number) {
    try {
        const { data } = await api({
            url: `/api/trainings/${id}`,
            method: "DELETE",
        });

        return data;
    } catch (error) {
        throw error;
    }
}

export async function fetchTrainingById(id: number) {
    try {
        const { data } = await api({
            url: `/api/trainings/${id}`,
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
            url: `/api/trainings/${id}/status`,
            method: "PUT",
        });

        return data;
    } catch (error) {
        throw error;
    }
}
//o'quv yili
export async function TrainingTypeList() {
    try {
      const { data } = await api({
        url: `/api/trainings`,
        method: "GET",
      });
  
      return data;
    } catch (error) {
      throw error;
    }
  }

//list
export async function trainingMonitoringList(payload: any) {
    try {
        const { data } = await api({
            url: `/api/trainings/monitoring`,
            method: "GET",
            params: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}

