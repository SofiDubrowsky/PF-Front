const SORT_ACTIVITIES = "SORT_ACTIVITIES" ;

export default function sortActivities(payload) {
    return {
        type: SORT_ACTIVITIES,
        payload
    }
}