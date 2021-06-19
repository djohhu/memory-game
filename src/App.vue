<template lang="pug">
#app(:class="$style.app")
  div(:class="pageClasses")
    div(:class="$style.container")
      component(:is="componentName" @change="change")
  Modal(@returnTable="returnTable")
</template>

<script>
import { mapGetters } from "vuex";
import GameBoard from "@/components/GameBoard.vue";
import TableResults from "@/components/TableResults.vue";
import Modal from "@/components/Modal.vue";

export default {
  name: "App",
  components: {
    TableResults,
    GameBoard,
    Modal,
  },
  data() {
    return {
      step: "table",
    };
  },
  computed: {
    ...mapGetters(["getModal", "getResults"]),
    componentName() {
      switch (this.step) {
        case "table":
          return "TableResults";
        case "game":
          return "GameBoard";
        default:
          return "TableResults";
      }
    },
    pageClasses() {
      return {
        [this.$style.page]: true,
        [this.$style.modal]: this.getModal.status,
      };
    },
  },
  methods: {
    change(name) {
      this.step = name;
    },
    returnTable() {
      this.step = "table";
    },
  },
};
</script>

<style lang="stylus" module>
*
  box-sizing border-box
.app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
.page
  background-color #f5f5f6
  min-height 100vh
.container
  margin 0 auto
  width 920px
.modal
  filter blur(3px)
  pointer-events none
</style>
