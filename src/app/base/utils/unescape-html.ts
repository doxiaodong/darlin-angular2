export function unescapeHTML(text) {
  const t = document.createElement('div')
  t.innerHTML = text
  return t.innerHTML
}
