import { apiSlice } from './apiSlice';

export interface User {
  id: string;
  username: string;
  role: 'ADMIN' | 'USER';
}

interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<User>, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),

    me: builder.query<ApiResponse<User>, void>({
      query: () => '/auth/me',
    }),

    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useLazyMeQuery,
} = authApi;