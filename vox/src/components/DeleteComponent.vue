<template>
    <div v-if="deleteInfo" class="personal-info-wrap" :style="{top: `${topProp}px`, height: `calc(100% - ${topProp}px)`}">
      <div class="delete-block">
          <span>
              <div class="delete-top-block">
                <span class="delete-image">
                    <img src="@/assets/img/icons/delete-queue.svg" alt="delete" />
                </span>
                <div class="top-content-block">
                    <span class="top-title">{{titleProp}}</span>
                    <span class="top-content">{{textProp}}</span>
                </div>
            </div>
            <div class="delete-btn-block">
                <span class="cancel-btn" @click="cancelDeleteItem()">Cancel</span>
                <span class="delete-btn" @click="deleteItem()">Delete </span>
            </div>
          </span>
      </div>
    </div>
</template>
<script>
export default {
  name: 'DeleteQueue',
  props: ['deleteFunc', 'cancelDeleteFunc', 'deleteInfo', 'textProp', 'titleProp', 'topProp'],
  methods: {
    cancelDeleteItem() {
      this.$emit('cancelDeleteFunc')
    },
    deleteItem() {
      this.$emit('deleteFunc')
    }
  },
  mounted() {
    document.addEventListener("keydown", e => {
      if (e.key === "Enter" && this.deleteInfo) {
        this.deleteItem()
      }
      if (e.key === "Escape" && this.deleteInfo) {
        this.cancelDeleteItem()
      }
    })
  }
}
</script>
<style scoped lang="scss">
.personal-info-wrap {
  position: absolute;
  top: 227px;
  left: 0;
  width: 100%;
  height: calc(100% - 227px);
  background: rgba(196, 196, 196, 0.023);
  box-shadow: inset 70px -70px 70px rgba(149, 149, 149, 0.023), inset -70px 70px 70px rgba(255, 255, 255, 0.023);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .delete-block{
    background: var(--substrate);
    box-shadow: 0px 16px 20px rgba(0, 0, 0, 0.15);
    border-radius: 16px;
    padding: 117px 0 76px;
    width: 571px;
    height: 390px;
    display: flex;
    justify-content: center;

    .delete-top-block {
      display: flex;
      justify-content: space-between;

      .delete-image{
        width: 85px;
        height: 85px;
        background: #FF3A29;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 35px;
      }

      .top-content-block{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .top-title{
          display: inline-block;
          font-weight: normal;
          font-size: 24px;
          line-height: 28px;
          color: var(--font-panel);
          margin-bottom: 15px;
        }
        .top-content{
          display: inline-block;
          font-weight: normal;
          font-size: 16px;
          line-height: 19px;
          color: var(--font-panel);
          width: 154px;
        }
      }
    }
    .delete-btn-block{
      width: 274px;
      margin-right: auto;
      margin-left: auto;
      margin-top: 89px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      span {
        width: 131px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        border-radius: 4px;
        font-weight: normal;
        font-size: 16px;
        line-height: 19px;
        cursor: pointer;
        transition: .3s ease;
        transform: scale(1, 1);

        &:hover {
          transition: .3s ease;
          transform: scale(1.1, 1.1);
        }
      }
      .cancel-btn{
        border: 2px solid var(--font-panel);
        color: var(--font-panel);
      }
      .delete-btn {
        border: 2px solid #FF3A29;
        color: #FF3A29;
      }
    }
  }
}
</style>
