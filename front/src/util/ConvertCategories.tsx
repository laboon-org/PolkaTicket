import categories from '../data/categories';

export interface ConvertCategoriesType {
  id: number,
  name: string,
  check: boolean,
}

const ConvertCategories = () => {
  const result = categories.map(ele => {
    return { ...ele, check: false }
  })
  return result
}

export default ConvertCategories