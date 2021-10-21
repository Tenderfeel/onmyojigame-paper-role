<template>
  <div
    class="card"
    :class="{ selected: data.selected }"
    :style="{ backgroundImage: img }"
    v-tooltip="info"
    @click="handleClick"
    :data-type="data.type"
  >
    <span>{{ data.name }}</span>
    <span>{{ point }}</span>
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
  },
  setup() {
    const toggleSelectCard = inject("toggleSelectCard");
    return {
      toggleSelectCard,
    };
  },
  computed: {
    img() {
      return `url(/assets/images/cards/${this.data.id}.png)`;
    },
    point() {
      return (
        `${this.data.point}Pt` +
        (this.data.bonus ? `（${this.data.bonus}pt）` : "")
      );
    },
    info() {
      return this.data.name + " " + this.point;
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

</style>