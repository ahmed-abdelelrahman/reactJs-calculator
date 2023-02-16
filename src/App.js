import "./App.css";
import { React, useReducer } from "react";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";

// calculator actions
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

// dispatch contain type and payload
// we will pass dispatch (type and payload) as props to digitButton and operationButton components
// in components we will store digit and operation in payload
// using digit and operation by payload.digit and operation.digit

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
}
function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
  }

  return computation.toString();
}
function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className='App '>
      <form className='mx-auto overflow-hidden mt-10 shadow-lg mb-2 bg-purple-900  border rounded-lg lg:w-2/6 md:w-3/6 sm:w-4/6'>
        <div className=''>
          <div className='p-5 text-white text-center text-3xl bg-purple-900'>
            <span className='text-orange-500'>Calcu</span>lator
          </div>
          <div className='pt-16 p-5 pb-0 text-white text-right text-3xl bg-purple-800'>
            <div className='previous-operand'>
              {previousOperand}
              {operation}
            </div>
            <div className='current-operand'>{currentOperand}</div>
          </div>

          <div className='flex items-stretch bg-purple-900 h-24'>
            <div className='flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold'>
              <OperationButton
                operation='%'
                dispatch={dispatch}
                className='rounded-full h-20 w-20 flex items-center bg-purple-800 justify-center shadow-lg border-2 border-purple-700 hover:border-2 hover:border-gray-500 focus:outline-none'
              />
            </div>
            <div className='flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold'>
              <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
                DEL
              </button>
            </div>

            <div className='flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold'>
              <DigitButton
                digit='('
                dispatch={dispatch}
                className='rounded-full h-20 w-20 flex items-center bg-purple-800 justify-center shadow-lg border-2 border-purple-700 hover:border-2 hover:border-gray-500 focus:outline-none'
              />
            </div>

            <div className='flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold'>
              <DigitButton
                digit=')'
                dispatch={dispatch}
                className='rounded-full h-20 w-20 flex items-center bg-purple-800 justify-center shadow-lg border-2 border-purple-700 hover:border-2 hover:border-gray-500 focus:outline-none'
              />
            </div>

            <div className='flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold'>
              <OperationButton
                operation='/'
                dispatch={dispatch}
                className='rounded-full h-20 w-20 flex items-center bg-purple-800 justify-center shadow-lg border-2 border-purple-700 hover:border-2 hover:border-gray-500 focus:outline-none'
              />
            </div>
          </div>

          <div className='flex items-stretch bg-purple-900 h-24'>
            <div className='flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold'>
              <DigitButton
                digit='7'
                dispatch={dispatch}
                className='rounded-full h-20 w-20 flex items-center bg-purple-800 justify-center shadow-lg border-2 border-purple-700 hover:border-2 hover:border-gray-500 focus:outline-none'
              />
            </div>

            <div className='flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold'>
              <DigitButton
                digit='8'
                dispatch={dispatch}
                className='rounded-full h-20 w-20 flex items-center bg-purple-800 justify-center shadow-lg border-2 border-purple-700 hover:border-2 hover:border-gray-500 focus:outline-none'
              />
            </div>

            <div className='flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold'>
              <DigitButton
                digit='9'
                dispatch={dispatch}
                className='rounded-full h-20 w-20 flex items-center bg-purple-800 justify-center shadow-lg border-2 border-purple-700 hover:border-2 hover:border-gray-500 focus:outline-none'
              />
            </div>

            <div className='flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold'>
              <OperationButton
                operation='*'
                dispatch={dispatch}
                className='rounded-full h-20 w-20 flex items-center bg-purple-800 justify-center shadow-lg border-2 border-purple-700 hover:border-2 hover:border-gray-500 focus:outline-none'
              />
            </div>
          </div>

          <div className='flex items-stretch bg-purple-900 h-24'>
            <div className='flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold'>
              <DigitButton
                digit='4'
                dispatch={dispatch}
                className='rounded-full h-20 w-20 flex items-center bg-purple-800 justify-center shadow-lg border-2 border-purple-700 hover:border-2 hover:border-gray-500 focus:outline-none'
              />
            </div>

            <div className='flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold'>
              <DigitButton
                digit='5'
                dispatch={dispatch}
                className='rounded-full h-20 w-20 flex items-center bg-purple-800 justify-center shadow-lg border-2 border-purple-700 hover:border-2 hover:border-gray-500 focus:outline-none'
              />
            </div>

            <div className='flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold'>
              <DigitButton
                digit='6'
                dispatch={dispatch}
                className='rounded-full h-20 w-20 flex items-center bg-purple-800 justify-center shadow-lg border-2 border-purple-700 hover:border-2 hover:border-gray-500 focus:outline-none'
              />
            </div>

            <div className='flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold'>
              <OperationButton
                operation='-'
                dispatch={dispatch}
                className='rounded-full h-20 w-20 flex items-center bg-purple-800 justify-center shadow-lg border-2 border-purple-700 hover:border-2 hover:border-gray-500 focus:outline-none'
              />
            </div>
          </div>

          <div className='flex items-stretch bg-purple-900 h-24'>
            <div className='flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold'>
              <DigitButton
                digit='1'
                dispatch={dispatch}
                className='rounded-full h-20 w-20 flex items-center bg-purple-800 justify-center shadow-lg border-2 border-purple-700 hover:border-2 hover:border-gray-500 focus:outline-none'
              />
            </div>
            <div className='flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold'>
              <DigitButton
                digit='2'
                dispatch={dispatch}
                className='rounded-full h-20 w-20 flex items-center bg-purple-800 justify-center shadow-lg border-2 border-purple-700 hover:border-2 hover:border-gray-500 focus:outline-none'
              />
            </div>

            <div className='flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold'>
              <DigitButton
                digit='3'
                dispatch={dispatch}
                className='rounded-full h-20 w-20 flex items-center bg-purple-800 justify-center shadow-lg border-2 border-purple-700 hover:border-2 hover:border-gray-500 focus:outline-none'
              />
            </div>

            <div className='flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold'>
              <OperationButton
                operation='+'
                dispatch={dispatch}
                className='rounded-full h-20 w-20 flex items-center bg-purple-800 justify-center shadow-lg border-2 border-purple-700 hover:border-2 hover:border-gray-500 focus:outline-none'
              />
            </div>
          </div>

          <div className='flex items-stretch bg-purple-900 h-24 mb-4'>
            <div className='flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold'>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch({ type: ACTIONS.CLEAR });
                }}
              >
                AC
              </button>
            </div>

            <div className='flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold'>
              <DigitButton
                digit='0'
                dispatch={dispatch}
                className='rounded-full h-20 w-20 flex items-center bg-purple-800 justify-center shadow-lg border-2 border-purple-700 hover:border-2 hover:border-gray-500 focus:outline-none'
              />
            </div>

            <div className='flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold'>
              <DigitButton
                digit='.'
                dispatch={dispatch}
                className='rounded-full h-20 w-20 flex items-center bg-purple-800 justify-center shadow-lg border-2 border-purple-700 hover:border-2 hover:border-gray-500 focus:outline-none'
              />
            </div>

            <div className='flex-1 px-2 py-2 justify-center flex items-center text-white text-2xl font-semibold'>
              <button
                className='p-2'
                onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
              >
                =
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
