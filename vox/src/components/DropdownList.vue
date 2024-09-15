<template>
  <ul :class="classNameList" @scroll="$emit('scrollFunc', $event)">
    <slot></slot>
    <li v-if="valueInput !== null && valueInput !== undefined" class="not-description-item" style="background: none !important; overflow: hidden">
      <input :class="classNameInput"
        :value="valueInput" @input="$emit('changeInput', $event)"/>
    </li>
    <li v-if="clickFuncAll" class="not-description-item" @click="clickFuncAll">All</li>
    <li v-for="(item, index) in dataList" :key="index + item"
      @click="clickHandler(item)"
      :class="classNameItemComputed(item)"
      :content="!contentTippyCondition(item) ? '' : itemText(item)"
      v-show="showItem(item)"
      v-tippy="{ zIndex: !contentTippyCondition(item) ? -9999 : 9999, placement: 'left', distance: '-35', arrow: true, delay: 50, duration: 500 }" v-html="itemText(item)">
      <!-- <span v-html="itemText(item)"></span> -->
      <!-- {{itemText(item)}} -->
    </li>
  </ul>
</template>
<script>
export default {
  name: 'DropdownList',
  props: {
    dataList: Array,
    clickFunc: Function,
    clickFuncAll: {
      type: Function,
      default: null
    },
    classNameList: String,
    classNameItemComputed: {
      type: Function,
      default: () => ''
    },
    classNameInput: String,
    scrollFunc: {
      type: Function,
      default: () => {}
    },
    itemText: Function,
    valueInput: {
      type: String,
      default: null
    },
    contentTippyCondition: {
      type: Function,
      default: () => false
    },
    showItem: {
      type: Function,
      default: () => true
    }
  },
  methods: {
    clickHandler(item) {
      this.$emit('clickFunc', item)
      this.$emit('changeInput', {
        target: {
          value: ''
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped src="@/assets/styles/dropdownSearchString.scss"></style>
<style lang="scss" scoped>
li {
  text-transform: capitalize;
}
</style>
<style lang="scss">
.external-number-description-list {
  li {
    &:not(.not-description-item) {
      height: 35px !important;
      align-items: flex-start !important;

      .description {
        position: absolute;
        font-size: 10px;
        top: 16px;
      }
    }
  }
}

</style>
