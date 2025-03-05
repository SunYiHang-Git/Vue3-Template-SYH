import { OptionConfig, PHONETIC_SYMBOL } from '@/const/dict/constant'
import DICT_ZI from '@/const/dict/dict-zi'

const RE_PHONETIC_SYMBOL = new RegExp('([' + Object.keys(PHONETIC_SYMBOL).join('') + '])', 'g')
const RE_TONE2 = /([aeoiuvnm])([0-4])$/

/** 不使用分词算法的拼音转换。 */
function normal_pinyin(hans: string, option: OptionConfig): string[][] {
  const pys: string[][] = []
  let noWords = ''

  for (let i = 0; i < hans.length; i++) {
    const words = hans[i]
    const firstCharCode = words.charCodeAt(0)

    if (DICT_ZI[firstCharCode]) {
      // 处理前面的“非中文”部分。
      if (noWords.length > 0) {
        pys.push([noWords])
        noWords = '' // 重置“非中文”缓存。
      }
      pys.push(single_pinyin(words, option))
    } else {
      noWords += words
    }
  }
  // 清理最后的非中文字符串。
  if (noWords.length > 0) {
    pys.push([noWords])
    noWords = ''
  }
  return pys
}

/**
 * 单字拼音转换。
 * @param han 中文（一个字）
 */
function single_pinyin(han: string, option: OptionConfig): string[] {
  if (typeof han !== 'string' || han.length === 0) return []
  const hanCode = han.slice(0, 1).charCodeAt(0)

  if (!DICT_ZI[hanCode]) return [han]

  const pys = DICT_ZI[hanCode].split(',')
  const pinyins = []
  const { style } = option
  switch (style) {
    case 0:
      for (let i = 0, l = pys.length; i < l; i++) {
        const py = toFixed(pys[i])
        pinyins.push(py)
      }
      return pinyins
    case 1:
      for (let i = 0, l = pys.length; i < l; i++) {
        const py = pys[i]
        pinyins.push(py)
      }
      return pinyins
    default:
      for (let i = 0, l = pys.length; i < l; i++) {
        const py = toFixed(pys[i])
        pinyins.push(py)
      }
      return pinyins
  }
}

/** 将拼音中的声调符号转换为标准形式。 */
function toFixed(str: string): string {
  return str.replace(RE_PHONETIC_SYMBOL, function (_: string, phonetic: string) {
    return PHONETIC_SYMBOL[phonetic].replace(RE_TONE2, '$1')
  })
}

/** 扁平化处理 */
function generateCombinations(arr: any[][]): string[] {
  const result: string[] = []

  const queue: { index: number; path: string }[] = [{ index: 0, path: '' }]

  while (queue.length > 0) {
    const { index, path } = queue.shift()!
    if (index === arr.length) {
      result.push(path)
      continue
    }
    for (const item of arr[index]) {
      queue.push({ index: index + 1, path: path + item })
    }
  }
  console.log('result--->', result)
  return result
}

export function pinyin(hans: string, option: OptionConfig = {}): string[] {
  const arr = normal_pinyin(hans, option)
  console.log('arr--->', arr)
  return generateCombinations(arr)
}
