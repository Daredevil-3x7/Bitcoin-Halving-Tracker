"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Pause, Play, RotateCcw, Trophy, Volume2, VolumeX, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"

// Game constants
const CANVAS_WIDTH_DESKTOP = 800 // Changed from original 800 to 700 in updates
const CANVAS_HEIGHT_DESKTOP = 600 // Changed from original 600 to 500 in updates
const PLAYER_WIDTH = 50
const PLAYER_HEIGHT = 30
const PLAYER_SPEED = 8
const BULLET_SPEED = 10
const ENEMY_BULLET_SPEED = 5
const ENEMY_WIDTH = 40
const ENEMY_HEIGHT = 30
// const ENEMY_ROWS = 4 // Removed, now defined in LEVELS
// const ENEMY_COLS = 8 // Removed, spacing handled in initGame

const CANVAS_WIDTH_MOBILE = 350
const CANVAS_HEIGHT_MOBILE = 500

interface GameState {
  player: {
    x: number
    y: number
    width: number
    height: number
    speed: number
  }
  enemies: Enemy[]
  projectiles: Projectile[]
  enemyProjectiles: Projectile[]
  particles: Particle[]
  score: number
  levelScore: number
  lives: number
  gameOver: boolean
  isPaused: boolean
  currentLevel: number
  timeRemaining: number
  timeLimitRemaining: number
  totalSlashed: number
  levelSlashed: number
  isOvertime: boolean
  baseEmissionPerHit: number
  currentEmissionPerHit: number
  scoreBeforeHalving: number
  halvingReached: boolean
  showLevelIntro: boolean
  showLevelSummary: boolean
  showLeaderboard: boolean
  achievements: string[]
  gridDirection: number // 1 = right, -1 = left
  gridDropping: boolean
  gridSpeed: number
}

type LevelConfig = {
  name: string
  year: string // Added year
  baseEmissionPerHit: number
  slashingRate: number // Renamed from original description to slashingRate
  durationSeconds: number
  timeLimitSeconds: number
  enemySpeed: number // Renamed from original description to enemySpeed
  enemyFireRate: number // Renamed from original description to enemyFireRate
  description: string
  rows: number // Added grid settings
  cols: number // Added grid settings
}

const LEVELS: LevelConfig[] = [
  {
    name: "1st Halving Era",
    year: "2024",
    baseEmissionPerHit: 1.0,
    slashingRate: 1.0,
    durationSeconds: 120,
    timeLimitSeconds: 45,
    enemySpeed: 0.5,
    enemyFireRate: 0.005,
    rows: 3,
    cols: 6,
    description: "Block rewards: 1.0 TAO per block. Destroy all Emission Blocks!",
  },
  {
    name: "2nd Halving Era",
    year: "2029",
    baseEmissionPerHit: 0.5,
    slashingRate: 0.5,
    durationSeconds: 120,
    timeLimitSeconds: 40,
    enemySpeed: 0.6,
    enemyFireRate: 0.008,
    rows: 3,
    cols: 7,
    description: "Block rewards halved to 0.5 TAO. Emission Blocks move faster!",
  },
  {
    name: "3rd Halving Era",
    year: "2033",
    baseEmissionPerHit: 0.25,
    slashingRate: 0.25,
    durationSeconds: 120,
    timeLimitSeconds: 35,
    enemySpeed: 0.75,
    enemyFireRate: 0.012,
    rows: 4,
    cols: 7,
    description: "Block rewards: 0.25 TAO. More Emission Blocks appear!",
  },
  {
    name: "4th Halving Era",
    year: "2037",
    baseEmissionPerHit: 0.125,
    slashingRate: 0.125,
    durationSeconds: 120,
    timeLimitSeconds: 30,
    enemySpeed: 0.9,
    enemyFireRate: 0.015,
    rows: 4,
    cols: 8,
    description: "Block rewards: 0.125 TAO. Maximum difficulty!",
  },
]

const EXPLANATION_CARDS = [
  {
    title: "How TAO Emissions Reach Halving Thresholds",
    content:
      "Halving triggers when total TAO issuance hits specific milestones. Each halving cuts block rewards by 50%, just like Bitcoin.",
    showAfterLevel: 1,
  },
  {
    title: "Why Fewer New TAO Matters",
    content:
      "Reduced emissions make each TAO more scarce, incentivizing subnets to provide genuine AI value to earn rewards.",
    showAfterLevel: 2,
  },
  {
    title: "Subnets and Alpha Tokens",
    content:
      "Subnets and alpha tokens pull from the same emission pool. As halvings occur, competition for rewards intensifies.",
    showAfterLevel: 3,
  },
]

type LeaderboardEntry = {
  name: string
  score: number
  levelReached: number
  timestamp: number
}

interface Player {
  x: number
  y: number
  width: number
  height: number
  speed: number
}

interface Enemy {
  x: number
  y: number
  width: number
  height: number
  row: number
  col: number
  health: number
}

interface Projectile {
  x: number
  y: number
  width: number
  height: number
  speed: number
}

interface EnemyProjectile {
  x: number
  y: number
  width: number
  height: number
  speed: number
}

