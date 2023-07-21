import axios from 'axios'

export const POST_REVIEW = "POST_REVIEW";

export const postReview = (review) => {
    return async (dispatch) => {
        console.log(review);
        
        const info = await axios.post('http://localhost:3001/reviews', review);
        // const info = await axios.post('https://sportiverse-server.onrender.com/reviews', review);
        
        return dispatch({ type: POST_REVIEW, payload: info.data });

    }
}