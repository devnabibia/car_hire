import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CarProps, PackagesProps } from "../../Types";
import Cookies from "js-cookie";

const baseUrl: string | undefined = import.meta.env.VITE_BASE_URL;
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    //reigister user
    registerUser: builder.mutation({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
    }),
    //reigister user
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/login",
        method: "POST",
        body: user,
      }),
    }),

    //logout

    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    //Get user by id

    getUserById: builder.query<any, any>({
      query: (user_id) => ({
        url: `user/${user_id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }),
    }),

    //suspend Account

    suspendAccount: builder.mutation<any, any>({
      query: (args) => {
        const { active, id } = args;

        return {
          url: `/suspend-account/${id}`,
          method: "POST",
          body: { active: active },
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        };
      },
    }),

    //<ReturnValue, ArgumentType>
    //get all users

    getAllUsers: builder.query<
      any,
      { status: string; role: string; q: string; page: string; limit: string }
    >({
      query: (args) => {
        const { status, q, role, page, limit } = args;
      

        return {
          url: `/all-users?page=${page}&limit=${limit}&status=${status}&role=${role}&q=${q}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        };
      },
    }),

    //Remove user
    removeUserById: builder.mutation<any, any>({
      query: (user_id) => ({
        url: `remove-user/${user_id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }),
    }),

    //get  vihicles by params
    getVihiclesByParams: builder.query<
      any,
      {
        car_name: string | null;
        car_type: string | null;
        transmission_type: string | null;
        min_price: string | null;
        max_price: string | null;
        page: string | null;
        limit: string | null;
      }
    >({
      query: (arg) => {
        const {
          car_name,
          car_type,
          transmission_type,
          min_price,
          max_price,
          page,
          limit,
        } = arg;

        return {
          url: `all-vihicles-by-params?car_name=${car_name}&car_type=${car_type}&transmission_type=${transmission_type}&min_price=${min_price}&max_price=${max_price}&page=${page}&limit=${limit}`,
        };
      },
    }),

    //get vihicles by owner

    getVihiclesByOwner: builder.query<any, any>({
      query: (ownerId) => `/all-vihicles-by-owner/${ownerId}`,
    }),

    //get all  vihicles
    getVihicles: builder.query<any, { page: any }>({
      query: (arg) => {
        const { page } = arg;
        return {
          url: `all-vihicles?page=${page}`,
        };
      },
    }),

    //get all  vihicles  default
    getVihiclesDefault: builder.query<CarProps[], null>({
      query: () => "all-vihicles-default",
    }),

    //get single by id
    getVihicleById: builder.query({
      query: (vihicleId) => `get-vihicle/${vihicleId}  `,
    }),
    // add vihicle
    addNewVihicle: builder.mutation({
      query: (vihicle) => ({
        url: "create-vihicle",
        method: "POST",
        body: vihicle,
        formData: true,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }),
    }),
    // update vihicle
    updateVihicle: builder.mutation({
      query: (args) => {
        const { id, body } = args;

        return {
          url: `/update-vihicle/${id}`,
          method: "POST",
          body: body,
          formData: true,
          headers: {
            Authorization: ` Bearer ${Cookies.get("token")}`,
          },
        };
      },
    }),
    // remove vihicle

    removeVihicle: builder.mutation({
      query: (vihicleId) => ({
        url: `delete-vihicle/${vihicleId}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }),
    }),

    //subscribe to newsletter
    subscribe: builder.mutation({
      query: (subscriber) => ({
        url: "subscribe",
        method: "POST",
        body: subscriber,
      }),
    }),

    //subscribe to newsletter
    unsubscribe: builder.mutation({
      query: (args) => {
        const { isActive, email } = args;
        return {
          url: "/unsubscribe",
          method: "POST",
          body: { isActive: isActive, email: email },
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        };
      },
    }),
    //get all newsletter subscriptions

    getAllsubscriptions: builder.query<
      any,
      { status: string; q: string; page: string; limit: string }
    >({
      query: (args) => {
        const { status, q, page, limit } = args;

        return {
          url: `/get-all-subscriptions?page=${page}&limit=${limit}&status=${status}&q=${q}`,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        };
      },
    }),

    //create callBackRequest

    createRequestCallBack: builder.mutation<any, any>({
      query: (rcq_body) => ({
        url: "/request-callback",
        body: rcq_body,
        method: "POST",
      }),
    }),

    //get all callBack Requests

    getRequestCallBackById: builder.query<
      any,
      { page: string; limit: string; q: string; agent_id: string }
    >({
      query: (args) => {
        const { agent_id, page, limit, q } = args;

        return {
          url: `/get-cbrequests?agent_id=${agent_id}&page=${page}&limit=${limit}&q=${q}`,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        };
      },
    }),

    getAllRequestCallBack: builder.query<
      any,
      { page: string; limit: string; q: string }
    >({
      query: (args) => {
        const { page, limit, q } = args;

        return {
          url: `/get-all-cbrequests?page=${page}&limit=${limit}&q=${q}`,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        };
      },
    }),

    //packages

    getAllPackages: builder.query<PackagesProps, void>({
      query: () => {
        return {
          url: "get-packages",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        };
      },
    }),

    //update package

    updatePackage: builder.mutation<
      PackagesProps,
      { body: PackagesProps; _id: string | undefined }
    >({
      query: (args) => {
        const { body, _id } = args;

   

        return {
          url: `/update-package/${_id}`,
          method: "POST",
          body: body,
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        };
      },
    }),

    //get package by ID

    getPackageById: builder.query<any, { id: string | undefined }>({
      query: (args) => {
        const { id } = args;
        console.log("args", id);
        return {
          url: `get-package/${id}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        };
      },
    }),

    //remove package

    removePackage: builder.mutation<PackagesProps, { _id: string|undefined }>({
      query: (args) => {
        const { _id } = args;

        return {
          url: `remove-package/${_id}`,
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        };
      },
    }),

    //add package

    createPackage: builder.mutation<PackagesProps, { body: PackagesProps }>({
      query: (args) => {
        const { body } = args;

        console.log(body)

        return {
          url: "new-package",
          body: body,
          method: "POST",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        };
      },
    }),
  }),
});

export const {
  useGetVihiclesQuery,
  useGetVihicleByIdQuery,
  useAddNewVihicleMutation,
  useUpdateVihicleMutation,
  useRegisterUserMutation,
  useLoginUserMutation,
  useUnsubscribeMutation,
  useSubscribeMutation,
  useGetAllsubscriptionsQuery,
  useGetVihiclesByParamsQuery,
  useGetVihiclesDefaultQuery,
  useGetAllUsersQuery,
  useGetAllRequestCallBackQuery,
  useLogoutUserMutation,
  useRemoveUserByIdMutation,
  useGetUserByIdQuery,
  useSuspendAccountMutation,
  useGetVihiclesByOwnerQuery,
  useRemoveVihicleMutation,
  useCreateRequestCallBackMutation,
  useGetRequestCallBackByIdQuery,
  useGetAllPackagesQuery,
  useUpdatePackageMutation,
  useGetPackageByIdQuery,
  useRemovePackageMutation,
  useCreatePackageMutation
} = apiSlice;
