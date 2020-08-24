export function count(list: NodeListOf<Node>): number {
  let cnt = 0;
  list.forEach(() => (cnt += 1));
  return cnt;
}
