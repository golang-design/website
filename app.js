// choose background randomly
if (Math.random() < 0.5) { colorbar() } else { particles() }

function particles() {
  BG.NET({
    el: "#background",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x3fa4ff,
    backgroundColor: 0x252525,
    points: 6.00,
    maxDistance: 18.00,
    spacing: 16.00
  })
}

function colorbar() {
  document.addEventListener('touchmove', e => e.preventDefault())
  const u = Math.PI*2
  const c = document.getElementsByTagName('canvas')[0]
  const pr = window.devicePixelRatio || 1
  const w = window.innerWidth
  const h = window.innerHeight
  c.width = w*pr
  c.height = h*pr
  let f = 90
  let q = 0
  let r = 0
  const x = c.getContext('2d')
  x.scale(pr, pr)
  x.globalAlpha = 0.6
  const i = () => {
    x.clearRect(0,0,w,h)
    q=[{x:0,y:h*.7+f},{x:0,y:h*.7-f}]
    while(q[1].x<w+f) draw(q[0], q[1])
  }
  const draw = (i, j) => {
    x.beginPath()
    x.moveTo(i.x, i.y)
    x.lineTo(j.x, j.y)
    const k = j.x + (Math.random()*2-0.25)*f
    const n = y(j.y)
    x.lineTo(k, n)
    x.closePath()
    r-=u/-50
    x.fillStyle = '#'+(Math.cos(r)*127+128<<16 | Math.cos(r+u/3)*127+128<<8 | Math.cos(r+u/3*2)*127+128).toString(16)
    x.fill()
    q[0] = q[1]
    q[1] = {x:k,y:n}
  }
  function y(p){
    var t = p + (Math.random()*2-1.1)*f
    return (t>h||t<0) ? y(p) : t
  }
  document.onclick = i
  document.ontouchstart = i
  i()
}