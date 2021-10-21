<template>
  <div class="story p-d-flex p-ai-start">
    <div class="p-d-flex p-p-1" style="grid-column-gap: 0.2rem">
      <Card v-for="card in data.cardData" :key="card.id" :data="card" />
    </div>
    <div class="p-p-2">
      <p class="p-mt-0 p-mb-2">
        <span class="story-name" :class="{ complete: data.complete }">{{
          data.name
        }}</span>
        <span class="story-point p-ml-2">{{ data.point }}pt</span>
      </p>
      <p class="story-text p-m-0">{{ data.text }}</p>
    </div>
  </div>
</template>

<script>
import Card from "./Card.vue";

export default {
  components: { Card },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style scoped>
.story {
  overflow: hidden;
}
.story-text {
  font-size: 0.7rem;
  color: var(--bluegray-400);
}
.story-name {
  display: inline-block;
}

.story-name.complete {
  color: var(--purple-200);
}
.story-point {
  display: inline-block;
  font-size: 0.8rem;
  color: var(--cyan-100);
}
</style>