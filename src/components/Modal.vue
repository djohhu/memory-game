<template lang="pug">
transition(name="slide-fade")
  div(v-if="getModal.status", :class="$style.overlay")
    div(:class="$style.content")
      p(:class="$style.title") Поздравляем. Вы выиграли!
      p Ваше время: {{ getModal.time }}
      Button(
        :class="$style.button",
        @click.native="clickOnButton",
        text="На главную"
      )
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Button from "@/components/Button.vue";

export default {
  name: "Modal",
  components: {
    Button,
  },
  methods: {
    ...mapMutations(["setModal"]),
    clickOnButton() {
      this.setModal({ status: false });
      this.$emit("returnTable");
    },
  },
  computed: mapGetters(["getModal"]),
};
</script>

<style lang="stylus" module>
.overlay
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  padding 0
  background rgba(37,60,119,.3)
  display flex
  justify-content center
  align-items center
  z-index 10
.content
  background-color white
  display flex
  flex-direction column
  width 300px
  padding 30px 20px
  font-size 16px
  line-height 19px
  color #000
  border-radius 8px
.title
  font-weight 700
  text-align center
  font-size 18px
  line-height 21px
  margin 0 0 5px
.button
  margin-top 10px
</style>
