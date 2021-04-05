---
title: "HTTF 2021 予選参加記"
description: "HTTF 2021 予選に参加しました．"
category: 競プロ
tags: [AtCoder, marathon, 参加記]
date: 2020-11-12
---

HACK TO THE FUTURE 2021 予選に参加し，149 位でした．問題は[こちら](https://atcoder.jp/contests/future-contest-2021-qual/tasks/future_contest_2021_qual_a)

## 問題概要
盤面に散らばったカードを0番から順に集める問題．移動回数を少なするようにする．カードをスタックできるので単純な最短経路問題とは異なる．

## コンテスト開始から正の点をとるまで
問題分を読むと，カードを 0 から順番に集めればいいことがわかる．素直に 0 から順にたどるコードを書いて提出．0 点! あれーと思いながらビジュアライザーを見てみるとロボットが盤面の外に出てしまっているようだったので入力・出力・問題文を確認する．x, y が逆になっていることに気づき，修正して提出. 133,118 点　みんなと同じ点が取れて一安心．

## 色々試行錯誤
i 番目のカードを取るときに，そこまでの経路に i+1 番目のカードがあれば i 番目のカードの近くに寄せる工夫をしてみる．微増(134,084 点). この方針を突き詰めるのは厳しそうだと感じたため，別の方針を考える．カードを一箇所に集めてから回収する方針が見えたので簡単な実装で実験してみる．　ジグザグに動いて右下の 10 × 10 に集める実装で 146,831 点．この時点で 71 位で良さそうとなる．
<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ジグザグに動いて盤面全部見る解で147,508 点出たときは勝ちじゃんって思ったんだけどねー． <a href="https://t.co/ygYPD7RXiX">pic.twitter.com/ygYPD7RXiX</a></p>&mdash; tunehira (@2nehira) <a href="https://twitter.com/2nehira/status/1325067071068123138?ref_src=twsrc%5Etfw">November 7, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

1 箇所に集める方針が良いことがわかったので，集めるパートを高速化するため TSP(巡回セールスマン問題) を解く．とりあえず 2 点スワップを実装(154,419 点)．近似解を求める方法をググると 2-opt がいいらしいので実装して 155,299 点．
<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">右下に並べる<br>集めるときと配るときでそれぞれTSP (山登り+ 2-opt)<br>155,417 点<br><br>置く場所を焼きな増すのは1 ミリも考えなかったな <a href="https://t.co/R89bmbJeD6">pic.twitter.com/R89bmbJeD6</a></p>&mdash; tunehira (@2nehira) <a href="https://twitter.com/2nehira/status/1325065702865166336?ref_src=twsrc%5Etfw">November 7, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

その後は集める場所をいくつか試したり，焼きなましを試したりしてた(焼きなましの温度とかよくわからなかった)．なかなかスコアが上がらずに終了．

## 感想
初心者でもやることが尽きない問題だったので 8 時間があっという間でした．楽しかったです．