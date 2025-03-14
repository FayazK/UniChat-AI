import { useState, useRef, useEffect } from 'react'
import { Send, PaperclipIcon, Mic } from 'lucide-react'

function ChatInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef(null)

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [message])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!message.trim() || disabled) return

    onSendMessage(message)
    setMessage('')
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e) => {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end">
      <textarea
        ref={textareaRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Message UniChat AI..."
        disabled={disabled}
        rows={1}
        className="flex-1 py-2 px-3 bg-transparent border-none 
                   focus:outline-none focus:ring-0
                   text-gray-800 dark:text-gray-200
                   resize-none min-h-[24px] max-h-[120px]"
      />
      <div className="flex items-center">
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700
                     text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  )
}

export default ChatInput
