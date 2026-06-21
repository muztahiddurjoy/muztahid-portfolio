'use client'

import { useEffect, useRef } from 'react'

// Lightweight 2D-canvas point sphere that rotates slowly and tilts toward the
// cursor. Pauses when off-screen (IntersectionObserver) and renders a single
// static frame under prefers-reduced-motion. Never blocks headline render.
export function HeroPointCloud({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    // ---- build points: fibonacci sphere + two orbit rings ----
    type P = { x: number; y: number; z: number; r: number }
    const pts: P[] = []
    const N = 520
    const R = 1
    for (let i = 0; i < N; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i
      pts.push({
        x: Math.sin(phi) * Math.cos(theta) * R,
        y: Math.sin(phi) * Math.sin(theta) * R,
        z: Math.cos(phi) * R,
        r: Math.random() * 1.1 + 0.3,
      })
    }
    for (let ring = 0; ring < 2; ring++) {
      const count = 120
      const rr = 1.25 + ring * 0.18
      const tilt = ring === 0 ? 0.5 : -0.8
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2
        const x = Math.cos(a) * rr
        const z = Math.sin(a) * rr
        const y = Math.sin(a * 1) * 0.04 + tilt * 0
        pts.push({
          x,
          y: y + Math.sin(a) * tilt * 0.0,
          z,
          r: 0.6,
        })
      }
    }

    let w = 0
    let h = 0
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    let rotY = 0
    let rotX = -0.35
    let targetTiltX = -0.35
    let targetTiltY = 0
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      targetTiltY = nx * 0.6
      targetTiltX = -0.35 + ny * 0.4
    }
    window.addEventListener('mousemove', onMove)

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const cx = w / 2
      const cy = h / 2
      const scale = Math.min(w, h) * 0.34

      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)

      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        // rotate Y then X
        let x = p.x * cosY - p.z * sinY
        let z = p.x * sinY + p.z * cosY
        let y = p.y * cosX - z * sinX
        z = p.y * sinX + z * cosX

        const persp = 1 / (2.4 - z)
        const sx = cx + x * scale * persp * 2.4
        const sy = cy + y * scale * persp * 2.4
        const depth = (z + 1.4) / 2.8 // 0..1
        const alpha = 0.12 + depth * 0.6
        const size = p.r * (0.5 + depth * 1.1)

        // cyan core fading to violet at the rim
        const cyan = depth > 0.55
        ctx.beginPath()
        ctx.fillStyle = cyan
          ? `rgba(70, 227, 255, ${alpha})`
          : `rgba(143, 123, 255, ${alpha * 0.8})`
        ctx.arc(sx, sy, size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let raf = 0
    let visible = true
    const loop = () => {
      rotY += 0.0016
      rotX += (targetTiltX - rotX) * 0.04
      rotY += (targetTiltY - 0) * 0.0006
      draw()
      raf = requestAnimationFrame(loop)
    }

    if (reduce) {
      draw()
    } else {
      const io = new IntersectionObserver(
        ([entry]) => {
          visible = entry.isIntersecting
          if (visible && !raf) raf = requestAnimationFrame(loop)
          if (!visible && raf) {
            cancelAnimationFrame(raf)
            raf = 0
          }
        },
        { threshold: 0 },
      )
      io.observe(canvas)
      raf = requestAnimationFrame(loop)
      return () => {
        io.disconnect()
        if (raf) cancelAnimationFrame(raf)
        window.removeEventListener('resize', resize)
        window.removeEventListener('mousemove', onMove)
      }
    }

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden className={className} />
}
