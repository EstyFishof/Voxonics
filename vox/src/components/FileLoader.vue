<template>
  <div class="file-loader-main-block">
    <div class="personal-img">
      <svg
        v-if="!preview"
        class="personal-img__user-img"
        width="68"
        height="90"
        viewBox="0 0 68 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg" >
        <path
          class="inside"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M66 83.2228C66 85.8601 63.9566 88.0005 61.4286 88.0005C58.9006 88.0005 56.8571 85.8601 56.8571 83.2228C56.8571 70.0505 46.6034 59.3339 34 59.3339C21.3966 59.3339 11.1429 70.0505 11.1429 83.2228C11.1429 85.8601 9.09943 88.0005 6.57143 88.0005C4.04343 88.0005 2 85.8601 2 83.2228C2 64.7806 16.3589 49.7784 34 49.7784C51.6411 49.7784 66 64.7806 66 83.2228M34 11.5584C39.0423 11.5584 43.1429 15.8441 43.1429 21.114C43.1429 26.3838 39.0423 30.6695 34 30.6695C28.9578 30.6695 24.8572 26.3838 24.8572 21.114C24.8572 15.8441 28.9578 11.5584 34 11.5584M34.0001 40.2221C44.0847 40.2221 52.2858 31.6508 52.2858 21.111C52.2858 10.5713 44.0847 2 34.0001 2C23.9156 2 15.7144 10.5713 15.7144 21.111C15.7144 31.6508 23.9156 40.2221 34.0001 40.2221" />
        <path
          class="out"
          d="M64 83.2228C64 84.841 62.7684 86.0005 61.4286 86.0005V90.0005C65.1447 90.0005 68 86.8792 68 83.2228H64ZM61.4286 86.0005C60.0887 86.0005 58.8571 84.841 58.8571 83.2228H54.8571C54.8571 86.8792 57.7124 90.0005 61.4286 90.0005V86.0005ZM58.8571 83.2228C58.8571 69.03 47.7903 57.3339 34 57.3339V61.3339C45.4166 61.3339 54.8571 71.0709 54.8571 83.2228H58.8571ZM34 57.3339C20.2097 57.3339 9.14286 69.03 9.14286 83.2228H13.1429C13.1429 71.0709 22.5834 61.3339 34 61.3339V57.3339ZM9.14286 83.2228C9.14286 84.841 7.91129 86.0005 6.57143 86.0005V90.0005C10.2876 90.0005 13.1429 86.8792 13.1429 83.2228H9.14286ZM6.57143 86.0005C5.23156 86.0005 4 84.841 4 83.2228H0C0 86.8792 2.85529 90.0005 6.57143 90.0005V86.0005ZM4 83.2228C4 65.8012 17.5455 51.7784 34 51.7784V47.7784C15.1722 47.7784 0 63.76 0 83.2228H4ZM34 51.7784C50.4545 51.7784 64 65.8012 64 83.2228H68C68 63.76 52.8278 47.7784 34 47.7784V51.7784ZM34 13.5584C37.8555 13.5584 41.1429 16.8645 41.1429 21.114H45.1429C45.1429 14.8237 40.2292 9.55844 34 9.55844V13.5584ZM41.1429 21.114C41.1429 25.3634 37.8555 28.6695 34 28.6695V32.6695C40.2292 32.6695 45.1429 27.4043 45.1429 21.114H41.1429ZM34 28.6695C30.1446 28.6695 26.8572 25.3634 26.8572 21.114H22.8572C22.8572 27.4043 27.7709 32.6695 34 32.6695V28.6695ZM26.8572 21.114C26.8572 16.8645 30.1446 13.5584 34 13.5584V9.55844C27.7709 9.55844 22.8572 14.8237 22.8572 21.114H26.8572ZM34.0001 42.2221C45.2716 42.2221 54.2858 32.6712 54.2858 21.111H50.2858C50.2858 30.6303 42.8978 38.2221 34.0001 38.2221V42.2221ZM54.2858 21.111C54.2858 9.55086 45.2716 0 34.0001 0V4C42.8978 4 50.2858 11.5917 50.2858 21.111H54.2858ZM34.0001 0C22.7287 0 13.7144 9.55086 13.7144 21.111H17.7144C17.7144 11.5917 25.1024 4 34.0001 4V0ZM13.7144 21.111C13.7144 32.6712 22.7287 42.2221 34.0001 42.2221V38.2221C25.1024 38.2221 17.7144 30.6303 17.7144 21.111H13.7144Z" />
      </svg>
      <inner-image-zoom v-else :src="preview" alt="Upload your photo" :className="'avatar'" :height="240" :hasSpacer="true" :zoomScale="2" />
      <label><span v-show="!preview">Upload your photo</span> </label>
      <button
        @click="btnClickHander()"
        content="Choose file"
        v-tippy="{ placement: 'right', arrow: true, delay: 800, duration: 500 }" >
        <label>
          <input class="none" type="file" id="file" ref="file" @change="changeFile" />
          <img src="../assets/img/icons/upload-img-plus.svg" alt="For submit press" />
        </label>
      </button>
      <h1>{{ img }}</h1>
    </div>
    <div class="cropper-fixed-block" v-if="imgBase64">
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
import {UsersEffectsApi} from "@/API/effects"
import { mapGetters } from "vuex"
import InnerImageZoom from "vue-inner-image-zoom"
import "@/assets/styles/vue-inner-image-zoom.css"

