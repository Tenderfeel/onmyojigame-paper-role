<template>
  <div
    class="card"
    :class="{ selected: data.selected, skin: showSkinCard && data.skin }"
    :style="{ backgroundImage: img }"
    v-tooltip="info"
    @click="handleClick"
    :data-type="data.type"
  >
    <span>{{ data.name }}</span>
    <div class="story-point" v-if="showPoint">{{ point }}</div>
    <div class="story-count" v-if="showStory">{{ data.storyCount }}</div>
  </div>
</template>
<script>
import { inject } from "vue";
export default {
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    showPoint: {
      type: Boolean,
      default: false
    },
    showStory: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const toggleSelectCard = inject("toggleSelectCard");
    const showSkinCard = inject('showSkinCard')
    return {
      toggleSelectCard,
      showSkinCard
    };
  },
  computed: {
    hasSkin() {
      return this.showSkinCard && this.data.skin
    },
    img() {
      if (this.showSkinCard && this.data.skin) {
        return `url(/assets/images/cards/${this.data.id}-2.png)`;
      }
      return `url(/assets/images/cards/${this.data.id}.png)`;
    },
    /**
     * ポイント
     * 珍しい札の場合は一律8pt
     */
    point() {
      return this.hasSkin ? 8 : this.data.point + this.data.bonus;
    },
    info() {
      return this.data.name;
    },
  },
  methods: {
    handleClick() {
      this.toggleSelectCard(this.data);
    },
  },
};
</script>
<style scoped>
.card {
  border: solid 2px black;
  background-repeat: no-repeat;
  background-size: contain;
  border-radius: 3px;
  width: 50px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}

.card.skin[data-type="blue"] {
  box-shadow: 0 0 3px var(--cyan-200)
}
.card.skin[data-type="red"] {
  box-shadow: 0 0 3px var(--pink-200)
}
.card.skin[data-type="yellow"] {
  box-shadow: 0 0 3px var(--yellow-200)
}
.card.skin[data-type="green"] {
  box-shadow: 0 0 3px var(--green-200)
}

span {
  position: absolute;
  visibility: hidden;
}

.card::before {
  display: block;
  content: "";
  padding-top: 164.61%;
}

.card.selected[data-type="blue"] {
  border-color: var(--cyan-300);
}
.card.selected[data-type="red"] {
  border-color: var(--pink-200);
}
.card.selected[data-type="yellow"] {
  border-color: var(--yellow-300);
}
.card.selected[data-type="green"] {
  border-color: var(--green-300);
}

.story-count {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: var(--purple-900);
  color: var(--gray-50);
  padding: 0.3rem;
  font-size: .7rem;
  border-radius: .5rem 0 0 0;
}

.story-point {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: var(--gray-900);
  color: var(--gray-50);
  padding: 0.3rem;
  font-size: .7rem;
  border-radius:  0 .5rem 0 0;
}

</style>