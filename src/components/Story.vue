<template>
  <div class="story p-grid p-nogutter">
    <div class="p-col-12 p-md-3 p-d-flex p-ai-start p-p-1">
      <Card v-for="card in data.cardData" :key="card.id" :data="card" />
    </div>
    <div class="p-col p-grid p-nogutter">
      <div class="p-col p-p-2">
        <p class="p-mt-0 p-mb-2">
          <span class="story-name" :class="{ complete: data.complete }">{{
            data.name
          }}</span>
          <span class="story-point p-ml-2">{{ data.point }}pt</span>
        </p>
        <p class="story-text p-m-0">{{ data.text }}{{data.checked}}</p>

      </div>      
      <div class="p-col-fixed p-d-flex p-ai-center p-p-1">
        <InputSwitch v-model="checked" @change="handleChange" />
      </div>
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
      default: null,
    }
  },
  data() {
    return {
      // 開放済み
      checked: JSON.parse(localStorage.getItem(`story.open.${this.data.id}`) || 'false')
    }
  },
  methods: {
    handleChange() {
      this.$emit('change', this.checked)
      localStorage.setItem(`story.open.${this.data.id}`, this.checked)
    }
  }
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