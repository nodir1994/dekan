import { useApi } from "@/composable/useApi";

const api = useApi();

//list
export async function getAwardLists(payload: any) {
    try {
        const { data } = await api({
            url: `api/student-achievements`,
            method: "GET",
            params: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}

//list
export async function getAwardById(id: number,payload: any) {
    try {
        const { data } = await api({
            url: `api/student-achievements/${id}`,
            method: "GET",
            params: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}

//delete by id
export async function deleteAward(id: number) {
    try {
        const { data } = await api({
            url: `api/student-achievements/${id}`,
            method: "delete"
        });

        return data;
    } catch (error) {
        throw error;
    }
}

//toggle status student
export async function changeStatus(id: number, payload: any) {
    try {
        const { data } = await api({
            url: `api/student-achievements/${id}/status`,
            method: "put",
            params: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}

//yaratish
export async function createAward(payload: any) {
    try {
        const { data } = await api({
            url: `/api/student-achievements`,
            method: "POST",
            data: payload,
        });

        return data;
    } catch (error) {
        throw error;
    }
}

//taxrirlash
export async function updateAwardById(id: number, payload: any) {
    try {
        const { data } = await api({
            url: `/api/student-achievements/${id}`,
            method: "PUT",
            data: payload,
        });
        return data;
    } catch (error) {
        throw error;
    }
}


//list - talaba yutug'ida guruhlar jadvali (o'quv reja id si orqali)
export async function groupsListByIdList(id: number, payload: any) {
    try {
        const { data } = await api({
            url: `api/academic-groups/list/active?edu_plan_id=${id}`,
            method: "GET",
            params: payload,
        });
        return data;
    } catch (error) {
        throw error;
    }
}