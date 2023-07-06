import { AGE_FILTER } from '.';

export default function ageFilter(payload) {
    return {
        type: AGE_FILTER,
        payload
    }
};
