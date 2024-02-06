import { useApi } from "@/composable/useApi";

const api = useApi();

//list
export async function stipendAllList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/awarding-scholarship`,
      method: "GET",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//list
export async function stipendNotStipendList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/awarding-scholarship/students`,
      method: "GET",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//list
export async function orderTypeList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/commands/list/scholarship-award`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//list stipendiya turlari
export async function stipendTypeList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/scholarship-types`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//change Status
export async function changeStatus(id: number) {
  try {
    const { data } = await api({
      url: `/api/awarding-scholarship/change-status/${id}`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//change Status
export async function getStipendById(id: number) {
  try {
    const { data } = await api({
      url: `/api/awarding-scholarship/${id}`,
      method: "GET",
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
      url: `/api/monthly-scholarship/${id}`,
      method: "DELETE",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
// create
export async function createFinance(payload: any) {
  try {
    const { data } = await api({
      url: `/api/monthly-scholarship`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
// modal get by id
export async function fetchFinanceById(id: number) {
  try {
    const { data } = await api({
      url: `/api/monthly-scholarship/${id}`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
// taxrirlash
export async function updateFinanceById(id: number, payload: any) {
  try {
    const { data } = await api({
      url: `/api/monthly-scholarship/${id}`,
      method: "PUT",
      data: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//stipendiya tayinlash
export async function transferStipentStudent(payload: any) {
  try {
    const { data } = await api({
      url: `/api/awarding-scholarship`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
