import { useApi } from "@/composable/useApi";

const api = useApi();

//list
export async function getCalendarPlanLists(payload: any) {
  try {
    const { data } = await api({
      url: `api/calendar-plans`,
      method: "GET",
      params: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//list
export async function getCalendarPlanById(id: Number) {
  try {
    const { data } = await api({
      url: `api/calendar-plans/${id}`,
      method: "GET",
    });

    return data;
  } catch (error) {
    throw error;
  }
}

//list
// export async function getAwardById(id: number,payload: any) {
//     try {
//         const { data } = await api({
//             url: `api/student-achievements/${id}`,
//             method: "GET",
//             params: payload,
//         });

//         return data;
//     } catch (error) {
//         throw error;
//     }
// }
