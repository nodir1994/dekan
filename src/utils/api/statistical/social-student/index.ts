import { useApi } from "@/composable/useApi";

const api = useApi();

// talaba ijtimoiy
export async function bySocialStudentList(payload: any) {
  try {
    const { data } = await api({
      url: `/api/statistic/student/social/${payload.url}?&academic_year_id=${payload.academic_year_id}&semester_type=${payload.semester_type}`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
