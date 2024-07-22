import axios from "axios";
const baseurl = "https://hackathon-hub-server.onrender.com";

export const GET = (path: string) => {
  return axios.get(`${baseurl}/${path}`);
};

export const POST = (path: string, data: object) => {
  return axios.post(`${baseurl}/${path}`, data);
};

export const PUT = (path: string, data: object) => {
  return axios.put(`${baseurl}/${path}`, data);
};

export const DELETE = (path: string) => {
  return axios.delete(`${baseurl}/${path}`);
};
