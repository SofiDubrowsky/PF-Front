import { GET_STORES } from "./Actions/getStores";
import { POST_ACTIVITY } from "./Actions/postActivity";
import { GET_ACTIVITIES } from "./Actions/getActivities";
import { GET_ACT_BY_NAME } from "./Actions/getActByName";
import { GET_ACTIVITY_DETAIL } from "./Actions/getActivityDetail";
import { LOGIN } from "./Actions/login";
import { LOGIN_GOOGLE } from "./Actions/loginGoogle";
import { LOGOUT } from "./Actions/logout";
import { CREATE_USER } from "./Actions/createUser"
import { ORDER_BY_COST, ALL_FILTER, SET_FILTERS, SET_ORDER } from "./Actions/filters";
import { SAVE_RESERVATION } from "./Actions/saveInfoReservation";
import { POST_RESERVATION } from "./Actions/postReservation";
import { GET_USER } from "./Actions/getUser";
import {GET_RESERVATIONS} from "./Actions/getReservations";


const initialState = {
  activities: [],
  allActivities: [],
  detail: [],
  stores: [],
  filters: {
    store: "all",
    ages: "all",
    players: "all"
  },
  order: "",
  clientId: 0,
  isClient: true,
  access: false,
  reservation: {},
  userDetail: [],
  allReservations: [],

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
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


    case ORDER_BY_COST:
      let filtered = [...state.activities]
      if (state.order === "ascendent") {
        filtered = state.activities.sort((prev, next) => {
          if (parseInt(prev.cost) > parseInt(next.cost)) return 1;
          if (parseInt(prev.cost) < parseInt(next.cost)) return -1;
          return 0;
        })
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
      let activitiesFiltered = [...state.allActivities]

      if (state.filters.store !== "all") {
        activitiesFiltered = activitiesFiltered.filter(el => el.stores[0]?.name.includes(state.filters.store))
      }

      if (state.filters.players !== "all") {
        activitiesFiltered = activitiesFiltered.filter((el) => el.players.includes(state.filters.players));
      }

      if (state.filters.ages !== "all") {
        activitiesFiltered = activitiesFiltered.filter(el => el.age.includes(state.filters.ages))
      }

      return {
        ...state,
        activities: activitiesFiltered,
      }

    case SET_FILTERS:
      const filtersChanged = {
        store: action.payload.store,
        ages: action.payload.ages,
        players: action.payload.players
      }
      return {
        ...state,
        filters: filtersChanged
      }

    case SET_ORDER:
      return {
        ...state,
        order: action.payload
      }

    case LOGIN:
      console.log(action.payload);
      localStorage.setItem("clientId", action.payload.user.id)
      localStorage.setItem("isClient", action.payload.user.client)
      /* localStorage.setItem("access", true) */
      return {
        ...state,
        clientId: action.payload.id,
        isClient: action.payload.client,
        access: true
      }

    case LOGOUT:

      return {
        ...state,
        clientId: 0,
        isClient: true,
        access: false
      }

    case LOGIN_GOOGLE:
      localStorage.setItem("clientId", action.payload.id)
      localStorage.setItem("isClient", action.payload.client)
      localStorage.setItem("loger", true)
      console.log(action.payload);
      return {
        ...state,
        clientId: action.payload.id,
        isClient: action.payload.client,
        access: true
      }

    case CREATE_USER:
      return {
        ...state,
      }
    case GET_USER:
      return {
        ...state, userDetail: action.payload
      }
    

    case SAVE_RESERVATION:
      return {
        ...state,
        reservation: action.payload
      }

    case GET_RESERVATIONS:
      return{
        ...state,
        allReservations: action.payload
      }

    default:
      return state;
  }

};
export default reducer;
