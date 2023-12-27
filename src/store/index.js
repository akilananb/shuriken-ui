import { BehaviorSubject } from "rxjs";

const initialState = {
  user: null,
  todos: [],
  loading: false,
};

const subject = new BehaviorSubject(initialState);

const store = {
  subscribe: (setState) => subject.subscribe(setState),

  updateState: (newState) => {
    subject.next({ ...subject.value, ...newState });
  },

  currentState: () => subject.value,
};

export default store;
