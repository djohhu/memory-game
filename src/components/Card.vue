<template lang="pug">
div(:class="getClasses" @click="clickOnCard")
  img(:class="[$style.image, $style.front]" :src="`/images/${value}`")
  img(:class="[$style.image, $style.back]" src="/images/sberbank.svg")
</template>

<script>
export default {
  name: "Card",
  props: {
    value: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    found: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    getClasses() {
      return [
        { [this.$style.card]: true },
        { [this.$style.flip]: this.visible },
        { [this.$style.founded]: this.found },
      ];
    },
  },
  methods: {
    clickOnCard() {
      this.$emit("selectCard", {
        value: this.value,
        position: this.position,
      });
    },
  },
};
</script>

<style lang="stylus" module>
.card
  position relative
  border-radius 15px
  box-shadow 0 5px 17px -12px #000
  cursor pointer
  height 210px
  display flex
  justify-content center
  align-items center
  transform-style preserve-3d
  transition transform .5s, opacity .5s
  &:active
    transform scale(0.98)
    transition transform .2s
  &.flip
    transform rotateY(180deg)
    pointer-events none
  &.founded
    opacity 0
    .front
      backface-visibility unset
    .back
      display none
.image
  position absolute
  background #daedf7
  width 100%
  height 100%
  padding 10px
  backface-visibility hidden
  object-fit contain
  border-radius 15px
.front
  transform rotateY(180deg)
  background-color white
</style>
