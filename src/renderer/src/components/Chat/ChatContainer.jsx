import { useState, useRef, useEffect } from 'react'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import { Bot } from 'lucide-react'

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
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto py-4 px-6">
        {messages.length === 0 ? (
          <div className="hero h-full">
            <div className="hero-content text-center">
              <div className="max-w-md">
                <div className="flex justify-center mb-4">
                  <Bot size={64} className="text-primary" />
                </div>
                <h1 className="text-3xl font-bold">Start a conversation</h1>
                <p className="py-6">
                  Send a message to begin chatting with UniChat AI. 
                  Ask anything or request creative content.
                </p>
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
                <div className="chat-bubble bg-base-200 text-base-content p-0 flex items-center">
                  <span className="loading loading-dots loading-sm mx-4"></span>
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-base-300 py-3 px-6 bg-base-100">
        <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
      </div>
    </div>
  )
}

export default ChatContainer
