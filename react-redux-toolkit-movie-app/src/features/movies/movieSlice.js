import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/api/movieApi";
import { OMDB_API_KEY } from "../../common/api/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (term) => {
    const response = await movieApi.get(
      `?apiKey=${OMDB_API_KEY}&s=${term}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fectAsyncShows",
  async (term) => {
    const response = await movieApi.get(
      `?apiKey=${OMDB_API_KEY}&s=${term}&type=series`
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
  // extraReducers: {
  //   [fetchAsyncMovies.pending]: () => {
  //     console.log("fetchAsyncMovies pending");
  //   },
  //   [fetchAsyncMovies.fulfilled]: (state, action) => {
  //     console.log("fetchAsyncMovies fetched successfully");
  //     state.movies = action.payload;
  //     // return { ...state, movies: action.payload };
  //   },
  //   [fetchAsyncMovies.rejected]: () => {
  //     console.log("fetchAsyncMovies rejected");
  //   },
  //   [fetchAsyncShows.pending]: () => {
  //     console.log("fetchAsyncShows pending");
  //   },
  //   [fetchAsyncShows.fulfilled]: (state, action) => {
  //     console.log("fetchAsyncShows fetched successfully");
  //     state.shows = action.payload;
  //     /// return { ...state, shows: action.payload };
  //   },
  //   [fetchAsyncShows.rejected]: () => {
  //     console.log("fetchAsyncMovies rejected");
  //   },
  //   [fetchAsyncMovieOrShowDetails.pending]: () => {
  //     console.log("fetchAsyncMovieOrShowDetails pending");
  //   },
  //   [fetchAsyncMovieOrShowDetails.fulfilled]: (state, action) => {
  //     console.log("fetchAsyncMovieOrShowDetails fetched successfully");
  //     state.selectMovieOrShow = action.payload
  //     // return { ...state, selectMovieOrShow: action.payload };
  //   },
  //   [fetchAsyncMovieOrShowDetails.rejected]: () => {
  //     console.log("fetchAsyncMovieOrShowDetails rejected");
  //   },
  // },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncMovies.pending, () => {
      console.log("fetchAsyncMovies pending");
    });
    builder.addCase(fetchAsyncMovies.fulfilled, (state, action) => {
      console.log("fetchAsyncMovies fetched successfully");
      state.movies = action.payload;
    });
    builder.addCase(fetchAsyncMovies.rejected, () => {
      console.log("fetchAsyncMovies rejected");
    });
    builder.addCase(fetchAsyncShows.pending, () => {
      console.log("fetchAsyncMovies pending");
    });
    builder.addCase(fetchAsyncShows.fulfilled, (state, action) => {
      console.log("fetchAsyncMovies fetched successfully");
      state.shows = action.payload;
    });
    builder.addCase(fetchAsyncShows.rejected, () => {
      console.log("fetchAsyncMovies rejected");
    });
    builder.addCase(fetchAsyncMovieOrShowDetails.pending, () => {
      console.log("fetchAsyncMovies pending");
    });
    builder.addCase(fetchAsyncMovieOrShowDetails.fulfilled, (state, action) => {
      console.log("fetchAsyncMovies fetched successfully");
      state.selectMovieOrShow = action.payload;
    });
    builder.addCase(fetchAsyncMovieOrShowDetails.rejected, () => {
      console.log("fetchAsyncMovies rejected");
    });
  }
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMoviesOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;
