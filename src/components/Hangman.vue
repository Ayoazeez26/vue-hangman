<template>
  <div class="flex mx-auto mt-6 md:w-1/2">
    <div
      class="
        hang-container
        relative
        w-full
        text-white
        flex flex-col
        items-center
      "
    >
      <h1 class="text-4xl text-center font-bold">Hangman</h1>
      <p class="desc mt-4 text-xl">Find the hidden word - Enter a letter</p>
      <div class="area mt-5 flex justify-between w-full">
        <div class="flex md:self-start">
          <div class="pole ml-10">
            <div
              class="
                h-12
                w-1
                bg-white
                rounded-xl
                transform
                translate-x-20 translate-y-12
              "
            ></div>
            <div
              class="w-20 h-1 bg-white rounded-xl transform translate-x-1"
            ></div>
            <div
              class="
                w-1
                h-60
                bg-white
                rounded-xl
                transform
                translate-x-1
                -translate-y-1
              "
            ></div>
            <div
              class="
                w-24
                h-1
                bg-white
                rounded-xl
                transform
                -translate-x-12 -translate-y-2
              "
            ></div>
          </div>
          <div class="man transform translate-y-20 mt-3 ml-1.5 -translate-x-10">
            <div
              ref="man-1"
              class="
                man-1
                w-10
                h-10
                hidden
                rounded-full
                bg-transparent
                border-4 border-white
              "
            ></div>
            <div
              ref="man-2"
              class="
                man-2
                h-16
                w-1
                hidden
                bg-white
                ml-1
                rounded-xl
                transform
                translate-x-3.5
                -translate-y-1
              "
            ></div>
            <div
              ref="man-3"
              class="
                man-3
                h-7
                w-1
                hidden
                bg-white
                ml-1
                rounded-xl
                transform
                translate-x-1
                -translate-y-16
                -rotate-45
                mt-2
              "
            ></div>
            <div
              ref="man-4"
              class="
                man-4
                h-7
                w-1
                hidden
                bg-white
                ml-1
                rounded-xl
                transform
                translate-x-6
                -translate-y-28
                rotate-45
                mt-5
              "
            ></div>
            <div
              ref="man-5"
              class="
                man-5
                h-10
                w-1
                hidden
                bg-white
                ml-1
                rounded-xl
                transform
                translate-x-
                -translate-y-24
                rotate-45
              "
            ></div>
            <div
              ref="man-6"
              class="
                man-6
                h-10
                w-1
                hidden
                bg-white
                ml-1
                rounded-xl
                transform
                translate-x-7
                -translate-y-36
                -rotate-45
                mt-2
              "
            ></div>
          </div>
        </div>
        <div class="wrong mt-10 text-right">
          <p v-if="getWrong.length" class="text-base mb-3">Wrong</p>
          <div class="flex">
            <p v-for="(letter, index) in getWrong" :key="index">
              <span v-if="index > 0">, </span>{{ letter }}
            </p>
          </div>
        </div>
      </div>
      <div class="words absolute -bottom-10">
        <div class="relative">
          <div ref="first" class="first flex text-3xl">
            <p
              class="mx-1 border-b-2 border-blue-300 text-center w-6"
              v-for="i in letterCount"
              :key="i"
            >
              <span class="visible"></span>
            </p>
          </div>
          <input
            class="
              fixed
              md:hidden
              w-screen
              h-screen
              top-0
              left-0
              border-none
              bg-transparent
              left-0
            "
            ref="input"
            type="text"
            name=""
            v-model="hangInput"
            id=""
          />
        </div>
      </div>
      <a
        href="https://www.youtube.com/watch?v=cGOeiQfjYPk"
        target="_blank"
        class="
          absolute
          bottom-32
          md:bottom-40
          border-none
          right-0
          text-gray-700
          bg-gray-200
          px-3
          py-2
          rounded-md
        "
      >
        How to Play
      </a>
      <transition name="fade" mode="out-in">
        <button
          v-if="!viewHint"
          class="
            absolute
            bottom-20
            border-none
            right-0
            text-gray-700
            bg-gray-200
            px-3
            py-2
            rounded-md
          "
          @click="toggleHint"
        >
          Hint
        </button>
        <div
          v-if="viewHint"
          class="
            absolute
            bottom-20
            flex
            items-center
            right-0
            text-white
            font-semibold
            text-xl
          "
        >
          <p class="px-3 py-2">{{ getHint }}</p>
          <a
            class="
              close-hint
              bg-black
              w-8
              h-8
              flex
              items-center
              justify-center
              p-2
              font-semibold
              rounded-full
            "
            href="#"
            @click="toggleHint"
            >X</a
          >
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div
        v-if="sameLetter"
        class="err absolute bottom-0 px-5 py-4 rounded-t-xl text-white"
      >
        <p>You have already entered this letter</p>
      </div>
    </transition>
    <lose-modal v-if="gameOver" />
    <win-modal v-if="gameWon" />
  </div>
