import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react"

import { cn, focusRing } from "@/lib/utils"
import type { Language } from "@/types/language"

/*
 * Mascotte du header, dessinée en SVG (viewBox 48 × 40).
 * - Le regard, la tête et l'antenne sont animés image par image (requestAnimationFrame),
 *   sans re-render React : les yeux suivent le curseur, la tête suit avec du retard,
 *   l'antenne oscille comme un ressort.
 * - Les expressions sont des combinaisons de paupières, sourcils, bouche, pupilles et joues,
 *   interpolées en CSS pour des transitions douces.
 */

type Pair = number | [number, number]

type MouthShape = {
  left: [number, number]
  right: [number, number]
  top: number
  bottom: number
}

type Expression = {
  lidTop: Pair
  lidBottom: Pair
  lidAngle?: number
  browY: Pair
  browAngle?: number
  mouth: MouthShape
  pupil?: number
  blush?: number
  look?: [number, number]
  symbol?: "z" | "?" | "!" | "…" | "♥"
}

const mouths = {
  neutral: { left: [21.6, 27.6], right: [26.4, 27.6], top: 27.6, bottom: 28.2 },
  smile: { left: [21, 27.2], right: [27, 27.2], top: 29.2, bottom: 29.8 },
  happy: { left: [20.8, 26.8], right: [27.2, 26.8], top: 27.6, bottom: 32 },
  laugh: { left: [20.4, 26.4], right: [27.6, 26.4], top: 27, bottom: 33.4 },
  open: { left: [22.3, 28], right: [25.7, 28], top: 24.6, bottom: 31.4 },
  small: { left: [23, 27.9], right: [25, 27.9], top: 26.4, bottom: 29.4 },
  sad: { left: [21.4, 28.8], right: [26.6, 28.8], top: 26.6, bottom: 27.2 },
  smirk: { left: [21.4, 28.2], right: [26.8, 26.9], top: 28.4, bottom: 29 },
  thinking: { left: [22.4, 28.1], right: [25.4, 27.5], top: 27.8, bottom: 28.2 },
  flat: { left: [21.4, 28.1], right: [26.6, 28.1], top: 28.1, bottom: 28.5 },
  shy: { left: [22.4, 27.8], right: [25.6, 27.8], top: 29, bottom: 29.4 },
  sleepy: { left: [22.6, 28.2], right: [25.4, 28.2], top: 28.6, bottom: 29.2 },
  snore: { left: [23.2, 28], right: [24.8, 28], top: 26.8, bottom: 29.6 },
} satisfies Record<string, MouthShape>

const expressions = {
  neutral: { lidTop: 0.08, lidBottom: 0, browY: 0, mouth: mouths.neutral },
  smile: { lidTop: 0.1, lidBottom: 0.24, browY: -0.3, mouth: mouths.smile, blush: 0.15 },
  happy: { lidTop: 0.04, lidBottom: 0.4, browY: -0.9, mouth: mouths.happy, blush: 0.4 },
  laugh: { lidTop: 0, lidBottom: 0.66, browY: -1.3, mouth: mouths.laugh, blush: 0.6 },
  love: { lidTop: 0.04, lidBottom: 0.3, browY: -1, mouth: mouths.happy, pupil: 1.35, blush: 0.9, symbol: "♥" },
  wink: { lidTop: [0.06, 0.96], lidBottom: [0.3, 0.2], browY: [-0.8, 0.6], mouth: mouths.smirk, blush: 0.3 },
  surprised: { lidTop: 0, lidBottom: 0, browY: -2, mouth: mouths.open, pupil: 0.72, symbol: "!" },
  whoa: { lidTop: 0, lidBottom: 0, browY: -1.5, mouth: mouths.small, pupil: 0.8 },
  curious: { lidTop: [0.04, 0.12], lidBottom: 0.05, browY: [-0.3, -1.8], mouth: mouths.thinking, look: [0.6, -0.15] },
  thinking: { lidTop: 0.22, lidBottom: 0.1, browY: [-1.3, 0.2], browAngle: -6, mouth: mouths.thinking, look: [0.75, -0.85], symbol: "…" },
  skeptical: { lidTop: [0.38, 0.06], lidBottom: 0.16, browY: [0.6, -1.3], mouth: mouths.smirk, look: [-0.35, 0] },
  confused: { lidTop: [0.04, 0.26], lidBottom: 0.04, browY: [-1.5, 0.6], browAngle: 4, mouth: mouths.smirk, symbol: "?" },
  annoyed: { lidTop: 0.46, lidBottom: 0.12, lidAngle: 12, browY: 0.9, browAngle: 15, mouth: mouths.flat },
  sad: { lidTop: 0.3, lidBottom: 0, lidAngle: -14, browY: -0.4, browAngle: -14, mouth: mouths.sad, look: [0, 0.6] },
  shy: { lidTop: 0.22, lidBottom: 0.3, browY: -0.5, browAngle: -6, mouth: mouths.shy, blush: 1, look: [-0.65, 0.65] },
  proud: { lidTop: 0.36, lidBottom: 0.16, browY: -0.6, mouth: mouths.smile, look: [0, -0.35], blush: 0.2 },
  squint: { lidTop: 0.56, lidBottom: 0.36, lidAngle: 6, browY: 0.7, browAngle: 9, mouth: mouths.flat },
  content: { lidTop: 0.68, lidBottom: 0.22, browY: -0.3, mouth: mouths.smile, blush: 0.25 },
  sleepy: { lidTop: 0.62, lidBottom: 0.06, browY: 0.4, browAngle: -6, mouth: mouths.sleepy, look: [0, 0.35] },
  asleep: { lidTop: 1, lidBottom: 0.12, browY: 0.7, browAngle: -4, mouth: mouths.snore, look: [0, 0.45], symbol: "z" },
} satisfies Record<string, Expression>

