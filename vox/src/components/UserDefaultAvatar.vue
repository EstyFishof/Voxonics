<template>
  <div>
    <div v-if="!userAva" class="ava-wrapper" :style="{width: sizeWrapper, height: sizeWrapper, margin: marginWrapper}">
      <img  class="ava-icon" :style="{width: widthIcon, height: heightIcon, margin: marginIcon}" src="@/assets/img/icons/user-ava-icon.svg" />
    </div>
    <img v-else :style="{width: sizeWrapper, height: sizeWrapper, margin: marginWrapper, 'border-radius': '50%'}" :src="userAva" />
  </div>
  
</template>
<script>
export default {
  name: 'UserDefaultAvatar',
  props: [
    'sizeWrapper', 
    'widthIcon', 
    'heightIcon', 
    'marginIcon', 
    'marginWrapper',
    'userAva'
  ]
}
</script>
<style lang="scss" scoped>
  .ava-wrapper {
    margin-top: 7px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 50%;
    border: 1px solid rgba(39, 104, 153, 0.51);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--ava-wrapper-bg);
  }
</style>
