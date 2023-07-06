export const PLAYERS_FILTER = "PLAYERS_FILTER";

export default function playersFilter(payload) {
    return {
        type: PLAYERS_FILTER,
        payload
    }
}
