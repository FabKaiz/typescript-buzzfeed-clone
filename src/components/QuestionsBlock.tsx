import { Content, Question } from '../../interfaces'
import QuestionBlock from './QuestionBlock'

const QuestionsBlock = ({
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
}) => {
  return (
    <>
      <h2 className="title__block" id={String(quizItem.id)}>
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

export default QuestionsBlock
