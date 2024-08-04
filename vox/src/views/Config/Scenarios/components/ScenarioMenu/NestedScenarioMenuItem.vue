<template>
  <div class="bottom-tabs-block" v-if="getScenario && getScenario.path">
    <ul class="bottom-tabs" v-if="tab.path.split('/')[1] === getScenario.path.split('/')[1]">
      <li class="add-bottom-list-item" v-if="changeMode">
        <span class="add-route-btn-span" :class="{'disabled-btn': !name.secondaryName.length}"
          @click.stop="setNewScenario(`${tab.path.split('/')[1]}/${name.secondaryName}`)">
          <span class="add-route-btn"><img src="@/assets/img/icons/add-route-btn.svg"/></span>
        </span>
      </li>
      <ul
        class="list"
      >
        <li
          v-for="item of listScenarios"
          v-show="item.path.split('/')[1] === activeTab.split('/')[1] || item.path === activeTab"
          class="child-tab"
          :key="item.path"
          :class="{ activeElement: item.path === activeTab }">
          <span class="child-tab-span">
            <input
              class="item-input"
              type="text"
              :value="item.path.split('/')[2] || 'default'"
              :readonly="readonly !== item.uid"
              maxlength="16"
              @dblclick="changedItem(item.uid)"
              @blur="setReadonly('')"
              @click.stop="changeActiveScenario(item)"
              size="3"
              @change="setName($event.target.value, item)"
              :content="item.path.split('/')[2] || 'default'"
              v-tippy="{ placement: 'top', arrow: true, delay: 500, duration: 500 }"/>
          </span>
          <span class="delete-scenario-element" @click="deleteScenario(item, 'child')" v-if="changeMode">
            <img src="@/assets/img/icons/red-cross.svg" width="11" height="11"/>
          </span>
        </li>
      </ul>
      <!-- <drop-list
          :items="listScenarios"
          class="list"
          @reorder="reorderHandler"
          :column="false"
          ref="dropList"
        >
          <template v-slot:item="{item}">
            <drag v-if="item" @dragend="$event => dragendHandler($event, item)" :key="item.uid">
              <li
                v-show="item.path.split('/')[1] === activeTab.split('/')[1] || item.path === activeTab"
                  class="child-tab"
                  :key="item.path"
                  :class="{ activeElement: item.path === activeTab }">
                  <span class="child-tab-span">
                    <input
                      class="item-input"
                      type="text"
                      :value="item.path.split('/')[2] || 'default'"
                      :readonly="readonly !== item.uid"
                      maxlength="16"
                      @dblclick="changedItem(item.uid)"
                      @blur="setReadonly('')"
                      @click.stop="changeActiveScenario(item)"
                      size="3"
                      @change="setName($event.target.value, item)"
                      :content="item.path.split('/')[2] || 'default'"
                      v-tippy="{ placement: 'top', arrow: true, delay: 500, duration: 500 }"/>
                  </span>
                  <span class="delete-scenario-element" @click="deleteScenario(item, 'child')" v-if="changeMode">
                    <img src="@/assets/img/icons/red-cross.svg" width="11" height="11"/>
                  </span>
                </li>
            </drag>
          </template>
        </drop-list> -->


      <li class="child-tab" v-if="changeMode">
        <input class="secondary-input" maxlength="16" v-model="name.secondaryName" placeholder="  Add new"/>
      </li>
    </ul>
  </div>
</template>
<script>
import { Drag, DropList } from 'vue-easy-dnd'

export default {
  name: 'NestedScenarioMenuItem',
  components: {
    Drag,
    DropList
  },
  props: [
    'tab', 
    'changeMode', 
    'getScenario', 
    'name', 
    'setNewScenarioProp',
    'activeTab',
    'listScenarios',
    'readonly',
    'setReadonlyProp',
    'changeActiveScenarioProp',
    'setNameProp',
    'deleteScenarioProp',
    'changedItemProp'
  ],
  methods: {
    dragendHandler(event, item) {
      const paths = event.native.path

      for (const element of paths) {
        if(element.classList.contains('top-tabs')) {
          const newName = '/' + item.path.split('/')[2]
          return this.$store.dispatch('changeNameOfScenarioAfterDrag', {newName, scenario: item})
        }
      }
    },
    setNewScenario(name) {
      this.$emit('setNewScenarioProp', name)
    },
    changedItem(uid) {
      this.$emit('changedItemProp', uid)
    },
    setReadonly(value) {
      this.$emit('setReadonlyProp', value)
    },
    changeActiveScenario(item) {
      this.$emit('changeActiveScenarioProp', item)     
    },
    setName(name, item) {
      this.$emit('setNameProp', name, item)     
    },
    deleteScenario(item, position) {
      this.$emit('deleteScenarioProp', item, position)        
    },
    reorderHandler(event) {
      console.log(event)
    }
  }
}
</script>
<style lang="scss" scoped>
.bottom-tabs-block {
  position: absolute;
  top: 27px;
  left: 0;
}

.list {
  display: flex;
  margin-right: 11px;

  .child-tab {
    &::after {
      top: 6px !important;
    }
  }
}

.bottom-tabs {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;

  .add-bottom-list-item {
    position: absolute;
    left: -20px;
    top: 3px;

    .add-route-btn-span {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      // background: var(--cdr-datepicker-bg);
      background: var(--main-bg);
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
      cursor: pointer;

      .add-route-btn {
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: var(--button-edit-dep-bg);
        color: #276899;
        font-size: 24px;
        transition: .3s ease;
        transform: scale(1, 1);

        &:hover {
          transition: .3s ease;
          transform: scale(1.15, 1.15);
        }
      }

      &.disabled-btn {
        opacity: 0.3;
        cursor: auto;
        pointer-events: none;
      }
    }
  }

  .child-tab {
    cursor: pointer;
    position: relative;
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;
    color: #ffffff;

    &.activeElement {
      .item-input {
        color: #276899 !important;
        font-size: 14px !important;
        transition: 0.5s ease;
        // height: 24px;
      }
    }

    .child-tab-span {
      background: none;
      border-radius: 4px;
      height: 14px;
      margin-top: 5px;
      display: block;

      &:hover {
        background: var(--scenario-child-tab-hover);
      }
    }

    .item-input {
      background: none;
      border: none;
      outline: none;
      font-weight: 300;
      font-size: 12px;
      line-height: 14px;
      width: auto;
      color: #ffffff;
      text-align: center;
      cursor: pointer;
      height: 14px;
      width: 65px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .set-name {
      right: 0%;
      top: calc(0% - 6px);
      width: 12px;
      height: 12px;
      z-index: 10;
    }

    .secondary-input {
      width: 65px;
      font-weight: 300;
      font-size: 12px;
      line-height: 14px;
      color: #ffffff;
      border: none;
      outline: none;
      background: none;
      height: 14px;
      margin-top: 5px;
      &::placeholder {
        color: var(--scenario-input-placeholder);
      }
    }

    &:not(:last-child) {
      margin-right: 11px;
    }

    &::after {
      content: "";
      position: absolute;
      width: 1px;
      height: 12px;
      background: #979797;
      border-radius: 22px;
      right: -5px;
      top: 6px;
    }

    .delete-scenario-element {
      position: absolute;
      right: 0%;
      top: calc(0% - 6px);
      z-index: 10;
      cursor: pointer;

      img {
        border-radius: 50%;
        box-shadow: 0 8px 16px rgba(26, 18, 18, 0.25);
        transform: scale(1);
        transition: all .3s ease-in-out;

        &:hover {
          transform: scale(1.2);
          transition: all .3s ease-in-out;
        }
      }
    }
  }
}
</style>
