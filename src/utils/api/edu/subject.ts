import { useApi } from "@/composable/useApi";

const api = useApi();

//list
export async function subjectEduList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/curriculums/list/${payload.curriculum_id}`,
      //   method: "GET",
      //   params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//yaratish
export async function createSubjectEdu(payload: any) {
  try {
    const { data } = await api({
      url: `/api/curriculums`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//taxrirlash
export async function updateSubjectEdu(id: number, payload: any) {
  try {
    const { data } = await api({
      url: `/api/curriculums/${id}`,
      method: "PUT",
      data: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}
//delete
export async function deleteSubjectEdu(id: number) {
  try {
    const { data } = await api({
      url: `/api/curriculums/${id}`,
      method: "DELETE",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchSubjectEduById(id: number) {
  try {
    const { data } = await api({
      url: `/api/curriculums/${id}`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

// tabla header
export async function tableHeaderList() {
  try {
    const { data } = await api({
      url: `/api/curriculums/header`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
export async function exportFile(e_id: number) {
  try {
    const { data } = await api({
      url: `/api/curriculum-subjects/${e_id}`,
      responseType: "blob",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
