import { Content, Question } from '../../interfaces'
import QuestionBlock from './QuestionBlock'

const QuestionsBlock = ({ quizItem }: { quizItem: Content }) => {
  return (
    <>
      <h2 className="title__block" id={String(quizItem.id)}>{quizItem.text}</h2>
      <div className="questions__container">
        {quizItem.questions.map((question: Question, _index) => (
          <QuestionBlock question={question} key={_index} />
        ))}
      </div>
    </>
  )
}

export default QuestionsBlock
