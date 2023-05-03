import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/api/movieApi";
import { OMDB_API_KEY } from "../../common/api/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    const movieText = "Harry";
    const response = await movieApi.get(
      `?apiKey=${OMDB_API_KEY}&s=${movieText}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fectAsyncShows",
  async () => {
    const seriesText = "Friends";
    const response = await movieApi.get(
      `?apiKey=${OMDB_API_KEY}&s=${seriesText}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetails = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetails",
  async (id) => {
    const response = await movieApi.get(
      `?apiKey=${OMDB_API_KEY}&i=${id}&Plot=full`
    );
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: () => {
      console.log("fetchAsyncMovies pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, action) => {
      console.log("fetchAsyncMovies fetched successfully");
      return { ...state, movies: action.payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      console.log("fetchAsyncMovies rejected");
    },
    [fetchAsyncShows.pending]: () => {
      console.log("fetchAsyncShows pending");
    },
    [fetchAsyncShows.fulfilled]: (state, action) => {
      console.log("fetchAsyncShows fetched successfully");
      return { ...state, shows: action.payload };
    },
    [fetchAsyncShows.rejected]: () => {
      console.log("fetchAsyncMovies rejected");
    },
    [fetchAsyncMovieOrShowDetails.pending]: () => {
      console.log("fetchAsyncMovieOrShowDetails pending");
    },
    [fetchAsyncMovieOrShowDetails.fulfilled]: (state, action) => {
      console.log("fetchAsyncMovieOrShowDetails fetched successfully");
      return { ...state, selectMovieOrShow: action.payload };
    },
    [fetchAsyncMovieOrShowDetails.rejected]: () => {
      console.log("fetchAsyncMovieOrShowDetails rejected");
    },
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMoviesOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;
