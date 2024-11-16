import Avatar from './Avatar'
import BirdAvatar from './BirdAvatar'
import BotAvatar from './BotAvatar'
import CandyAvatar from './CandyAvatar'
import LeafAvatar from './LeafAvatar'
import SkullAvatar from './SkullAvatar'
import UserAvatar from './UserAvatar'

export default Object.assign(Avatar, {
  User: UserAvatar,
  Bot: BotAvatar,
  Skull: SkullAvatar,
  Candy: CandyAvatar,
  Leaf: LeafAvatar,
  Bird: BirdAvatar
})