import { forwardRef, LegacyRef } from 'react'
import { Content, Question } from '../../interfaces'
import QuestionBlock from './QuestionBlock'

const QuestionsBlock = (
  {
    quizItem,
    chosenAnswerItems,
    setChosenAnswerItems,
    unansweredQuestionIds,
    setUnansweredQuestionIds,
  }: {
    quizItem: Content
    chosenAnswerItems: string[]
    setChosenAnswerItems: Function
    unansweredQuestionIds: number[] | undefined
    setUnansweredQuestionIds: Function
  },
  ref: LegacyRef<HTMLHeadingElement> | undefined
) => {
  return (
    <>
      <h2 ref={ref} className="title__block">
        {quizItem.text}
      </h2>
      <div className="questions__container">
        {quizItem.questions.map((question: Question, _index: number) => (
          <QuestionBlock
            question={question}
            quizItemId={quizItem.id}
            key={_index}
            chosenAnswerItems={chosenAnswerItems}
            setChosenAnswerItems={setChosenAnswerItems}
            unansweredQuestionIds={unansweredQuestionIds}
            setUnansweredQuestionIds={setUnansweredQuestionIds}
          />
        ))}
      </div>
    </>
  )
}

export default forwardRef(QuestionsBlock)
