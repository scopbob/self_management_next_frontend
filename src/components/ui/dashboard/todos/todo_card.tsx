"use client";

import NextLink from "next/link";
import { PasswordInput } from "@/components/ui/password-input";
import { Button, IconButton, Checkbox, Card, Heading, Progress, HStack, Input, Text, VStack, Field, Fieldset, Link } from "@chakra-ui/react";
import { BsPersonWalking } from "react-icons/bs";
import { LuAlarmClock } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { Todo } from "@/lib/definitions";

function calcRemainingTime(due_str: string) {
  const due = new Date(due_str);
  const now = new Date();
  var dead = false;
  if (due.getTime() < now.getTime()) {
    dead = true;
  }
  const rest = Math.abs(due.getTime() - now.getTime());
  const mins = Math.floor(rest / 1000 / 60) % 60;
  const hours = Math.floor(rest / 1000 / 60 / 60) % 24;
  const days = Math.floor(rest / 1000 / 60 / 60 / 24) % 7;
  const weeks = Math.floor(rest / 1000 / 60 / 60 / 24 / 7);
  const remaining = { dead, weeks, days, hours, mins };
  return remaining;
}

function calcProportion(start_str: string, due_str: string) {
  const start = new Date(start_str);
  const due = new Date(due_str);
  const now = new Date();
  const progress = now.getTime() - start.getTime();
  const whole = due.getTime() - start.getTime();
  const proportion = (progress / whole) * 100;
  return proportion;
}

const useTime = (due_str: string, start_str: string) => {
  const [remaining, setTime] = useState<{ timer: string; proportion: number; dead: boolean } | null>(null);
  const getRemainingTime = (due_str: string, start_str: string) => {
    const proportion = calcProportion(start_str, due_str);
    let timer = "";
    let dead = false;
    if (proportion > 0) {
      //display remaining time
      const counter = calcRemainingTime(due_str);
      const time = `${counter.weeks}週間${counter.days}日${counter.hours}時間${counter.mins}分`;

      //締め切り切れならば
      if (counter.dead) {
        timer = "期限から" + time + "経過";
        dead = true;
      }
      //締め切り内
      else {
        timer = "期限まで残り" + time;
      }
    } else {
      timer = "まだ開始されていないタスク";
    }
    setTime({ timer: timer, proportion: proportion, dead: dead });
  };
  useEffect(() => {
    getRemainingTime(due_str, start_str);
    const intervalId = setInterval(function () {
      getRemainingTime(due_str, start_str);
    }, 1000 * 60);
    return () => clearInterval(intervalId);
  }, []);
  return remaining;
};

export default function TodoCard({ todo }: { todo: Todo }) {
  const remaining = useTime(todo.due, todo.start);
  const priorityColors: Record<string, { bg: string; border: string }> = {
    Hi: { bg: "red.50", border: "red.500" }, // high
    Md: { bg: "yellow.50", border: "yellow.500" }, // middle
    Lo: { bg: "blue.50", border: "blue.500" }, // low
  };
  const { bg, border } = priorityColors[todo.priority];
  return (
    <Card.Root w="full" px="6" py="3" size="sm" bg={bg} boxShadow="xl" borderRadius="lg" borderColor={border} borderWidth="2px">
      <Card.Header w="full" px="0" py="2">
        <HStack w="full" justify="start">
          <Checkbox.Root>
            <Checkbox.HiddenInput />
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <Checkbox.Label />
          </Checkbox.Root>
          <Link asChild>
            <NextLink href={`todos/${String(todo.id)}`}>
              <Heading>{todo.title}</Heading>
            </NextLink>
          </Link>
          <NextLink href={`todos/${String(todo.id)}/edit`}>
            <IconButton aria-label="edit" colorPalette="gray" rounded="full" size="xs">
              <MdEdit />
            </IconButton>
          </NextLink>
          {remaining !== null && (
            <Text marginLeft="auto" color={remaining.dead ? "red" : "gray"} textDecorationLine={remaining.dead ? "underline" : "none"}>
              {remaining?.timer}
            </Text>
          )}
        </HStack>
      </Card.Header>
      <VStack w="full">
        <HStack w="full">
          <LuAlarmClock size="20" />
          {remaining !== null && (
            <Progress.Root w="full" value={remaining.proportion > 0 ? (remaining.dead ? 100 : remaining.proportion) : 0} borderWidth="2px" borderRadius="full" striped animated={!remaining.dead} colorPalette={remaining.dead ? "red" : "blue"}>
              <Progress.Track borderRadius="full">
                <Progress.Range />
              </Progress.Track>
            </Progress.Root>
          )}
        </HStack>
        <HStack w="full">
          <BsPersonWalking size="20" />
          <Progress.Root borderWidth="2px" borderRadius="full" w="full" value={todo.progress} striped colorPalette="green">
            <Progress.Track borderRadius="full">
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
        </HStack>
      </VStack>
    </Card.Root>
  );
}
