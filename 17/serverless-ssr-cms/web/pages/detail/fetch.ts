import { RouteComponentProps } from "react-router";

export default async (ctx) => {
  let data;

  if (__isBrowser__) {
    const id = (ctx as RouteComponentProps<{ id: string }>).match.params.id;
    data = await (await window.fetch(`/api/detail/${id}`)).json()
  } else {
    const id = /detail\/(.*)(\?|\/)?/.exec(ctx.req.path)[1];
    data = await ctx.apiDeatilservice.index(id);
  }
  
  return {
    detailData: data,
  };
};
