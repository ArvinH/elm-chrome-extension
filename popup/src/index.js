import { Elm } from './Main.elm';
const mountNode = document.getElementById('main')

let app

const port = chrome.runtime.connect({ name: 'broadcast' })

port.onMessage.addListener(state => {
  // mount app on first broadcast
  if (!app) {
    app = Elm.Main.init({
      node: mountNode,
      flags: state
    })
    return
  }
  app.ports.onState.send(state)
})

document.addEventListener('click', () => {
  chrome.runtime.sendMessage({ kind: 'clicked' })
})
