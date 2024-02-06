import { useApi } from "@/composable/useApi";

const api = useApi();

//o'zlashtirish listi
export async function getListGpa(payload) {
    try {
        const { data } = await api({
            url: `api/gpa-balls`,
            method: "GET",
            params: payload
        });
        return data;
    } catch (error) {
        throw error;
    }
}

//o'zlashtirish talabalari listi modal ichida
export async function getListGpaStudents(payload) {
    try {
        const { data } = await api({
            url: `api/gpa-balls`,
            method: "GET",
            params: payload
        });
        return data;
    } catch (error) {
        throw error;
    }
}

//o'zlashtirish talabalari listi
export async function getListGpaStudentsAll(payload) {
    try {
        const { data } = await api({
            url: `api/gpa-balls/students`,
            method: "GET",
            params: payload
        });
        return data;
    } catch (error) {
        throw error;
    }
}

//taxrirlash
export async function gpaEval(id: number) {
    try {
        const { data } = await api({
            url: `/api/gpa-balls/${id}`,
            method: "PUT"
        });
        return data;
    } catch (error) {
        throw error;
    }
}

export async function getSubjectsGpa(id) {
    try {
        const { data } = await api({
            url: `api/gpa-balls/${id}/subjects`,
            method: "GET",
        });
        return data;
    } catch (error) {
        throw error;
    }
}
export async function setGpa(payload) {
    try {
        const { data } = await api({
            url: `api/gpa-balls`,
            method: "POST",
            data: payload
        });
        return data;
    } catch (error) {
        throw error;
    }
}