type ExpressionName = keyof typeof expressions

const idleExpressions: ExpressionName[] = [
  "neutral",
  "neutral",
  "neutral",
  "smile",
  "curious",
  "thinking",
  "skeptical",
  "content",
  "proud",
  "confused",
]

const clickReactions: ExpressionName[] = ["laugh", "love", "wink", "surprised", "shy", "proud", "happy"]

const eyes = [
  { x: 18.5, side: -1 },
  { x: 29.5, side: 1 },
] as const

const eyeY = 21.6
const eyeRadius = 3.7

const random = (min: number, max: number) => min + Math.random() * (max - min)

const pick = <T,>(items: readonly T[], exclude?: T) => {
  const options = items.filter((item) => item !== exclude)

  return options[Math.floor(Math.random() * options.length)] ?? items[0]
}

const pair = (value: Pair, index: number) => (Array.isArray(value) ? value[index] : value)

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))

const mouthPath = ({ left, right, top, bottom }: MouthShape) =>
  `M ${left[0]} ${left[1]} Q 24 ${top} ${right[0]} ${right[1]} Q 24 ${bottom} ${left[0]} ${left[1]} Z`

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)

    updatePreference()
    mediaQuery.addEventListener("change", updatePreference)

    return () => mediaQuery.removeEventListener("change", updatePreference)
  }, [])

  return prefersReducedMotion
}

type Mode = "awake" | "drowsy" | "asleep"

type HeaderBotProps = {
  language: Language
}

