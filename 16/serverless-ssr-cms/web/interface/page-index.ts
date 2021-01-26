export interface IData {
  indexData: IndexData
}

export interface IndexData {
  data: Article[]
}

export interface Article {
  id: string;
  title: string;
  content: string;
  date: string;
}





export interface ComponentsArr {
  components: ItemMapArr[]
}

export interface ItemMapArr {
  itemMap: ItemMap[]
}
export interface ItemMap {
  action: {
    type: string
    extra: {
      value: string
      videoId?: string
    }
  }
  mark: {
    text: string
  }
  subtitle?: string
  title: string
  img: string
  summary: string
}
