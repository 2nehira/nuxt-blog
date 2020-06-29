// 日付を yyyy-mm-dd の形にする
const transformDate = (beforeDate) => {
  const date = new Date(beforeDate)
  // padStartで0埋め
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date
    .getDate()
    .toString()
    .padStart(2, '0')
  // テンプレートリテラル, replaceで改行を取り除いてるらしい(正規表現)
  return `${date.getFullYear()}-${month}-${day}`.replace(/\n|\r/g, '')
}

// targetTag のついている記事を抽出する
const associateTagPosts = (targetTag, allPosts) => {
  const posts = []
  for (let i = 0; i < allPosts.length; i++) {
    const post = allPosts[i]
    const tags = post.tags
    for (let j = 0; j < tags.length; j++) {
      const haveTarget = tags.find((tag) => tag === targetTag)
      if (haveTarget) {
        posts.push(post)
        break
      }
    }
  }
  return posts
}
// posts に含まれているタグのリストを作る
// 記事全体のタグ集合を作りたいときなどに使う
const createTagList = (posts) => {
  const tagList = new Set()
  for (let i = 0; i < posts.length; i++) {
    const tags = posts[i].tags
    for (let j = 0; j < tags.length; j++) {
      tagList.add(tags[j])
    }
  }
  return tagList
}
export { transformDate, associateTagPosts, createTagList }
