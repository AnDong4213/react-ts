import request from "../utils/request";

/* export function query() {
  return request("/api/users");
} */

export async function addListApi() {
  const res = await request(
    "https://api.thecatapi.com/v1/images/search?limit=1"
  );
  res.data[0].name = res.data[0].url;
  return res.data[0];
}

export function copyToBoard(value) {
  const element = document.createElement('textarea')
  document.body.appendChild(element)
  element.value = value
  element.select()
  if (document.execCommand('copy')) {
    document.execCommand('copy')
    document.body.removeChild(element)
    return true
  }
  document.body.removeChild(element)
  return false
}
