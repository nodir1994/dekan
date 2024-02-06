import { useApi } from "@/composable/useApi";

const api = useApi();

//list
export async function academicYearList(payload: any) {
    try {
        const { data } = await api({
            url: `/api/edu/academic_year`,
            method: "GET",
            params: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}
//yaratish
export async function createAcademicYear(payload: any) {
    try {
        const { data } = await api({
            url: `/api/edu/academic_year`,
            method: "POST",
            data: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}
//taxrirlash
export async function updateAcademicYearById(id: number, payload: any) {
    try {
        const { data } = await api({
            url: `/api/edu/academic_year/${id}`,
            method: "PUT",
            data: payload,
        });
        return data;
    } catch (error) {
        throw error;
    }
}
//delete
export async function deleteAcademicYear(id: number) {
    try {
        const { data } = await api({
            url: `/api/edu/academic_year/${id}`,
            method: "DELETE",
        });

        return data;
    } catch (error) {
        throw error;
    }
}

export async function fetchAcademicYearById(id: number) {
    try {
        const { data } = await api({
            url: `/api/edu/academic_year/${id}`,
            method: "GET"
        });

        return data;
    } catch (error) {
        throw error;
    }
}



export async function changeStatus(id: number) {
    try {
        const { data } = await api({
            url: `/api/edu/academic_year/${id}`,
            method: "POST",
        });

        return data;
    } catch (error) {
        throw error;
    }
}
//o'quv yili
export async function academicYearTypeList() {
    try {
      const { data } = await api({
        url: `/api/edu/academic_year`,
        method: "GET",
      });
  
      return data;
    } catch (error) {
      throw error;
    }
  }

  //binolar listi
export async function buildingList() {
    try {
      const { data } = await api({
        url: `/api/building`,
        method: "GET",
      });
  
      return data;
    } catch (error) {
      throw error;
    }
  }