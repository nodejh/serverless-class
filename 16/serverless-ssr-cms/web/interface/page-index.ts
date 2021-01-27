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
