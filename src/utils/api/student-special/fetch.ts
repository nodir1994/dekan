import { useApi } from "@/composable/useApi";

const api = useApi();

//fakultetlar listi
export async function getListFaculty(payload: any) {
    try {
        const { data } = await api({
            url: `api/faculty`,
            method: "GET",
            params: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}

//mutaxassislik listi
export async function getListSpeciality(payload: any) {
    try {
        const { data } = await api({
            url: `api/specialties`,
            method: "GET",
            params: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}

//delete
export async function deleteSpeciality(id: number) {
    try {
        const { data } = await api({
            url: `api/specialties/${id}`,
            method: "DELETE",
        });

        return data;
    } catch (error) {
        throw error;
    }
}

//change Status
export async function changeStatus(id: number) {
    try {
        const { data } = await api({
            url: `/api/specialties/${id}/status`,
            method: "PUT",
        });

        return data;
    } catch (error) {
        throw error;
    }
}

//list - faculty only gov
export async function govList(id: number,payload: any) {
    try {
        const { data } = await api({
            url: `api/gov-specialties?edu_type_id=${id}`,
            method: "GET",
            params: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}

//taxrirlash
export async function updateSpecialById(id: number, payload: any) {
    try {
        const { data } = await api({
            url: `api/specialties/${id}`,
            method: "PUT",
            data: payload,
        });
        return data;
    } catch (error) {
        throw error;
    }
}

//yaratish
export async function createSpeciality(payload: any) {
    try {
        const { data } = await api({
            url: `api/specialties`,
            method: "POST",
            data: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}

export async function fetchStudentSpecialById(id: number) {
    try {
        const { data } = await api({
            url: `api/specialties/${id}`,
            method: "PUT"
        });

        return data;
    } catch (error) {
        throw error;
    }
}
