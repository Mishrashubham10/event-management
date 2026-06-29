export type LoginDto = {
  username: string;
  password: string;
};

export type LoginContext = {
  browser?: string;
  ip?: string;
  socketId?: string;
};

export type LoginResponseDto = {
  token: string;

  user: {
    id: string;
    username: string;
    role: string;
  };
};