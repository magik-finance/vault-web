import {createAction} from 'redux-actions';

export const FETCH_CLUBS = '[CLUBS] Fetch clubs';
export const fetchClubs = createAction(FETCH_CLUBS);

export const FETCH_CLUBS_SUCCESS = `${FETCH_CLUBS} success`;
export const fetchClubsSuccess = createAction(FETCH_CLUBS_SUCCESS);

export const FETCH_CLUBS_FAIL = `${FETCH_CLUBS} fail`;
export const fetchClubsFail = createAction(FETCH_CLUBS_FAIL);
