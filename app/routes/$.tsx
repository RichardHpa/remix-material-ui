import { json, useLoaderData } from "remix";

export function loader() {
  const stuff = "wait";
  return json(stuff, { status: 404 });
}

export function Comp() {
  const data = useLoaderData();
  return <div>{data.foo}</div>;
}
