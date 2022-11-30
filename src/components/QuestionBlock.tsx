import { Question } from '../../interfaces'

const QuestionBlock = ({
  question,
  quizItemId,
  chosenAnsweritems,
  setChosenAnsweritems,
  unansweredQuestionIds,
  setUnansweredQuestionIds,
}: {
  question: Question
  quizItemId: number
  chosenAnsweritems: string[]
  setChosenAnsweritems: Function
  unansweredQuestionIds: number[] | undefined
  setUnansweredQuestionIds: Function
}) => {
  const handleClick = () => {
    if (!chosenAnsweritems?.includes(question.text)) {
      setChosenAnsweritems((prev: string[]) => [...prev, question.text])
      setUnansweredQuestionIds(
        unansweredQuestionIds?.filter((id: number) => id !== quizItemId)
      )
    } else {
      setChosenAnsweritems(
        chosenAnsweritems?.filter((item: string) => item !== question.text)
      )
      setUnansweredQuestionIds((prev: number[]) => [...prev, quizItemId])
    }
  }

  const validPick =
    !chosenAnsweritems?.includes(question.text) &&
    !unansweredQuestionIds?.includes(quizItemId)

  return (
    <button
      className="question__block"
      onClick={handleClick}
      disabled={validPick}
    >
      <img src={question?.image} alt={question?.alt} />
      <h3>{question?.text}</h3>
      <p>
        <a href={question?.image} target="_blank" rel="noreferrer">
          {question?.credit}
        </a>
      </p>
    </button>
  )
}

export default QuestionBlock
