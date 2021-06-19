TableResults
<template lang="pug">
button(type="button" :class="$style.button" v-html="text")
</template>

<script>
export default {
  name: "Button",
  props: {
    text: {
      type: String,
      default: "Старт",
    },
  },
};
</script>

<style lang="stylus" module>
.button
  overflow hidden
  transition all .3s
  display block
  outline none
  padding 0 10px
  height 40px
  line-height 40px
  border none
  font-weight 700
  font-size 14px
  text-align center
  color #fff
  position relative
  background-color #0057ff
  box-shadow 0 4px 10px 2px rgba(0, 87, 255, 0.2), 0 20px 30px 3px rgba(0, 87, 255, 0.1)
  appearance none
  width 100%
  cursor: pointer
  border-radius 8px
  &:hover
    background-color #0075ff
    box-shadow 0 4px 10px -2px rgba(0, 117, 255, 0.2), 0 20px 30px 3px rgba(0, 117, 255, 0.1)
</style>
