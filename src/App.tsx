import { useEffect, useState } from 'react'
import Title from './components/Title'
import { Content, QuizData } from '../interfaces'
import QuestionsBlock from './components/QuestionsBlock'
import AnswerBlock from './components/AnswerBlock'

const App = () => {
  const [quiz, setQuiz] = useState<QuizData | null>()
  const [chosenAnswerItems, setChosenAnswerItems] = useState<string[]>([])
  const [unansweredQuestionIds, setUnansweredQuestionIds] = useState<
    number[] | undefined
  >([])
  const [showAnswer, setShowAnswer] = useState<Boolean>(false)

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/quiz-item')
      const json = await response.json()
      setQuiz(json)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    const unansweredIds = quiz?.content?.map(({ id }: Content) => id)
    setUnansweredQuestionIds(unansweredIds)
  }, [quiz])

  useEffect(() => {
    if (unansweredQuestionIds) {
      if (unansweredQuestionIds.length <= 0 && chosenAnswerItems.length >= 1) {
        setShowAnswer(true)
        document
          .getElementById('answer__block')
          ?.scrollIntoView({ behavior: 'smooth' })
      }

      const highestId = Math.min(...unansweredQuestionIds)
      const highestElement = document.getElementById(String(highestId)) // TODO: useRef instead of getElementById
      highestElement?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [unansweredQuestionIds, chosenAnswerItems])

  return (
    <div className="App">
      <Title title={quiz?.title} subtitle={quiz?.subtitle} />
      {quiz?.content.map((content: Content, id: Content['id']) => (
        <QuestionsBlock
          quizItem={content}
          chosenAnswerItems={chosenAnswerItems}
          setChosenAnswerItems={setChosenAnswerItems}
          unansweredQuestionIds={unansweredQuestionIds}
          setUnansweredQuestionIds={setUnansweredQuestionIds}
          key={id}
        />
      ))}
      {showAnswer && (
        <AnswerBlock
          answerOptions={quiz?.answers}
          chosenAnswerItems={chosenAnswerItems}
        />
      )}
    </div>
  )
}

export default App
