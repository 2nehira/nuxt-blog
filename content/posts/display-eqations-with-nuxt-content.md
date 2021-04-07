---
title: "@nuxt/content で数式を表示する"
description: "@nuxt/content で remark-math と rehype-katexを使って数式表示してみました。"
category: development
tags: [Nuxt, "@nuxt/content"]
date: 2020-07-16
---

@nuxt/conent で数式の表示にハマったので備忘録を残しておきます。

## バージョン
nuxt 2.13.2
@nuxt/content 1.4.0
※ @nuxt/content は 1.4.0 以上を使ってください。

## plugin を入れる
@nuxt/content では remark と rehype をつかってMarkdown を変換しています。したがってremark plugin と rehype plugin が使えます。数式を表示するためには remark-math と rehype-katex が必要になります。
```bash[]
npm install remark-math rehype-katex 
```

そして　@nuxt/content の plugins に登録します。

``` js[nuxt.config.js]
export default {
  ... ,
  content: {
    markdown: {
      remarkPlugins: ['remark-math'],
      rehypePlugins: ['rehype-katex'],
    }
  }
}
```
## css を追加する
これまでの手順で終わりだと思っていたのですが，これだとcssが適用されずうまく表示されないみたいです。
``` js[nuxt.config.js]
export default {
  ... ,
  link: [
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css'
      },
  ]
}
```

## 数式を表示してみる
これで数式が表示できるようになったはずなので 記事ページで確認してみます。
```md[]
Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following equation.

$$
L = \frac{1}{2} \rho v^2 S C_L
$$
```
このように表示されるはずです。

Lift($L$) can be determined by Lift Coefficient ($C_L$) like the following equation.

$$
L = \frac{1}{2} \rho v^2 S C_L
$$

