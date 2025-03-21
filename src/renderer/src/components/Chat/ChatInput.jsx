import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'

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
    <form onSubmit={handleSubmit} className="join w-full">
      <div className="join-item flex-1 relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message UniChat AI..."
          disabled={disabled}
          rows={1}
          className="textarea textarea-bordered join-item w-full min-h-[48px] max-h-[120px] resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={!message.trim() || disabled}
        className="btn btn-primary join-item"
      >
        <Send size={18} />
      </button>
    </form>
  )
}

export default ChatInput
