"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  type: "user" | "support"
  text: string
}

const CHAT_FLOW = [
  {
    question: "Why is my payment still pending?",
    answer: "Your payment is delayed because your account/payment information was recently changed and is currently under verification review.",
  },
  {
    question: "My payment should arrive within 8 to 10 days. Why is it delayed?",
    answer: "Because your account details were updated, additional verification was automatically applied which increased the processing time.",
  },
  {
    question: "Did my payment fail?",
    answer: "No, your payment has not failed. It is currently under verification and waiting for approval.",
  },
  {
    question: "Is there any issue with my Payoneer account?",
    answer: "No issue has been detected with your Payoneer account at this time.",
  },
  {
    question: "How much more time will it take?",
    answer: "The verification and payment process may take around 3 to 4 more business days.",
  },
  {
    question: "Can I cancel my withdrawal?",
    answer: "No, the withdrawal cannot be canceled because it is already under processing.",
  },
  {
    question: "Will my balance return if payment fails?",
    answer: "Yes, if the withdrawal is rejected, the amount will automatically return to your available balance.",
  },
  {
    question: "Is my account secure?",
    answer: "Yes, your account is completely secure and protected.",
  },
  {
    question: "Can weekends delay the payment?",
    answer: "Yes, weekends and non-business days are not included in the processing period.",
  },
  {
    question: "Will future withdrawals also be delayed?",
    answer: "No, once verification is completed, future withdrawals should process normally.",
  },
  {
    question: "Can I change my payment method again?",
    answer: "We recommend waiting until the current withdrawal is completed before changing payment methods.",
  },
  {
    question: "What happens after verification?",
    answer: "After approval, your withdrawal will move to the payment release stage.",
  },
  {
    question: "Will I receive a confirmation email?",
    answer: "Yes, a confirmation email will be sent once the payment is released.",
  },
  {
    question: "Can my withdrawal amount change?",
    answer: "No, your approved withdrawal amount will remain the same.",
  },
  {
    question: "Can support manually speed up my payment?",
    answer: "No, payments under verification review cannot be manually prioritized.",
  },
  {
    question: "What should I do now?",
    answer: "Please wait until the verification process is completed.",
  },
  {
    question: "Why was I not informed earlier?",
    answer: "The review was automatically triggered after the account update.",
  },
  {
    question: "What type of verification is being processed?",
    answer: "Your payment account and withdrawal details are being reviewed by the finance department.",
  },
  {
    question: "Has my payment already been processed?",
    answer: "Your payment request has already been submitted and is under final review.",
  },
  {
    question: "Can I upload documents for faster approval?",
    answer: "If additional documents are required, support will contact you by email.",
  },
]

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "support",
      text: "Hello! Welcome to our Live Support. I'm here to help you with any questions about your payments or account. Feel free to ask anything!",
    },
  ])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatBodyRef = useRef<HTMLDivElement>(null)
  const mutationObserverRef = useRef<MutationObserver | null>(null)

  // Auto-scroll to bottom using MutationObserver
  useEffect(() => {
    const chatBody = chatBodyRef.current
    if (!chatBody) return

    const scrollToBottom = () => {
      chatBody.scrollTop = chatBody.scrollHeight
    }

    // Initial scroll
    scrollToBottom()

    // Create MutationObserver to watch for new messages
    mutationObserverRef.current = new MutationObserver(() => {
      scrollToBottom()
    })

    mutationObserverRef.current.observe(chatBody, {
      childList: true,
      subtree: true,
    })

    return () => {
      if (mutationObserverRef.current) {
        mutationObserverRef.current.disconnect()
      }
    }
  }, [isOpen])

  const findAnswer = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase()
    for (const flow of CHAT_FLOW) {
      if (flow.question.toLowerCase().includes(lowerMessage) || lowerMessage.includes(flow.question.toLowerCase().split(" ")[0])) {
        return flow.answer
      }
    }
    return "Thank you for your question. Please contact our support team at support@exoclick.com for further assistance."
  }

  const handleSendMessage = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      text: input,
    }

    const answer = findAnswer(input)
    const supportMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: "support",
      text: answer,
    }

    setMessages([...messages, userMessage, supportMessage])
    setInput("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Icon */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 bg-blue-500 hover:bg-blue-600 shadow-lg z-40"
          aria-label="Open live chat"
        >
          <MessageCircle size={24} className="text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] flex flex-col bg-white shadow-xl z-50 rounded-lg overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-blue-500 text-white p-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg">Live Support</h3>
              <p className="text-xs text-blue-100">We&apos;re here to help</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-blue-600"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Messages Area */}
          <div
            ref={chatBodyRef}
            className="live-chat-body flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 scroll-smooth"
            style={{
              WebkitOverflowScrolling: "touch",
              overflowY: "auto",
              overflowX: "hidden",
              scrollBehavior: "smooth",
              height: "100%",
              maxHeight: "calc(500px - 120px)",
            }}
          >
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.type === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4 flex gap-2">
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 text-sm"
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Send size={18} />
            </Button>
          </div>
        </Card>
      )}
    </>
  )
}
