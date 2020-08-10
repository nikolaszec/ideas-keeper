/* eslint-disable no-unused-vars */
import SESSION_ACTION_TYPE from './sessionTypes';
import { firestore } from '../../firebase/firebase.util';
import { v4 as getRandomId } from 'uuid';
import dayjs from 'dayjs';

export const setCurrentUser = (currentUser) => ({
  type: SESSION_ACTION_TYPE.SET_CURRENT_USER,
  payload: currentUser,
});

export const loadingStart = () => ({
  type: SESSION_ACTION_TYPE.LOADING_START,
});

export const loadingEnd = () => ({
  type: SESSION_ACTION_TYPE.LOADING_END,
});

export const setIdeas = (ideas) => ({
  type: SESSION_ACTION_TYPE.SET_IDEAS,
  payload: ideas,
});

export const setSuccessMessage = (message) => ({
  type: SESSION_ACTION_TYPE.SET_SUCCESS_MESSAGE,
  payload: message,
});

export const setError = (error) => ({
  type: SESSION_ACTION_TYPE.SET_ERROR,
  payload: error,
});

export const logout = () => ({
  type: SESSION_ACTION_TYPE.LOGOUT,
});
export const login = () => ({
  type: SESSION_ACTION_TYPE.LOGIN,
});

//ASYNC CRUD OPERATIONS

export const createIdeaAsync = (idea) => async (dispatch, getState) => {
  if (!idea) return;
  dispatch(loadingStart());
  try {
    const userId = getState().session.currentUser.id;
    const ideaRef = firestore.doc(`ideas/${userId}`);
    const snapshot = await ideaRef.get();
    const randomId = getRandomId();
    if (!snapshot.exists) {
      const newIdeas = [
        {
          id: `${randomId}`,
          createdAt: dayjs().format(),
          ...idea,
        },
      ];
      ideaRef
        .set({
          list: newIdeas,
        })
        .then(() => {
          dispatch(setIdeas(newIdeas));
          dispatch(setSuccessMessage('Idea created!'));
          return new Promise((resolve, reject) => resolve());
        });
    } else {
      const updatedIdeas = [
        {
          id: `${randomId}`,
          createdAt: dayjs().format(),
          ...idea,
        },
        ...snapshot.data().list,
      ];
      ideaRef
        .set({
          list: updatedIdeas,
        })
        .then(() => {
          dispatch(setIdeas(updatedIdeas));
          dispatch(setSuccessMessage('New idea added!'));
          return new Promise((resolve, reject) => resolve());
        });
    }
  } catch ({ error }) {
    dispatch(setError('Something went wrong.'));
  }
};

export const getIdeasAsync = () => async (dispatch, getState) => {
  dispatch(loadingStart());
  try {
    const ideasRef = firestore.doc(
      `ideas/${getState().session.currentUser.id}`,
    );
    const snapshot = await ideasRef.get();
    if (snapshot.exists) {
      const userIdeas = snapshot.data().list;
      dispatch(setIdeas(userIdeas));
      dispatch(loadingEnd());
    } else {
      dispatch(loadingEnd());
    }
  } catch (error) {
    dispatch(setError('Something went wrong.'));
  }
};

export const updateIdeaAsync = (updatedValues, ideaId) => async (
  dispatch,
  getState,
) => {
  if (!updatedValues || !ideaId) return;
  dispatch(loadingStart());
  try {
    const userId = getState().session.currentUser.id;
    const currentList = getState().session.ideas;
    const ideaRef = firestore.doc(`ideas/${userId}`);
    const snapshot = await ideaRef.get();
    if (snapshot.exists) {
      const objToUpdIndex = currentList.findIndex((idea) => idea.id === ideaId);
      const newIdeas = [...currentList];

      newIdeas[objToUpdIndex] = {
        ...updatedValues,
      };

      ideaRef
        .update({
          list: [...newIdeas],
        })
        .then(() => {
          dispatch(setIdeas([...newIdeas]));
          dispatch(setSuccessMessage('Updated successfully!'));
          return new Promise((resolve) => resolve());
        });
    }
  } catch ({ error }) {
    dispatch(setError('Something went wrong.'));
  }
};

export const deleteIdeaAsync = (ideaId) => async (dispatch, getState) => {
  if (!ideaId) return;
  dispatch(loadingStart());
  try {
    const userId = getState().session.currentUser.id;
    const ideasRef = firestore.doc(`ideas/${userId}`);
    const ideas = getState().session.ideas;
    const snapshot = await ideasRef.get();
    const isLast = ideas.length === 1;

    if (isLast) {
      ideasRef.delete().then(() => {
        dispatch(setIdeas([]));
        dispatch(setSuccessMessage('Deleted!'));
      });
    } else {
      const userIdeas = snapshot.data().list;
      const updatedIdeas = userIdeas.filter((idea) => idea.id !== ideaId);
      ideasRef
        .set({
          list: updatedIdeas,
        })
        .then(() => {
          dispatch(setIdeas(updatedIdeas));
          dispatch(setSuccessMessage('Deleted successfuly!'));
        });
    }
  } catch (error) {
    console.log(error);
    dispatch(setError('Something went wrong.'));
  }
};
