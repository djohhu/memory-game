<template lang="pug">
div(:class="$style.wrapper")
  div(:class="[$style.row, { [$style['stop-events']]: stopEvents }]")
    Card(
      v-if="cardList.length"
      v-for="({ value, position, visible, found }, index) in cardList"
      :key="`card-${index}`"
      :value="value"
      :position="position"
      :visible="visible"
      :found="found"
      @selectCard="selectCard"
    )
</template>

<script>
import Card from "@/components/Card.vue";
import { mapMutations } from "vuex";
import imagesData from "@/data/images.json";

export default {
  name: "GameBoard",
  components: {
    Card,
  },
  data() {
    return {
      imagesData,
      cardList: [],
      selected: [],
      stopEvents: false,
      timer: null,
      matched: [],
      startTime: null,
    };
  },
  mounted() {
    this.cardList = this.creatSetCards();
    this.startTime = new Date();
  },
  methods: {
    ...mapMutations(["setModal", "setResult"]),
    creatSetCards() {
      if (imagesData.length % 2) throw new Error("Нечетное число");
      return (
        imagesData
          .reduce((array, image) => {
            array.push({
              value: image,
              position: null,
              visible: false,
              found: false,
            });
            array.push({
              value: image,
              position: null,
              visible: false,
              found: false,
            });
            return array;
          }, [])
          .sort(() => Math.random() - 0.5)
          .map((item, index) => {
            return {
              ...item,
              position: index,
            };
          })
      );
    },
    selectCard(card) {
      const firstCard = this.cardList[card.position];
      firstCard.visible = true;
      this.soundClick("flip");
      if (this.selected[0]) {
        if (this.selected[0].position === card.position) {
          return;
        } else {
          clearTimeout(this.timer);
          this.stopEvents = true;
          this.selected.push(card);
        }
      } else {
        this.timer = setTimeout(() => (firstCard.visible = false), 5000);
        this.selected.push(card);
      }
    },
    soundClick(name) {
      const audio = new Audio();
      audio.src = `/audio/${name}.mp3`;
      audio.autoplay = true;
    },
    finalTime() {
      const endTime = new Date().getTime();
      const diff = endTime - this.startTime.getTime();
      const hours = this.timeTransform(Math.floor(diff / 3.6e5));
      const minutes = this.timeTransform(Math.floor((diff % 3.6e5) / 6e4));
      const seconds = this.timeTransform(Math.floor((diff % 6e4) / 1000));
      return `${hours}:${minutes}:${seconds}`;
    },
    timeTransform(time) {
      return time ? (time < 10 ? `0${time}` : time) : "00";
    },
  },
  watch: {
    selected: {
      handler: function (newVal) {
        if (newVal.length === 2) {
          const first = newVal[0];
          const second = newVal[1];
          if (first.value === second.value) {
            setTimeout(() => {
              this.soundClick("found");
              this.cardList[first.position].found = true;
              this.cardList[second.position].found = true;
            }, 500);
            this.stopEvents = false;
            this.matched.push(first.value);
          } else {
            setTimeout(() => {
              this.cardList[first.position].visible = false;
              this.cardList[second.position].visible = false;
              this.stopEvents = false;
            }, 1000);
          }
          this.selected.length = 0;
        }
      },
      deep: true,
    },
    matched() {
      if (this.matched.length === imagesData.length) {
        this.setResult({
          date: this.startTime.toLocaleString(),
          time: this.finalTime(),
        });
        setTimeout(() => {
          this.setModal({
            status: true,
            time: this.finalTime(),
          });
        }, 1000);
      }
    },
  },
};
</script>


<style lang="stylus" module>
.wrapper
  padding 20px 0
.row
  perspective 1000px
  display grid
  grid-template-columns repeat(6, 1fr)
  grid-gap 15px
.stop-events
  pointer-events none
</style>
