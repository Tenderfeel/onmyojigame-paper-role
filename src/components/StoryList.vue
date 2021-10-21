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
          <div class="p-mr-2">物語</div>
          <Badge v-if="completeStory">{{ completeStory }}</Badge>
        </div>
      </template>

      <template #list="slotProps">
        <Story class="p-col-12" :data="slotProps.data" />
      </template>
    </DataView>
  </div>
</template>

<script>
import { inject, ref } from "vue";
import Story from "./Story.vue";

export default {
  components: { Story },
  setup() {
    const stories = inject("stories");
    const completeStory = inject("completeStory");

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
    };
  },
};
</script>

<style scoped lang="scss">
.story-list {
  padding: 1rem;
}
</style>