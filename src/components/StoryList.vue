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
            <span class="p-d-inline-block p-mr-2">物語</span>
            <Badge v-if="completeStory">{{ completeStory }}</Badge>
          </div>
          <div class="p-col-fixed">
            <Dropdown class="p-mr-2" v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort by Score" @change="onSortChange($event)" />
            <!-- カード未選択も表示する -->
            <Button @click="showUnselected = !showUnselected" 
            :class="{'p-button-outlined': !showUnselected}" icon="pi pi-book"></Button>
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <div class="p-col-12 p-grid p-nogutter">
          <Story class="p-col" :data="slotProps.data" />
          <div class="p-col-fixed p-d-flex p-ai-center p-p-1">
            <InputSwitch v-model="slotProps.data.open" @change="handleChange(slotProps.data)" />
          </div>
        </div>
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
      // 開放済み
      story.open = localStorage.getItem(`story.open.${story.id}`) === 'true'
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

  data() {
    return {
      sortOptions: [
        {label: 'Sort by ID', value: 'id'},
        {label: 'Sort by Score', value: '!score'},
        {label: 'Sort by Select', value: '!selectedCards'}
      ]
    }
  },


  methods: {
    onSortChange(e) {
      const value = e.value.value
      const sortValue = e.value;

      if (value.indexOf('!') === 0) {
        this.sortOrder = -1
        this.sortField = value.substring(1, value.length)
        this.sortKey = sortValue
      } else {
        this.sortOrder = 1
        this.sortField = value
        this.sortKey = sortValue
      }
    },
    handleChange(story) {
      localStorage.setItem(`story.open.${story.id}`, story.open)
    }
  }
};
</script>

<style scoped>
.story-list {
  padding: 1rem;
}
</style>