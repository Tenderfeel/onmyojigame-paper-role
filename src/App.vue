<template>
  <div>
    <CardList />
    <StoryList />
    <Button icon="pi pi-question-circle" @click="visibleInfo = true" class="btn-info p-button-secondary"  />
    <Sidebar v-model:visible="visibleInfo" :baseZIndex="1000" position="right">
        <h1>陰陽紙転ツール</h1>
        <p>カードの下部にある数字<br>右側：関連物語数<br>左側：ポイント</p>
        <p>関連物語数が多いほどコンボが発生しやすくなります。</p>
        <p>物語は全部で99あります。<br>スイッチのON/OFFはブラウザに記憶されます。</p>
        <p>珍しい札はスキンの絵柄です。ポイントは全て8ptです。</p>
        <p><a href="https://twitter.com/vesperfeel" class="p-button p-component p-button-text" target="_blank" rel="external nofollow noopener">&copy; vesperfeel</a></p>
    </Sidebar>
  </div>
</template>

<script>
import { provide, reactive, ref } from "vue";
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

    // 特殊カードの表示
    const showSkinCard = ref(false)
    provide('showSkinCard', showSkinCard)

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
      visibleInfo: false,
      visibleConfig: false
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

a {text-decoration: none;}

.btn-info,
.btn-config {
  right: 0;
  position: fixed !important;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.btn-info {
  bottom: 5vw;
}

.btn-config {
  bottom: calc(5vw + 50px);
}

h1 {
  font-size: 1.5rem;
}
</style>