export function HeaderBot({ language }: HeaderBotProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [mode, setMode] = useState<Mode>("awake")
  const [idleExpression, setIdleExpression] = useState<ExpressionName>("neutral")
  const [reaction, setReaction] = useState<ExpressionName | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)

  const buttonRef = useRef<HTMLButtonElement>(null)
  const bodyRef = useRef<SVGGElement>(null)
  const headRef = useRef<SVGGElement>(null)
  const faceRef = useRef<SVGGElement>(null)
  const antennaRef = useRef<SVGGElement>(null)
  const pupilRefs = useRef<(SVGGElement | null)[]>([])

  const modeRef = useRef<Mode>("awake")
  const lookRef = useRef<[number, number] | null>(null)
  const pointerRef = useRef({ x: 0, y: 0, lastMove: 0 })
  const wanderRef = useRef<[number, number]>([0, 0])
  const lastActivityRef = useRef(0)
  const reactionTimeoutRef = useRef<number | null>(null)
  const clicksRef = useRef<number[]>([])
  const lastReactionRef = useRef<ExpressionName | null>(null)

  const react = useCallback((name: ExpressionName, duration: number) => {
    if (reactionTimeoutRef.current !== null) {
      window.clearTimeout(reactionTimeoutRef.current)
    }

    lastReactionRef.current = name
    setReaction(name)
    reactionTimeoutRef.current = window.setTimeout(() => {
      setReaction(null)
      reactionTimeoutRef.current = null
    }, duration)
  }, [])

  const hop = useCallback(() => {
    if (prefersReducedMotion) return

    bodyRef.current?.animate(
      [
        { transform: "translateY(0) scale(1, 1)" },
        { transform: "translateY(0.6px) scale(1.04, 0.94)", offset: 0.18 },
        { transform: "translateY(-3px) scale(0.97, 1.04)", offset: 0.45 },
        { transform: "translateY(0.4px) scale(1.02, 0.97)", offset: 0.75 },
        { transform: "translateY(0) scale(1, 1)" },
      ],
      { duration: 560, easing: "cubic-bezier(.3,.7,.4,1)" },
    )
  }, [prefersReducedMotion])

  const changeMode = useCallback((nextMode: Mode) => {
    modeRef.current = nextMode
    setMode(nextMode)
  }, [])

  // Activité de l'utilisateur : réveil, assoupissement, endormissement
  useEffect(() => {
    lastActivityRef.current = performance.now()

    const registerActivity = () => {
      lastActivityRef.current = performance.now()

      if (modeRef.current === "asleep") {
        changeMode("awake")
        react("surprised", 900)
      } else if (modeRef.current === "drowsy") {
        changeMode("awake")
      }
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = buttonRef.current?.getBoundingClientRect()

      if (rect) {
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        pointerRef.current = {
          x: clamp((event.clientX - centerX) / 280, -1, 1),
          y: clamp((event.clientY - centerY) / 180, -1, 1),
          lastMove: performance.now(),
        }
      }

      registerActivity()
    }

    let lastScrollY = window.scrollY
    let lastScrollTime = performance.now()
    let lastWhoa = 0

    const handleScroll = () => {
      const now = performance.now()
      const speed = Math.abs(window.scrollY - lastScrollY) / Math.max(16, now - lastScrollTime)

      if (speed > 4 && now - lastWhoa > 2500 && modeRef.current === "awake") {
        lastWhoa = now
        react("whoa", 800)
      }

      lastScrollY = window.scrollY
      lastScrollTime = now
      registerActivity()
    }

    const interval = window.setInterval(() => {
      const idleFor = performance.now() - lastActivityRef.current

      if (idleFor > 34_000 && modeRef.current !== "asleep") {
        changeMode("asleep")
      } else if (idleFor > 20_000 && modeRef.current === "awake") {
        changeMode("drowsy")
      }
    }, 1000)

    window.addEventListener("pointermove", handlePointerMove, { passive: true })
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("keydown", registerActivity)
    window.addEventListener("pointerdown", registerActivity)

    return () => {
      window.clearInterval(interval)
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("keydown", registerActivity)
      window.removeEventListener("pointerdown", registerActivity)
    }
  }, [changeMode, react])

  // Changement de thème : plisse les yeux en passant au clair, soulagé en passant au sombre
  useEffect(() => {
    const root = document.documentElement
    let wasDark = root.classList.contains("dark")

    const observer = new MutationObserver(() => {
      const isDark = root.classList.contains("dark")

      if (isDark !== wasDark) {
        wasDark = isDark
        react(isDark ? "content" : "squint", 1400)
      }
    })

    observer.observe(root, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect()
  }, [react])

  // Changement de langue : petite réaction curieuse
  const previousLanguageRef = useRef(language)

  useEffect(() => {
    if (previousLanguageRef.current === language) return

    previousLanguageRef.current = language
    react("curious", 1300)
  }, [language, react])

  // Micro-expressions spontanées quand il est éveillé
  useEffect(() => {
    if (mode !== "awake") return

    let timeout = 0

    const schedule = () => {
      timeout = window.setTimeout(() => {
        setIdleExpression((current) => (current === "neutral" ? pick(idleExpressions, current) : "neutral"))
        schedule()
      }, random(2400, 6000))
    }

    schedule()

    return () => window.clearTimeout(timeout)
  }, [mode])

  // Clignements naturels, parfois doubles, plus lents quand il somnole
  useEffect(() => {
    if (prefersReducedMotion || mode === "asleep") return

    let timeout = 0
    const isDrowsy = mode === "drowsy"

    const blink = (remaining: number) => {
      setIsBlinking(true)
      timeout = window.setTimeout(() => {
        setIsBlinking(false)

        if (remaining > 0) {
          timeout = window.setTimeout(() => blink(remaining - 1), 110)
        } else {
          schedule()
        }
      }, isDrowsy ? 380 : 130)
    }

    const schedule = () => {
      timeout = window.setTimeout(
        () => blink(Math.random() < 0.18 ? 1 : 0),
        isDrowsy ? random(1400, 2800) : random(2200, 5800),
      )
    }

    schedule()

    return () => window.clearTimeout(timeout)
  }, [mode, prefersReducedMotion])

  // Regard qui erre quand le curseur ne bouge plus
  useEffect(() => {
    let timeout = 0

    const wander = () => {
      wanderRef.current =
        Math.random() < 0.3 ? [0, 0.1] : [random(-0.85, 0.85), random(-0.5, 0.7)]
      timeout = window.setTimeout(wander, random(1200, 3800))
    }

    wander()

    return () => window.clearTimeout(timeout)
  }, [])

  // Boucle d'animation : regard, tête, respiration, antenne
  useEffect(() => {
    if (prefersReducedMotion) return

    const state = { eyeX: 0, eyeY: 0, headX: 0, headY: 0, antenna: 0, antennaVelocity: 0, jitterX: 0, jitterY: 0, nextJitter: 0 }
    let frame = 0

    const tick = (time: number) => {
      const pointer = pointerRef.current
      const isPointerActive = time - pointer.lastMove < 3500
      const forced = lookRef.current
      const [targetX, targetY] = forced ?? (isPointerActive ? [pointer.x, pointer.y] : wanderRef.current)

      // Micro-saccades : de minuscules sauts du regard, comme un vrai œil
      if (time > state.nextJitter) {
        state.jitterX = random(-0.06, 0.06)
        state.jitterY = random(-0.05, 0.05)
        state.nextJitter = time + random(500, 1400)
      }

      state.eyeX += (targetX + state.jitterX - state.eyeX) * 0.24
      state.eyeY += (targetY + state.jitterY - state.eyeY) * 0.24
      state.headX += (targetX - state.headX) * 0.05
      state.headY += (targetY - state.headY) * 0.05

      const isAsleep = modeRef.current === "asleep"
      const breath = Math.sin((time / (isAsleep ? 2600 : 1700)) * Math.PI)
      const headTilt = state.headX * 6 + (isAsleep ? 7 : 0)

      const antennaTarget = -headTilt * 1.4
      state.antennaVelocity += (antennaTarget - state.antenna) * 0.09
      state.antennaVelocity *= 0.82
      state.antenna += state.antennaVelocity

      headRef.current?.style.setProperty(
        "transform",
        `translate(${state.headX * 1.1}px, ${breath * (isAsleep ? 0.7 : 0.4) + state.headY * 0.5}px) rotate(${headTilt}deg)`,
      )
      faceRef.current?.style.setProperty("transform", `translate(${state.eyeX * 1.5}px, ${state.eyeY * 1.1}px)`)
      antennaRef.current?.style.setProperty("transform", `rotate(${state.antenna}deg)`)
      pupilRefs.current.forEach((pupil) =>
        pupil?.style.setProperty("transform", `translate(${state.eyeX * 1.25}px, ${state.eyeY * 1.25}px)`),
      )

      frame = window.requestAnimationFrame(tick)
    }

    frame = window.requestAnimationFrame(tick)

    return () => window.cancelAnimationFrame(frame)
  }, [prefersReducedMotion])

  useEffect(() => {
    return () => {
      if (reactionTimeoutRef.current !== null) {
        window.clearTimeout(reactionTimeoutRef.current)
      }
    }
  }, [])

  const handleClick = () => {
    const now = performance.now()

    clicksRef.current = [...clicksRef.current.filter((time) => now - time < 2500), now]
    hop()

    if (clicksRef.current.length >= 5) {
      clicksRef.current = []
      react("annoyed", 2200)
      return
    }

    react(pick(clickReactions, lastReactionRef.current ?? undefined), 1700)
  }

  const expressionName: ExpressionName =
    reaction ??
    (mode === "asleep" ? "asleep" : isHovered ? "happy" : mode === "drowsy" ? "sleepy" : idleExpression)
  const expression: Expression = expressions[expressionName]

  useEffect(() => {
    lookRef.current = expression.look ?? null
  }, [expression])

  const lidTransition = isBlinking ? "transform 90ms ease-in" : "transform 260ms cubic-bezier(.3,.7,.4,1)"
  const featureTransition = "transform 320ms cubic-bezier(.3,.7,.4,1), opacity 320ms ease"
  const path = mouthPath(expression.mouth)

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label={language === "fr" ? "Mascotte interactive" : "Interactive mascot"}
      onClick={handleClick}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className={cn(
        "relative ml-1 inline-flex h-10 w-12 shrink-0 items-center justify-center text-muted-foreground transition-colors duration-300 hover:text-foreground",
        focusRing,
      )}
    >
      <svg viewBox="0 0 48 40" className="h-10 w-12 overflow-visible" aria-hidden="true">
        <defs>
          {eyes.map((eye, index) => (
            <clipPath key={eye.x} id={`header-bot-eye-${index}`}>
              <circle cx={eye.x} cy={eyeY} r={eyeRadius} />
            </clipPath>
          ))}
        </defs>

        <g ref={bodyRef} style={{ transformBox: "view-box", transformOrigin: "24px 38px" }}>
          <g
            ref={headRef}
            style={{ transformBox: "view-box", transformOrigin: "24px 36px" }}
          >
            {/* Antenne */}
            <g ref={antennaRef} style={{ transformBox: "view-box", transformOrigin: "24px 9px" }}>
              <line x1="24" y1="9" x2="24" y2="3.6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <circle
                cx="24"
                cy="3"
                r="1.9"
                className={cn(
                  "transition-[fill] duration-500",
                  mode === "asleep" ? "fill-muted-foreground/40" : "fill-accent-strong",
                )}
                style={
                  prefersReducedMotion || mode === "asleep"
                    ? undefined
                    : { animation: "header-bot-led 2600ms ease-in-out infinite" }
                }
              />
            </g>

            {/* Oreilles */}
            <rect x="1.6" y="18" width="4.4" height="9.5" rx="2.2" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeOpacity="0.5" strokeWidth="0.8" />
            <rect x="42" y="18" width="4.4" height="9.5" rx="2.2" fill="currentColor" fillOpacity="0.14" stroke="currentColor" strokeOpacity="0.5" strokeWidth="0.8" />

            {/* Tête */}
            <rect x="5" y="9" width="38" height="27.5" rx="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeOpacity="0.55" strokeWidth="0.9" />
            <path d="M 11 10.6 Q 24 9.2 37 10.6" stroke="white" strokeOpacity="0.14" strokeWidth="0.8" fill="none" strokeLinecap="round" />

            {/* Visière */}
            <rect x="8.8" y="13" width="30.4" height="19.6" rx="6.6" fill="#141613" />

            <g ref={faceRef}>
              {/* Joues */}
              {eyes.map((eye) => (
                <ellipse
                  key={`cheek-${eye.x}`}
                  cx={eye.x + eye.side * 2.6}
                  cy={27.6}
                  rx="2.4"
                  ry="1.2"
                  fill="#f08a9c"
                  style={{ opacity: (expression.blush ?? 0) * 0.55, transition: "opacity 400ms ease" }}
                />
              ))}

              {eyes.map((eye, index) => {
                const lidAngle = (expression.lidAngle ?? 0) * -eye.side
                const top = isBlinking ? 1 : pair(expression.lidTop, index)
                const bottom = isBlinking ? Math.max(0.15, pair(expression.lidBottom, index)) : pair(expression.lidBottom, index)
                const pupilScale = expression.pupil ?? 1

                return (
                  <g key={eye.x}>
                    <g clipPath={`url(#header-bot-eye-${index})`}>
                      <circle cx={eye.x} cy={eyeY} r={eyeRadius} fill="#e6edf0" />
                      <g ref={(node) => { pupilRefs.current[index] = node }}>
                        <g
                          style={{
                            transformBox: "view-box",
                            transformOrigin: `${eye.x}px ${eyeY}px`,
                            transform: `scale(${pupilScale})`,
                            transition: featureTransition,
                          }}
                        >
                          {expression.symbol === "♥" ? (
                            <path
                              d={`M ${eye.x} ${eyeY + 1.6} C ${eye.x - 3} ${eyeY - 0.4} ${eye.x - 1.6} ${eyeY - 2.6} ${eye.x} ${eyeY - 1} C ${eye.x + 1.6} ${eyeY - 2.6} ${eye.x + 3} ${eyeY - 0.4} ${eye.x} ${eyeY + 1.6} Z`}
                              fill="#e5566f"
                            />
                          ) : (
                            <>
                              <circle cx={eye.x} cy={eyeY} r="1.95" fill="#141613" />
                              <circle cx={eye.x - 0.7} cy={eyeY - 0.8} r="0.6" fill="white" fillOpacity="0.9" />
                            </>
                          )}
                        </g>
                      </g>
                    </g>

                    {/* Paupières */}
                    <g
                      style={{
                        transformBox: "view-box",
                        transformOrigin: `${eye.x}px ${eyeY}px`,
                        transform: `rotate(${lidAngle}deg)`,
                        transition: featureTransition,
                      }}
                    >
                      <rect
                        x={eye.x - 5.5}
                        y={eyeY - eyeRadius - 0.8}
                        width="11"
                        height={eyeRadius * 2 + 1.6}
                        rx="1.5"
                        fill="#141613"
                        style={{
                          transformBox: "fill-box",
                          transformOrigin: "top",
                          transform: `scaleY(${top})`,
                          transition: lidTransition,
                        }}
                      />
                      <rect
                        x={eye.x - 5.5}
                        y={eyeY - eyeRadius - 0.8}
                        width="11"
                        height={eyeRadius * 2 + 1.6}
                        rx="4"
                        fill="#141613"
                        style={{
                          transformBox: "fill-box",
                          transformOrigin: "bottom",
                          transform: `scaleY(${bottom})`,
                          transition: lidTransition,
                        }}
                      />
                    </g>

                    {/* Sourcils */}
                    <line
                      x1={eye.x - 2.8}
                      y1="15.9"
                      x2={eye.x + 2.8}
                      y2="15.9"
                      stroke="#cfd8dc"
                      strokeOpacity="0.75"
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      style={{
                        transformBox: "view-box",
                        transformOrigin: `${eye.x}px 15.9px`,
                        transform: `translateY(${pair(expression.browY, index)}px) rotate(${(expression.browAngle ?? 0) * -eye.side}deg)`,
                        transition: featureTransition,
                      }}
                    />
                  </g>
                )
              })}

              {/* Bouche */}
              <path
                d={path}
                fill="#0b0c0b"
                stroke="#cfd8dc"
                strokeOpacity="0.85"
                strokeWidth="0.9"
                strokeLinejoin="round"
                style={{ d: `path("${path}")`, transition: "d 300ms cubic-bezier(.3,.7,.4,1)" } as CSSProperties}
              />
            </g>
          </g>

          {/* Symboles d'humeur */}
          {expression.symbol === "z" ? (
            [0, 1, 2].map((index) => (
              <text
                key={`z-${index}`}
                x="41"
                y="9"
                fontSize={5 + index}
                fontWeight="600"
                className="fill-muted-foreground"
                style={{
                  transformBox: "fill-box",
                  opacity: 0,
                  animation: prefersReducedMotion ? undefined : `header-bot-z 2700ms ease-out ${index * 900}ms infinite`,
                }}
              >
                z
              </text>
            ))
          ) : expression.symbol && expression.symbol !== "♥" ? (
            <text
              key={`${expressionName}-symbol`}
              x="42"
              y="9"
              fontSize="8"
              fontWeight="700"
              className="fill-accent-strong"
              style={{ animation: prefersReducedMotion ? undefined : "header-bot-pop 420ms cubic-bezier(.22,1,.36,1) both" }}
            >
              {expression.symbol}
            </text>
          ) : null}
        </g>
      </svg>
    </button>
  )
}
