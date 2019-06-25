import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


export const addComment = (dishId, rating, author, comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment
    }
});
//Dishes Actions
export const fetchDishes = () => (dispatch) => {
    dispatch(dishesLoading(true));
    return fetch(baseUrl + 'dishes')
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)));
}

export const dishesLoading = () =>({
    type: ActionTypes.DISHES_LOADING
})

export const dishesFailed = (errmess)=>({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
})

export const addDishes = (dishes)=>({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})

// Comments Actions
export const fetchComments = () => (dispatch) => {
    dispatch(dishesLoading(true));
    return fetch(baseUrl + 'comments')
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)));
}

export const commentsFailed = (errmess)=>({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
})

export const addComments = (comments)=>({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})
// Promotion Actions
export const fetchPromos= () => (dispatch) => {
    dispatch(promosLoading(true));
    return fetch(baseUrl + 'promotions')
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)));
}

export const promosLoading = () =>({
    type: ActionTypes.PROMOS_LOADING
})

export const promosFailed = (errmess)=>({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
})

export const addPromos = (promos)=>({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
})

// Leaders Action
export const fetchLeaders= () => (dispatch) => {
    dispatch(leadersLoading(true));
    return fetch(baseUrl + 'leaders')
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)));
}

export const leadersLoading = () =>({
    type: ActionTypes.LEADERS_LOADING
})

export const leadersFailed = (errmess)=>({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
})

export const addLeaders = (leaders)=>({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})