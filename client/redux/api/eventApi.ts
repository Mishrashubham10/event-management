import { apiSlice } from './apiSlice';

export interface EventPhoto {
  url: string;
  filename: string;
}

export interface EventCategory {
  _id: string;
  name: string;
}

export interface EventUser {
  _id: string;
  username: string;
}

export interface Event {
  _id: string;
  title: string;
  description: string;
  category: EventCategory | string;
  createdBy: EventUser | string;
  publishAt: string;
  photos: EventPhoto[];
  status?: 'published' | 'waiting';
}

export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
}

export const eventApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createEvent: builder.mutation<ApiResponse<Event>, FormData>({
      query: (body) => ({
        url: '/events',
        method: 'POST',
        body,
      }),

      invalidatesTags: ['Event'],
    }),

    getPublicEvents: builder.query<ApiResponse<Event[]>, void>({
      query: () => '/events',

      providesTags: ['Event'],
    }),

    getAdminEvents: builder.query<ApiResponse<Event[]>, void>({
      query: () => '/events/admin',

      providesTags: ['Event'],
    }),

    deleteEvent: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/events/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Event'],
    }),

    getEventById: builder.query<ApiResponse<Event>, string>({
      query: (id) => `/events/${id}`,

      providesTags: ['Event'],
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetPublicEventsQuery,
  useGetAdminEventsQuery,
  useDeleteEventMutation,
  useGetEventByIdQuery
} = eventApi;