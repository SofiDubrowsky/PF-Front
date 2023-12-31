import { GET_ACTIVITIES } from "./Actions/getActivities";
import { GET_ACT_BY_NAME } from "./Actions/getActByName";
import { GET_ACTIVITY_DETAIL } from "./Actions/getActivityDetail";
import { POST_ACTIVITY } from "./Actions/postActivity";
import { UPDATE_ACTIVITY } from "./Actions/updateActivity";
import { DELETE_ACTIVITY } from "./Actions/deleteActivity";
import { LOGIN } from "./Actions/login";
import { LOGIN_GOOGLE } from "./Actions/loginGoogle";
import { LOGOUT } from "./Actions/logout";
import { CREATE_USER } from "./Actions/createUser";
import { GET_RESERVATIONS } from "./Actions/getReservations";
import { SAVE_RESERVATION } from "./Actions/saveInfoReservation";
import { POST_RESERVATION } from "./Actions/postReservation";
import { DELETE_RESERVATION } from "./Actions/deleteReservations";
import { GET_USER } from "./Actions/getUser";
import { GET_ALL_USERS } from "./Actions/getAllUsers";
import { GET_USER_BY_NAME } from "./Actions/getUserByName";
import { GET_USER_BY_EMAIL } from "./Actions/getUserByEmail";
import { PUT_USER } from "./Actions/updateUser";
import { DELETE_USER } from "./Actions/deleteUser";
import { GET_STORES } from "./Actions/getStores";
import { POST_STORE } from "./Actions/postStore";
import { DELETE_STORE } from "./Actions/deleteStore";
import { POST_REVIEW } from "./Actions/postReview";
import { GET_ADMINS } from "./Actions/getAdmin";
import {
  ORDER_BY_COST,
  ALL_FILTER,
  SET_FILTERS,
  SET_ORDER,
} from "./Actions/filters";
import {
  ORDER_BY_DATE,
  ALL_FILTERS_ADMIN,
  SET_FILTERS_ADMIN,
  SET_ORDER_BY_DATE,
} from "./Actions/filtersAdmin";
import { GET_BAN_USERS } from "./Actions/getBanUsers";
import { SET_FILTER_STATS } from "./Actions/filterStats";
import { RESTORE_USER } from "./Actions/restoreUser";
import { GET_USER_BAN_BY_NAME } from "./Actions/getUsersBanByName";
import { EDIT_ADMIN } from "./Actions/editAdmin";



