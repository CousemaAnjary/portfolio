import { useCallback, useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type BotMood =
  | "neutral"
  | "blink"
  | "doubleBlink"
  | "softSmile"
  | "warmSmile"
  | "happy"
  | "thinking"
  | "curious"
  | "surprised"
  | "lookLeft"
  | "lookRight"
  | "lookUp"
  | "lookDown"
  | "squint"
  | "sleepy"
  | "relaxed"
  | "attentive"
  | "focused"
  | "confused"
  | "sideEye"
  | "content"
  | "wink"
  | "pleased"
  | "softNod"

type MoodStyle = {
  head?: string
  face?: string
  eyes?: string
  eye?: string
  leftEye?: string
  rightEye?: string
  pupil?: string
  leftPupil?: string
  rightPupil?: string
  mouth?: string
  status?: string
}

const idleMoods: BotMood[] = [
  "neutral",
  "blink",
  "doubleBlink",
  "softSmile",
  "warmSmile",
  "happy",
  "thinking",
  "curious",
  "surprised",
  "lookLeft",
  "lookRight",
  "lookUp",
  "lookDown",
  "squint",
  "sleepy",
  "relaxed",
  "attentive",
  "focused",
  "confused",
  "sideEye",
  "content",
]

const specialMoods: BotMood[] = ["wink", "pleased", "attentive", "warmSmile", "softNod"]

const moodStyles: Record<BotMood, MoodStyle> = {
  neutral: {
    eyes: "motion-safe:animate-[header-bot-eye-drift_4200ms_ease-in-out_infinite]",
  },
  blink: {
    eye: "h-[2px] w-2 rounded-full bg-muted-foreground/60 ring-0 motion-safe:animate-[header-bot-blink_560ms_ease-in-out_1]",
    pupil: "opacity-0",
    mouth: "w-2 opacity-70",
  },
  doubleBlink: {
    eye: "h-[2px] w-2 rounded-full bg-muted-foreground/60 ring-0 motion-safe:animate-[header-bot-double-blink_860ms_ease-in-out_1]",
    pupil: "opacity-0",
    mouth: "w-2 opacity-70",
  },
  softSmile: {
    eye: "bg-muted-foreground/10 ring-muted-foreground/30",
    mouth: "h-1.5 w-3 rounded-b-full border-b border-muted-foreground/52 bg-transparent",
  },
  warmSmile: {
    eye: "scale-105 bg-muted-foreground/12 ring-muted-foreground/34",
    pupil: "bg-muted-foreground/86",
    mouth: "h-1.5 w-3.5 rounded-b-full border-b border-muted-foreground/64 bg-transparent",
  },
  happy: {
    eye: "scale-105 bg-muted-foreground/12 ring-muted-foreground/35",
    pupil: "bg-muted-foreground/85",
    mouth: "h-1.5 w-3.5 rounded-b-full border-b border-muted-foreground/60 bg-transparent",
  },
  thinking: {
    eyes: "-translate-y-0.5",
    mouth: "w-1.5 opacity-80",
    status: "opacity-70 bg-muted-foreground/55 motion-safe:animate-[header-bot-soft-pulse_1600ms_ease-in-out_infinite]",
  },
  curious: {
    eyes: "-translate-y-0.5 translate-x-0.5",
    mouth: "w-2 opacity-75",
    status: "opacity-45 bg-muted-foreground/45",
  },
  surprised: {
    eye: "scale-125 bg-muted-foreground/12 ring-muted-foreground/38",
    pupil: "scale-110 bg-muted-foreground/85",
    mouth: "size-1.5 rounded-full border border-muted-foreground/70 bg-transparent",
  },
  lookLeft: {
    eyes: "-translate-x-0.5",
    mouth: "w-2 opacity-85",
  },
  lookRight: {
    eyes: "translate-x-0.5",
    mouth: "w-2 opacity-85",
  },
  lookUp: {
    eyes: "-translate-y-0.5",
    mouth: "w-2 opacity-75",
  },
  lookDown: {
    eyes: "translate-y-0.5",
    mouth: "w-2 opacity-70",
  },
  squint: {
    eye: "h-1 w-2 rounded-full bg-muted-foreground/18 ring-muted-foreground/24",
    pupil: "scale-x-125 scale-y-50 opacity-75",
    mouth: "w-2 opacity-70",
  },
  sleepy: {
    eye: "h-[2px] w-2.5 translate-y-0.5 rounded-full bg-muted-foreground/55 opacity-80 ring-0",
    pupil: "opacity-0",
    mouth: "w-1.5 opacity-60",
  },
  relaxed: {
    eyes: "translate-y-0.5",
    eye: "h-[2px] w-2 rounded-full bg-muted-foreground/58 ring-0",
    pupil: "opacity-0",
    mouth: "h-1.5 w-3 rounded-b-full border-b border-muted-foreground/48 bg-transparent",
  },
  attentive: {
    eye: "scale-110 bg-muted-foreground/14 ring-muted-foreground/38",
    pupil: "scale-110 bg-muted-foreground/90",
    mouth: "w-2.5 opacity-85",
  },
  focused: {
    eye: "scale-95 bg-muted-foreground/12 ring-muted-foreground/34",
    pupil: "scale-90 bg-muted-foreground/88",
    mouth: "w-1.5 opacity-75",
  },
  confused: {
    leftEye: "-translate-y-0.5 scale-95",
    rightEye: "translate-y-0.5 scale-105",
    mouth: "w-2 rotate-3 opacity-70",
  },
  sideEye: {
    eyes: "translate-x-0.5",
    leftEye: "scale-90",
    rightEye: "scale-110",
    mouth: "w-2 opacity-75",
  },
  content: {
    eyes: "translate-y-px",
    eye: "h-[2px] w-2 rounded-full bg-muted-foreground/62 ring-0",
    pupil: "opacity-0",
    mouth: "h-1.5 w-3 rounded-b-full border-b border-muted-foreground/58 bg-transparent",
  },
  wink: {
    face: "border-muted-foreground/16 bg-muted-foreground/[0.035]",
    leftEye: "h-[2px] w-2.5 rounded-full bg-muted-foreground/70 ring-0 motion-safe:animate-[header-bot-wink_720ms_ease-in-out_1]",
    leftPupil: "opacity-0",
    rightEye: "scale-105 bg-muted-foreground/12 ring-muted-foreground/36",
    rightPupil: "scale-110 bg-muted-foreground/88",
    mouth: "h-1.5 w-3.5 rounded-b-full border-b border-muted-foreground/62 bg-transparent",
  },
  pleased: {
    face: "border-muted-foreground/16 bg-muted-foreground/[0.035]",
    eyes: "translate-y-px",
    eye: "h-[2px] w-2 rounded-full bg-muted-foreground/62 ring-0",
    pupil: "opacity-0",
    mouth: "h-1.5 w-3.5 rounded-b-full border-b border-muted-foreground/62 bg-transparent",
  },
  softNod: {
    head: "motion-safe:animate-[header-bot-soft-nod_760ms_ease-in-out_1]",
    eyes: "translate-y-px",
    eye: "scale-105 bg-muted-foreground/12 ring-muted-foreground/34",
    pupil: "bg-muted-foreground/86",
    mouth: "h-1.5 w-3.5 rounded-b-full border-b border-muted-foreground/62 bg-transparent",
  },
}

const getRandomDelay = () => 3000 + Math.floor(Math.random() * 3000)

const getBlinkDelay = () => 2800 + Math.floor(Math.random() * 4200)

const getRandomMood = (moods: readonly BotMood[], currentMood?: BotMood) => {
  const availableMoods = moods.filter((mood) => mood !== currentMood)

  return availableMoods[Math.floor(Math.random() * availableMoods.length)] ?? moods[0]
}

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

export function HeaderBot() {
  const [mood, setMood] = useState<BotMood>("neutral")
  const [isBlinking, setIsBlinking] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isSpecial, setIsSpecial] = useState(false)
  const [isChangingMood, setIsChangingMood] = useState(false)
  const moodRef = useRef<BotMood>("neutral")
  const idleTimeoutRef = useRef<number | null>(null)
  const blinkTimeoutRef = useRef<number | null>(null)
  const blinkResetTimeoutRef = useRef<number | null>(null)
  const specialTimeoutRef = useRef<number | null>(null)
  const transitionStartTimeoutRef = useRef<number | null>(null)
  const transitionEndTimeoutRef = useRef<number | null>(null)
  const prefersReducedMotion = usePrefersReducedMotion()

  const transitionToMood = useCallback(
    (nextMood: BotMood) => {
      if (prefersReducedMotion) {
        moodRef.current = nextMood
        setMood(nextMood)
        setIsChangingMood(false)
        return
      }

      if (transitionStartTimeoutRef.current !== null) {
        window.clearTimeout(transitionStartTimeoutRef.current)
      }

      if (transitionEndTimeoutRef.current !== null) {
        window.clearTimeout(transitionEndTimeoutRef.current)
      }

      setIsChangingMood(true)

      transitionStartTimeoutRef.current = window.setTimeout(() => {
        moodRef.current = nextMood
        setMood(nextMood)
        transitionStartTimeoutRef.current = null

        transitionEndTimeoutRef.current = window.setTimeout(() => {
          setIsChangingMood(false)
          transitionEndTimeoutRef.current = null
        }, 220)
      }, 90)
    },
    [prefersReducedMotion],
  )

  useEffect(() => {
    if (isSpecial || prefersReducedMotion) {
      return undefined
    }

    const scheduleNextMood = () => {
      idleTimeoutRef.current = window.setTimeout(() => {
        transitionToMood(getRandomMood(idleMoods, moodRef.current))
        scheduleNextMood()
      }, getRandomDelay())
    }

    scheduleNextMood()

    return () => {
      if (idleTimeoutRef.current !== null) {
        window.clearTimeout(idleTimeoutRef.current)
        idleTimeoutRef.current = null
      }
    }
  }, [isSpecial, prefersReducedMotion, transitionToMood])

  useEffect(() => {
    if (isSpecial || prefersReducedMotion) {
      return undefined
    }

    const scheduleBlink = () => {
      blinkTimeoutRef.current = window.setTimeout(() => {
        setIsBlinking(true)

        blinkResetTimeoutRef.current = window.setTimeout(() => {
          setIsBlinking(false)
          scheduleBlink()
        }, 190)
      }, getBlinkDelay())
    }

    scheduleBlink()

    return () => {
      if (blinkTimeoutRef.current !== null) {
        window.clearTimeout(blinkTimeoutRef.current)
        blinkTimeoutRef.current = null
      }

      if (blinkResetTimeoutRef.current !== null) {
        window.clearTimeout(blinkResetTimeoutRef.current)
        blinkResetTimeoutRef.current = null
      }
    }
  }, [isSpecial, prefersReducedMotion])

  useEffect(() => {
    return () => {
      if (idleTimeoutRef.current !== null) {
        window.clearTimeout(idleTimeoutRef.current)
      }

      if (blinkTimeoutRef.current !== null) {
        window.clearTimeout(blinkTimeoutRef.current)
      }

      if (blinkResetTimeoutRef.current !== null) {
        window.clearTimeout(blinkResetTimeoutRef.current)
      }

      if (specialTimeoutRef.current !== null) {
        window.clearTimeout(specialTimeoutRef.current)
      }

      if (transitionStartTimeoutRef.current !== null) {
        window.clearTimeout(transitionStartTimeoutRef.current)
      }

      if (transitionEndTimeoutRef.current !== null) {
        window.clearTimeout(transitionEndTimeoutRef.current)
      }
    }
  }, [])

  const handleClick = () => {
    if (idleTimeoutRef.current !== null) {
      window.clearTimeout(idleTimeoutRef.current)
      idleTimeoutRef.current = null
    }

    if (specialTimeoutRef.current !== null) {
      window.clearTimeout(specialTimeoutRef.current)
    }

    if (blinkTimeoutRef.current !== null) {
      window.clearTimeout(blinkTimeoutRef.current)
      blinkTimeoutRef.current = null
    }

    if (blinkResetTimeoutRef.current !== null) {
      window.clearTimeout(blinkResetTimeoutRef.current)
      blinkResetTimeoutRef.current = null
    }

    setIsBlinking(false)
    setIsSpecial(true)
    transitionToMood(getRandomMood(specialMoods, moodRef.current))

    specialTimeoutRef.current = window.setTimeout(() => {
      transitionToMood("neutral")
      setIsSpecial(false)
      specialTimeoutRef.current = null
    }, 2000)
  }

  const visualMood: BotMood = isSpecial ? mood : isBlinking ? "blink" : isHovered ? "softSmile" : mood
  const styles = moodStyles[visualMood]

  return (
    <button
      type="button"
      aria-label="Petit bot interactif"
      onClick={handleClick}
      onBlur={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className="group/bot relative inline-flex h-8 w-9 shrink-0 -translate-y-1 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:h-9 sm:w-10"
    >
      <span
        aria-hidden="true"
        className={cn(
          "relative inline-flex h-8 w-9 items-end justify-center sm:h-9 sm:w-10",
          !isSpecial && "motion-safe:animate-[header-bot-breathe_5200ms_ease-in-out_infinite]",
          isSpecial && "motion-safe:animate-[header-bot-respond_580ms_ease-in-out_1]",
        )}
      >
        <span
          className={cn(
            "relative h-7 w-9 overflow-visible transition-transform duration-300 sm:h-8 sm:w-10",
            styles.head,
          )}
        >
          <span className="absolute -left-[0.05rem] top-[0.68rem] h-3.5 w-2 rounded-l-full rounded-r-sm border border-white/10 bg-foreground/[0.045] shadow-[inset_1px_0_0_rgba(255,255,255,0.08)] dark:border-white/6 dark:bg-white/[0.035]" />
          <span className="absolute -right-[0.05rem] top-[0.68rem] h-3.5 w-2 rounded-r-full rounded-l-sm border border-white/10 bg-foreground/[0.045] shadow-[inset_-1px_0_0_rgba(255,255,255,0.08)] dark:border-white/6 dark:bg-white/[0.035]" />
          <span className="absolute bottom-0 left-1/2 h-1.5 w-5 -translate-x-1/2 rounded-b-[0.45rem] rounded-t-sm border border-white/8 bg-foreground/[0.045] dark:border-white/6 dark:bg-white/[0.035]" />

          <span
            className={cn(
              "absolute top-[0.17rem] left-1/2 z-10 h-[1.42rem] w-[2.05rem] -translate-x-1/2 overflow-hidden rounded-[0.58rem] border border-white/10 bg-foreground/[0.045] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md transition-[background-color,border-color,opacity,filter] duration-500 ease-out group-hover/bot:border-muted-foreground/24 sm:top-[0.24rem] sm:h-[1.58rem] sm:w-[2.25rem] sm:rounded-[0.65rem] dark:border-white/6 dark:bg-white/[0.035] dark:shadow-none",
              isChangingMood && "motion-safe:animate-[header-bot-expression-soften_310ms_ease-out_1]",
              styles.face,
            )}
          >
            <span className="pointer-events-none absolute inset-x-1 top-0 h-px bg-white/20 dark:bg-white/10" />

            <span
              className={cn(
                "absolute top-[0.32rem] left-1/2 flex -translate-x-1/2 items-center gap-1.5 transition-[transform,opacity,filter] duration-500 ease-out sm:top-[0.38rem] sm:gap-2",
                isChangingMood && "motion-safe:animate-[header-bot-expression-soften_310ms_ease-out_1]",
                styles.eyes,
              )}
            >
              <span
                className={cn(
                  "relative inline-flex size-1.5 items-center justify-center rounded-full bg-muted-foreground/10 ring-1 ring-muted-foreground/32 transition-all duration-500 ease-out sm:size-2",
                  styles.eye,
                  styles.leftEye,
                )}
              >
                <span
                  className={cn(
                    "block size-1 rounded-full bg-muted-foreground/82 shadow-[0_0_3px_rgba(104,107,100,0.16)] transition-all duration-500 ease-out dark:shadow-[0_0_3px_rgba(168,172,163,0.16)] sm:size-1",
                    styles.pupil,
                    styles.leftPupil,
                  )}
                />
              </span>
              <span
                className={cn(
                  "relative inline-flex size-1.5 items-center justify-center rounded-full bg-muted-foreground/10 ring-1 ring-muted-foreground/32 transition-all duration-500 ease-out sm:size-2",
                  styles.eye,
                  styles.rightEye,
                )}
              >
                <span
                  className={cn(
                    "block size-1 rounded-full bg-muted-foreground/82 shadow-[0_0_3px_rgba(104,107,100,0.16)] transition-all duration-500 ease-out dark:shadow-[0_0_3px_rgba(168,172,163,0.16)] sm:size-1",
                    styles.pupil,
                    styles.rightPupil,
                  )}
                />
              </span>
            </span>
            <span
              className={cn(
                "absolute bottom-[0.22rem] left-1/2 h-[2px] w-3 -translate-x-1/2 rounded-full bg-muted-foreground/72 transition-all duration-500 ease-out sm:bottom-[0.26rem]",
                isChangingMood && "motion-safe:animate-[header-bot-expression-soften_310ms_ease-out_1]",
                styles.mouth,
              )}
            />
          </span>
        </span>
      </span>
    </button>
  )
}
