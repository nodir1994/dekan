import { useApi } from "@/composable/useApi";

const api = useApi();

//o'zlashtirish listi
export async function getListGraph(payload) {
  try {
    const { data } = await api({
      url: `api/personal-graphics`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// qoshilganlar
export async function getListGraphSome(payload) {
  try {
    const { data } = await api({
      url: `api/personal-graphics/students`,
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getStudentById(id: number) {
  try {
    const { data } = await api({
      url: `api/personal-graphics/${id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
export async function getStudentByIdNotGraph(id: number) {
  try {
    const { data } = await api({
      url: `api/personal-graphics/student/${id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
// qoshilganlar
export async function teacherList() {
  try {
    const { data } = await api({
      url: `api/teachers`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// buyruqlar
export async function orderList() {
  try {
    const { data } = await api({
      url: `api/commands/list/personal-graph`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// buyruqlar
export async function subjectList(payload) {
  try {
    const { data } = await api({
      url: `api/personal-graphic/subjects`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//
export async function setGraph(payload) {
  try {
    const { data } = await api({
      url: `api/personal-graphics`,
      method: "POST",
      data: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteGraphById(id: number) {
  try {
    const { data } = await api({
      url: `api/personal-graphics/${id}`,
      method: "DELETE",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

//taxrirlash
export async function editGraphById(payload: object) {
  try {
    const { data } = await api({
      url: `/api/personal-graphics/${payload.id}`,
      method: "PUT",
      data: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// buyruqlar
export async function exportGraphById(id) {
  try {
    const { data } = await api({
      url: `api/personal-graphics/${id}/download`,
      method: "GET",
      responseType: "blob",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
