function requestFullscreen(dom) {
  if (dom.requestFullscreen) {
    dom.requestFullscreen()
  }
  if (dom.webkitRequestFullscreen) {
    dom.webkitRequestFullscreen()
  }
  if (dom.webkitRequestFullScreen) {
    dom.webkitRequestFullScreen()
  }
  if (dom.mozRequestFullScreen) {
    dom.mozRequestFullScreen()
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  }
  if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
  if (document['webkitExitFullscreen']) {
    document['webkitExitFullscreen']()
  }
  if (document['webkitCancelFullScreen']) {
    document['webkitCancelFullScreen']()
  }
  if (document['mozCancelFullScreen']) {
    document['mozCancelFullScreen']()
  }
}

function isDocumentInFullScreenMode() {
  return document['fullscreen'] || document.webkitIsFullScreen || document['mozFullScreen']
}

export function toggleFullscreen(dom) {
  if (isDocumentInFullScreenMode()) {
    exitFullscreen()
  } else {
    requestFullscreen(dom)
  }
}