</template>

<script>
import LoseModal from "./LoseModal.vue";
import WinModal from "./WinModal.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { LoseModal, WinModal },
  data() {
    return {
      hangInput: "",
    };
  },
  created() {
    document.onkeydown = this.onkeydown;
    this.$store.dispatch("restartGame");
  },
  mounted() {
    this.$refs.input.oninput = this.onkeyup;
  },
  watch: {
    letterCount: () => {
      document.querySelector(".first").children.forEach((child) => {
        child.children[0].innerText = " ";
      });
      document.querySelector(".man").children.forEach((part) => {
        part.classList.replace("block", "hidden");
      });
    },
  },
  computed: {
    ...mapGetters([
      "getSelected",
      "getWrong",
      "sameLetter",
      "gameOver",
      "gameWon",
      "activeWord",
      "letterCount",
      "getHint",
      "viewHint",
    ]),
  },
  methods: {
    onkeydown(e) {
      console.log(e);
      if (e.which >= 65 && e.which <= 90) {
        const letter = e.key.toLowerCase();
        if (
          !this.getSelected.includes(letter) &&
          !this.getWrong.includes(letter)
        ) {
          if (this.activeWord[letter]) {
            this.$store.dispatch("addToSelected", letter);
            this.activeWord[letter].forEach((index) => {
              this.$refs.first.children[index].children[0].innerText = letter;
            });
          } else {
            this.$store.dispatch("addToWrong", letter);
            this.$refs[`man-${this.getWrong.length}`].classList.replace(
              "hidden",
              "block"
            );
          }
        } else {
          this.$store.dispatch("sameLetter");
        }
      }
    },
    onkeyup(e) {
      console.log(e);
      if (e.data.toLowerCase() != e.data.toUpperCase()) {
        const letter = e.data.toLowerCase();
        if (
          !this.getSelected.includes(letter) &&
          !this.getWrong.includes(letter)
        ) {
          if (this.activeWord[letter]) {
            this.$store.dispatch("addToSelected", letter);
            this.activeWord[letter].forEach((index) => {
              this.$refs.first.children[index].children[0].innerText = letter;
            });
            this.hangInput = "";
          } else {
            this.$store.dispatch("addToWrong", letter);
            this.$refs[`man-${this.getWrong.length}`].classList.replace(
              "hidden",
              "block"
            );
            this.hangInput = "";
          }
        } else {
          this.$store.dispatch("sameLetter");
          this.hangInput = "";
        }
      }
    },
    ...mapActions(["toggleHint"]),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.err {
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.3);
}
.words {
  left: 50%;
}
.first {
  transform: translateX(-50%);
}
.close-hint {
  font-family: sans-serif;
}
input:focus {
  outline: #34495e;
}
input {
  caret-color: transparent;
  color: transparent;
}
</style>
