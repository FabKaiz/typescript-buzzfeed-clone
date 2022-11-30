import { Content, Question } from '../../interfaces'
import QuestionBlock from './QuestionBlock'

const QuestionsBlock = ({
  quizItem,
  chosenAnsweritems,
  setChosenAnsweritems,
  unansweredQuestionIds,
  setUnansweredQuestionIds,
}: {
  quizItem: Content
  chosenAnsweritems: string[]
  setChosenAnsweritems: Function
  unansweredQuestionIds: number[] | undefined
  setUnansweredQuestionIds: Function
}) => {
  return (
    <>
      <h2 className="title__block" id={String(quizItem.id)}>
        {quizItem.text}
      </h2>
      <div className="questions__container">
        {quizItem.questions.map((question: Question, _index) => (
          <QuestionBlock
            question={question}
            quizItemId={quizItem.id}
            key={_index}
            chosenAnsweritems={chosenAnsweritems}
            setChosenAnsweritems={setChosenAnsweritems}
            unansweredQuestionIds={unansweredQuestionIds}
            setUnansweredQuestionIds={setUnansweredQuestionIds}
          />
        ))}
      </div>
    </>
  )
}

export default QuestionsBlock
