import axios from "axios";
const baseurl = "http://localhost:6969";

// const baseurl = "https://training-sprint-server.onrender.com";

export const GET = (path: string) => {
  return axios.get(`${baseurl}/${path}`);
};

export const POST = (path: string, data: object) => {
  return axios.post(`${baseurl}/${path}`, data);
};

export const DELETE = (path: string) => {
  return axios.delete(`${baseurl}/${path}`);
};
