import { useState } from 'react'
import { Copy, Check, Bot, User } from 'lucide-react'

function ChatMessage({ message }) {
  const [copied, setCopied] = useState(false)

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase()
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isUser = message.sender === 'user'

  return (
    <div className={`chat ${isUser ? 'chat-end' : 'chat-start'}`}>
      {/* Avatar */}
      <div className="chat-image avatar">
        <div className={`w-10 rounded-full ${isUser ? 'bg-primary/10' : 'bg-secondary/10'} flex items-center justify-center`}>
          {isUser ? (
            <User size={20} className="text-primary" />
          ) : (
            <Bot size={20} className="text-secondary" />
          )}
        </div>
      </div>

      {/* Message header */}
      <div className="chat-header">
        {isUser ? 'You' : 'UniChat AI'}
        <time className="text-xs opacity-50 ml-1">{formatTime(message.timestamp)}</time>
      </div>

      {/* Message content */}
      <div className={`chat-bubble ${isUser ? 'chat-bubble-primary' : 'bg-base-200 text-base-content'}`}>
        {message.content}
      </div>
      
      {/* Footer with copy button */}
      {!isUser && (
        <div className="chat-footer opacity-50">
          <button 
            onClick={copyToClipboard}
            className="btn btn-ghost btn-xs"
            title="Copy to clipboard"
          >
            {copied ? <Check size={12} className="mr-1" /> : <Copy size={12} className="mr-1" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  )
}

export default ChatMessage
