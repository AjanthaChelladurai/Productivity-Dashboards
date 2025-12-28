import {configureStore} from "@reduxjs/toolkit"
import tasksreducer from "./tasksSlice"

export const store =configureStore({
    reducer:{
        tasks:tasksreducer,
    }
});

store.subscribe(()=>{
    const state =store.getState();
    localStorage.setItem(
        "tasks",
        JSON.stringify(state.tasks.tasks)
    )
})