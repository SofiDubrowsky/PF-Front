import { GET_STORES } from "./Actions/getStores";
import { POST_ACTIVITY } from "./Actions/postActivity";
import { GET_ACTIVITIES } from "./Actions/getActivities";
import { GET_ACT_BY_NAME } from "./Actions/getActByName";
import { GET_ACTIVITY_DETAIL } from "./Actions/getActivityDetail";
import { LOGIN } from "./Actions/login";
import { CREATE_USER } from "./Actions/createUser"
import { ORDER_BY_COST, ALL_FILTER, SET_FILTERS, SET_ORDER } from "./Actions/filters";

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
  order: ""
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
      }

    case CREATE_USER:
      return {
        ...state,
      }

    default:
      return state;
  }
};
export default reducer;
