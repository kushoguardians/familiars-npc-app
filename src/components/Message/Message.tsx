import {cn} from '@/lib/utils'

export type TMessage = {
  id: string
  from: string,
  to: string,
  text: string
  createdAt: Date
  type: string
}

type MessageProps = {
  sender: string
  children: React.ReactNode
}

const Message = ({sender, children}: MessageProps) => {
  return (
    <div className={cn('flex flex-row items-center gap-3 ', sender === 'USER' && 'justify-end')}>
      {children}
    </div>
  )
}

export default Message