interface Particle {
  x: number
  y: number
  dx: number
  dy: number
  life: number
  color: string
  size: number // Added size property
}

// Updated GameState to include new properties for slashing and time limit
// type GameState = { ... } // Merged with the new GameState definition above

export default function HalvingGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [isMobile, setIsMobile] = useState(false)

  const gameStateRef = useRef<GameState | null>(null)
  const keysPressed = useRef<Set<string>>(new Set()) // For handling keyboard input
  const lastTimeRef = useRef<number>(-1)
  const slashingTimerRef = useRef<number>(0) // Track slashing interval
  const animationFrameRef = useRef<number>() // Keep for consistency, though gameLoop handles it
  const levelInitializedRef = useRef<boolean>(false)
  const gameReadyRef = useRef<boolean>(false)

  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [currentLevel, setCurrentLevel] = useState(1)
  const [timeRemaining, setTimeRemaining] = useState(LEVELS[0].durationSeconds)
  const [timeLimitRemaining, setTimeLimitRemaining] = useState(LEVELS[0].timeLimitSeconds) //
  const [isOvertime, setIsOvertime] = useState(false) //
  const [totalSlashed, setTotalSlashed] = useState(0) //
  const [currentEmission, setCurrentEmission] = useState(LEVELS[0].baseEmissionPerHit)
  const [showLevelIntro, setShowLevelIntro] = useState(true)
  const [showLevelSummary, setShowLevelSummary] = useState(false)
  const [levelStats, setLevelStats] = useState<{ earned: number; slashed: number; final: number; timeBonus?: number }>({
    earned: 0,
    slashed: 0,
    final: 0,
    timeBonus: 0,
  })
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [playerName, setPlayerName] = useState("")
  const [achievements, setAchievements] = useState<string[]>([])
  const [soundEnabled, setSoundEnabled] = useState(false) // Kept from original, though not used in updates
  const [showNameInput, setShowNameInput] = useState(false) // Declare showNameInput variable
  const [soundVolume, setSoundVolume] = useState(1) // State for sound volume

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const canvasWidth = isMobile ? CANVAS_WIDTH_MOBILE : CANVAS_WIDTH_DESKTOP
  const canvasHeight = isMobile ? CANVAS_HEIGHT_MOBILE : CANVAS_HEIGHT_DESKTOP

  // Load leaderboard from localStorage
  useEffect(() => {
    const storedLeaderboard = localStorage.getItem("taoInvadersLeaderboard")
    if (storedLeaderboard) {
      setLeaderboard(JSON.parse(storedLeaderboard))
    }
    const storedPlayerName = localStorage.getItem("taoInvadersPlayerName")
    if (storedPlayerName) {
      setPlayerName(storedPlayerName)
    }
  }, [])

  const saveToLeaderboard = useCallback(
    (name: string, score: number, levelReached: number) => {
      const newEntry: LeaderboardEntry = {
        name,
        score,
        levelReached,
        timestamp: Date.now(),
      }
      const updated = [...leaderboard, newEntry].sort((a, b) => b.score - a.score).slice(0, 10)
      setLeaderboard(updated)
      localStorage.setItem("taoInvadersLeaderboard", JSON.JSON.stringify(updated))
      localStorage.setItem("taoInvadersPlayerName", name)
    },
    [leaderboard],
  )

  const qualifiesForLeaderboard = useCallback(
    (score: number) => {
      if (leaderboard.length < 10) return true
      return score > leaderboard[leaderboard.length - 1].score
    },
    [leaderboard],
  )

  const initGame = useCallback(
    (isRestart = false) => {
      const canvas = canvasRef.current
      if (!canvas) return

      const CANVAS_WIDTH = canvas.width
      const CANVAS_HEIGHT = canvas.height

      gameReadyRef.current = false
      levelInitializedRef.current = false

      const level = LEVELS[currentLevel - 1]
      const rows = level.rows
      const cols = level.cols
      const enemyWidth = 40
      const enemyHeight = 30
      const spacingX = 55
      const spacingY = 45
      const startX = (CANVAS_WIDTH - cols * spacingX) / 2
      const startY = 60

      const initialEnemies: Enemy[] = []
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          initialEnemies.push({
            x: startX + col * spacingX,
            y: startY + row * spacingY,
            width: enemyWidth,
            height: enemyHeight,
            row,
            col,
            health: row === 0 ? 2 : 1, // Top row has more health
          })
        }
      }

      gameStateRef.current = {
        player: {
          x: CANVAS_WIDTH / 2 - 25,
          y: CANVAS_HEIGHT - 70,
          width: 50,
          height: 50,
          speed: 6,
        },
        enemies: initialEnemies,
        projectiles: [],
        enemyProjectiles: [],
        particles: [],
        score: gameStateRef.current?.score || 0,
        levelScore: 0,
        lives: 3,
        gameOver: false,
        isPaused: false,
        currentLevel,
        timeRemaining: level.durationSeconds,
        timeLimitRemaining: level.timeLimitSeconds,
        totalSlashed: gameStateRef.current?.totalSlashed || 0,
        levelSlashed: 0,
        isOvertime: false,
        baseEmissionPerHit: level.baseEmissionPerHit,
        currentEmissionPerHit: level.baseEmissionPerHit,
        scoreBeforeHalving: 0,
        halvingReached: false,
        showLevelIntro: false,
        showLevelSummary: false,
        showLeaderboard: false,
        achievements: gameStateRef.current?.achievements || [],
        gridDirection: 1,
        gridDropping: false,
        gridSpeed: level.enemySpeed,
      }

      slashingTimerRef.current = 0 // Reset slashing timer

      setTimeRemaining(level.durationSeconds)
      setTimeLimitRemaining(level.timeLimitSeconds) //
      setIsOvertime(false) //
      setCurrentEmission(level.baseEmissionPerHit)

      levelInitializedRef.current = true
      gameReadyRef.current = true
      console.log("[v0] initGame complete", {
        enemyCount: initialEnemies.length,
        level: currentLevel,
        initialized: levelInitializedRef.current,
        ready: gameReadyRef.current,
      })
    },
    [currentLevel],
  )

  const spawnEnemy = useCallback(() => {
    const state = gameStateRef.current
    const canvas = canvasRef.current
    if (!state || !canvas) return

    const enemyWidth = 40
    const enemyHeight = 30
    const spacingX = 55
    // Use dynamic canvas width for enemy spacing calculation
    const startX = (canvas.width - 8 * spacingX) / 2 // Assuming 8 cols for new spawns

    // Add a new row of enemies at the top
    for (let col = 0; col < 8; col++) {
      state.enemies.push({
        x: startX + col * spacingX,
        y: 30,
        width: enemyWidth,
        height: enemyHeight,
        row: 0,
        col,
        health: 1,
      })
    }
  }, [])

  const update = useCallback(
    (deltaTime: number) => {
      const state = gameStateRef.current
      const canvas = canvasRef.current
      if (!state || !canvas || state.isPaused || state.gameOver || !gameReadyRef.current) return

      const level = LEVELS[state.currentLevel - 1]
      const deltaSeconds = deltaTime / 1000

      // Update time remaining
      state.timeRemaining -= deltaSeconds

      // Handle time limit and overtime slashing
      if (state.timeLimitRemaining > 0) {
        state.timeLimitRemaining -= deltaSeconds
        if (state.timeLimitRemaining <= 0) {
          state.timeLimitRemaining = 0
          state.isOvertime = true
        }
      } else if (state.isOvertime) {
        // In overtime - apply slashing every 2 seconds
        slashingTimerRef.current += deltaSeconds
        if (slashingTimerRef.current >= 2) {
          slashingTimerRef.current -= 2
          state.levelScore = Math.max(0, state.levelScore - level.slashingRate)
          state.levelSlashed += level.slashingRate
          state.totalSlashed += level.slashingRate
          setTotalSlashed(state.totalSlashed)
        }
      }

      setTimeLimitRemaining(Math.max(0, state.timeLimitRemaining))
      setIsOvertime(state.isOvertime)

      if (state.enemies.length === 0 && levelInitializedRef.current && gameReadyRef.current) {
        console.log("[v0] Level complete - all Emission Blocks destroyed!")
        levelInitializedRef.current = false
        gameReadyRef.current = false

        if (!state.isOvertime && !state.achievements.includes("speed_miner")) {
          state.achievements.push("speed_miner")
        }
        if (state.lives === 3 && !state.achievements.includes("untouchable")) {
          state.achievements.push("untouchable")
        }

        const level = LEVELS[state.currentLevel - 1]
        let timeBonus = 0
        if (state.timeLimitRemaining > 0) {
          // Bonus: 0.1 TAO per second remaining (scaled by emission rate)
          timeBonus = state.timeLimitRemaining * 0.1 * level.baseEmissionPerHit
          state.levelScore += timeBonus
          state.score += timeBonus
          setScore(state.score)
        }

        setLevelStats({
          earned: state.levelScore - timeBonus + state.levelSlashed,
          slashed: state.levelSlashed,
          final: state.levelScore,
          timeBonus: timeBonus, // Add time bonus to stats
        })
        state.showLevelSummary = true
        setShowLevelSummary(true)
        return
      }

      // Update player position based on keys
      if (state.player.x > 0 && keysPressed.current.has("ArrowLeft")) {
        state.player.x -= state.player.speed
      }
      if (state.player.x < canvas.width - state.player.width && keysPressed.current.has("ArrowRight")) {
        state.player.x += state.player.speed
      }

      // Auto-fire
      if (Math.random() < 0.1) {
        state.projectiles.push({
          x: state.player.x + state.player.width / 2 - 3,
          y: state.player.y,
          width: 6,
          height: 15,
          speed: 8,
        })
      }

      // Update projectiles
      state.projectiles = state.projectiles.filter((p) => {
        p.y -= p.speed
        return p.y > -p.height
      })

      // Update enemy projectiles
      state.enemyProjectiles = state.enemyProjectiles.filter((p) => {
        p.y += p.speed
        return p.y < canvas.height
      })

      if (state.enemies.length > 0) {
        // Find the edges of the enemy formation
        let minX = canvas.width
        let maxX = 0
        state.enemies.forEach((enemy) => {
          minX = Math.min(minX, enemy.x)
          maxX = Math.max(maxX, enemy.x + enemy.width)
        })

        // Check if formation hits wall
        const hitLeftWall = minX <= 10 && state.gridDirection === -1
        const hitRightWall = maxX >= canvas.width - 10 && state.gridDirection === 1

        if (hitLeftWall || hitRightWall) {
          // Drop down and reverse direction
          state.gridDirection *= -1
          state.enemies.forEach((enemy) => {
            enemy.y += 25
          })
        } else {
          // Move horizontally
          state.enemies.forEach((enemy) => {
            enemy.x += state.gridDirection * state.gridSpeed
          })
        }

        // Check if enemies reached bottom (game over condition)
        state.enemies.forEach((enemy) => {
          if (enemy.y + enemy.height >= state.player.y - 10) {
            state.lives = 0
            state.gameOver = true
            setLives(0)
            setGameOver(true)
          }
        })

        // Enemy shooting (random enemy shoots)
        if (Math.random() < level.enemyFireRate * state.enemies.length) {
          const shooter = state.enemies[Math.floor(Math.random() * state.enemies.length)]
          state.enemyProjectiles.push({
            x: shooter.x + shooter.width / 2 - 3,
            y: shooter.y + shooter.height,
            width: 6,
            height: 12,
            speed: 4,
          })
        }
      }

      // Check projectile-enemy collisions
      for (let pi = state.projectiles.length - 1; pi >= 0; pi--) {
        const proj = state.projectiles[pi]
        for (let ei = state.enemies.length - 1; ei >= 0; ei--) {
          const enemy = state.enemies[ei]
          if (
            proj.x < enemy.x + enemy.width &&
            proj.x + proj.width > enemy.x &&
            proj.y < enemy.y + enemy.height &&
            proj.y + proj.height > enemy.y
          ) {
            // Hit!
            enemy.health--
            state.projectiles.splice(pi, 1)

            if (enemy.health <= 0) {
              // Enemy destroyed
              state.enemies.splice(ei, 1)
              state.levelScore += state.currentEmissionPerHit
              state.score += state.currentEmissionPerHit
              setScore(state.score)

              // Add particles
              for (let i = 0; i < 8; i++) {
                state.particles.push({
                  x: enemy.x + enemy.width / 2,
                  y: enemy.y + enemy.height / 2,
                  dx: (Math.random() - 0.5) * 6,
                  dy: (Math.random() - 0.5) * 6,
                  life: 30,
                  color: `hsl(${180 + Math.random() * 60}, 100%, 60%)`,
                  size: 3 + Math.random() * 4,
                })
              }
            }
            break // Only one collision per projectile
          }
        }
      }

      // Check enemy projectile-player collisions
      for (let i = state.enemyProjectiles.length - 1; i >= 0; i--) {
        const proj = state.enemyProjectiles[i]
        if (
          proj.x < state.player.x + state.player.width &&
          proj.x + proj.width > state.player.x &&
          proj.y < state.player.y + state.player.height &&
          proj.y + proj.height > state.player.y
        ) {
          state.enemyProjectiles.splice(i, 1)
          state.lives--
          setLives(state.lives)

          if (state.lives <= 0) {
            state.gameOver = true
            setGameOver(true)
          }

          // Add hit particles
          for (let j = 0; j < 10; j++) {
            state.particles.push({
              x: state.player.x + state.player.width / 2,
              y: state.player.y + state.player.height / 2,
              dx: (Math.random() - 0.5) * 8,
              dy: (Math.random() - 0.5) * 8,
              life: 20,
              color: "#ff4444",
              size: 4,
            })
          }
        }
      }

      // Update particles
      state.particles = state.particles.filter((p) => {
        p.x += p.dx
        p.y += p.dy
        p.life--
        return p.life > 0
      })

      setTimeRemaining(state.timeRemaining)
      setCurrentEmission(state.currentEmissionPerHit)
    },
    [setScore, setLives, setGameOver, setTotalSlashed], // Added all setters as dependencies
  )

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    const state = gameStateRef.current
    if (!canvas || !ctx || !state) return

    // Clear canvas
    ctx.fillStyle = "#0a0a0f"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid lines (subtle)
    ctx.strokeStyle = "rgba(0, 255, 255, 0.05)"
    ctx.lineWidth = 1
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, canvas.height)
      ctx.stroke()
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(canvas.width, i)
      ctx.stroke()
    }

    // Draw overtime warning
    if (state.isOvertime) {
      ctx.fillStyle = "rgba(255, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "#ff4444"
      ctx.font = "bold 16px monospace"
      ctx.textAlign = "center"
      ctx.fillText("⚠ OVERTIME - SLASHING ACTIVE ⚠", canvas.width / 2, 25)
    }

    // Draw enemies as hexagons
    state.enemies.forEach((enemy) => {
      const cx = enemy.x + enemy.width / 2
      const cy = enemy.y + enemy.height / 2
      const size = enemy.width / 2

      // Hexagon path
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 2
        const x = cx + size * Math.cos(angle)
        const y = cy + size * 0.8 * Math.sin(angle) // Adjusted for better aspect ratio
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()

      // Color based on health
      const healthColors = ["#ff00ff", "#00ffff", "#ffff00"] // Pink, Cyan, Yellow for 3, 2, 1 health
      ctx.fillStyle = healthColors[Math.min(enemy.health - 1, 2)]
      ctx.fill()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()

      // Glow effect (optional, subtle)
      ctx.shadowColor = healthColors[Math.min(enemy.health - 1, 2)]
      ctx.shadowBlur = 10
      ctx.stroke() // Re-stroke for glow effect
      ctx.shadowBlur = 0
    })

    // Draw player (triangle ship)
    ctx.beginPath()
    ctx.moveTo(state.player.x + state.player.width / 2, state.player.y)
    ctx.lineTo(state.player.x, state.player.y + state.player.height)
    ctx.lineTo(state.player.x + state.player.width, state.player.y + state.player.height)
    ctx.closePath()
    ctx.fillStyle = "#00ffff"
    ctx.fill()
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw projectiles
    ctx.fillStyle = "#00ffff"
    ctx.shadowColor = "#00ffff"
    ctx.shadowBlur = 10
    state.projectiles.forEach((p) => {
      ctx.fillRect(p.x, p.y, p.width, p.height)
    })

    // Draw enemy projectiles
    ctx.fillStyle = "#ff00ff"
    ctx.shadowColor = "#ff00ff"
    state.enemyProjectiles.forEach((p) => {
      ctx.fillRect(p.x, p.y, p.width, p.height)
    })
    ctx.shadowBlur = 0

    // Draw particles
    state.particles.forEach((p) => {
      ctx.fillStyle = p.color
      ctx.globalAlpha = p.life / 30 // Fade out
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fill()
    })
    ctx.globalAlpha = 1
  }, [])

  const gameLoop = useCallback(
    (timestamp: number) => {
      if (lastTimeRef.current === -1) {
        lastTimeRef.current = timestamp
      }

      let deltaTime = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp

      // Cap deltaTime to prevent huge jumps (e.g., if tab was inactive)
      if (deltaTime > 100) deltaTime = 16 // Target 60 FPS equivalent

      const state = gameStateRef.current
      // Only continue loop if game is active (started, not paused, not game over, not in intro/summary)
      if (gameStarted && !isPaused && !gameOver && !showLevelIntro && !showLevelSummary && state) {
        update(deltaTime)
        draw()
        animationFrameRef.current = requestAnimationFrame(gameLoop)
      } else {
        // If paused or game over, still request next frame to check state and potentially resume/restart
        if (!state?.isPaused || !state?.gameOver) {
          // Avoid infinite loop if paused/gameover state is stable
          animationFrameRef.current = requestAnimationFrame(gameLoop)
        }
      }
    },
    [gameStarted, isPaused, gameOver, showLevelIntro, showLevelSummary, update, draw],
  )

  // Game loop effect
  useEffect(() => {
    // Start the loop when the game should be active
    if (gameStarted && !isPaused && !gameOver && !showLevelIntro && !showLevelSummary) {
      lastTimeRef.current = -1 // Reset timestamp to ensure smooth start
      animationFrameRef.current = requestAnimationFrame(gameLoop)
    } else {
      // Clean up animation frame if game is not active
      cancelAnimationFrame(animationFrameRef.current!)
    }
    // Cleanup on component unmount
    return () => cancelAnimationFrame(animationFrameRef.current!)
  }, [gameStarted, isPaused, gameOver, showLevelIntro, showLevelSummary, gameLoop])

  // Keyboard controls and initialization logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current.add(e.key)
      if (e.key === " ") {
        e.preventDefault() // Prevent default spacebar scroll
        if (gameStarted && !gameOver) {
          // Only allow pausing if game is active
          setIsPaused((p) => !p)
          if (gameStateRef.current) {
            gameStateRef.current.isPaused = !gameStateRef.current.isPaused
          }
        }
      }
      // Handle mobile controls (example: space for pause)
      if (isMobile && e.key === "Enter") {
        // Example: Use Enter for pause on mobile
        e.preventDefault()
        setIsPaused((p) => !p)
        if (gameStateRef.current) {
          gameStateRef.current.isPaused = !gameStateRef.current.isPaused
        }
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key)
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    // Initial game state setup
    if (!gameStateRef.current) {
      const initialLevel = LEVELS[0]
      gameStateRef.current = {
        player: {
          x: CANVAS_WIDTH_DESKTOP / 2 - PLAYER_WIDTH / 2, // Use desktop as base, adjust if needed
          y: CANVAS_HEIGHT_DESKTOP - PLAYER_HEIGHT - 50, // Use desktop as base, adjust if needed
          width: PLAYER_WIDTH,
          height: PLAYER_HEIGHT,
          speed: PLAYER_SPEED,
        },
        enemies: [],
        projectiles: [],
        enemyProjectiles: [],
        particles: [],
        score: 0,
        levelScore: 0,
        lives: 3,
        gameOver: false,
        isPaused: false,
        currentLevel: 1,
        timeRemaining: initialLevel.durationSeconds,
        timeLimitRemaining: initialLevel.timeLimitSeconds,
        totalSlashed: 0,
        levelSlashed: 0,
        isOvertime: false,
        baseEmissionPerHit: initialLevel.baseEmissionPerHit,
        currentEmissionPerHit: initialLevel.baseEmissionPerHit,
        scoreBeforeHalving: 0,
        halvingReached: false,
        showLevelIntro: true, // Start with intro screen
        showLevelSummary: false,
        showLeaderboard: false,
        achievements: [],
        gridDirection: 1, // Initial direction
        gridDropping: false,
        gridSpeed: initialLevel.enemySpeed,
      }
      setScore(0)
      setLives(3)
      setCurrentLevel(1)
      setTimeRemaining(initialLevel.durationSeconds)
      setTimeLimitRemaining(initialLevel.timeLimitSeconds)
      setTotalSlashed(0)
      setAchievements([])
      setShowLevelIntro(true)
      setGameOver(false) // Ensure game over is false initially
      setIsPaused(false) // Ensure not paused initially
    }

    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext("2d")
      if (ctx) {
        // Initial draw (e.g., background)
        ctx.fillStyle = "#0a0a0f"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      cancelAnimationFrame(animationFrameRef.current!) // Clean up animation frame on unmount
    }
  }, [gameStarted, isMobile]) // Dependency on gameStarted to re-run init on start, and isMobile for control handling

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setScore(0)
    setLives(3)
    setCurrentLevel(1)
    setShowLevelIntro(true)
    setShowLevelSummary(false)
    setTotalSlashed(0)
    setAchievements([])
    setShowLeaderboard(false)
    setShowNameInput(false)
    setIsPaused(false)
    gameStateRef.current = null // Reset for fresh init
  }

  const startLevel = () => {
    setShowLevelIntro(false)
    gameReadyRef.current = false
    levelInitializedRef.current = false
    lastTimeRef.current = -1

    // Cancel any existing animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    // Use setTimeout to ensure canvas is rendered, then init, then start loop
    setTimeout(() => {
      initGame()
      // Only start game loop after initGame completes
      if (gameReadyRef.current) {
        animationFrameRef.current = requestAnimationFrame(gameLoop)
      }
    }, 100)
  }

  const nextLevel = () => {
    if (currentLevel < LEVELS.length) {
      setCurrentLevel((l) => l + 1)
      setLives(3)
      setShowLevelSummary(false)
      setShowLevelIntro(true)
    } else {
      // Game complete, move to name entry
      setShowNameInput(true)
      setGameOver(true) // Treat as game over state for name input
    }
  }

  const restartGame = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    gameReadyRef.current = false
    levelInitializedRef.current = false
    lastTimeRef.current = -1

    setGameStarted(false) // Go back to main menu
    setGameOver(false)
    setScore(0)
    setLives(3)
    setCurrentLevel(1)
    setShowLevelIntro(true)
    setShowLevelSummary(false)
    setTotalSlashed(0)
    setAchievements([])
    setShowLeaderboard(false)
    setShowNameInput(false)
    setIsPaused(false)
    gameStateRef.current = null // Clear current game state
  }

  const saveScore = () => {
    if (playerName.trim()) {
      // Use the updated leaderboard entry format (level reached)
      const newEntry = { name: playerName.trim(), score: score, levelReached: currentLevel } // Corrected field name
      const newLeaderboard = [...leaderboard, newEntry].sort((a, b) => b.score - a.score).slice(0, 10)
      setLeaderboard(newLeaderboard)
      // Update localstorage key
      localStorage.setItem("tao-halving-leaderboard", JSON.JSON.stringify(newLeaderboard))
      setShowNameInput(false)
      setShowLeaderboard(true) // Show leaderboard after saving
      setGameOver(false) // Game is no longer over after saving score
    }
  }

  // Re-fetch level config for rendering
  const level = LEVELS[currentLevel - 1]

  // Render logic for different game states
  return (
    // Updated background color and added relative positioning for overlays
    <div className="min-h-screen bg-[#050507] text-white relative overflow-hidden">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-mono text-sm">Back to Home</span>
          </Link>
          <div className="flex items-center gap-4">
            {gameStarted && ( // Only show level and score if game is active
              <>
                <span className="font-mono text-sm px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded">
                  Level {currentLevel}
                </span>
                <span className="font-mono text-sm">
                  Score: <span className="text-cyan-400">{score.toFixed(2)} TAO</span>
                </span>
              </>
            )}
            {/* Added Sound control button */}
            <Button variant="ghost" size="icon" onClick={() => setSoundEnabled(!soundEnabled)}>
              {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {isMobile ? (
          <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <div className="text-center max-w-md mx-auto space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full flex items-center justify-center">
                <Monitor className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold font-mono bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Desktop Only
              </h2>
              <p className="text-white/70 text-lg">
                The TAO Halving Game is currently only available on desktop devices for the best gaming experience.
              </p>
              <p className="text-white/50 text-sm">Please visit this page on a desktop or laptop computer to play.</p>
              <Link href="/">
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 font-mono mt-4">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start justify-center">
            {/* Game Canvas */}
            {/* Ensured canvas container takes full width on mobile and centers content */}
            <div className="relative w-full lg:w-auto flex justify-center">
              <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                className="border border-white/20 rounded-lg bg-[#0a0a0f] max-w-full"
              />

              {/* Main Menu Overlay */}
              {!gameStarted && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm rounded-lg">
                  <h1 className="text-4xl font-bold font-mono mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    TAO HALVING GAME
                  </h1>
                  <p className="text-white/70 mb-8 text-center max-w-md">
                    Defend the network! Destroy subnet nodes to earn TAO rewards. Complete levels before time runs out
                    or face slashing penalties!
                  </p>
                  <div className="flex gap-4">
                    <Button
                      onClick={startGame}
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 font-mono"
                    >
                      START GAME
                    </Button>
                    <Button
                      onClick={() => setShowLeaderboard(true)}
                      variant="outline"
                      className="border-white/30 font-mono"
                    >
                      <Trophy className="w-4 h-4 mr-2" />
                      LEADERBOARD
                    </Button>
                  </div>
                </div>
              )}

              {/* Level Intro Overlay */}
              {gameStarted && showLevelIntro && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm rounded-lg">
                  <div className="text-center max-w-md">
                    <h2 className="text-2xl font-bold font-mono mb-2 text-cyan-400">LEVEL {currentLevel}</h2>
                    <h3 className="text-3xl font-bold font-mono mb-4">{level.name}</h3>
                    <p className="text-white/70 mb-6">{level.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div className="bg-white/5 border border-white/10 rounded p-3">
                        <div className="text-white/50">TAO per Hit</div>
                        <div className="text-xl font-mono text-cyan-400">{level.baseEmissionPerHit}</div>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded p-3">
                        <div className="text-white/50">Time Limit</div>
                        <div className="text-xl font-mono text-yellow-400">{level.timeLimitSeconds}s</div>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded p-3">
                        <div className="text-white/50">Slashing Rate</div>
                        <div className="text-xl font-mono text-red-400">-{level.slashingRate}/2s</div>
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded p-3">
                        <div className="text-white/50">Level Duration</div>
                        <div className="text-xl font-mono text-green-400">{level.durationSeconds}s</div>
                      </div>
                    </div>

                    <Button
                      onClick={startLevel}
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 font-mono"
                    >
                      START LEVEL
                    </Button>
                  </div>
                </div>
              )}

              {/* Level Summary Overlay */}
              {showLevelSummary && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm rounded-lg">
                  <div className="text-center max-w-md">
                    <h2 className="text-2xl font-bold font-mono mb-2 text-green-400">LEVEL COMPLETE!</h2>
                    <h3 className="text-xl font-mono mb-6">{level.name}</h3>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
                      <div className="space-y-3 text-left">
                        <div className="flex justify-between">
                          <span className="text-white/70">TAO Earned:</span>
                          <span className="font-mono text-cyan-400">+{levelStats.earned.toFixed(3)}</span>
                        </div>
                        {/* CHANGE: Show time bonus if earned */}
                        {levelStats.timeBonus && levelStats.timeBonus > 0 && (
                          <div className="flex justify-between">
                            <span className="text-white/70">Time Bonus:</span>
                            <span className="font-mono text-yellow-400">+{levelStats.timeBonus.toFixed(3)}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-white/70">TAO Slashed:</span>
                          <span className="font-mono text-red-400">-{levelStats.slashed.toFixed(3)}</span>
                        </div>
                        <div className="border-t border-white/10 pt-2 flex justify-between">
                          <span className="text-white font-bold">Final:</span>
                          <span className="font-mono text-green-400 font-bold">{levelStats.final.toFixed(3)} TAO</span>
                        </div>
                      </div>
                    </div>

                    {currentLevel < LEVELS.length ? (
                      <Button
                        onClick={nextLevel}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 font-mono"
                      >
                        NEXT LEVEL
                      </Button>
                    ) : (
                      // All levels complete, prompt for name entry
                      <div className="space-y-4">
                        <p className="text-yellow-400 font-mono">ALL LEVELS COMPLETE!</p>
                        <p className="text-white/70">
                          Total Score: <span className="text-cyan-400 font-mono">{score.toFixed(2)} TAO</span>
                        </p>
                        <Button
                          onClick={() => setShowNameInput(true)} // Trigger name input
                          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 font-mono"
                        >
                          SAVE SCORE
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Game Over Overlay */}
              {gameOver &&
                !showNameInput &&
                !showLeaderboard && ( // Only show if game over and not in name/leaderboard
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm rounded-lg">
                    {/* Update game over message */}
                    <h2 className="text-4xl font-bold font-mono mb-4 text-red-500">GAME OVER</h2>
                    <p className="text-white/70 mb-2">The Emission Blocks overwhelmed you!</p>
                    <p className="text-xl font-mono mb-6">
                      Final Score: <span className="text-cyan-400">{score.toFixed(2)} TAO</span>
                    </p>
                    <div className="flex gap-4">
                      <Button
                        onClick={restartGame}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 font-mono"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        TRY AGAIN
                      </Button>
                      <Button
                        onClick={() => setShowNameInput(true)}
                        variant="outline"
                        className="border-white/30 font-mono"
                      >
                        SAVE SCORE
                      </Button>
                    </div>
                  </div>
                )}

              {/* Name Input Modal */}
              {showNameInput && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm rounded-lg">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold font-mono mb-4 text-cyan-400">ENTER YOUR NAME</h2>
                    <input
                      type="text"
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value.slice(0, 20))} // Limit input length
                      maxLength={20}
                      className="bg-white/10 border border-white/30 rounded px-4 py-2 font-mono text-center mb-4 w-64"
                      placeholder="Your name..."
                      autoFocus
                    />
                    <div className="flex gap-4 justify-center">
                      <Button
                        onClick={saveScore}
                        disabled={!playerName.trim()} // Disable if name is empty
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        SAVE
                      </Button>
                      <Button
                        onClick={() => {
                          setShowNameInput(false)
                          if (currentLevel >= LEVELS.length) {
                            // If coming from game completion
                            setGameOver(false) // Remove game over state
                          }
                        }}
                        variant="outline"
                        className="border-white/30 font-mono"
                      >
                        CANCEL
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Leaderboard Modal */}
              {showLeaderboard && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm rounded-lg">
                  <div className="text-center w-full max-w-sm">
                    <h2 className="text-2xl font-bold font-mono mb-4 text-yellow-400 flex items-center justify-center gap-2">
                      <Trophy className="w-6 h-6" />
                      LEADERBOARD
                    </h2>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4 max-h-60 overflow-y-auto">
                      {leaderboard.length === 0 ? (
                        <p className="text-white/50 font-mono">No scores yet!</p>
                      ) : (
                        <div className="space-y-2">
                          {leaderboard.map((entry, i) => (
                            <div key={i} className="flex justify-between items-center font-mono text-sm">
                              <span className="text-white/70">
                                {i + 1}. {entry.name}
                              </span>
                              <span className="text-cyan-400">{entry.score.toFixed(2)} TAO</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={() => {
                        setShowLeaderboard(false)
                        if (currentLevel >= LEVELS.length && !playerName.trim()) {
                          // If game finished and score not saved
                          setGameOver(true) // Re-trigger game over state for name input
                        } else if (currentLevel < LEVELS.length) {
                          // If came from menu
                          setGameStarted(false) // Go back to menu
                        } else {
                          // If came from saving score
                          // Do nothing, already on menu or game over screen
                        }
                      }}
                      variant="outline"
                      className="border-white/30 font-mono"
                    >
                      CLOSE
                    </Button>
                  </div>
                </div>
              )}

              {/* Paused Overlay */}
              {isPaused && !showLevelIntro && !showLevelSummary && !gameOver && gameStarted && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm rounded-lg">
                  <h2 className="text-3xl font-bold font-mono mb-4">PAUSED</h2>
                  <p className="text-white/70 mb-4">Press SPACE to resume</p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-80 space-y-4">
              {/* Time Display */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-white/50 text-xs font-mono mb-1">
                  {isOvertime ? "OVERTIME - SLASHING" : "TIME LIMIT"}
                </div>
                <div className={`text-3xl font-mono font-bold ${isOvertime ? "text-red-400" : "text-yellow-400"}`}>
                  {isOvertime ? `-${level.slashingRate}/2s` : `${Math.max(0, Math.ceil(timeLimitRemaining))}s`}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-white/50 text-xs font-mono mb-1">LEVEL TIME</div>
                <div className="text-3xl font-mono font-bold text-green-400">
                  {Math.max(0, Math.ceil(timeRemaining))}s
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-white/50 text-xs font-mono mb-1">TAO/Hit</div>
                    <div className="text-xl font-mono text-cyan-400">{currentEmission.toFixed(3)}</div>
                  </div>
                  <div>
                    <div className="text-white/50 text-xs font-mono mb-1">Slashed</div>
                    <div className="text-xl font-mono text-red-400">{totalSlashed.toFixed(3)}</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-white/50 text-xs font-mono mb-2">Lives:</div>
                <div className="flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className={`w-6 h-6 rounded-full ${i < lives ? "bg-cyan-400" : "bg-white/20"}`} />
                  ))}
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-white/50 text-xs font-mono mb-2">CONTROLS</div>
                <div className="space-y-1 text-sm font-mono">
                  {isMobile ? (
                    <>
                      <div>
                        <span className="text-cyan-400">←/→</span> Mobile Left/Right
                      </div>
                      <div>
                        <span className="text-cyan-400">ENTER</span> Pause/Resume
                      </div>
                      <div>
                        <span className="text-cyan-400">TAP</span> Fire (auto)
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <span className="text-cyan-400">←/→</span> Move
                      </div>
                      <div>
                        <span className="text-cyan-400">SPACE</span> Pause
                      </div>
                      <div>
                        <span className="text-cyan-400">Auto</span> Fire
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setIsPaused((p) => !p)
                    if (gameStateRef.current) {
                      gameStateRef.current.isPaused = !gameStateRef.current.isPaused
                    }
                  }}
                  variant="outline"
                  className="flex-1 border-white/30"
                  disabled={!gameStarted || gameOver || showLevelIntro || showLevelSummary} // Disable if game not active or in overlay states
                >
                  {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </Button>
                <Button onClick={restartGame} variant="outline" className="flex-1 border-white/30 bg-transparent">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
