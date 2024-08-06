import { api, apiEndPoint } from "../handlers";

const get_country = async () => {
  const { data } = await api.get(apiEndPoint?.country);
  return data;
};

const get_state_by_id = async (id) => {
  const { data } = await api.get(apiEndPoint?.getState(id));
  return data;
};

const get_city_by_id = async (id) => {
  const { data } = await api.get(apiEndPoint?.getCity(id));
  return data;
};

export { get_state_by_id, get_country, get_city_by_id };
