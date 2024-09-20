

export interface User {
  _id: string;
  username: string;
  role: string;
  email: string;
  password: string;
  scores: {
    quizId: string;
    score: number;
    completedAt: Date;
  }[];
}

export interface UserWithNoPassword {
  _id: string;
  username: string;
  role: string;
  email: string;
  scores: {
    quizId: string;
    score: number;
    completedAt: Date;
  }[];
}

export interface RegisterUserRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface RegisterAndLoginUserResponse {
  user: User;
  token: string;
}

export interface ModifyUserRequest {
  email: string;
  password: string
}

export interface ModifyUserResponse {
  message: string;
}

export interface getUserByTokenResponse {
  user: UserWithNoPassword;
}
