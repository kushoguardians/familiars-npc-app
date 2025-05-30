import {User} from 'lucide-react'

import Avatar from './Avatar'

const BotAvatar = () => {
  return (
    <Avatar>
      <User className="h-7 w-7 text-zinc-600 dark:text-zinc-200" />
    </Avatar>
  )
}

export default BotAvatar