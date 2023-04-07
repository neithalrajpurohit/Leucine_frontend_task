import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = `https://gateway.marvel.com/v1/public/characters?ts=1632998235&apikey=ff7d1b4aefa575448f941959adefe76d&hash=bc74402412971310d7a50ccd0dff3c7b`;

const initialState = {
    allCharacters: [],
    isLoading: false,
    isSearching: false,
    error: null,
    searchResults: [],
    savedCharacters: [],
};

/**
 * @param {pageNum}
 * @description async thunk for fetching character list
 */
export const fetchCharacters = createAsyncThunk(
    "characters/fetch",
    async (data, { rejectWithValue }) => {
        // if pageNum is not prvided then use the default value of 1
        const { pageNum = 1 } = data;

        // fetch only 3 results
        const LIMIT = 3;
        //based on LIMIT calculate the offset i.e. how many items to skip
        const OFFSET = LIMIT * pageNum;

        try {
            const response = await axios.get(
                `${BASE_URL}&limit=${LIMIT}&offset=${OFFSET}`
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

/**
 * @param {searchQuery} {pageNum}
 * @description async thunk for searching character based on given search query
 */
export const searchCharacters = createAsyncThunk(
    "characters/search",
    async (data, { rejectWithValue }) => {
        const { searchQuery } = data;

        // Cancel any previous request
        axios.CancelToken.source().cancel();

        try {
            const response = await axios.get(
                `${BASE_URL}&nameStartsWith=${searchQuery}`,
                { cancelToken: axios.CancelToken.source().token }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const characterSlice = createSlice({
    name: "character",
    initialState,
    reducers: {
        saveCharacter: (state, action) => {
            const { character } = action.payload;

            // first try to get all previous saved characters from localstorgae
            let prevSavedCharacters = localStorage.getItem("character");
            if (prevSavedCharacters) {
                prevSavedCharacters = JSON.parse(prevSavedCharacters);
                // keep the previous characters as well as add new one as recived in action.payload
                const allCharacters = [...prevSavedCharacters, character];
                localStorage.setItem(
                    "character",
                    JSON.stringify(allCharacters)
                );
                state.savedCharacters = allCharacters;
            } else {
                // if this is first time user is saving character then save only this one character
                localStorage.setItem("character", JSON.stringify([character]));
            }
        },
        getSavedCharacters: (state, action) => {
            let savedCharacter = localStorage.getItem("character");
            if (savedCharacter) {
                savedCharacter = JSON.parse(savedCharacter);
                state.savedCharacters = savedCharacter;
            }
        },
        removeSavedCharacters: (state, action) => {
            const { characterID } = action.payload;

            // update the state
            let updatedCharacter = state.savedCharacters.filter(
                (character) => character.id !== characterID
            );
            state.savedCharacters = updatedCharacter;

            // also update from localstorage
            let prevCharacter = localStorage.getItem("character");
            if (prevCharacter) {
                prevCharacter = JSON.parse(prevCharacter);
                let updatedCharacter = prevCharacter.filter(
                    (character) => character.id !== characterID
                );
                localStorage.setItem(
                    "character",
                    JSON.stringify(updatedCharacter)
                );
            }
        },
        clearSearchResults: (state, actions) => {
            state.searchResults = [];
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchCharacters.pending, (state, action) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchCharacters.fulfilled, (state, action) => {
            state.isLoading = false;
            state.allCharacters = action.payload;
        });
        builder.addCase(fetchCharacters.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });

        builder.addCase(searchCharacters.pending, (state, action) => {
            state.isSearching = true;
            state.error = null;
        });
        builder.addCase(searchCharacters.fulfilled, (state, action) => {
            state.isSearching = false;
            state.searchResults = action.payload;
        });
        builder.addCase(searchCharacters.rejected, (state, action) => {
            state.isSearching = false;
            state.error = action.payload;
        });
    },
});

export const {
    getSavedCharacters,
    saveCharacter,
    removeSavedCharacters,
    clearSearchResults,
} = characterSlice.actions;
export default characterSlice.reducer;
