import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
    name: "data",
    initialState: {
        datos: null,
    },
    reducers: {
        actualizarDatos: (state, action) => {
            state.datos = action.payload;
        },
        setOverview(state, action) {
            state.overview = action.payload;
        },
    },
});

export const { actions, reducer, setOverview } = dataSlice;
export default dataSlice;
