import { GET_STORES } from "./Actions/getStores";
import { POST_ACTIVITY } from "./Actions/postActivity";
import { GET_ACTIVITIES } from "./Actions/getActivities";
import { GET_ACT_BY_NAME } from "./Actions/getActByName";
import { GET_ACTIVITY_DETAIL } from "./Actions/getActivityDetail";
import { LOGIN } from "./Actions/login";
import { LOGOUT } from "./Actions/logout";
import { CREATE_USER } from "./Actions/createUser"
import { ORDER_BY_COST, ALL_FILTER, SET_FILTERS, SET_ORDER } from "./Actions/filters";
import { SAVE_RESERVATION } from "./Actions/saveInfoReservation";
import { GET_USER } from "./Actions/getUser";

const initialState = {
  activities: [],
  allActivities: [],
  detail: [],
  stores: [],
  filters: {
    activity: "all",
    ages: "all",
    players: "all"
  },
  order: "",
  clientId: 0,
  isClient: true,
  access: false,
  reservation: {},
  userDetail:[],
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

      // state.order === "ascendent"
      //   ? state.activities.sort((prev, next) => {
      //     if (parseInt(prev.cost) > parseInt(next.cost)) return 1;
      //     if (parseInt(prev.cost) < parseInt(next.cost)) return -1;
      //     return 0;
      //   })
      //   : state.activities.sort((prev, next) => {
      //     if (parseInt(prev.cost) > parseInt(next.cost)) return -1;
      //     if (parseInt(prev.cost) < parseInt(next.cost)) return 1;
      //     return 0;
      //   });
      return {
        ...state,
        activities: filtered,
      };

    case ALL_FILTER:
      let activitiesFiltered = [...state.allActivities]


      if (state.filters.activity !== "all") {
        activitiesFiltered = activitiesFiltered.filter(el => el.name.includes(state.filters.activity))
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
        activity: action.payload.activity,
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
      return {
        ...state,
        clientId: action.payload.id,
        isClient: action.payload.client,
        access: true
      }

      case LOGIN:
        return {
          ...state,
          clientId: 0,
          isClient: true,
          access: false
        }

    case CREATE_USER:
      return {
        ...state,
      }
    
    case GET_USER:
      return{
        ...state, userDetail: action.payload
      }
    case SAVE_RESERVATION:
      return {
        ...state,
        reservation: action.payload
      }

    default:
      return state;
  }
   
};
export default reducer;
