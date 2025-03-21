import { useState, useRef, useEffect } from 'react'
import { Send, Sparkles, Paperclip, Mic, ImagePlus } from 'lucide-react'

function ChatInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState('')
  const [focused, setFocused] = useState(false)
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
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Message UniChat AI..."
          disabled={disabled}
          rows={1}
          className="textarea textarea-bordered w-full pr-14 pl-16 min-h-[52px] max-h-[120px] resize-none rounded-full"
        />

        {/* Send button */}
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className={`
            absolute right-1 top-1 btn btn-circle ${message.trim() ? 'btn-primary' : 'btn-ghost text-base-content/50'}
            transition-all duration-200 ease-in-out
          `}
        >
          <Send size={18} />
        </button>

        {/* Assistant options button */}
        {!message.trim() && (
          <button 
            type="button"
            className="absolute right-1 top-1 btn btn-circle btn-ghost hover:bg-primary/10"
            title="AI Assistant options"
          >
            <Sparkles size={18} className="text-primary" />
          </button>
        )}
      </div>

      {/* Help text */}
      {focused && !message.trim() && (
        <div className="absolute bottom-full mb-2 text-xs text-base-content/60 w-full text-center">
          Press Enter to send, Shift+Enter for new line
        </div>
      )}
    </form>
  )
}

export default ChatInput
