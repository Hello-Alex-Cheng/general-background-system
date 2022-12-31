module.exports = {
  root: true, // 表示当前目录为根目录
  env: {
    node: true,
  },
  globals: {
    withDefaults: 'readonly'
  },
  // ESLint 中基础配置需要继承的配置
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  // 错误规则：off(0) warn(1) error(2)
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // 关闭 no-used 检查
    "@typescript-eslint/no-unused-vars": "off",
    // 函数参数必须定义类型
    "@typescript-eslint/explicit-module-boundary-types": 0,
    "@typescript-eslint/ban-ts-comment": 0,
    '@typescript-eslint/no-var-requires': 0
  },
  overrides: [{
    files: [
      "**/__tests__/*.{j,t}s?(x)",
      "**/tests/unit/**/*.spec.{j,t}s?(x)",
    ],
    env: {
      jest: true,
    },
  }, ],
};