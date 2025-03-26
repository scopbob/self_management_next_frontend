"use client";

import NextLink from "next/link";
import { PasswordInput } from "@/components/ui/password-input";
import { Button, IconButton, CheckboxCard, Heading, Progress, HStack, Input, Text, VStack, Field, Fieldset, Link } from "@chakra-ui/react";
import { BsPersonWalking } from "react-icons/bs";
import { LuAlarmClock } from "react-icons/lu";
import { useEffect, useState } from "react";
import { TodoState } from "@/lib/definitions";

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
  const proportion = progress / whole;
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

export default function TodoCard(todo: TodoState) {
  const remaining = useTime(todo.due, todo.start);
  return (
    <CheckboxCard.Root value={String(todo.id)} w="full" p={6} boxShadow="xl" borderRadius="lg">
      <CheckboxCard.HiddenInput />
      <CheckboxCard.Control>
        <CheckboxCard.Indicator />
        <CheckboxCard.Content>
          <CheckboxCard.Label>
            <Heading>{todo.title}</Heading>
          </CheckboxCard.Label>
          <CheckboxCard.Description>{remaining !== null && remaining?.timer} </CheckboxCard.Description>
          <HStack w="full">
            <LuAlarmClock size="20" />
            {remaining !== null && (
              <Progress.Root w="full" value={remaining.dead ? 100 : remaining.proportion} striped animated={!remaining.dead} colorPalette={remaining.dead ? "red" : "gray"}>
                <Progress.Track>
                  <Progress.Range />
                </Progress.Track>
              </Progress.Root>
            )}
          </HStack>
          <HStack w="full">
            <BsPersonWalking size="20" />
            <Progress.Root w="full" value={todo.progress} striped colorPalette="green">
              <Progress.Track>
                <Progress.Range />
              </Progress.Track>
            </Progress.Root>
          </HStack>
        </CheckboxCard.Content>
      </CheckboxCard.Control>
    </CheckboxCard.Root>
  );
}
