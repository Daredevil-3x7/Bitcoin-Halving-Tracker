"use client"

import { useEffect, useRef } from "react"

export function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const points = useRef<{ x: number; y: number; age: number }[]>([])
  const cursor = useRef({ x: 0, y: 0 })
  const follower = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      if (cursor.current.x === 0 && cursor.current.y === 0) {
        cursor.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
        follower.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
      }
    }
    updateSize()
    window.addEventListener("resize", updateSize)

    const handleMouseMove = (e: MouseEvent) => {
      cursor.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove)

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      follower.current.x += (cursor.current.x - follower.current.x) * 0.08
      follower.current.y += (cursor.current.y - follower.current.y) * 0.08

      points.current.push({
        x: follower.current.x,
        y: follower.current.y,
        age: 0,
      })

      if (points.current.length > 50) {
        points.current.shift()
      }

      ctx.beginPath()
      ctx.lineCap = "round"
      ctx.lineJoin = "round"

      for (let i = 0; i < points.current.length - 1; i++) {
        const p1 = points.current[i]
        const p2 = points.current[i + 1]

        p1.age++

        const opacity = 1 - (points.current.length - i) / points.current.length

        const width = (i / points.current.length) * 3

        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)

        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`
        ctx.lineWidth = width
        ctx.stroke()
      }

      const lastPoint = points.current[points.current.length - 1]
      if (lastPoint) {
        ctx.beginPath()
        ctx.arc(lastPoint.x, lastPoint.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)"
        ctx.fill()

        ctx.shadowBlur = 10
        ctx.shadowColor = "rgba(255, 255, 255, 0.8)"
      } else {
        ctx.shadowBlur = 0
      }

      requestAnimationFrame(animate)
    }

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", updateSize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-50" style={{ mixBlendMode: "screen" }} />
  )
}
