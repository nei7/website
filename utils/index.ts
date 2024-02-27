export const yyyymmdd = (date: Date) => date.toISOString().substring(0, 10);

let _id = 0;

export function uid() {
  _id = _id + 1;
  return `uid_${_id}`;
}
