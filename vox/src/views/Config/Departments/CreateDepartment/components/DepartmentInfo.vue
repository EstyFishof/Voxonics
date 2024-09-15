<template>
  <div class="personal-info-wrap">
    <div class="wrap-head">
      <h2>DEPARTMENT INFO</h2>
      <span class="hr"></span>
    </div>

    <div class="wrap-body">
      <div class="personal-info">
        <div class="personal-info__first-part">
          <div class="item-container with-err">
            <label>
              Name
              <input placeholder="Enter name of Department"
                     class="input-field"
                     v-model.trim="name"
                     maxlength="12"
                     @change="setDepartmentName"
                     required
                     :class="{error: requiredName}"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "DepartmentInfo",
  props: ['requiredName'],
  data() {
    return {
      name: "",
    }
  },
  computed: {
    ...mapGetters(['newDepartmentName'])
  },
  methods: {
    setDepartmentName() {
      this.$store.dispatch('transferNameDepartment', this.name)
    }
  },
  mounted() {
    if (this.newDepartmentName) {
      this.name = this.newDepartmentName
    }
  }
}
</script>

<style scoped lang="scss">
.personal-info-wrap {
  .wrap-body {
    display: flex;
    flex-direction: row;
    margin: 36px 0 36px 24px;

    .personal-info {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;

      &__first-part {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .item-container {
          margin: 16px 0;

          label {
            font-size: 18px;
            font-weight: 700;
            text-align: left;
            color: var(--light-blue);

            .error {
              border: 1px solid red !important;
              outline: red;
            }
          }
        }
      }
    }
  }

  .with-err {
    position: relative;
    margin-bottom: 30px;
  }

}
</style>
