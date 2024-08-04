<template>
  <div class="cropper-phone-avatar-main-wrapper" :style="{'pointer-events': changeMode ? 'auto' : 'none'}">
    <span class="default-user-avatar-span" @click="$refs.file.click()">
      <UserDefaultAvatar :sizeWrapper="sizeWrapper" :widthIcon="widthIcon" :heightIcon="heightIcon" :marginIcon="marginIcon" :marginWrapper="marginWrapper" :userAva="userAva" />
    </span>
    
    <input class="none" type="file" id="file" ref="file" @change="changeFile" />

    <div class="cropper-fixed-block" :style="stylesForFixesBlock" v-if="imgBase64">
      <div class="cropper-main-block-border">
        <button class="btn-del" @click="closeModal">
          <img src="@/assets/img/icons/cross-delete.svg" />
        </button>
        <span class="cropper-main-text">You can crop the picture</span>
        <span class="cropper-main-image-block">
          <cropper
            :src="imgBase64"
            @change="cropperChange"
            :imageClass="'cropper-image'"
            class="cropper-main-block"
            background-class="cropper-main-block__background"
            foreground-class="cropper-main-block__foreground"
            :stencil-component="$options.components.Stencil"
          />
        </span>
        <button @click="handleFileUpload" class="btn">Confirm</button>
      </div>
    </div>

  </div>
</template>
<script>
import { Cropper } from 'vue-advanced-cropper'
/* eslint-disable vue/no-unused-components */
import Stencil from "./Stencil"
import 'vue-advanced-cropper/dist/style.css'
import UserDefaultAvatar from './UserDefaultAvatar.vue'
export default {
  name: 'CropperPhoneAvatarWrapper',
  props: [
    'userAva',
    'sizeWrapper', 
    'widthIcon', 
    'heightIcon', 
    'marginIcon', 
    'marginWrapper',
    'done',
    'stylesForFixesBlock',
    'changeMode'
  ],
  components: {
    Cropper,
    Stencil,
    UserDefaultAvatar
  },
  data() {
    return {
      imgBase64: '',
      preview: ''
    }
  },
  methods: {
    closeModal() {
      this.imgBase64 = ''
      // this.userUidProp ? this.preview = this.userAva : this.preview = ''
    },
    changeFile() {
      const file = this.$refs.file.files[0]
      this.getBase64(file)
        .then(data => this.imgBase64 = data)
    },
    handleFileUpload() {
      this.$emit('done', JSON.parse(JSON.stringify(this.imgBase64)))
      this.imgBase64 = ''
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    cropperChange({canvas}) {
      this.preview = canvas.toDataURL()
    }
  }
}
</script>
<style src="@/assets/styles/delete-btn.scss" lang="scss" scoped></style>
<style lang="scss">
.cropper-phone-avatar-main-wrapper {
  .none {
    display: none;
  }
  .default-user-avatar-span {
    cursor: pointer;
  }
  .cropper-fixed-block {
    top: 0;
    left: 0;
    position: fixed;
    flex-direction: column;
    width: 375px;
    height: 812px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    background-color: rgba(0, 0, 0, 0.35);

    .cropper-main-block-border {
      width: 375px;
      height: 812px;
      // background: var(--bgc_main);
      box-shadow: 0 16px 20px rgba(0, 0, 0, 0.5);
      border-radius: 16px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;

      .cropper-main-text {
        color: var(--font-panel);
        width: 100%;
        text-align: center;
        display: inline-block;
        font-size: 22px;
        margin-top: 100px;
      }

      .btn-del {
        position: absolute;
        top: 20px;
        right: 20px;
        width: 50px;
        height: 50px;

        img {
          width: 20px;
          height: 20px;
        }
      }

      .cropper-main-image-block {
        height: 400px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 30px;
      }

      .btn {
        margin-top: 30px;
        background: var(--light-blue);
        padding: 8px 36px;
        color: var(--white);
        font-size: 18px;
        font-weight: 500;
        border: none;
        width: 170px;
        height: 52px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.5s ease-out;
        opacity: 0.7;
        transform: scale(1, 1);
      }
      
      .btn:hover {
        transition: .3s ease;
        transform: scale(1.1, 1.1);
        opacity: 1;
      }
    }
  }
}

</style>
