import { useApi } from "@/composable/useApi";

const api = useApi();

export async function addStudent(payload: any) {
    try {
      const { data } = await api({
        url: `api/students`,
        method: "POST",
        data: payload,
      });
  
      return data.result;
    } catch (error) {
      throw error;
    }
  }
  
  export async function updateStudent(id: number, payload: any) {
    try {
      const { data } = await api({
        url: `api/students/${id}`,
        method: "POST",
        data: payload,
      });
  
      return data.result;
    } catch (error) {
      throw error;
    }
  }

  export async function fetchStudentsById(id: number) {
    try {
      const { data } = await api({
        url: `api/students/student/${id}`,
        method: "GET"
      });
  
      return data.result;
    } catch (error) {
      throw error;
    }
  }

  export async function fetchStudentBySemesterByAcademicGroup(payload: Object) {
    try {
      const { data } = await api({
        method: "get",
        url: `api/students/list?semester_id=${payload.semester_id}&academic_group_id=${payload.academic_group_id}`,
      });
  
      return data;
    } catch (error) {
      throw error;
    }
  }
  