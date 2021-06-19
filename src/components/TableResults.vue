
<template lang="pug">
div(:class="$style.wrapper")
  h1(:class="$style.title") Игра "Память"
  h2(:class="$style.subtitile") Таблица результатов
  div(:class="$style.table")
    div(:class="[$style.row, $style.top]")
      div(:class="$style.item") Дата
      div(:class="$style.item") Время
    div(
      v-for="(item, index) in getResults"
      :class="$style.row"
      :key="index"
    )
      div(:class="$style.item" v-html="item.date")
      div(:class="$style.item" v-html="item.time")
  Button(:class="$style.button" @click.native="clickOnButton")
</template>

<script>
import { mapGetters } from "vuex";
import Button from "@/components/Button.vue";

export default {
  name: "TableResults",
  components: {
    Button,
  },
  methods: {
    clickOnButton() {
      this.$emit("change", "game");
    },
  },
  computed: mapGetters(["getResults"]),
};
</script>

<style lang="stylus" module>
.wrapper
  padding-top 60px
  width 720px
  margin 0 auto
.title
  margin 0 0 40px
  font-size 30px
  line-height 42px
  text-align center
.subtitle
  margin 0 0 20px
.table
  border 1px solid #c4c4c4
  border-radius 10px
  text-align center
  font-size 18px
  line-height 20px
.row
  display flex
  justify-content space-between
  &:not(:last-child)
    border-bottom 1px solid #eee
.top
  padding 10px
  font-weight 700
  font-size 20px
  line-height 24px
.item
  flex 0 0 50%
  padding 10px
.button
  margin 20px auto 0
  max-width 360px
</style>
