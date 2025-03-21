import { useState, useRef, useEffect } from 'react'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import { Bot, Sparkles, ImagePlus, Paperclip, Mic, Info } from 'lucide-react'

function ChatContainer() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = (message) => {
    if (!message.trim()) return

    // Add user message to chat
    const userMessage = {
      id: Date.now(),
      content: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    }

    setMessages([...messages, userMessage])
    setLoading(true)

    // This would be where you'd integrate with LLM APIs
    // For now, just simulate a response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        content: `This is a placeholder response to: "${message}"`,
        sender: 'assistant',
        timestamp: new Date().toISOString()
      }

      setMessages((prevMessages) => [...prevMessages, aiResponse])
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Chat header with current conversation info */}
      <div className="bg-base-200/50 rounded-t-lg p-3 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bot size={18} className="text-primary" />
          <span className="font-medium">New Conversation</span>
        </div>
        <button className="btn btn-ghost btn-sm btn-circle">
          <Info size={16} />
        </button>
      </div>
      
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-4 px-2 md:px-4">
        {messages.length === 0 ? (
          <div className="hero h-full">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot size={40} className="text-primary" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold">Welcome to UniChat AI</h1>
                <p className="py-4 text-base-content/70">
                  Start a conversation with UniChat AI. Ask questions, request creative content,
                  or get help with tasks.
                </p>
                <div className="flex flex-wrap gap-2 justify-center mt-2">
                  <SuggestionButton
                    icon={<Sparkles size={16} />}
                    text="Explain quantum computing"
                    onClick={() => handleSendMessage("Explain quantum computing in simple terms")}
                  />
                  <SuggestionButton
                    icon={<Bot size={16} />}
                    text="Write a short story"
                    onClick={() => handleSendMessage("Write a short story about a robot discovering emotions")}
                  />
                  <SuggestionButton
                    icon={<Sparkles size={16} />}
                    text="Help with coding"
                    onClick={() => handleSendMessage("Help me understand React hooks")}
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => <ChatMessage key={message.id} message={message} />)}
            {loading && (
              <div className="chat chat-start">
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot size={20} className="text-primary" />
                  </div>
                </div>
                <div className="chat-bubble bg-base-200 text-base-content p-3 flex items-center min-h-12">
                  <span className="loading loading-dots loading-sm mx-4"></span>
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-base-300 py-3 px-4 bg-base-100 rounded-b-lg shadow-sm">
        <div className="relative">
          <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
          <div className="absolute bottom-3 left-3 flex gap-2">
            <button className="btn btn-sm btn-circle btn-ghost">
              <Paperclip size={16} className="text-base-content/70" />
            </button>
            <button className="btn btn-sm btn-circle btn-ghost">
              <ImagePlus size={16} className="text-base-content/70" />
            </button>
            <button className="btn btn-sm btn-circle btn-ghost">
              <Mic size={16} className="text-base-content/70" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Suggestion button component for empty state
const SuggestionButton = ({ icon, text, onClick }) => (
  <button 
    onClick={onClick}
    className="btn btn-outline btn-sm normal-case rounded-full gap-2 hover:bg-primary hover:text-primary-content"
  >
    {icon}
    {text}
  </button>
)

export default ChatContainer
