//import { GET_ACTIVITIES, SORT_ACTIVITIES, GET_PLAYERS, GET_AGES, PLAYERS_FILTER, AGE_FILTER } from './Actions';
//import { GET_ACT_BY_NAME, ACT_ORIGIN, GET_ACTIVITY_DETAIL } from './Actions';

const initialState = {
    activities: [],
    actfilter: [],
    players: [],
    ages: [],
    detail:[]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ACTIVITIES':
            if (action.payload) {
                return {
                    ...state,
                    activities: action.payload,
                    actfilter: action.payload
                }
            } else {
                return {
                    ...state,
                    activities: []
                }
            }
        case 'GET_ACT_BY_NAME':
            return {
                ...state,
                activities: action.payload
            }
        case 'GET_PLAYERS':
            return {
                ...state,
                players: action.payload
            }
        case 'GET_AGES':
            return {
                ...state,
                ages: action.payload
            }
        case 'PLAYERS_FILTER':
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
        case 'AGE_FILTER':
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
        case 'ACT_ORIGIN':
            const originAct = state.actfilter
            const originfilter = action.payload === 'DB' ? originAct.filter(p => p.origin === 'DB') : originAct.filter(p => p.origin === 'API')
            return {
                ...state,
                activities: action.payload === 'All' ? state.actfilter : originfilter
            }

        case GET_ACTIVITY_DETAIL:
                return{...state, detail:action.payload}

        case 'SORT_ACTIVITIES':
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