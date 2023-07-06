import { GET_STORES } from "./Actions/getStores";
import { POST_ACTIVITY } from "./Actions/postActivity";
import { GET_ACTIVITIES } from "./Actions/getActivities";
import { GET_ACT_BY_NAME } from "./Actions/getActByName";
import { GET_PLAYERS } from "./Actions/getPlayers";
import { GET_ACTIVITY_DETAIL } from "./Actions/getActivityDetail";
import { PLAYERS_FILTER } from "./Actions/playersFilter";
import { AGE_FILTER } from "./Actions/ageFilter";
import { ACT_ORIGIN } from "./Actions/actOrigin";
import { SORT_ACTIVITIES } from "./Actions/sortActivities";

//la unica que me falto fue 'GET_AGES', que no la encontre dentro de las actions 

const initialState = {
    activities: [],
    actFilter: [],
    players: [],
    ages: [],
    detail:[],
    stores:[],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ACTIVITIES:
            if (action.payload) {
                return {
                    ...state,
                    activities: action.payload,
                    actFilter: action.payload
                }
            } else {
                return {
                    ...state,
                    activities: []
                }
            }

        case GET_STORES:
            return { ...state, stores: action.payload };

        case GET_ACT_BY_NAME:
            return {
                ...state,
                activities: action.payload
            }
        case GET_PLAYERS:
            return {
                ...state,
                players: action.payload
            }
        case 'GET_AGES':
            return {
                ...state,
                ages: action.payload
            }

        case POST_ACTIVITY: 
            return { ...state}

        case PLAYERS_FILTER:
            const allActivities = state.actfilter
            const playerfilter = action.payload === 'All' ? allActivities : allActivities.filter(p => p.players.includes(action.payload))
            if (playerfilter.length === 0) {
                alert(`No activities found for ${action.payload} players`)
                return state
            } else {
                return {
                    ...state,
                    activities: playerfilter
                }
            }
        case AGE_FILTER:
            const agefilter = action.payload === 'All' ? allActivities : allActivities.filter(p => p.ages.includes(action.payload))
                if (agefilter.length === 0) {
                    alert(`No activities found for ${action.payload} ages`)
                    return state
                } else {
                    return {
                        ...state,
                        activities: agefilter
                    }
                }
        case ACT_ORIGIN:
            const originAct = state.actfilter
            const originfilter = action.payload === 'DB' ? originAct.filter(p => p.origin === 'DB') : originAct.filter(p => p.origin === 'API')
            return {
                ...state,
                activities: action.payload === 'All' ? state.actfilter : originfilter
            }

        case GET_ACTIVITY_DETAIL:
                return{...state, detail:action.payload}

        case SORT_ACTIVITIES:
            if (action.payload === 'valoration') {
                let sortedArr = state.activities.sort(function (a, b) {
                    if (a.valoration > b.valoration) {
                        return -1;
                    }
                    if (b.valoration > a.valoration) {
                        return 1;
                    }
                    return 0;
                })
                return {
                    ...state,
                    activities: sortedArr
                }
            } else {
                let sortedArr = action.payload === 'asc' ?
                    state.activities.sort(function (a, b) {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (b.name > a.name) {
                            return -1;
                        }
                        return 0;
                    }) :
                    state.activities.sort(function (a, b) {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (b.name > a.name) {
                            return 1;
                        }
                        return 0;
                    })
                return {
                    ...state,
                    activities: sortedArr
                }
            }
        default:
            return state;
    }
}    
export default reducer;
