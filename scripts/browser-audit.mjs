// Dependency-free Chrome DevTools audit. Run after npm run build with Node 24.
// Artifacts are ignored under node_modules/.cache/monalist-audit.
import { spawn } from 'node:child_process'
import { createServer } from 'node:http'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import assert from 'node:assert/strict'

const root = process.cwd()
const output = path.join(root, 'node_modules/.cache/monalist-audit')
await mkdir(output, { recursive: true })
const server = createServer(async (req, res) => {
  try {
    const relative = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/+/, '') || 'index.html'
    const file = path.resolve(root, 'dist', relative)
    if (!file.startsWith(path.resolve(root, 'dist') + path.sep)) throw new Error('Invalid path')
    const content = await readFile(file)
    const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml' }
    res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' })
    res.end(content)
  } catch { res.writeHead(404); res.end() }
})
await new Promise(resolve => server.listen(4175, '127.0.0.1', resolve))
const browser = spawn(process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=9335', '--remote-allow-origins=*',
  '--user-data-dir=' + path.join(output, 'profile'), 'about:blank',
], { windowsHide: true, stdio: 'ignore' })
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
let socket
const report = []
try {
  let targets
  for (let n = 0; n < 60; n++) {
    try { targets = await fetch('http://127.0.0.1:9335/json').then(r => r.json()); break } catch { await delay(250) }
  }
  assert(targets, 'Chrome did not start')
  socket = new WebSocket(targets.find(item => item.type === 'page').webSocketDebuggerUrl)
  await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }))
  const pending = new Map()
  let id = 0
  const errors = []
  socket.addEventListener('message', event => {
    const message = JSON.parse(event.data)
    if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text)
    if (message.id) {
      const task = pending.get(message.id)
      pending.delete(message.id)
      if (message.error) task.reject(new Error(JSON.stringify(message.error)))
      else task.resolve(message.result)
    }
  })
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    pending.set(++id, { resolve, reject })
    socket.send(JSON.stringify({ id, method, params }))
  })
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })
    if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails))
    return result.result.value
  }
  const screenshot = async name => {
    const result = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
    await writeFile(path.join(output, name + '.png'), Buffer.from(result.data, 'base64'))
  }
  await send('Page.enable')
  await send('Runtime.enable')
  await send('Network.enable')
  for (const width of [320, 375, 390, 430, 768, 820, 1024, 1280, 1440, 1920, 2560]) {
    const height = width < 600 ? 900 : width < 1024 ? 1024 : 1000
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false })
    await send('Page.navigate', { url: 'http://127.0.0.1:4175/' })
    for (let n = 0; n < 80; n++) {
      if (await evaluate("Boolean(document.querySelector('.portrait img')?.complete && document.querySelector('.portrait img')?.naturalWidth)")) break
      await delay(100)
    }
    await delay(200)
    const result = await evaluate(`(() => {
      const rect = selector => { const r = document.querySelector(selector).getBoundingClientRect(); return {x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom} }
      const overflows = [...document.querySelectorAll('main *')].filter(el => {
        if (!el.getClientRects().length || el.classList.contains('sr-only')) return false
        const r=el.getBoundingClientRect(); return r.width > 0 && (r.left < -1 || r.right > innerWidth+1)
      }).map(el=>el.className || el.tagName)
      return {width:innerWidth, scrollWidth:document.documentElement.scrollWidth, overflows,
        portrait:rect('.portrait'), nav:rect('.side-nav'), title:rect('.landing-title'),
        snap:getComputedStyle(document.documentElement).scrollSnapType,
        initialFrames:document.querySelectorAll('iframe').length,
        categories:document.querySelectorAll('.category-row').length}
    })()`)
    report.push(result)
    if (result.scrollWidth > width || result.overflows.length) {
      console.log(JSON.stringify(result, null, 2))
      await screenshot('overflow-' + width)
    }
    assert.equal(result.width, width)
    assert(result.scrollWidth <= width, 'Horizontal page overflow at ' + width)
    assert.equal(result.overflows.length, 0, 'Overflow at ' + width + ': ' + result.overflows.join(', '))
    assert.equal(result.initialFrames, 0)
    assert.equal(result.categories, 3)
    if (width <= 600) assert(result.portrait.bottom <= result.nav.y, 'Portrait overlaps mobile navigation')
    if ([320, 390, 820, 1440, 1920].includes(width)) await screenshot('hero-' + width)
    console.log('Viewport ' + width + ': passed')
  }
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false })
  await send('Page.navigate', { url: 'http://127.0.0.1:4175/' })
  await delay(700)
  await evaluate("document.querySelector('.contact-trigger').click()")
  assert.equal(await evaluate("document.querySelector('.contact-trigger').getAttribute('aria-expanded')"), 'true')
  await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 })
  assert.equal(await evaluate("document.querySelector('.contact-trigger').getAttribute('aria-expanded')"), 'false')
  assert.equal(await evaluate("document.activeElement.className"), 'contact-trigger')
  await send('Browser.grantPermissions', { origin: 'http://127.0.0.1:4175', permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'] })
  await evaluate("document.querySelector('.contact-trigger').click(); document.querySelector('.contact-menu .contact-links button').click()")
  await delay(150)
  assert.equal(await evaluate("document.querySelector('.contact-menu .copy-status').textContent"), 'Copied LINE ID')
  assert.equal(await evaluate("navigator.clipboard.readText()"), '@991npdhg')
  await evaluate("document.querySelector('.contact-trigger').click()")
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 1380, y: 200 })
  await delay(500)
  const moved = await evaluate("({transform:getComputedStyle(document.querySelector('.portrait img')).transform, filter:getComputedStyle(document.querySelector('.portrait img')).filter})")
  report.push({ pointer: moved })
  assert.notEqual(moved.filter, 'grayscale(1)', 'Portrait color did not respond')
  assert.match(moved.transform, /matrix\(1, 0, 0, 1, [\d.]+, 0\)/)
  await delay(2600)
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.portrait img')).filter"), 'grayscale(1)')
  for (const section of ['about', 'categories', 'projects', 'contact']) {
    await evaluate(`document.getElementById('${section}').scrollIntoView({behavior:'instant'})`)
    await delay(750)
    await screenshot(section + '-1440')
  }
  await evaluate("document.getElementById('about').scrollIntoView({behavior:'instant'})")
  await delay(750)
  assert(await evaluate("document.getElementById('about').classList.contains('is-active')"))
  await evaluate("document.getElementById('categories').scrollIntoView({behavior:'instant'})")
  await delay(200)
  assert.equal(await evaluate("document.getElementById('about').classList.contains('is-active')"), false)
  await evaluate("document.getElementById('about').scrollIntoView({behavior:'instant'})")
  await delay(750)
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.about-content')).opacity"), '1')
  await evaluate("document.querySelectorAll('.category-row')[2].click()")
  await delay(800)
  assert.equal(await evaluate("document.querySelector('.project-filters [aria-pressed=true]').textContent"), 'Long form')
  assert.equal(await evaluate("document.activeElement.id"), 'projects-title')
  await evaluate("document.querySelector('.video-cover').click()")
  await delay(200)
  assert.match(await evaluate("document.querySelector('iframe').src"), /youtube.com\/embed\/5Em9WTC7-u4/)
  assert.equal(await evaluate("document.querySelectorAll('iframe').length"), 1)
  await evaluate("document.querySelector('.project-pagination button:last-child').click()")
  assert.equal(await evaluate("document.querySelectorAll('iframe').length"), 0)
  await evaluate("document.querySelector('.video-cover').click()")
  assert.match(await evaluate("document.querySelector('iframe').src"), /7SySOiH_9xE/)
  await send('Network.setBlockedURLs', { urls: ['*instagram.com/embed.js*'] })
  await evaluate("document.querySelectorAll('.project-filters button')[1].focus(); document.querySelectorAll('.project-filters button')[1].click()")
  assert.equal(await evaluate("document.activeElement.textContent"), 'Product / Testimonial')
  await evaluate("document.querySelector('.video-cover').click()")
  await delay(700)
  assert.equal(await evaluate("document.querySelector('.media-actions a').href"), 'https://www.instagram.com/reel/Dct_idXK-Au/')
  assert(await evaluate("Boolean(document.querySelector('.embed-notice'))"), 'Missing Instagram failure feedback')
  for (const width of [320, 390, 820]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: true })
    await send('Emulation.setTouchEmulationEnabled', { enabled: true })
    await evaluate("document.querySelectorAll('.project-filters button')[2].click(); document.getElementById('projects').scrollIntoView({behavior:'instant'})")
    await delay(250)
    await screenshot('projects-' + width)
    await evaluate("document.querySelector('.video-cover').click()")
    await delay(200)
    const geometry = await evaluate("({page:document.documentElement.scrollWidth,width:innerWidth,player:document.querySelector('iframe').getBoundingClientRect().width,height:document.querySelector('iframe').getBoundingClientRect().height})")
    assert(geometry.page <= geometry.width, 'Mobile player overflow')
    assert(geometry.player >= 200 && geometry.height >= 200, 'YouTube minimum viewport')
    await evaluate("document.getElementById('contact').scrollIntoView({behavior:'instant'})")
    await delay(250)
    assert(Math.abs(await evaluate("document.getElementById('contact').getBoundingClientRect().top")) < 2, 'Cannot reach contact on mobile')
    await screenshot('contact-' + width)
    await evaluate("document.getElementById('home').scrollIntoView({behavior:'instant'}); document.querySelector('.contact-trigger').click()")
    await delay(150)
    assert.equal(await evaluate("document.querySelector('.contact-trigger').getAttribute('aria-expanded')"), 'true')
    assert(await evaluate("document.querySelector('.contact-menu').getBoundingClientRect().right <= innerWidth"), 'Contact menu overflow')
    await evaluate("document.querySelector('.contact-trigger').click()")
    report.push({ mobilePlayback: width, result: 'PASS' })
  }
  await send('Emulation.setTouchEmulationEnabled', { enabled: false })
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false })
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
  await evaluate("document.getElementById('home').scrollIntoView({behavior:'instant'})")
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 1300, y: 200 })
  await delay(400)
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.portrait img')).transform"), 'none')
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.about-content')).opacity"), '1')
  assert.deepEqual(errors, [], 'Browser JavaScript exceptions')
  report.push({ interactions: 'PASS', reducedMotion: 'PASS', exceptions: errors })
  console.log('Interactions and reduced motion: passed')
  await writeFile(path.join(output, 'report.json'), JSON.stringify(report, null, 2))
} finally {
  socket?.close()
  browser.kill()
  server.close()
}
