import { useApi } from "@/composable/useApi";

const api = useApi();

let urlInfo: any = null;
let baseOrgn = import.meta.env.VITE_API_MESSAGE_URL;

let baseEduni = '.eduni.uz'
let baseNavEduni = '.naveduni.uz'
let baseTest = '.rasmlar.net';


if (window.location.href.includes(".eduni")) {
  urlInfo = baseOrgn + baseEduni;
} else if (
  window.location.href.includes(".naveduni")
) {
  urlInfo = baseOrgn + baseNavEduni;
} else {
  urlInfo = baseOrgn + baseTest
}

export async function fetchReceivedMessages(payload: any, signal: AbortSignal) {
  try {
    const { data } = await api({
      url: `${urlInfo}/api/v1/messages/received`,
      params: payload,
      signal,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchSentMessages(payload: any, signal: AbortSignal) {
  try {
    const { data } = await api({
      url: `${urlInfo}/api/v1/messages/sent`,
      params: payload,
      signal,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchDeletedMessages(payload: any, signal: AbortSignal) {
  try {
    const { data } = await api({
      url: `${urlInfo}/api/v1/messages/deleted`,
      params: payload,
      signal,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchDraftMessages(payload: any, signal: AbortSignal) {
  try {
    const { data } = await api({
      url: `${urlInfo}/api/v1/messages/draft`,
      params: payload,
      signal,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchDraftMessageByID(messageID: number) {
  try {
    const { data } = await api({
      url: `${urlInfo}/api/v1/messages/draft/${messageID}`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchEmployees(payload: any) {
  try {
    const { data } = await api({
      url: `${urlInfo}/api/v1/message-receivers/employees`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchStudents(payload: any) {
  try {
    const { data } = await api({
      url: `${urlInfo}/api/v1/message-receivers/students`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createMessage(payload: any) {
  try {
    const { data } = await api({
      url: `${urlInfo}/api/v1/messages`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateMessage(messageID: number, payload: any) {
  try {
    const { data } = await api({
      url: `${urlInfo}/api/v1/messages/${messageID}`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function saveDraftMessage(payload: any) {
  try {
    const { data } = await api({
      url: `${urlInfo}/api/v1/messages/draft`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateDraftMessage(messageID: number, payload: any) {
  try {
    const { data } = await api({
      url: `${urlInfo}/api/v1/messages/draft/${messageID}`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteMessages(ids: number[]) {
  try {
    const { data } = await api({
      url: `${urlInfo}/api/v1/messages`,
      method: "DELETE",
      data: { ids },
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function restoreMessages(ids: number[]) {
  try {
    const { data } = await api({
      url: `${urlInfo}/api/v1/messages/restore`,
      method: "PUT",
      data: { ids },
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function markMessageAsRead(id: number) {
  try {
    const { data } = await api({
      url: `${urlInfo}/api/v1/message-receivers/${id}/is_seen`,
      method: "PUT",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
export async function departmentsList(type?: "section" | "department") {
  try {
    const { data } = await api({
      url: `${urlInfo}/api/v1/employee-departments`,
      params: { type },
    });

    return data;
  } catch (error) {
    throw error;
  }
}
export async function fetchAcademicGroupsByEduPlanID(edu_plan_id?: number) {
  try {
    const { data } = await api({
      url: `${urlInfo}/api/v1/students-contingent/academic-groups`,
      params: { edu_plan_id },
    });

    return data;
  } catch (error) {
    throw error;
  }
}
