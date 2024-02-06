import { useApi } from "@/composable/useApi";

const api = useApi();

//Bitiruv varagi listi
export async function studentListIn(payload: any) {
    try {
        const { data } = await api({
            url: `api/archive/circulation/students`,
            method: "GET",
            params: payload
        });
        return data;
    } catch (error) {
        throw error;
    }
}
//Bitiruv varagi listi
export async function getListStudents(payload: any) {
    try {
        const { data } = await api({
            url: `api/archive/circulation/filter`,
            method: "GET",
            params: payload
        });
        return data;
    } catch (error) {
        throw error;
    }
}
//Bitiruv varagi listi id boyicha
export async function getListStudentById(id: number) {
    try {
        const { data } = await api({
            url: `api/archive/graduation-sheet/show/${id}`,
            method: "GET"
        });
        return data;
    } catch (error) {
        throw error;
    }
}

//Bitiruv varagi listi id boyicha
export async function changeDataById(id: number) {
    try {
        const { data } = await api({
            url: `api/archive/circulation/update/${id}`,
            method: "PUT"
        });
        return data;
    } catch (error) {
        throw error;
    }
}

//Bitiruv varagi listi id boyicha
export async function addStudent(payload: any) {
    try {
        const { data } = await api({
            url: `api/archive/circulation/create`,
            method: "Post",
            data: payload
        });
        return data;
    } catch (error) {
        throw error;
    }
}
