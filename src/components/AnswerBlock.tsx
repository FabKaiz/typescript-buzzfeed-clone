import { forwardRef, useEffect, useState } from 'react'
import { Answer } from '../../interfaces'

const AnswerBlock = (
  {
    answerOptions,
    chosenAnswerItems,
  }: {
    answerOptions: Answer[] | undefined
    chosenAnswerItems: string[]
  },
  ref: any
) => {
  const [result, setResult] = useState<Answer | null>()

  useEffect(() => {
    answerOptions?.forEach((answer: Answer) => {
      if (
        chosenAnswerItems.includes(answer.combination[0]) &&
        chosenAnswerItems.includes(answer.combination[1]) &&
        chosenAnswerItems.includes(answer.combination[2])
      ) {
        setResult(answer)
      }
    })
  }, [chosenAnswerItems, answerOptions])

  return (
    <div ref={ref} className="answer__block">
      <h3>Result</h3>
      <img src={result?.image} alt={result?.alt} />
      <h2>You are a {result?.text}</h2>
      <button onClick={() => window.location.reload()}>Retry test</button>
    </div>
  )
}

export default forwardRef(AnswerBlock)
