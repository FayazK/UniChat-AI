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
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
            <Bot size={40} className="mb-2" />
            <h3 className="text-lg font-medium mb-1">Start a new conversation</h3>
            <p>Send a message to begin chatting</p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => <ChatMessage key={message.id} message={message} />)}
            {loading && (
              <div className="flex py-2">
                <div className="w-8 h-8 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                  <Bot size={18} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex space-x-2 pt-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 dark:border-gray-700 py-3 px-6 bg-white dark:bg-gray-800">
        <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
      </div>
    </div>
  )
}

export default ChatContainer
