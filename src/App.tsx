import { useEffect, useState } from 'react'
import Title from './components/Title'
import { Content, QuizData } from '../interfaces'
import QuestionsBlock from './components/QuestionsBlock'

const App = () => {
  const [quiz, setQuiz] = useState<QuizData | null>()
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

  console.log(quiz)

  return (
    <div className="App">
      <Title title={quiz?.title} subtitle={quiz?.subtitle} />
      {quiz?.content.map((content: Content, id: Content['id']) => (
        <QuestionsBlock quizItem={content} key={id} />
      ))}
    </div>
  )
}

export default App
