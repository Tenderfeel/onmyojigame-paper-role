<template>
  <div class="card-list">
    <Toolbar>
      <template #left>
        <Button
          label="青"
          class="p-button-info p-mr-2"
          :class="{
            'p-button-outlined': !type.includes('blue'),
          }"
          :badge="typeCount.blue"
          @click="toggleButton('blue')"
        />
        <Button
          label="赤"
          class="p-button-danger p-mr-2"
          :class="{
            'p-button-outlined': !type.includes('red'),
          }"
          :badge="typeCount.red"
          @click="toggleButton('red')"
        />
        <Button
          label="黄"
          class="p-button-warning p-mr-2"
          :class="{
            'p-button-outlined': !type.includes('yellow'),
          }"
          :badge="typeCount.yellow"
          @click="toggleButton('yellow')"
        />
        <Button
          label="緑"
          class="p-button-success p-mr-2"
          :class="{
            'p-button-outlined': !type.includes('green'),
          }"
          :badge="typeCount.green"
          @click="toggleButton('green')"
        />

        <Chip label="Action" class="p-mr-2 p-mb-2">{{ selectCount }}枚 </Chip>
      </template>
    </Toolbar>
    <div class="list">
      <Card v-for="card in filterCards" :key="card.id" :data="card" />
    </div>
  </div>
</template>

<script>
/**
 * カードリスト
 */
import { reactive, inject, computed } from "vue";
import Card from "./Card.vue";

export default {
  setup() {
    const cards = inject("cards");
    const selectCount = inject("selectCount");
    const type = reactive(["blue"]);

    const filterCards = computed(() =>
      cards.filter((card) => {
        return type.includes(card.type);
      })
    );

    const typeCount = computed(() => {
      return cards.reduce(
        (acc, cur) => {
          acc[cur.type] += cur.selected;
          return acc;
        },
        {
          blue: 0,
          red: 0,
          yellow: 0,
          green: 0,
        }
      );
    });

    return {
      cards,
      type,
      typeCount,
      selectCount,
      filterCards,
    };
  },
  components: { Card },

  methods: {
    toggleButton(type) {
      if (this.type.includes(type)) {
        const index = this.type.findIndex((t) => t === type);
        this.type.splice(index, 1);
      } else {
        this.type.push(type);
      }
    },
  },
};
</script>

<style scoped>
.card-list {
  padding: 0.5rem;
}
.list {
  padding: 0.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, 50px);
  grid-gap: 0.5rem;
}
</style>