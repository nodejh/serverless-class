import { RouteComponentProps } from "react-router";

export default async (ctx) => {
  let data;
  console.log(__isBrowser__);

  if (__isBrowser__) {
    const id = (ctx as RouteComponentProps<{ id: string }>).match.params.id;
    const response = await window.fetch(`/api/detail/${id}`)
    data = await response.json()
  } else {
    const id = /detail\/(.*)(\?|\/)?/.exec(ctx.req.path)[1];
    data = await ctx.apiDeatilservice.index(id);
  }

  console.log('data: ', data);
  
  return {
    detailData: data,
  };
};
