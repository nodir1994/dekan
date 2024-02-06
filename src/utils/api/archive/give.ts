import { useApi } from "@/composable/useApi";

const api = useApi();

export async function getListDiploms(payload: any) {
  try {
    const { data } = await api({
      url: `api/archive/awarding-diploma/diplom`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getListStudents(payload: any) {
  try {
    const { data } = await api({
      url: `api/archive/awarding-diploma/student`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function changeStatus(id: number) {
  try {
    const { data } = await api({
      url: `/api/archive/awarding-diploma/diplom/status/${id}`,
      method: "PUT",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createDiplom(payload: any) {
  try {
    const { data } = await api({
      url: `/api/archive/awarding-diploma/diplom`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateDiplom(id: number, payload: any) {
  try {
    const { data } = await api({
      url: `/api/archive/awarding-diploma/diplom/${id}`,
      method: "PUT",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getDiplomById(id: number) {
  try {
    const { data } = await api({
      url: `api/archive/awarding-diploma/diplom/${id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getDiplomByIdStudent(id: number) {
  try {
    const { data } = await api({
      url: `api/archive/awarding-diploma/student/${id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function dublicate(id: number) {
  try {
    const { data } = await api({
      url: `/api/archive/awarding-diploma/diplom/duplicate/${id}`,
      method: "PUT",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function exportDiplomById(id: number) {
  try {
    const { data } = await api({
      url: `api/archive/awarding-diploma/export/pdf/${id}`,
      responseType: "blob",
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function exportAppById(id: number) {
  try {
    const { data } = await api({
      url: `api/archive/awarding-diploma/export/form/pdf/${id}`,
      responseType: "blob",
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
