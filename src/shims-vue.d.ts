/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.scss' {
  const css: {
    // 定义的变量，通过 `variables.menuBg` 取值时，就不会报错了
    menuBg: string;
  }
  export default css
}

declare module 'css-color-function';
