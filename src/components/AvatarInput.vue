<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  imgUrl: String,
  // defaultScr: String,fileUrl: String,
});

const emits = defineEmits(["input"]);
const src = ref("/src/assets/images/users/avatar-default.png");
const fileUrl: any = ref("");
const fileEl: any = ref(null);

watch(
  () => props.imgUrl,
  (newVal) => {
    if (newVal) src.value = newVal;
  },
  {
    immediate: true,
  }
);

function browse() {
  fileEl.value.click();
}

function change(e: Event) {
  fileUrl.value = e.target?.files[0];
  emits("input", fileUrl.value);
  let reader = new FileReader();
  reader.readAsDataURL(fileUrl.value);
  reader.onload = (e: any) => {
    src.value = e.target.result;
  };
}
</script>

<template>
  <div class="my-profile d-flex justify-content-center align-items-center">
    <input
      type="file"
      accept="image/*"
      class="visually-hidden"
      ref="fileEl"
      @change="change"
    />
    <div class="position-relative inline-block avatar-contenet d-flex">
      <img :src="src" class="h-100 w-100 rounded" />
      <div
        class="position-absolute top-0 h-100 w-100 rounded d-flex justify-content-center align-items-center"
      >
        <button type="button" class="btn btn-link" @click="browse()">
          <i class="mdi mdi-camera"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.my-profile {
  .avatar-contenet {
    // max-height: 130px;
    button {
      opacity: 0.1;
      transition: 0.4s ease;
      i {
        color: #0a9396;
        font-size: 70px;
      }
    }
    &:hover {
      button {
        opacity: 1;
      }
    }
    // img {
    //   max-height: 130px;
    // }
  }
}
</style>
