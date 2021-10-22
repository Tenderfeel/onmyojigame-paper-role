<template>
  <div class="card-list">
    <Toolbar>
      <template #left>
        <Button
          label="青"
          class="p-button-info p-mr-2"
          :class="{
            'p-button-outlined': type !== 'blue',
          }"
          :badge="typeCount.blue"
          @click="toggleButton('blue')"
        />
        <Button
          label="赤"
          class="p-button-danger p-mr-2"
          :class="{
            'p-button-outlined': type !== 'red',
          }"
          :badge="typeCount.red"
          @click="toggleButton('red')"
        />
        <Button
          label="黄"
          class="p-button-warning p-mr-2"
          :class="{
            'p-button-outlined': type !== 'yellow',
          }"
          :badge="typeCount.yellow"
          @click="toggleButton('yellow')"
        />
        <Button
          label="緑"
          class="p-button-success p-mr-2"
          :class="{
            'p-button-outlined': type !== 'green',
          }"
          :badge="typeCount.green"
          @click="toggleButton('green')"
        />

        <Chip label="Action" class="p-mr-2">{{ selectCount }}枚 </Chip>

        <ToggleButton v-model="showSkinCard" onLabel="珍札" offLabel="珍札" onIcon="pi pi-eye" offIcon="pi pi-eye-slash" />

      </template>
      <template #right>
        <Button
          class="p-button-secondary"
          icon="pi pi-trash"
          @click="resetSelectCards"
        />
      </template>
    </Toolbar>
    <div class="list">
      <Card v-for="card in filterCards" :key="card.id" :data="card" :showPoint="true" :showStory="true" />
    </div>
  </div>
</template>

<script>
/**
 * カードリスト
 */
import { ref, inject, computed } from "vue";
import Card from "./Card.vue";

export default {
  setup() {
    const cards = inject("cards");
    const selectCount = inject("selectCount");
    const resetSelectCards = inject("resetSelectCards")
    const showSkinCard = inject('showSkinCard')
    const type = ref("blue");

    const filterCards = computed(() =>
      cards.filter((card) => {
        return type.value === card.type;
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
      resetSelectCards,
      showSkinCard
    };
  },
  components: { Card },

  methods: {
    toggleButton(type) {
      this.type = type
    }
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