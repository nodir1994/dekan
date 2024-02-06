import { useApi } from "@/composable/useApi";

const api = useApi();

export async function getCoordinatorList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/coordinator-groups/coordinator`,
      method: "GET",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateStatusCoordinator(payload: object) {
  try {
    const { data } = await api({
      url: `/api/coordinator-groups`,
      method: "Post",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCoordinatorListAll(payload: any) {
  try {
    const { data } = await api({
      url: `/api/coordinator-groups/group`,
      method: "GET",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
export async function coordinatorModalByID(id: number) {
  try {
    const { data } = await api({
      url: `/api/coordinator-groups/${id}`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//list - o'quv rejalar
export async function eduPlanList() {
  try {
    const { data } = await api({
      url: `api/edu-plans/list/active`,
    });
    return data;
    // return {};
  } catch (error) {
    throw error;
  }
}
//list - semestrlar o'quv reja id si bilan
export async function semesterListById(id: Number) {
  try {
    if (id) {
      const { data } = await api({
        url: `api/semesters/list/active`,
        params: id ? { edu_plan_id: id } : {},
      });
      return data;
    } else {
      return {};
    }
  } catch (error) {
    throw error;
  }
}

//list - akademik guruhlar o'quv reja id si bilan
export async function academicGroupListById(id: Number) {
  try {
    if (id) {
      const { data } = await api({
        url: `/api/coordinator-groups/group?edu_plan_id=${id}`,
        method: "GET",
      });
      return data;
    } else {
      return {};
    }
  } catch (error) {
    throw error;
  }
}
// kordinatorlar ro'yxati
export async function coordinatooGroups() {
  try {
    const { data } = await api({
      url: `/api/coordinator-groups/group`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
// kordinatorlar guruhlar
export async function coordinatoorNames() {
  try {
    const { data } = await api({
      url: `/api/coordinator-groups/group`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
// kordinatorlar update
export async function updateCoordinator(id: number, payload: any) {
  try {
    const { data } = await api({
      url: `/api/coordinator-groups/${id}`,
      method: "PUT",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
// kordinatorlar delete
export async function deleteCoordinatorById(id: number) {
  try {
    const { data } = await api({
      url: `/api/coordinator-groups/${id}`,
      method: "DELETE",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
// kordinatorlar create
export async function createCoordinator(payload: any) {
  try {
    const { data } = await api({
      url: `/api/coordinator-groups`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
// akademik yillar
export async function academicYearsAll() {
  try {
    const { data } = await api({
      url: `api/academic-years?order=year`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
