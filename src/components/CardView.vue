<template>
  <div
    class="card"
    :class="{ disabled: isDisabled }"
    :style="{
      height: `${(920 - 16 * 4) / Math.sqrt(cardsContext.length) - 16}px`,
      width: `${
        ((((920 - 16 * 4) / Math.sqrt(cardsContext.length) - 16) * 3) / 4) * 2
      }px`,
    }"
  >
    <div
      class="card__inner"
      @click="onToggleFlipCard"
      :class="{ 'is-fliped': isFlipped }"
    >
      <div class="card__face card__face--front">
        <div class="card__content"></div>
      </div>
      <div class="card__face card__face--back">
        <div
          class="card__content"
          :style="{
            backgroundImage: `url(${require('@/assets/images/' +
              imgBackFace)})`,
            backgroundSize: '60px 60px',
            width: '100%',
            height: '100%',
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgBackFace: {
      type: String,
      require: true,
    },

    card: {
      type: [String, Number, Array, Object],
    },

    cardsContext: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },

  data() {
    return {
      isFlipped: false,
      isDisabled: false,
    };
  },

  methods: {
    onToggleFlipCard() {
      if (this.isDisabled) return false;
      this.isFlipped = !this.isFlipped;
      if (this.isFlipped) this.$emit("onFlip", this.card);
    },

    onFlipBackClose() {
      this.isFlipped = false;
    },

    onEnableDisableMode() {
      this.isDisabled = true;
    },
  },
};
</script>

<style lang="css" scoped>
.card {
  display: inline-block;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 90px;
  height: 120px;
}

.card__inner {
  width: 100%;
  height: 100%;
  transition: transform 1s; /*quay mất 1s */
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
}

.card .disabled .card__inner {
  cursor: default;
}

.card__inner.is-fliped {
  transform: rotateY(-180deg);
}

.card__face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  overflow: hidden;
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0 3px 10px 3px rgba(0, 0, 0, 0.2);
}

.card__face--front .card__content {
  background: url("../assets/images/icon_back.png") no-repeat center center;
  background-size: 40px 40px;
  height: 100%;
  width: 100%;
}
.card__face--back {
  /* background-color: var(--light); */
  transform: rotateY(-180deg);
}

.card__face--back .card__content {
  background: url("../assets/images/icon_back.png") no-repeat center center;
  background-size: 40px 40px;
  height: 100%;
  width: 100%;
}
</style>
