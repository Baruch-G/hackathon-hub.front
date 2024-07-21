// import store from "../state/store";
import { Comment } from "../components/hackathonList/HackathonList";
import { DELETE, GET, POST, PUT } from "./Axios";
import axios from "axios";

interface AddUserDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  imgUrl : string
}

interface LoginDto {
  email: string;
  password: string;
}

export const registerUser = async (training: AddUserDto) => {
  return await POST("auth/register", training);
  //   fetchTrainig();
};

export const login = async (training: LoginDto) => {
  return await POST("auth/login", training);
  //   fetchTrainig();
};

export const getHackathons = async () => {
  const res = (await GET("hackathon")).data;
  //  store.dispatch(setTrainingList(res));
  return res;
};

export const fetchHackathon = async (id : string) => {
  const res = (await GET(`hackathon/${id}`)).data;
  return res
};

export const updateHackathon = async (id: string, hackathon: AddHackathonDto) => {
  return await PUT(`hackathon/${id}`, hackathon);
};

export const likeHackathon = async (hackathonId: string, userId: string) => {
  return await POST(`hackathon/${hackathonId}/like`, { userId });
};

export const addComment = async (
  hackathonId: string,
  userId: string,
  text: string
) => {
  return await POST(`hackathon/${hackathonId}/comment`, { userId, text });
};

export interface AddHackathonDto {
  creator: string;
  location: string;
  startDate: Date;
  endDate: Date;
  description: string;
  comments: Comment[];
  imgs: string[];
  likes: string[];
  dateCreated: Date;
}

export const addHackathon = async (hackathon: AddHackathonDto) => {
  return await POST(`hackathon`, hackathon);
};

export const deleteHackathon = async (hackathonId: string) => {
  return await DELETE(`hackathon/${hackathonId}`);
};

export const uploadImages = async (files: File[]): Promise<string[]> => {
  const formData = new FormData();
  files.forEach((file) => formData.append("images", file));

  try {
    const response = await axios.post(
      "http://localhost:6969/hackathon/upload-images ",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.imageUrls; // Adjust based on your server response
  } catch (error) {
    throw error;
  }
};
