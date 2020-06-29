export const state = () => ({
  categories: []
})

export const getters = {
  // カテゴリー名からカテゴリーのオブジェクトに変換
  name2category: (state) => (name) => {
    const category = state.categories.filter((x) => x.name === name)[0]
    return category
  },
  // カテゴリーのslug からカテゴリーのオブジェクトに変換
  slug2category: (state) => (slug) => {
    const category = state.categories.filter(
      (category) => category.slug === slug
    )[0]
    return category
  }
}

export const mutations = {
  setCategories(state, categories) {
    state.categories = categories
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {},
  async fetchCategories({ commit, state }) {
    const categories = (await this.$content('config', 'categories').fetch())
      .categories
    commit('setCategories', categories)
  }
}
