import axios from "axios";

export const searchSample = async (params: {
  query?: string;
  page?: string;
  weights?: string;
}) => {
  return axios.get<{ results: { name: string; previews: any }[] }>(
    "/samples/",
    {
      params,
    }
  );
};
