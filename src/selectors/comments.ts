import {RootState} from "../store/store";
import {createSelector} from "reselect";
import Comment from "../models/comment";

const MAX_COMMENTS_COUNT = 10;

const sortCommentsByDate = (comments: Comment[]) => {
  return [...comments].sort((c1, c2) => Date.parse(c2.date) - Date.parse(c1.date));
};

const selectComments = (state: RootState) => state.offer.comments;
export const selectCommentsCount = (state: RootState) => state.offer.comments.length;

export const selectLastComments = createSelector(
    selectComments,
    (comments) => sortCommentsByDate(comments).slice(0, MAX_COMMENTS_COUNT)
);
