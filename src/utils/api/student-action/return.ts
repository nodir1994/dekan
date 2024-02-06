import { useApi } from "@/composable/useApi";

const api = useApi();

//studentlar listi
export async function getListStudents(payload: any) {
  try {
    const { data } = await api({
      url: `api/students/return-study`,
      method: "GET",
      params: payload,
    });
    return data;
  } catch (error) {
    throw error;
  }
}

// //buyruqlar listi
// export async function getStatusList(payload: any) {
//   try {
//     const { data } = await api({
//       url: `api/commands/list/graduation`,
//       method: "GET",
//     });
//     return data;
//   } catch (error) {
//     throw error;
//   }
// }

//yaratish
export async function createReturnStudent(payload: any) {
  try {
    const { data } = await api({
      url: `api/student-actions/student-status`,
      method: "PUT",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
//Talaba holati
export async function statusStudentInfo() {
  try {
    const { data } = await api({
      url: `api/references/student-statuses`,
      method: "GET",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
