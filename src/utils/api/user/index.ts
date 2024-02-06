import { useApi } from "@/composable/useApi";

const api = useApi();

export async function rolesList() {
  try {
    const { data } = await api({
      url: `/api/users/roles-list`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getProfile() {
  try {
    const { data } = await api({
      url: `/api/users/profile`,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function editProfile(payload: any) {
  try {
    const { data } = await api({
      url: `/api/users/profile`,
      method: "POST",
      data: payload,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
