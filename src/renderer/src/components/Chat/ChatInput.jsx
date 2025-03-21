import { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Paperclip,
  Mic,
  Image,
  ChevronUp
} from 'lucide-react';

function ChatInput({ onSendMessage, disabled }) {
  const [message, setMessage] = useState('');
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim() || disabled) return;

    onSendMessage(message);
    setMessage('');

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e) => {
    // Submit on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-base-100 border-t border-base-200 p-3">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto relative bg-base-100 rounded-lg shadow-sm border border-base-200"
      >
        <div className="flex items-end">
          {/* Action buttons */}
          <div className="flex px-3 py-2 gap-1">
            <button
              type="button"
              className="btn btn-ghost btn-sm btn-circle text-base-content/70 hover:text-base-content"
              title="Attach file"
            >
              <Paperclip size={18} />
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm btn-circle text-base-content/70 hover:text-base-content"
              title="Upload image"
            >
              <Image size={18} />
            </button>
          </div>

          {/* Textarea */}
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
            className="flex-1 py-2 pr-12 resize-none border-0 bg-transparent focus:ring-0 focus:outline-none min-h-[40px] max-h-[120px]"
          />

          {/* Send button */}
          <div className="px-3 py-2">
            <button
              type="submit"
              disabled={!message.trim() || disabled}
              className={`
                btn btn-sm btn-circle ${message.trim() ? 'btn-primary' : 'btn-ghost text-base-content/50'}
              `}
              title="Send message"
            >
              {message.trim() ? <Send size={16} /> : <Sparkles size={16} className="text-primary" />}
            </button>
          </div>
        </div>

        {/* Helper text */}
        {focused && (
          <div className="absolute -top-6 right-0 text-xs text-base-content/60">
            Press Enter to send, Shift+Enter for new line
          </div>
        )}
      </form>
    </div>
  );
}

export default ChatInput;
