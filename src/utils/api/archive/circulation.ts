import { useApi } from "@/composable/useApi";

const api = useApi();

//Bitiruv varagi listi
export async function getListStudents(payload: any) {
    try {
        const { data } = await api({
            url: `api/archive/graduation-sheet/filter`,
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
export async function changeDataById(payload: any) {
    try {
        console.log(payload)
        const { data } = await api({
            url: `api/archive/graduation-sheet/update/${payload.id}`,
            method: "PUT",
            params: payload
        });
        return data;
    } catch (error) {
        throw error;
    }
}
