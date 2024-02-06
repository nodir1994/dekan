<script setup lang="ts">
  import { computed, watch } from "vue";
  import { useRouter } from "vue-router";
  import { useI18n } from "vue-i18n";
  import { useStorage } from "@vueuse/core";

  const router = useRouter();
  const { locale, availableLocales } = useI18n();
  const defaultLocale = useStorage("locale", "uz");

  watch(locale, () => {
    defaultLocale.value = locale.value;
  });

  const filteredLocales = computed(() =>
    availableLocales.filter((item) => item !== locale.value)
  );

  const localFlagSrc = computed(() => {
    return (locale: string) => {
      switch (locale) {
        case "en":
          return "/src/assets/images/flags/en.jpg";
        case "ru":
          return "/src/assets/images/flags/ru.jpg";
        case "uz":
        default:
          return "/src/assets/images/flags/uz.jpg";
      }
    };
  });

  function setLocale(val: string) {
    locale.value = val;
    router.go(0);
  }
</script>

<template>
  <div class="dropdown d-inline-block language-switch">
    <button
      type="button"
      class="btn header-item"
      data-bs-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <img
        class="header-lang-img"
        :src="'/src/assets/images/flags/' + locale + '.jpg'"
        alt="Language"
        height="16"
      />
      <!-- <span>{{ locale.toUpperCase() }}</span> -->
    </button>
    <div class="dropdown-menu dropdown-menu-end">
      <template v-for="(lang, langIndex) in filteredLocales" :key="langIndex">
        <a
          href="javascript:void(0);"
          class="dropdown-item notify-item language"
          :data-lang="lang"
          @click="setLocale(lang)"
        >
          <img
            :src="localFlagSrc(lang)"
            alt="locale-flag"
            class="me-1"
            height="12"
          />
          <span
            class="align-middle"
            v-text="
              lang == 'uz' ? 'O\'zbekcha' : lang == 'ru' ? 'Русский' : 'English'
            "
          />
        </a>
      </template>
    </div>
  </div>
</template>
