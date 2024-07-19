// import store from "../state/store";
import { Comment } from "../components/hackathonList/HackathonList";
import { DELETE, GET, POST } from "./Axios";

interface AddUserDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
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

interface AddHackathonDto {
  creator: string;
  location: { lon: number; lat: number };
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

// export const fetchAreas = async () => {
//   return (await GET("areas")).data;
// };

// export const fetchSquadrons = async () => {
//   const res = (await GET("squadrons")).data;
//   return res;
// };

// export interface PostTraining {
//   force: force;
//   areaId: string;
//   squadronId?: string;
//   startDate: string;
//   endDate: string;
//   userId : string;
// }

// export const postTrainig = async (training: PostTraining) => {
//   await POST("training", training);
//   fetchTrainig();
// };

// export interface PostUser {
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
//   img: string;
// }

// export const postUser = async (user: PostUser) => {
//   const newUser = await POST("users", user);
//   return newUser;
// };

// export const getUserById = async (id: string) => {
//   return await GET(`users/${id}`);
// };

// export const deleteTrainig = async (id: string) => {
//   await DELETE(`training/${id}`);
//   fetchTrainig();
// };
