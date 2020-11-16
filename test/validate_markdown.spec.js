const fs = require('fs')
const matter = require('gray-matter')

const content_dir = './content/posts/'
const categories_path = './content/config/categories.json'
const categories_map = JSON.parse(fs.readFileSync(categories_path, 'utf8')).categories
const categories = categories_map.map((category) => category.name)
const article_path_list = fs.readdirSync(content_dir)

describe.each(article_path_list)('validate markdown', (article_path) => {
  const article = fs.readFileSync(content_dir + article_path, 'utf8')
  const meta = matter(article).data
  test('exist category', () => {
    expect(categories).toContain(meta.category)
  })
  test('validate frontmatter', () => {
    expect(meta).toHaveProperty('title')
    expect(meta).toHaveProperty('description')
    expect(meta).toHaveProperty('date')
    expect(meta).toHaveProperty('category')
    expect(meta).toHaveProperty('tags')

    expect(meta.title.length).toBeGreaterThan(0)
  })
})

test('unique article name', () => {
  const unique_article_list = new Set(article_path_list)
  expect(unique_article_list.size).toEqual(article_path_list.length)
})
