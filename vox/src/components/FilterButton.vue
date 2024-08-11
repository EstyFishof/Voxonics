<template>
  <button class="filter-button" @click="$emit('click')">
    {{ label }}
    <img :class="{ rotated: !sortAsc }" src="@/assets/img/icons/arrow-down-white.svg" alt="select" />
  </button>
</template>

<script>
export default {
  name: "FilterButton",
  props: {
    label: {
      type: String,
      required: true,
    },
    sortKey: {
      type: String,
      //required: true
    },
    sortAsc: {
      type: Boolean,
      required: true,
    },
    isActive: {
      type: Boolean,
      //required: true
    },
  },
};
</script>

<style scoped>
.filter-button {
  border-radius: 6px;
  background-color: #546e7a4f;
  color: white;
  border: none;
  padding: 5px 10px;
  margin: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center; /* Center content horizontally */
}

.filter-button img {
  width: 12px;
  height: 12px;
  vertical-align: middle;
  margin-left: 5px;
  transition: transform 0.3s ease;
  transform: rotate(180deg); /* חץ כלפי מעלה לאחר לחיצה */
}

.filter-button img.rotated {
  transform: rotate(0deg); /* חץ כלפי מטה כברירת מחדל */
}
</style>
