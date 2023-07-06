export const AGE_FILTER = 'AGE_FILTER';

export default function ageFilter(payload) {
    return {
        type: AGE_FILTER,
        payload
    }
};
