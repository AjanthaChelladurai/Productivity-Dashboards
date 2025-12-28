import { createSlice } from "@reduxjs/toolkit";

const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];                                            

const tasksSlice = createSlice({
    name : "tasks",
    initialState :{
        tasks:savedTasks,
    },
    reducers:{
        addTask:(state,action) => {
            state.tasks.push(action.payload);
        },
        deleteTask : (state,action) => {
            state.tasks=state.tasks.filter((task) =>task.id !== action.payload )
        } ,
        updateTask: (state,action) => {
            const index = state.tasks.findIndex((task) => task.id === action.payload.id )
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
            
       },
       updateStatus : (state,action) =>{
        const {id,status} = action.payload;
        const task = state.tasks.find((t) => t.id === id);
        if (task) {
            task.status=status;
        }
       }
    
    }
})

export const {
    addTask,
    deleteTask,
    updateTask,
    updateStatus
} = tasksSlice.actions;

export default tasksSlice.reducer;