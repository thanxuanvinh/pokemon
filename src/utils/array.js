//export const shuffled = (list) => list.soft(() => Math.random() - 0.5);
export function shuffled(list) {
  for (let i = list.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = list[i];
    list[i] = list[j];
    list[j] = temp;
  }

  return list;
}
