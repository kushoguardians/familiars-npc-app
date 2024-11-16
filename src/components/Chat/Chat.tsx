import {memo, useEffect, useRef} from 'react'

import Avatar from '../Avatar'
import Message from '../Message'
import {TMessage} from '../Message/Message'
import { FamiliarData } from '@/lib/store'

type Props = {
  messages: TMessage[],
  familiar: FamiliarData
}
const Chat = ({messages, familiar}: Props) => {
  const scrollableContentRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (scrollableContentRef.current) {
      scrollableContentRef.current.scrollTop = scrollableContentRef.current.scrollHeight
    }
  }, [messages])

  console.log("@@@messages: ",messages)

  const botAvatar = (familiarName: string) => {
    if (familiarName === "Sundo") {
      return <Avatar.Skull/>
    }

    if (familiarName === "Duwende") {
      return <Avatar.Candy/>
    }

    if (familiarName === "Adarna") {
      return <Avatar.Bird/>
    }

    if (familiarName === "Diwata") {
      return <Avatar.Leaf/>
    }
  }

  return (
    <main
      ref={scrollableContentRef}
      className="flex flex-1 flex-col gap-4 overflow-y-scroll bg-zinc-50 p-5 dark:bg-zinc-950"
    >
      {
      messages?.map((message) => (
        <Message key={message.id} sender={message.type}>
          
          {message.type === 'AI' ? botAvatar(familiar.name) : null}

          <Message.Balloon
            sender={message.type}
            message={message.text}
            date={message.createdAt}
          />
          {message.type === 'USER' ? <Avatar.User /> : null}
        </Message>
      ))
      }
    </main>
  )
}

export default memo(Chat)