const initialState = {
  activities: [],
  allActivities: [],
  detail: [],
  stores: [],
  filters: {
    store: "all",
    ages: "all",
    players: "all",
  },
  filtersAdmin: {
    store: "all",
    activity: "all",
    date: "",
  },
  filtersStats: "",
  order: "",
  orderDate: "",
  clientId: 0,
  isClient: true,
  access: false,
  reservation: {},
  userDetail: [],
  allReservations: [],
  reservationsFiltered: [],
  reservationsStatsFiltered: [],
  allUsers: [],
  UserFiltered: [],
  banUsers: [],
  banUsersFiltered: [],
  admins: []

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMINS:
      return {
        ...state,
        admins: action.payload
      }

    case GET_USER_BAN_BY_NAME:
      let banFiltered = state.banUsers
      let result = banFiltered.filter(user => user.name.toLowerCase().includes(action.payload.toLowerCase()))
      if (action.payload === '' ) {
        result = banFiltered
      }
      return{
        ...state,
        banUsersFiltered: result
      }

    case RESTORE_USER:
      return{
        ...state
      }

    case GET_BAN_USERS:
      return {
        ...state,
        banUsers: action.payload,
        banUsersFiltered: action.payload
      }

    case GET_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
        allActivities: action.payload,
      };

    case GET_STORES:
      return { ...state, stores: action.payload };

    case GET_ACT_BY_NAME:
      return {
        ...state,
        activities: action.payload,
      };
    case GET_ACTIVITY_DETAIL:
      return { ...state, detail: action.payload };

    case POST_ACTIVITY:
      return { ...state };

    case POST_RESERVATION:
      return { ...state };

    case POST_STORE:
      return { ...state };

    case DELETE_STORE:
      return {
        ...state,
      };

    case POST_REVIEW:
      return { ...state };

    case ORDER_BY_COST:
      let filtered = [...state.activities];
      if (state.order === "ascendent") {
        filtered = state.activities.sort((prev, next) => {
          if (parseInt(prev.cost) > parseInt(next.cost)) return 1;
          if (parseInt(prev.cost) < parseInt(next.cost)) return -1;
          return 0;
        });
      }
      if (state.order === "descendent") {
        filtered = state.activities.sort((prev, next) => {
          if (parseInt(prev.cost) > parseInt(next.cost)) return -1;
          if (parseInt(prev.cost) < parseInt(next.cost)) return 1;
          return 0;
        });
      }
      return {
        ...state,
        activities: filtered,
      };

    case ALL_FILTER:
      let activitiesFiltered = [...state.allActivities];

      if (state.filters.store !== "all") {
        activitiesFiltered = activitiesFiltered.filter((el) =>
          el.stores[0]?.name.includes(state.filters.store)
        );
      }

      if (state.filters.players !== "all") {
        activitiesFiltered = activitiesFiltered.filter((el) =>
          el.players.includes(state.filters.players)
        );
      }

      if (state.filters.ages !== "all") {
        activitiesFiltered = activitiesFiltered.filter((el) =>
          el.age.includes(state.filters.ages)
        );
      }

      return {
        ...state,
        activities: activitiesFiltered,
      };

    case SET_FILTERS:
      const filtersChanged = {
        store: action.payload.store,
        ages: action.payload.ages,
        players: action.payload.players,
      };
      return {
        ...state,
        filters: filtersChanged,
      };

    case SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };

    case LOGIN:
      localStorage.setItem("clientId", action.payload.user.id);
      localStorage.setItem("isClient", action.payload.user.client);
      /* localStorage.setItem("access", true) */
      return {
        ...state,
        clientId: action.payload.id,
        isClient: action.payload.client,
        access: true,
      };

    case LOGOUT:
      return {
        ...state,
        clientId: 0,
        isClient: true,
        access: false,
      };

    case LOGIN_GOOGLE:
      localStorage.setItem("clientId", action.payload.id);
      localStorage.setItem("isClient", action.payload.client);
      localStorage.setItem("loger", true);
      return {
        ...state,
        clientId: action.payload.id,
        isClient: action.payload.client,
        access: true,
      };

    case CREATE_USER:
      return {
        ...state,
      };
    case GET_USER:
      return {
        ...state,
        userDetail: action.payload,
      };

    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
        UserFiltered: action.payload
      };

    case GET_USER_BY_NAME:
      let UserAux = state.allUsers
      let result1 = UserAux.filter(user => user.name.toLowerCase().includes(action.payload.toLowerCase()))
      if (action.payload === '' ) {
        result1 = UserAux
      }
      return{
        ...state,
        UserFiltered: result1
      }

    case GET_USER_BY_EMAIL:
      let reservationsAll = state.allReservations
      let reservationSearched = reservationsAll.filter((reservation) => reservation.user.email === action.payload)
      if(action.payload === ''){
        reservationSearched=reservationsAll;
      }
      return {
        ...state,
        reservationsFiltered: reservationSearched,
      };

    case DELETE_USER:
      return {
        ...state,
      };

    case DELETE_ACTIVITY:
      return {
        ...state,
      };

    case UPDATE_ACTIVITY:
      return {
        ...state,
      };

    case PUT_USER:
      return { ...state };

    case SAVE_RESERVATION:
      return {
        ...state,
        reservation: action.payload,
      };

    case GET_RESERVATIONS:
      return {
        ...state,
        allReservations: action.payload,
        reservationsFiltered: action.payload,
        reservationsStatsFiltered: action.payload
      };

    case DELETE_RESERVATION:
      return {
        ...state,
        reservation: action.payload,
      };

    case ALL_FILTERS_ADMIN:
      let activityFiltered = [...state.allReservations];

      if (state.filtersAdmin.store !== "all") {
        activityFiltered = activityFiltered.filter((el) =>
          el.activity?.stores[0]?.name.includes(state.filtersAdmin.store)
        );
      }

      if (state.filtersAdmin.activity !== "all") {
        activityFiltered = activityFiltered.filter((el) =>
          el.activity?.name.includes(state.filtersAdmin.activity)
        );
      }

      if (state.filtersAdmin.date) {
        activityFiltered = activityFiltered.filter((element) =>
          element.date?.includes(state.filtersAdmin.date)
        );
      }

      return {
        ...state,
        reservationsFiltered: activityFiltered,
      };

    case SET_FILTERS_ADMIN:
      const changedFilter = {
        activity: action.payload.activity,
        store: action.payload.store,
        date: action.payload.date,
      };
      return {
        ...state,
        filtersAdmin: changedFilter,
      };

    case SET_ORDER_BY_DATE:
      return {
        ...state,
        orderDate: action.payload,
      };

    case ORDER_BY_DATE:
      let ordered = [...state.reservationsFiltered];
      if (state.orderDate === "ascendent") {
        ordered = state.reservationsFiltered.sort((prev, next) => {
          if (parseInt(prev.id) > parseInt(next.id)) return 1;
          if (parseInt(prev.id) < parseInt(next.id)) return -1;
          return 0;
        });
      }
      if (state.orderDate === "descendent") {
        ordered = state.reservationsFiltered.sort((prev, next) => {
          if (parseInt(prev.id) > parseInt(next.id)) return -1;
          if (parseInt(prev.id) < parseInt(next.id)) return 1;
          return 0;
        });
      }
      return {
        ...state,
        reservationsFiltered: ordered,
      };

    case SET_FILTER_STATS:
      let reservations = state.allReservations
      let filter = []
      if (action.payload === "all") {
        filter = reservations
      } else {
        filter = reservations.filter(activity => activity.date.includes(action.payload))
      }
      return {
        ...state,
        reservationsStatsFiltered: filter
      }

    case EDIT_ADMIN:
      return{
        ...state
      }

    default:
      return state;
  }
};
export default reducer;
