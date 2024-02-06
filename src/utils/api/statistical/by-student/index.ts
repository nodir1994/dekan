import { useApi } from "@/composable/useApi";

const api = useApi();

//  Umumiy statistika
export async function StudentCourseAll(payload: any) {
  try {
    const { data } = await api({
      url: `/api/statistic/student/general?faculty_id=1&specialty_id=1`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//  student course bo'yica

export async function StudentCourseList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/statistic/student/general/course`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

// specilty boyica

export async function StudentSpecialtyList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/statistic/student/general/specialty`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

// millat boyica

export async function StudentNationList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/statistic/student/general/nation`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

// hudud boyica

export async function StudentRegionList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/statistic/student/general/region`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
