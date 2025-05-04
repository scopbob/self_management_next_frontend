"use client";

import { useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Button, VStack, Input, Card, Group } from "@chakra-ui/react";
import { AiOutlineEnter } from "react-icons/ai";
import Image from "next/image";
import { createAvatar } from "@/lib/actions";

export default function Chat() {
  const { messages, input, append, handleInputChange, handleSubmit } = useChat();
  const startChat = () => {
    append({
      role: "user",
      content: "性格診断を始めてください。最初の質問を出してください。",
    });
  };
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // ← messages が更新されるたびにスクロール

  return (
    <VStack h="full" w="full" p={4}>
      <VStack w="full" p={4} overflowY="auto" flexGrow={1}>
        {messages.map((message) => (
          <Card.Root alignSelf={message.role === "user" ? "flex-end" : "flex-start"} bg={message.role === "user" ? "gray.200" : "white"} key={`${message.id}`} borderRadius="md" maxW="2xl">
            <Card.Body whiteSpace="pre-wrap">
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return <div key={`${message.id}-${i}`}>{part.text}</div>;
                  case "tool-invocation":
                    if (part.toolInvocation?.state === "result" && part.toolInvocation.result?.image) {
                      const image = part.toolInvocation.result.image;
                      if (image === "") return <div key={`${message.id}-${i}`}>画像が生成されませんでした。</div>;
                      return (
                        <Card.Root key={`${message.id}-${i}`} alignSelf="center" bg="gray.50" borderRadius="md" w="full" p={2} mt={2}>
                          <form action={createAvatar}>
                            <VStack align="center" justify="center" mb={2}>
                              <Image src={`data:image/png;base64,${image}`} width={256} height={256} alt="avatar" />
                              <input type="hidden" name="image" value={`data:image/png;base64,${image}`} />
                              <Button type="submit" w="full" maxW="1/2">
                                自分のアバターにする
                              </Button>
                            </VStack>
                          </form>
                        </Card.Root>
                      );
                    }
                }
              })}
            </Card.Body>
          </Card.Root>
        ))}
        <div ref={messagesEndRef} />
      </VStack>
      {messages.length === 0 ? (
        <Button onClick={startChat} colorScheme="blue">
          チャット診断を始める
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl ">
          <Group w="full">
            <Input w="full" value={input} placeholder="アバターを作成しましょう" onChange={handleInputChange} />
            <Button type="submit">
              <AiOutlineEnter />
            </Button>
          </Group>
        </form>
      )}
    </VStack>
  );
}