import { Cropper } from 'vue-advanced-cropper'
/* eslint-disable vue/no-unused-components */
import Stencil from "./Stencil"
import 'vue-advanced-cropper/dist/style.css'

export default {
  name: 'FileLoader',
  components: {
    "inner-image-zoom": InnerImageZoom,
    Cropper,
    Stencil
  },
  props: ["userUidProp"],
  data() {
    return {
      preview: "",
      img: "",
      imgBase64: '',
      canvas: '',
      unsubscribe: () => {}
    }
  },
  computed: {
    ...mapGetters(["userUid", "userAva", "userInfoVuex"])
  },
  methods: {
    btnClickHander() {
      this.$refs.file.value = null
    },
    closeModal() {
      this.imgBase64 = ''
      this.userUidProp ? this.preview = this.userAva : this.preview = ''
    },
    changeFile() {
      const file = this.$refs.file.files[0]
      this.getBase64(file)
        .then(data => this.imgBase64 = data)
    },
    handleFileUpload() {
      this.$store.dispatch("setSpinner", true)
      const file = this.dataURIToBlob(this.preview)
      this.imgBase64 = ''
      const formData = new FormData()
      formData.append("avatar", file)
      UsersEffectsApi.submitAvatar(formData, this.userUidProp ? this.userUid : "").then(url => {
        this.preview = url
        this.userUidProp ? this.updateUserAvatar() : null
      })
    },
    updateUserAvatar() {
      const form = JSON.parse(JSON.stringify(this.userInfoVuex))
      UsersEffectsApi.updateUserAvatar(form, this.userUid || sessionStorage.getItem('userUid'))
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    },
    dataURIToBlob(dataURI) {
      const splitDataURI = dataURI.split(',')
      const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1])
      const mimeString = splitDataURI[0].split(':')[1].split(';')[0]

      const ia = new Uint8Array(byteString.length)
      for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i)

      return new Blob([ia], { type: mimeString })
    },
    cropperChange({canvas}) {
      this.preview = canvas.toDataURL()
    }
  },
  mounted() {
    if (this.userUidProp) {
      this.preview = this.userAva
      this.unsubscribe = this.$store.subscribe(mutation => {
        if (mutation.type === "setUserInfo") {
          this.preview = this.userAva
        }
      })
    }
  },
  beforeDestroy() {
    this.unsubscribe()
  }
}
</script>
<style src="@/assets/styles/delete-btn.scss" lang="scss" scoped></style>
<style lang="scss">
.file-loader-main-block {
  .cropper-main-block {
    height: 400px;
    width: 750px;

    &__background {
      background-color: rgba(0, 0, 0, 0);
    }

    &__foreground {
      background-color: rgba(0, 0, 0, 0);
    }
  }
  input[type="file"] {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    cursor: pointer;
  }

  .cropper-fixed-block {
    top: 0;
    left: 0;
    position: fixed;
    flex-direction: column;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    background-color: rgba(0, 0, 0, 0.25);

    .cropper-main-block-border {
      width: 900px;
      height: 630px;
      background: var(--bgc_main);
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
        font-size: 28px;
        margin-top: 30px;
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

  label {
    cursor: pointer;
  }

  .personal-img {
    position: relative;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    width: 244px;
    height: 244px;
    max-width: 244px;
    max-height: 244px;
    border: 2px solid var(--light-blue);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);

    .inside {
      fill: var(--fill-user-icon);
    }
    label span {
      color: var(--font-user-icon);
    }
  }

  .personal-img__user-img {
    margin-bottom: 12px;
  }

  .none {
    display: none;
  }

  .avatar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    display: block;
    width: 100%;
    height: 240px;
  }

  .personal-img span {
    color: #515960;
    font-weight: 300;
    line-height: 19px;
    margin-bottom: 4px;
  }

  .personal-img button {
    position: absolute;
    right: 12px;
    bottom: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--white);
    background: var(--light-blue);
    border: none;
    border-radius: 50%;
    width: 48px;
    height: 48px;
  }
}
</style>
