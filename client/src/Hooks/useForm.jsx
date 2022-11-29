import { useReducer } from "react";

export const useForm = (initialState) => {
  const reducer = (state, payload) => {
    return {
      ...state,
      [payload.field]: payload.value
    };
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const handleChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };
  return {
    state,
    bind: {
      onChange: handleChange
    }
  };
};
