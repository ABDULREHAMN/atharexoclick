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

const FAQ_DATA = [
  {
    user: "Hello, my payment is still pending. Can you tell me why it has not been released yet?",
    support: "Your payment is currently delayed because your account/payment information was recently changed. Due to this update, your account entered a verification process. Once verification is completed, your payment will be released automatically.",
  },
  {
    user: "My withdrawal was supposed to be released within 8 to 10 business days. It has already been more than 20 days now.",
    support: "We understand your concern. Because your account details were modified, the withdrawal was automatically placed under additional security verification. This process can sometimes increase the processing time.",
  },
  {
    user: "What type of verification is being processed?",
    support: "Your payment account and withdrawal details are currently being reviewed by the finance and security department to confirm account ownership and payment safety.",
  },
  {
    user: "Did my payment fail or get rejected?",
    support: "No, your payment has not failed or been rejected. It is still under verification review and waiting for final approval.",
  },
  {
    user: "Is there any issue with my Payoneer account?",
    support: "At the moment, no issue has been detected with your Payoneer account. The delay is related only to the recent account changes and verification checks.",
  },
  {
    user: "Can you tell me exactly when I will receive my payment?",
    support: "The current estimated processing time is around 3 to 4 additional business days after verification is completed.",
  },
  {
    user: "Why was I not informed earlier about this delay?",
    support: "The verification review was triggered automatically after the account update. In some cases, the review process takes longer than expected before a notification is generated.",
  },
  {
    user: "Can I cancel this withdrawal and request a new one?",
    support: "At the moment, the withdrawal cannot be canceled because it is already under processing and verification review.",
  },
  {
    user: "Will my available balance return if the withdrawal fails?",
    support: "Yes, if the withdrawal is not approved, the amount will automatically return to your available balance.",
  },
  {
    user: "Is my account safe?",
    support: "Yes, your account is completely secure. This verification process is a normal security procedure for updated payment accounts.",
  },
  {
    user: "Can I submit any documents to speed up the process?",
    support: "If additional verification documents are required, our finance department will contact you directly through your registered email.",
  },
  {
    user: "Has my payment already been processed from your side?",
    support: "Your payment request has been submitted successfully and is currently waiting for final verification approval.",
  },
  {
    user: "Can weekends increase the processing time?",
    support: "Yes, weekends and non-business days are not included in the processing period, which may increase the overall waiting time.",
  },
  {
    user: "Will future withdrawals also be delayed?",
    support: "No, once your account verification is completed successfully, future withdrawals should process normally.",
  },
  {
    user: "Can I change my payment method again right now?",
    support: "We recommend not changing your payment method again until the current verification and withdrawal process is completed.",
  },
  {
    user: "What happens after verification is approved?",
    support: "Once verification is approved, your withdrawal will move to the payment processing stage and then be released to your payment account.",
  },
  {
    user: "Will I receive a confirmation email after release?",
    support: "Yes, you will receive a confirmation notification once the payment has been successfully released.",
  },
  {
    user: "Is there any chance my withdrawal amount changes?",
    support: "No, your approved withdrawal amount will remain the same unless transaction or payment provider fees apply.",
  },
  {
    user: "Can you prioritize my payment manually?",
    support: "Unfortunately, payments under verification review cannot be manually prioritized until the review process is completed.",
  },
  {
    user: "So what should I do now?",
    support: "At the moment, you only need to wait for the verification process to complete. According to the current status, your payment should be processed within the next 3 to 4 business days.",
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
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const findAnswer = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase()
    for (const faq of FAQ_DATA) {
      if (faq.user.toLowerCase().includes(lowerMessage) || lowerMessage.includes(faq.user.toLowerCase().split(" ")[0])) {
        return faq.support
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
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] flex flex-col bg-white shadow-xl z-50 rounded-lg overflow-hidden border border-gray-200">
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
            ref={scrollAreaRef}
            className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-4 scroll-smooth"
            style={{
              WebkitOverflowScrolling: "touch",
              overflowY: "auto",
              overflowX: "hidden",
              scrollBehavior: "smooth",
              height: "100%",
              maxHeight: "calc(600px - 120px)",
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
