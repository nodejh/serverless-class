import { IFaaSContext } from 'ssr-types'
import { IndexData } from '@/interface'
interface IApiService {
  index: () => Promise<IndexData>
}

export default async (ctx: IFaaSContext<{
  apiService?: IApiService
}>) => {
  const data = __isBrowser__ ? await (await window.fetch('/api/index')).json() : await ctx.apiService?.index()
  return {
    indexData: data
  }
}
