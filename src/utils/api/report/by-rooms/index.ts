import { useApi } from "@/composable/useApi";

const api = useApi();

// Auditoriya bandligi
export async function reportByRooms(payload: any) {
  try {
    const { data } = await api({
      url: `/api/report/audiences`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
// auditoriya bandligi modal
export async function reportByRoomsID(payload: any) {
  try {
    const { data } = await api({
      url: `/api/report/audiences/topic`,
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
