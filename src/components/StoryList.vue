<template>
  <div class="story-list">
    <DataView
      :value="stories"
      :layout="layout"
      :paginator="false"
      :rows="9"
      :sortOrder="sortOrder"
      :sortField="sortField"
    >
      <template #header>
        <div class="p-grid p-nogutter p-ai-center">
          <div class="p-col">
            <div class="p-mr-2">物語</div>
            <Badge v-if="completeStory">{{ completeStory }}</Badge>
          </div>
          <div class="p-col-fixed">
            <Button @click="showUnselected = !showUnselected" 
            :class="{'p-button-outlined': !showUnselected}" icon="pi pi-book"></Button>
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <Story class="p-col-12" :data="slotProps.data" />
      </template>
    </DataView>
  </div>
</template>

<script>
import { inject, reactive, computed, ref } from "vue";
import StoriesData from "@/data/stories.js";
import Story from "./Story.vue";

export default {
  components: { Story },
  setup() {
    const cards = inject('cards')

    // 未選択も表示する
    const showUnselected = ref(false)

    const mappedStories = StoriesData.map((story) => {
      story.cardData = [];
      story.cards.forEach((cardName) => {
        const data = cards.find((card) => card.name === cardName);
        if (data) {
          story.cardData.push(data);
        }
      });
      // 選択済みカード
      story.selectedCards = 0;
      // スコア
      story.score = story.point;
      // カード全選択でtrue
      story.complete = false;
      return reactive(story);
    });

    // 物語リスト
    const stories = computed(() => {
      mappedStories.forEach((story) => {
        // 選択済みカード
        story.selectedCards = story.cardData.reduce(
          (acc, cur) => acc + cur.selected,
          0
        );
        story.score = story.selectedCards + story.point;
        story.complete = story.selectedCards === story.cards.length;
      });
      return mappedStories.filter((story) => showUnselected.value === true ? true : story.selectedCards);
    });

    // 完成物語数
    const completeStory = computed(() => {
      return stories.value.reduce((acc, cur) => acc + cur.complete, 0);
    });

    const layout = ref("list");
    const sortKey = ref();
    const sortOrder = ref(-1);
    const sortField = ref("score");

    return {
      stories,
      completeStory,
      layout,
      sortKey,
      sortOrder,
      sortField,
      showUnselected
    };
  },
};
</script>

<style scoped>
.story-list {
  padding: 1rem;
}
</style>