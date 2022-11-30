import axios, { AxiosResponse } from 'axios'
import express, { Request, Response } from 'express'
import * as dotenv from 'dotenv'
import { QuizData } from './interfaces'

dotenv.config()

const PORT = 8000
const app = express()

app.get('/quiz-item', async (req: Request, res: Response) => {
  try {
    const response: AxiosResponse = await axios.get(
      process.env.QUIZ_ITEM_API_URL!,
      {
        headers: {
          'X-Cassandra-Token': process.env.ASTRA_DB_APPLICATION_TOKEN,
          accept: 'application/json',
          'Accept-Encoding': 'null',
        },
      }
    )
    if (response.status === 200) {
      const quizItem: QuizData = await response.data.data[
        '514745f3-a7d5-4006-a814-cbea0fb99540'
      ]
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
      res.send(quizItem)
    }
  } catch (error) {
    console.error(error)
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
