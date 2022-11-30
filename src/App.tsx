import { useEffect, useState } from 'react'
import Title from './components/Title'
import { Content, QuizData } from '../interfaces'
import QuestionsBlock from './components/QuestionsBlock'

const App = () => {
  const [quiz, setQuiz] = useState<QuizData | null>()
  const [chosenAnsweritems, setChosenAnsweritems] = useState<string[]>([])
  const [unansweredQuestionIds, setUnansweredQuestionIds] = useState<
    number[] | undefined
  >([])

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

  return (
    <div className="App">
      <Title title={quiz?.title} subtitle={quiz?.subtitle} />
      {quiz?.content.map((content: Content, id: Content['id']) => (
        <QuestionsBlock
          quizItem={content}
          chosenAnsweritems={chosenAnsweritems}
          setChosenAnsweritems={setChosenAnsweritems}
          unansweredQuestionIds={unansweredQuestionIds}
          setUnansweredQuestionIds={setUnansweredQuestionIds}
          key={id}
        />
      ))}
    </div>
  )
}

export default App
