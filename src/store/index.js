import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sameLetter: false,
    gameOver: false,
    gameWon: false,
    selected: [],
    wrong: [],
    score: 0,
    letterCount: "",
    currentHint: "",
    toggleHint: false,
    allWords: [3, 4, 5, 6, 7, 9, 10, 11],
    hints: [
      "A javascript framework",
      "An infant",
      "A phone brand",
      "A social media app",
      "A football club",
      "modern day problem solver",
      "A programming language",
      "Using code to do stuff",
    ],
    word_7: {
      c: [0],
      h: [1],
      e: [2, 5],
      l: [3],
      s: [4],
      a: [6],
    },
    word_3: {
      v: [0],
      u: [1],
      e: [2],
    },
    word_4: {
      b: [0, 2],
      a: [1],
      y: [3],
    },
    word_5: {
      p: [0],
      i: [1],
      x: [2],
      e: [3],
      l: [4],
    },
    word_6: {
      t: [0, 3],
      i: [1],
      k: [2, 5],
      o: [4],
    },
    word_9: {
      d: [0],
      e: [1, 3, 7],
      v: [2],
      l: [4],
      o: [5],
      p: [6],
      r: [8],
    },
    word_10: {
      j: [0],
      a: [1, 3],
      v: [2],
      s: [4],
      c: [5],
      r: [6],
      i: [7],
      p: [8],
      t: [9],
    },
    word_11: {
      p: [0],
      r: [1, 4],
      o: [2],
      g: [3, 10],
      a: [5],
      m: [6, 7],
      i: [8],
      n: [9],
    },
  },
  getters: {
    getSelected: (state) => {
      return state.selected;
    },
    getWrong: (state) => {
      return state.wrong;
    },
    sameLetter: (state) => {
      return state.sameLetter;
    },
    gameOver: (state) => {
      return state.gameOver;
    },
    gameWon: (state) => {
      return state.gameWon;
    },
    activeWord: (state) => {
      const generated = `word_${state.letterCount}`;
      return state[generated];
    },
    letterCount: (state) => {
      return state.letterCount;
    },
    getHint: (state) => {
      return state.currentHint;
    },
    viewHint: (state) => {
      return state.toggleHint;
    },
    getScore: (state) => {
      return state.score;
    },
  },
  mutations: {
    RESTARTGAME: (state) => {
      state.gameOver = false;
      state.gameWon = false;
      state.toggleHint = false;
      state.selected = [];
      state.wrong = [];
      const arrayIndex = Math.floor(Math.random() * 8);
      const currentWord = state.allWords[arrayIndex];
      let hint = state.hints[arrayIndex];
      if (state.letterCount < 7 && state.letterCount === currentWord) {
        state.letterCount++;
        hint = state.hints[arrayIndex + 1];
        state.currentHint = hint;
      } else if (state.letterCount === 7 && state.letterCount === currentWord) {
        state.letterCount--;
        hint = state.hints[arrayIndex - 1];
        state.currentHint = hint;
      } else {
        state.letterCount = currentWord;
        state.currentHint = hint;
      }
      state.letterCount = currentWord;
      state.currentHint = hint;
    },
    SAMELETTER: (state) => {
      state.sameLetter = !state.sameLetter;
      setTimeout(() => {
        state.sameLetter = !state.sameLetter;
      }, 2000);
    },
    ADDTOSELECTED: (state, payload) => {
      state.selected.push(payload);
      const generated = `word_${state.letterCount}`;
      if (state.selected.length === Object.keys(state[generated]).length) {
        state.gameWon = !state.gameWon;
        state.score++;
      }
    },
    ADDTOWRONG: (state, payload) => {
      state.wrong.push(payload);
      if (state.wrong.length === 6) {
        state.gameOver = !state.gameOver;
        if (state.score === 0) {
          state.score = 0;
        } else {
          state.score--;
        }
      }
    },
    TOGGLEHINT: (state) => {
      state.toggleHint = !state.toggleHint;
    },
  },
  actions: {
    restartGame: (context) => {
      context.commit("RESTARTGAME");
    },
    sameLetter: (context) => {
      context.commit("SAMELETTER");
    },
    addToSelected: (context, payload) => {
      context.commit("ADDTOSELECTED", payload);
    },
    addToWrong: (context, payload) => {
      context.commit("ADDTOWRONG", payload);
    },
    toggleHint: (context) => {
      context.commit("TOGGLEHINT");
    },
  },
  modules: {},
});
