import { useEffect, useState, createRef } from 'react'
import Title from './components/Title'
import { Content, QuizData } from '../interfaces'
import QuestionsBlock from './components/QuestionsBlock'
import AnswerBlock from './components/AnswerBlock'
import CustomLoader from './components/CustomLoader'

const App = () => {
  const [quiz, setQuiz] = useState<QuizData | null>()
  const [chosenAnswerItems, setChosenAnswerItems] = useState<string[]>([])
  const [unansweredQuestionIds, setUnansweredQuestionIds] = useState<
    number[] | undefined
  >([])
  const [showAnswer, setShowAnswer] = useState<Boolean>(false)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL!)
      const json = await response.json()
      setQuiz(json)
      setLoading(false)
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

  type ReduceType = {
    id?: {}
  }

  const refs = unansweredQuestionIds?.reduce<ReduceType | any>((acc, id) => {
    acc[id as unknown as keyof ReduceType] = createRef<HTMLDivElement | null>()
    return acc
  }, {})

  const answerRef = createRef<HTMLDivElement | null>()

  useEffect(() => {
    if (chosenAnswerItems.length > 0 && unansweredQuestionIds) {
      if (unansweredQuestionIds.length <= 0 && chosenAnswerItems.length >= 1) {
        setShowAnswer(true)
        answerRef?.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
      const highestId = Math.min(...unansweredQuestionIds)
      refs[highestId]?.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [
    unansweredQuestionIds,
    chosenAnswerItems.length,
    showAnswer,
    refs,
    answerRef,
  ])

  return (
    <div className="App">
      {loading ? (
        quiz ? (
          quiz?.content.map((question) => <CustomLoader key={question.id} />)
        ) : (
          <CustomLoader />
        )
      ) : (
        <>
          <Title title={quiz?.title} subtitle={quiz?.subtitle} />
          {refs &&
            quiz?.content.map((content: Content) => (
              <QuestionsBlock
                key={content.id}
                quizItem={content}
                chosenAnswerItems={chosenAnswerItems}
                setChosenAnswerItems={setChosenAnswerItems}
                unansweredQuestionIds={unansweredQuestionIds}
                setUnansweredQuestionIds={setUnansweredQuestionIds}
                ref={refs[content.id]}
              />
            ))}
          {answerRef && showAnswer && (
            <AnswerBlock
              answerOptions={quiz?.answers}
              chosenAnswerItems={chosenAnswerItems}
              ref={answerRef}
            />
          )}
        </>
      )}
    </div>
  )
}

export default App
