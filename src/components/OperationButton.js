import { ACTIONS } from "../App";

export default function OperationButton({ dispatch, operation }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } });
      }}
    >
      {operation}
    </button>
  );
}
