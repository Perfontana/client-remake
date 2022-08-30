import axios from "axios";

export interface SampleSearchQuerry {
  query?: string;
  weights?: string;
  page?: string;
}

export interface FreesoundSample {
  id: number;
  name: string;
  duration: number;
  previews: {
    "preview-hq-mp3": string;
    "preview-hq-ogg": string;
    "preview-lq-mp3": string;
    "preview-lq-ogg": string;
  };
}

export interface SearchSampleResult {
  count: number;
  next: SampleSearchQuerry;
  previous: SampleSearchQuerry;
  results: FreesoundSample[];
}

export const searchSample = async (params: SampleSearchQuerry) => {
  return axios.get<SearchSampleResult>("/samples/", {
    params,
  });
};

export const downloadFromYoutube = async (videoId: string) => {
  return axios.get<{ name: string; url: string }>(
    `/samples/youtube/${videoId}`
  );
};
