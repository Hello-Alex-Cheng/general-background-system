// https://www.npmjs.com/package/css-color-function
import color from 'css-color-function'

// https://www.npmjs.com/package/rgb-hex
import rgbHex from 'rgb-hex'
import axios from 'axios'
import formula from '@/constants/formula.json'
/**
 * 写入新样式到 style
 * @param {*} cssText  element-plus 的新样式
 * @param {*} isNewStyleTag 是否生成新的 style 标签
 */
export const writeNewStyle = (cssText: string) => {
  const style = document.createElement('style')
  style.innerText = cssText
  document.head.appendChild(style)
}

/**
 * 根据主色值，生成最新的样式表
 */
type TObject = { [key: string]: string }
export const generateNewStyle = async (primaryColor: string) => {
  const colors: TObject = generateColors(primaryColor) as TObject // colors ===> { primary: 'rgba(8, 12, 132, 0.68)', shade-1: '#070b77ad', light-1: '#212490ad', light-2: '#393d9dad', ...... }

  // 拿到整个 element plus 样式表，并对需要修改的变量打上了标记
  let cssText = await getOriginalStyle()

  // 遍历生成的样式表，在 CSS 的原样式中进行全局替换
  Object.keys(colors).forEach(key => {
    // reg pattern
    // /(:|\s+)primary/g
    // /(:|\s+)shade-1/g
    // /(:|\s+)menuBg/g
    // ...

    // 这个模式中的 (:|\\s+) 表示一个冒号或一个或多个空白字符（包括空格、制表符和换行符）。
    // \\s+ 的第一个 \ 是转义字符
    // key 是一个变量，代表一个需要匹配的字符串，比如匹配 `primary`

    // '$1' + colors[key]
    // 关于为什么要在色值前面加上 $1，我们需要查看 replace 方法的第二个参数。
    // 在这里，第二个参数是一个字符串，字符串中的 $1 会被替换成第一个括号捕获组（即 (:|\\s+)）匹配到的文本。
    // 所以加上 $1 就是为了在【替换的文本】中【保留原本匹配到的文本】。
    cssText = cssText.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + colors[key]
    )
  })

  // 最终，新的样式表中，含有我们自定义的颜色主题
  return cssText
}

/**
 * 根据主色生成色值表
 */
type TFormulaKey = keyof typeof formula
export const generateColors = (primary: string) => {
  if (!primary) return
  const colors: { [key: string]: string } = {
    primary
  }

  ;(Object.keys(formula) as Array<TFormulaKey>).forEach(
    <K extends TFormulaKey>(key: K) => {
      // 将所有的主色，替换成我们选中的主题色，形式如 >>> color(rgba(255, 69, 0, 1) shade(10%))
      const value = formula[key].replace(/primary/g, primary)

      // 通过 color 的 conver 方法，计算出 rgba 色值
      // color.convert(value)  ===>>>  rgba(0, 12, 230, 0.68)

      // 最终将转为每个颜色，转为十六进制：#030420ad，写入到 colors 对象中，并返回
      colors[key] = '#' + rgbHex(color.convert(value))
    }
  )
  return colors
}

/**
 * 获取当前 element-plus 的默认样式表
 */
const getOriginalStyle = async () => {
  const version = require('element-plus/package.json').version
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url)

  // 把获取到的数据筛选为原样式模板
  return getStyleTemplate(data)
}

/**
 * 返回 style 的 template
 */
const getStyleTemplate = (data: string) => {
  // element-plus 默认色值
  const colorMap: { [key: string]: string } = {
    '#3a8ee6': 'shade-1',
    '#409eff': 'primary', // element-plus 中含有变量 `--el-color-primary: #409eff`
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }
  // 根据默认色值为要替换的色值打上标记
  Object.keys(colorMap).forEach(key => {
    const value = colorMap[key]
    data = data.replace(new RegExp(key, 'ig'), value)
  })

  // 替换完之后
  // `--el-color-primary: #409eff` 就变成了 `--el-color-primary: primary`
  // `--el-color-primary-light-9: #ecf5ff` 变成了 `--el-color-primary-light-9: light-9`

  return data
}
