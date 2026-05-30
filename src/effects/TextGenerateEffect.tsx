import * as React from "react"
import { stagger, useAnimate } from "motion/react"

type TextGenerateEffectProps = Omit<React.HTMLAttributes<HTMLDivElement>, "children"> & {
  words: string
  filter?: boolean
  duration?: number
  staggerDelay?: number
}

const TextGenerateEffect = React.forwardRef<HTMLDivElement, TextGenerateEffectProps>(
  (
    {
      words,
      className,
      filter = true,
      duration = 0.5,
      staggerDelay = 0.2,
      ...props
    },
    ref,
  ) => {
    const [scope, animate] = useAnimate<HTMLDivElement>()

    React.useImperativeHandle(ref, () => scope.current as HTMLDivElement, [scope])

    const wordsArray = React.useMemo(() => words.split(" "), [words])

    React.useEffect(() => {
      if (scope.current) {
        animate(
          "span",
          {
            opacity: 1,
            filter: filter ? "blur(0px)" : "none",
          },
          {
            duration,
            delay: stagger(staggerDelay),
          },
        )
      }
    }, [animate, duration, filter, staggerDelay, scope])

    return (
      <div ref={scope} className={className} {...props}>
        {wordsArray.map((word, idx) => (
          <span key={`${word}-${idx}`} className="inline-block opacity-0">
            {word}
            {idx < wordsArray.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </div>
    )
  },
)

TextGenerateEffect.displayName = "TextGenerateEffect"

export { TextGenerateEffect, type TextGenerateEffectProps }
export default TextGenerateEffect
