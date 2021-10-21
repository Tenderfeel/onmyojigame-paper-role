<template>
  <div>
    <CardList />
    <StoryList />
    <Button icon="pi pi-question-circle" @click="visibleInfo = true" class="btn-info"  />
    <Sidebar v-model:visible="visibleInfo" :baseZIndex="1000" position="right">
        <h1>陰陽紙転ツール</h1>
        <p>カードの下部にある数字<br>右側：関連物語数<br>左側：ポイント</p>
    </Sidebar>
  </div>
</template>

<script>
import { provide, reactive, ref, computed } from "vue";
import CardsData from "./data/cards.js";
import StoriesData from "./data/stories.js";

import CardList from "./components/CardList";
import StoryList from "./components/StoryList";

export default {
  name: "App",
  components: { CardList, StoryList },

  // Setup
  setup() {
    // カードリスト
    const cards = reactive(
      // だるまは弾く
      CardsData.filter((card) => card.type !== "special").map((card) => {
        card.selected = false;
        const stories = StoriesData.filter(story => story.cards.includes(card.name))
        card.storyCount = stories.length
        return card;
      })
    );
    provide("cards", cards);

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
      return mappedStories.filter((story) => story.selectedCards);
    });

    const completeStory = computed(() => {
      return stories.value.reduce((acc, cur) => acc + cur.complete, 0);
    });

    // 物語リスト
    provide("stories", stories);

    // 完成物語数
    provide("completeStory", completeStory);

    // 選択中カード枚数
    const selectCount = ref(0);
    provide("selectCount", selectCount);

    // 選択されたカードの更新
    const toggleSelectCard = (card) => {
      card.selected = !card.selected;
      selectCount.value = cards.filter((card) => card.selected).length;
    };
    provide("toggleSelectCard", toggleSelectCard);

    // 選択されたカードの初期化
    const resetSelectCards = () => {
      cards.forEach(card => card.selected = false)
    }

    provide("resetSelectCards", resetSelectCards);
  },

  data() {
    return {
      visibleInfo: false
    }
  }
};
</script>

<style> 
body {
  margin: 0;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--surface-a);
  font-family: var(--font-family);
  font-weight: 400;
  color: var(--text-color);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.btn-info {
  position: fixed !important;
  right: 0;
  bottom: 5vw;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

h1 {
  font-size: 1.5rem;
}
</style>
