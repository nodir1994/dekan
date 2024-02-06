import { useApi } from "@/composable/useApi";

const api = useApi();

//list
export async function getAttachLists(payload: any) {
  try {
    const { data } = await api({
      url: `api/students/free`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//list
export async function setAttachList(payload: any) {
  try {
    const { data } = await api({
      url: `api/students/attachment`,
      method: "PUT",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
