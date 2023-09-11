<template>
  <div class="screen">
    <!-- <card-view :imgBackFace="`1.png`"></card-view> -->
    <div
      class="screen__inner"
      :style="{
        width: `${
          ((((920 - 16 * 4) / Math.sqrt(cardsContext.length) - 16) * 3) / 4 +
            16) *
          Math.sqrt(cardsContext.length)
        }px`,
      }"
    >
      <card-view
        v-for="(card, index) in cardsContext"
        :key="index"
        :imgBackFace="`${card}.png`"
        :card="{ index: index, value: card }"
        :cardsContext="cardsContext"
        @onFlip="checkRule($event)"
        :ref="`card-${index}`"
      ></card-view>
    </div>
  </div>
</template>

<script>
import CardView from "./CardView.vue";
export default {
  data() {
    return {
      rules: [],
    };
  },

  components: {
    CardView,
  },

  props: {
    cardsContext: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },

  methods: {
    checkRule(card) {
      if (this.rules.length === 2) return false;

      this.rules.push(card);
      if (
        this.rules.length === 2 &&
        this.rules[0].value === this.rules[1].value
      ) {
        console.log("right...");
        // add class 'disabled' to component card
        this.$refs[`card-${this.rules[0].index}`][0].onEnableDisableMode();
        this.$refs[`card-${this.rules[1].index}`][0].onEnableDisableMode();

        // reset rules[]
        this.rules = [];

        const disabledElements = document.querySelectorAll(
          ".screen .card.disabled"
        );

        if (
          disabledElements &&
          disabledElements.length === this.cardsContext.length - 2
        ) {
          setTimeout(() => {
            this.$emit("onFinish");
          }, 1000);
        }
      } else if (
        this.rules.length === 2 &&
        this.rules[0].value !== this.rules[1].value
      ) {
        console.log("wrong...");
        setTimeout(() => {
          //close cards is wrong...
          this.$refs[`card-${this.rules[0].index}`][0].onFlipBackClose();
          this.$refs[`card-${this.rules[1].index}`][0].onFlipBackClose();
          // reset rules[]
          this.rules = [];
        }, 800);
      } else return false;
    },
  },
};
</script>

<style lang="css" scoped>
.screen {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: var(--dark);
  color: var(--light);
}

.screen__inner {
  display: flex;
  flex-wrap: wrap;
  margin: 2rem auto;
}
</style>
