import { GET_STORES } from "./Actions/getStores";
import { POST_ACTIVITY } from "./Actions/postActivity";
import { GET_ACTIVITIES } from "./Actions/getActivities";
import { GET_ACT_BY_NAME } from "./Actions/getActByName";
import { GET_ACTIVITY_DETAIL } from "./Actions/getActivityDetail";
import { ORDER_BY_COST, ALL_FILTER } from "./Actions/filters";

const initialState = {
  activities: [],
  allActivities: [],
  detail: [],
  stores: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACTIVITIES:
     
      return {
        ...state,
        activities: action.payload,
        allActivities: action.payload,
        actFilter: action.payload,
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
      let filtered =
        action.payload === "ascendent"
          ? state.activities.sort((prev, next) => {
              if (parseInt(prev.cost) > parseInt(next.cost)) return 1;
              if (parseInt(prev.cost) < parseInt(next.cost)) return -1;
              return 0;
            })
          : state.activities.sort((prev, next) => {
              if (parseInt(prev.cost) > parseInt(next.cost)) return -1;
              if (parseInt(prev.cost) < parseInt(next.cost)) return 1;
              return 0;
            });
      console.log(filtered);
      return {
        ...state,
        activities: filtered,
      };

    case ALL_FILTER: 
    let activitiesFiltered = [...state.allActivities]


            if(action.payload.activity !== "all"){
              activitiesFiltered = activitiesFiltered.filter(el => el.name.includes(action.payload.activity))
            }
 
            if(action.payload.players !== "all"){
                activitiesFiltered = activitiesFiltered.filter((el) => el.players.includes(action.payload.players));
            }

            if(action.payload.ages !== "all"){
              activitiesFiltered = activitiesFiltered.filter(el => el.age.includes(action.payload.ages))
            }

            return {
                ...state,
                activities: activitiesFiltered,
            }

   
    default:
      return state;
  }
};
export default reducer;
