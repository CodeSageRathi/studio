"use client"

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Paperclip, Search, SendHorizonal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockChatContacts, mockMessages } from '@/lib/mock-data';
import type { ChatContact, Message } from '@/types';
import { aiChatbot } from '@/ai/flows/ai-chatbot';

export function ChatLayout() {
  const [contacts] = useState<ChatContact[]>(mockChatContacts);
  const [selectedContact, setSelectedContact] = useState<ChatContact>(contacts[0]);
  const [messages, setMessages] = useState<Message[]>(mockMessages[selectedContact.id] || []);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  
  useEffect(() => {
    setMessages(mockMessages[selectedContact.id] || []);
  }, [selectedContact]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'You',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSender: true,
    };

    setMessages(prev => [...prev, newMessage]);
    setInput('');
    
    if(selectedContact.isAi) {
      setIsLoading(true);
      const aiResponse = await aiChatbot({ query: input });
      const aiMessage: Message = {
        id: `msg-ai-${Date.now()}`,
        sender: selectedContact.name,
        content: aiResponse.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSender: false,
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }
  };


  return (
    <div className="flex h-[calc(100vh-10rem)] w-full rounded-xl border bg-card shadow-lg">
      <div className="w-1/3 border-r">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search contacts..." className="pl-10" />
          </div>
        </div>
        <ScrollArea className="h-[calc(100%-4.5rem)]">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={cn(
                'flex w-full items-center gap-3 p-4 text-left transition-colors hover:bg-accent/50',
                selectedContact.id === contact.id && 'bg-accent'
              )}
            >
              <Avatar>
                <AvatarImage src={contact.avatar} alt={contact.name} />
                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-semibold">{contact.name}</p>
                <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
              </div>
              <span className="text-xs text-muted-foreground">{contact.lastMessageTime}</span>
            </button>
          ))}
        </ScrollArea>
      </div>
      <div className="flex w-2/3 flex-col">
        <div className="flex items-center gap-3 p-4 border-b">
          <Avatar>
            <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
            <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold font-headline">{selectedContact.name}</h2>
        </div>
        <ScrollArea className="flex-1 p-6 bg-background/50">
          <div className="space-y-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn('flex items-end gap-3', message.isSender ? 'justify-end' : 'justify-start')}
              >
                {!message.isSender && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={selectedContact.avatar} />
                    <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-xs rounded-xl px-4 py-3 text-sm md:max-w-md lg:max-w-lg',
                    message.isSender
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary'
                  )}
                >
                  <p>{message.content}</p>
                  <p className={cn('mt-1 text-xs', message.isSender ? 'text-primary-foreground/70' : 'text-muted-foreground')}>{message.timestamp}</p>
                </div>
              </div>
            ))}
             {isLoading && (
              <div className="flex items-end gap-3 justify-start">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={selectedContact.avatar} />
                    <AvatarFallback>{selectedContact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="max-w-xs rounded-xl px-4 py-3 text-sm md:max-w-md lg:max-w-lg bg-secondary flex items-center gap-2">
                    <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-0"></span>
                    <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-150"></span>
                    <span className="h-2 w-2 bg-muted-foreground rounded-full animate-pulse delay-300"></span>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <div className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
              <SendHorizonal className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
