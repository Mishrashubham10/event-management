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

// export interface Event {
//   _id: string;
//   title: string;
//   description: string;
//   category: EventCategory | string;
//   createdBy: EventUser | string;
//   publishAt: string;
//   photos: EventPhoto[];
//   status?: 'published' | 'waiting';
// }

export interface ApiResponse<T> {
  statusCode: number;
  data: T;
  message: string;
}

export interface EventCategory {
  _id: string;
  name: string;
}

export interface EventUser {
  _id: string;
  username: string;
}

export interface EventPhoto {
  url: string;
  filename: string;
}

export interface Event {
  _id: string;

  title: string;
  description: string;

  category: EventCategory;
  createdBy: EventUser;

  publishAt: string;

  photos: EventPhoto[];

  createdAt: string;
  updatedAt: string;

  deletedAt: string | null;
  isDeleted: boolean;

  status?: 'published' | 'waiting';
}

export interface EventParticipantUser {
  _id: string;
  username: string;
}

export interface EventParticipant {
  _id: string;
  event: string;
  user: EventParticipantUser;
  joinedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ParticipantCountResponse {
  count: number;
}

export interface JoinStatusResponse {
  joined: boolean;
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

    updateEvent: builder.mutation<
      ApiResponse<Event>,
      {
        id: string;
        body: FormData;
      }
    >({
      query: ({ id, body }) => ({
        url: `/events/${id}`,
        method: 'PATCH',
        body,
      }),

      invalidatesTags: ['Event'],
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

    joinEvent: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/events/${id}/join`,
        method: 'POST',
      }),

      invalidatesTags: ['Event'],
    }),

    leaveEvent: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/events/${id}/leave`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Event'],
    }),

    getParticipantCount: builder.query<ApiResponse<{ count: number }>, string>({
      query: (id) => `/events/${id}/participants/count`,

      providesTags: ['Event'],
    }),

    getJoinStatus: builder.query<ApiResponse<{ joined: boolean }>, string>({
      query: (id) => `/events/${id}/join-status`,

      providesTags: ['Event'],
    }),

    getParticipants: builder.query<ApiResponse<EventParticipant[]>, string>({
      query: (id) => `/events/${id}/participants`,

      providesTags: ['Event'],
    }),
  }),
});

export const {
  useCreateEventMutation,
  useGetPublicEventsQuery,
  useGetAdminEventsQuery,
  useDeleteEventMutation,
  useGetEventByIdQuery,
  useUpdateEventMutation,

  useJoinEventMutation,
  useLeaveEventMutation,

  useGetParticipantCountQuery,
  useGetJoinStatusQuery,
  useGetParticipantsQuery,
} = eventApi;
