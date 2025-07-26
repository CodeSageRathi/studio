import { ChatLayout } from "@/components/chat/chat-layout";

export default function ChatPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Chat</h1>
        <p className="text-muted-foreground">
          Communicate with suppliers or get help from our AI assistant.
        </p>
      </div>
      <ChatLayout />
    </div>
  );
}
