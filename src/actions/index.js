import _ from 'lodash'
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostAndUsers = () => async (dispatch, getState) => {
    // Need to make sure we send entire function into dispatch/reducer pipeline.
    // Wait until fetchPosts API is completed before accessing data.
    await dispatch(fetchPosts());

    // Get an array of unique userIds from posts.
    // const userIds = _.uniq(_.map(getState().posts, 'userId'));
    
    // userIds.forEach(id => dispatch(fetchUser(id)));
    // Don't need to await the fetchUser because it doesn't matter when it is returned?

    // Compact lodash version (lesson 286)
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();   // Executes the chain methods.

    // Promise.all(userIds.map(id => dispatch(fetchUser(id))))
};

export const fetchPosts = () =>
    // return async function(dispatch, getState) {
    async dispatch => {
        const response = await jsonPlaceholder.get('/posts');

        dispatch({
            type: 'FETCH_POSTS',
            payload: response.data
        });
    };

export const fetchUser = (id) =>
    async dispatch => {
        const response = await jsonPlaceholder.get(`/users/${id}`);

        dispatch({
            type: 'FETCH_USER',
            payload: response.data
        });
    }