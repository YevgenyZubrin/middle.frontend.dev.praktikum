import { nanoid } from 'nanoid'

export interface IMessagesPerDay {
  text: string
  time: string
  unread: boolean
  type: string
}

export interface IMessages {
  date: string
  messagesPerDay: IMessagesPerDay[]
}

export interface IChatList {
  id: string
  nickname: string
  lastMessage: string
  lastMessageTime: string
  unreadMessages: number
  imgUrl: string
  choosed: boolean
  messages: IMessages[]
}

const chatList: IChatList[] = [
  {
    id: nanoid(),
    nickname: 'Юля',
    lastMessage: 'Привет',
    lastMessageTime: '10:34',
    unreadMessages: 7,
    imgUrl: '',
    choosed: false,
    messages: [],
  },
  {
    id: nanoid(),
    nickname: 'Лена',
    lastMessage: 'Как дела?',
    lastMessageTime: '19:28',
    unreadMessages: 0,
    imgUrl: '',
    choosed: false,
    messages: [],
  },
  {
    id: nanoid(),
    nickname: 'Юля',
    lastMessage: 'Хорошо',
    lastMessageTime: '17:41',
    unreadMessages: 0,
    imgUrl: '',
    choosed: false,
    messages: [],
  },
  {
    id: nanoid(),
    nickname: 'Анна',
    lastMessage: 'и как ты себе это представляешь?',
    lastMessageTime: '23:48',
    unreadMessages: 1,
    imgUrl: '',
    choosed: true,
    messages: [
      {
        date: '19 марта',
        messagesPerDay: [
          {
            text: 'hello',
            time: '21:34',
            unread: false,
            type: 'in',
          },
          {
            text: 'hello bro',
            time: '21:36',
            unread: false,
            type: 'out',
          },
          {
            text: 'how are u?',
            time: '21:37',
            unread: false,
            type: 'in',
          },
          {
            text: 'not bad, u?',
            time: '21:41',
            unread: false,
            type: 'out',
          },
        ],
      },
      {
        date: '24 марта',
        messagesPerDay: [
          {
            text: 'как ты думаешь завтра будет дождь?',
            time: '12:06',
            unread: false,
            type: 'in',
          },
          {
            text: 'да я то откуда знаю, я же не метеоролог',
            time: '12:16',
            unread: false,
            type: 'out',
          },
          {
            text: 'ну стань им)',
            time: '12:37',
            unread: false,
            type: 'in',
          },
          {
            text: 'и как ты себе это представляешь?',
            time: '13:01',
            unread: true,
            type: 'out',
          },
        ],
      },
    ],
  },
  {
    id: nanoid(),
    nickname: 'Егор',
    lastMessage: 'Пока',
    lastMessageTime: '13:57',
    unreadMessages: 0,
    imgUrl: '',
    choosed: false,
    messages: [],
  },
  {
    id: nanoid(),
    nickname: 'Анна',
    lastMessage: 'Пока',
    lastMessageTime: 'пн',
    unreadMessages: 9,
    imgUrl: '',
    choosed: false,
    messages: [],
  },
  {
    id: nanoid(),
    nickname: 'Анна',
    lastMessage: 'Пока',
    lastMessageTime: 'вт',
    unreadMessages: 6,
    imgUrl: '',
    choosed: false,
    messages: [],
  },
  {
    id: nanoid(),
    nickname: 'Света',
    lastMessage: 'Нет',
    lastMessageTime: 'ср',
    unreadMessages: 2,
    imgUrl: '',
    choosed: false,
    messages: [],
  },
  {
    id: nanoid(),
    nickname: 'Петр',
    lastMessage: 'Плохо',
    lastMessageTime: 'чт',
    unreadMessages: 2,
    imgUrl: '',
    choosed: false,
    messages: [],
  },
  {
    id: nanoid(),
    nickname: 'Петр',
    lastMessage: 'Ок',
    lastMessageTime: 'пт',
    unreadMessages: 1,
    imgUrl: '',
    choosed: false,
    messages: [],
  },
  {
    id: nanoid(),
    nickname: 'Анна',
    lastMessage: 'Лол',
    lastMessageTime: '1 Мая 2023',
    unreadMessages: 3,
    imgUrl: '',
    choosed: false,
    messages: [],
  },
  {
    id: nanoid(),
    nickname: 'Юля',
    lastMessage: 'Привет',
    lastMessageTime: '2 Мая 2023',
    unreadMessages: 3,
    imgUrl: '',
    choosed: false,
    messages: [],
  },
  {
    id: nanoid(),
    nickname: 'Света',
    lastMessage: 'Плохо',
    lastMessageTime: '3 Мая 2023',
    unreadMessages: 5,
    imgUrl: '',
    choosed: false,
    messages: [],
  },
  {
    id: nanoid(),
    nickname: 'Коля',
    lastMessage: 'Увидимся',
    lastMessageTime: '4 Мая 2023',
    unreadMessages: 8,
    imgUrl: '',
    choosed: false,
    messages: [],
  },
  {
    id: nanoid(),
    nickname: 'Дима',
    lastMessage: 'Плохо',
    lastMessageTime: '5 Мая 2023',
    unreadMessages: 2,
    imgUrl: '',
    choosed: false,
    messages: [],
  },
]

export default chatList
