import { useState } from 'react'
import { Copy, Check, Bot, User, ThumbsUp, ThumbsDown, Repeat } from 'lucide-react'

function ChatMessage({ message }) {
  const [copied, setCopied] = useState(false)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase()
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLike = () => {
    setLiked(!liked)
    if (disliked) setDisliked(false)
  }

  const handleDislike = () => {
    setDisliked(!disliked)
    if (liked) setLiked(false)
  }

  const isUser = message.sender === 'user'

  return (
    <div className={`chat ${isUser ? 'chat-end' : 'chat-start'} message-animation`}>
      {/* Avatar */}
      <div className="chat-image avatar">
        <div className={`w-10 rounded-full ${isUser ? 'bg-primary/10' : 'bg-base-200'} flex items-center justify-center`}>
          {isUser ? (
            <User size={18} className="text-primary" />
          ) : (
            <Bot size={18} className="text-primary" />
          )}
        </div>
      </div>

      {/* Message header */}
      <div className="chat-header mb-1">
        <span className="font-medium">{isUser ? 'You' : 'UniChat AI'}</span>
        <time className="text-xs opacity-50 ml-2">{formatTime(message.timestamp)}</time>
      </div>

      {/* Message content */}
      <div 
        className={`
          chat-bubble shadow-sm
          ${isUser 
            ? 'bg-primary text-primary-content' 
            : 'bg-base-200 text-base-content'
          }
        `}
      >
        {message.content}
      </div>
      
      {/* Footer with actions */}
      {!isUser && (
        <div className="chat-footer opacity-70 flex gap-1 mt-1">
          <button 
            onClick={copyToClipboard}
            className="btn btn-ghost btn-xs"
            title="Copy to clipboard"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span className="ml-1">{copied ? 'Copied' : 'Copy'}</span>
          </button>
          
          <div className="flex ml-2">
            <button 
              onClick={handleLike}
              className={`btn btn-ghost btn-xs rounded-r-none border-r border-base-300 ${liked ? 'text-success' : ''}`}
              title="This was helpful"
            >
              <ThumbsUp size={14} />
            </button>
            <button 
              onClick={handleDislike}
              className={`btn btn-ghost btn-xs rounded-l-none ${disliked ? 'text-error' : ''}`}
              title="This wasn't helpful"
            >
              <ThumbsDown size={14} />
            </button>
          </div>
          
          <button 
            className="btn btn-ghost btn-xs ml-2"
            title="Regenerate response"
          >
            <Repeat size={14} />
            <span className="ml-1">Regenerate</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default ChatMessage
