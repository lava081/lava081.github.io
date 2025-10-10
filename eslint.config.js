import js from "@eslint/js";
import globals from "globals";
import pluginVue from "eslint-plugin-vue";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,vue}"], plugins: { js }, extends: ["js/recommended"] },
  { 
    files: ["**/*.{js,mjs,cjs,vue}"], 
    languageOptions: { 
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        // Nuxt 3 自动导入的全局变量
        useColorMode: "readonly",
        useHead: "readonly",
        useRouter: "readonly",
        defineNuxtConfig: "readonly",
        computed: "readonly",
        watch: "readonly",
        ref: "readonly",
        reactive: "readonly",
        onMounted: "readonly",
        onUnmounted: "readonly"
      }
    }
  },
  pluginVue.configs["flat/essential"],
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
]);