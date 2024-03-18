import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ITodo {
    id: number,
    todo: string
}

const entityAdapter = createEntityAdapter<ITodo>({})

const initialState = entityAdapter.getInitialState()

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: entityAdapter.addOne,
        updateOneTodo: entityAdapter.setOne,
        deleteOneTodo: entityAdapter.removeOne,
    },  
})

export const { addTodo,updateOneTodo,deleteOneTodo } = todoSlice.actions;
const selectTodos = (rootState: RootState) => rootState.todos

export const {
    selectAll: selectAllTodos, //good for loop rendering
  } = entityAdapter.getSelectors(selectTodos)

export default todoSlice;
