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
    <div className="flex items-start group">
      {/* Avatar */}
      <div
        className={`w-8 h-8 flex-shrink-0 rounded-full flex items-center justify-center mr-3
        ${isUser ? 'bg-blue-100 dark:bg-blue-900' : 'bg-indigo-100 dark:bg-indigo-900'}`}
      >
        {isUser ? (
          <User size={18} className="text-blue-600 dark:text-blue-400" />
        ) : (
          <Bot size={18} className="text-indigo-600 dark:text-indigo-400" />
        )}
      </div>

      {/* Message content */}
      <div className="flex-1">
        <div className="flex items-center">
          <div className="font-medium text-sm text-gray-700 dark:text-gray-300">
            {isUser ? 'You' : 'UniChat AI'}
          </div>
          <div className="ml-2 text-xs text-gray-500 dark:text-gray-400">
            {formatTime(message.timestamp)}
          </div>

          {!isUser && (
            <button
              onClick={copyToClipboard}
              className="ml-2 p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
              title="Copy to clipboard"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          )}
        </div>

        <div className="mt-1 text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words">
          {message.content}
        </div>
      </div>
    </div>
  )
}

export default ChatMessage
