import { useApi } from "@/composable/useApi";

const api = useApi();

//fakultetlar listi
export async function getListStudents(payload: any) {
    try {
        const { data } = await api({
            url: `api/archive/transcript`,
            params: payload,
            method: "GET",
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getListStudentCreate(payload: any) {
    try {
        const { data } = await api({
            url: `api/archive/transcript/student`,
            params: payload,
            method: "GET",
        });
        return data;
    } catch (error) {
        throw error;
    }
}


 
export async function getTranscriptById(id: number) {
    try {
        const { data } = await api({
            url: `api/archive/transcript/${id}`,
            method: "GET"
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getTranscriptByIdStudent(id: number) {
    try {
        const { data } = await api({
            url: `api/archive/transcript/student/${id}`,
            method: "GET"
        });
        return data;
    } catch (error) {
        throw error;
    }
}


export async function createTranskript(payload: any) {
    try {
        const { data } = await api({
            url: `/api/archive/transcript/create`,
            method: "POST",
            data: payload
        });

        return data;
    } catch (error) {
        throw error;
    }
}

export async function updateTranskript(id: number, payload: any) {
    try {
        const { data } = await api({
            url: `/api/archive/transcript/update/${id}`,
            method: "PUT",
            data: payload
        });

        return data;
    } catch (error) {
        throw error;
    }
}
 
export async function getSubjects(semester: number, student_id: number) {
    try {
        const { data } = await api({
            url: `api/archive/transcript/accreditation?student_id=${student_id}&semester=${semester}`,
            method: "GET"
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export async function deleteTranscript(id: number) {
    try {
        const { data } = await api({
            url: `/api/archive/transcript/delete/${id}`,
            method: "DELETE"
        });

        return data;
    } catch (error) {
        throw error;
    }
}