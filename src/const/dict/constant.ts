/** 拼音风格枚举 */
export enum ENUM_PINYIN_STYLE {
  NORMAL = 0, // 普通风格，不带声调。
  TONE = 1 // 标准风格，声调在韵母的第一个字母上。
  // TONE2 = 2, // 声调以数字形式在拼音之后，使用数字 0~4 标识。
  // TO3NE = 5, // 声调以数字形式在声母之后，使用数字 0~4 标识。
  // INITIALS = 3, // 仅需要声母部分。
  // FIRST_LETTER = 4, // 仅保留首字母。
  // PASSPORT = 6 // 护照风格，转换成大写，且 `ü` 会以 `YU` 形式输出。
}

export type IPinyinStyle = ENUM_PINYIN_STYLE

export type OptionConfig = {
  style?: IPinyinStyle // 拼音输出形式
  // mode?: IPinyinMode // 拼音模式
  // 指定分词库。
  // 是否返回多音字
  heteronym?: boolean
  // 是否分组词组拼音
  group?: boolean
  compact?: boolean
}

/** 带声调字符。 */
export const PHONETIC_SYMBOL: Record<string, string> = {
  ā: 'a1',
  á: 'a2',
  ǎ: 'a3',
  à: 'a4',
  ē: 'e1',
  é: 'e2',
  ě: 'e3',
  è: 'e4',
  ō: 'o1',
  ó: 'o2',
  ǒ: 'o3',
  ò: 'o4',
  ī: 'i1',
  í: 'i2',
  ǐ: 'i3',
  ì: 'i4',
  ū: 'u1',
  ú: 'u2',
  ǔ: 'u3',
  ù: 'u4',
  ü: 'v0',
  ǘ: 'v2',
  ǚ: 'v3',
  ǜ: 'v4',
  ń: 'n2',
  ň: 'n3',
  '': 'm2'
}

// 声母表。
export const INITIALS: string[] = 'b,p,m,f,d,t,n,l,g,k,h,j,q,x,r,zh,ch,sh,z,c,s'.split(',')

// 韵母表。
export const FINALS: string[] = 'ang,eng,ing,ong,an,en,in,un,er,ai,ei,ui,ao,ou,iu,ie,ve,a,o,e,i,u,v'.split(',')
