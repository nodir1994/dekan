import { useApi } from "@/composable/useApi";

const api = useApi();

export async function fetchConference(payload: any) {
  try {
    const { data } = await api({
      url: "api/conferences",
      method: "GET",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
export async function fetchConferenceById(id: number) {
  try {
    const { data } = await api({
      url: `api/conferences/${id}`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function typeList() {
  try {
    const { data } = await api({
      url: "api/conferences/conference-types/list",
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function audinceList() {
  try {
    const { data } = await api({
      url: "api/conferences/audiences/list",
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createConferences(payload: any) {
  try {
    const { data } = await api({
      url: `api/conferences`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateConferences(id: number, payload: any) {
  try {
    const { data } = await api({
      url: `api/conferences/update/${id}`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function sendConferences(payload: any) {
  try {
    const { data } = await api({
      url: `api/conferences/share/${payload.id}`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
export async function deleteConference(id: number) {
  try {
    const { data } = await api({
      url: `api/conferences/delete/${id}`,
      method: "DELETE",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function statusChange(id: number) {
  try {
    const { data } = await api({
      url: `api/conferences/change-status/${id}`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createZoomById(id: number) {
  try {
    const { data } = await api({
      url: `api/conferences/zoom/create-link/${id}`,
      method: "POST",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteUserById(idConference: number, idUser: number) {
  try {
    const { data } = await api({
      url: `api/conferences/delete-participiant/${idConference}/${idUser}`,
      method: "DELETE",
    });

    return data;
  } catch (error) {
    throw error;
  }
}
