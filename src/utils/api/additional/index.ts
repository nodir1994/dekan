import { useApi } from "@/composable/useApi";

const api = useApi();

export async function languagesList() {
  try {
    const { data } = await api({
      url: `/api/languages/list`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function countriesList() {
  try {
    const { data } = await api({
      url: `/api/countries/list`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function dakTypeList() {
  try {
    const { data } = await api({
      url: `/api/references/dak-types`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function regionsList() {
  try {
    const { data } = await api({
      url: `/api/regions/list`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function districtsList(id: any) {
  try {
    const { data } = await api({
      url: `/api/districts/list?region_id=${id}`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function nationsList() {
  try {
    const { data } = await api({
      url: `/api/nations/list`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function academicDegreesList() {
  try {
    const { data } = await api({
      url: `/api/academic-degrees/list`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function academicTitlesList() {
  try {
    const { data } = await api({
      url: `/api/academic-titles/list`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function universitiesList() {
  try {
    const { data } = await api({
      url: `/api/universities/list`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function citizenshipList() {
  try {
    const { data } = await api({
      url: `/api/citizenships/list`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function dakList(payload?: any) {
  try {
    const { data } = await api({
      url: `/api/archive/dak`,
      params: payload,
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

export async function updateDak(id: number, payload: any) {
  try {
    const { data } = await api({
      url: `/api/archive/dak/${id}`,
      method: "PUT",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function dakById(id: number) {
  try {
    const { data } = await api({
      url: `/api/archive/dak/${id}`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function dakResultById(id: number) {
  try {
    const { data } = await api({
      url: `/api/archive/dak-results/${id}`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateDakResult(id: number, payload: any) {
  try {
    const { data } = await api({
      url: `/api/archive/dak-results/${id}`,
      method: "PUT",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createDakResult(payload: any) {
  try {
    const { data } = await api({
      url: `/api/archive/dak-results`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function dakStatusChange(id: number) {
  try {
    const { data } = await api({
      url: `/api/archive/dak/status/${id}`,
      method: "PUT",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function resourceStatistics(payload?: any) {
  try {
    const { data } = await api({
      url: `/api/monitoring/resource-statistic`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function lessonStatistics(payload?: any) {
  try {
    const { data } = await api({
      url: `/api/monitoring/lesson-statistic`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function changeDakStatus(id: number, status: boolean) {
  try {
    const { data } = await api({
      url: `/api/archive/dak/${id}/`,
      method: "PUT",
      data: { status: status },
    });

    return data;
  } catch (error) {
    throw error;
  }
}
