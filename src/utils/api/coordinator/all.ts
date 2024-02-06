import { useApi } from "@/composable/useApi";

const api = useApi();

export async function getAllgroup(payload: any) {
  try {
    const { data } = await api({
      url: `api/group-session-times`,
      method: 'Get',
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
// 
export async function addCoordinator(payload: object) {
    try {
      const { data } = await api({
        url: `/api/group-session-times`,
        method: "Post",
        data: payload
      });
  
      return data;
    } catch (error) {
      throw error;
    }
  }

  //delete subjects by id
export async function deleteCoordinatorSubjectById(id: number) {
  try {
      const { data } = await api({
          url: `api/group-session-subjects/${id}`,
          method: "delete"
      });

      return data;
  } catch (error) {
      throw error;
  }
}

