"use client";

import NextLink from "next/link";
import { PasswordInput } from "@/components/ui/password-input";
import { Button, IconButton, Checkbox, Card, Heading, Progress, HStack, Input, Text, VStack, Field, Fieldset, Link, Box } from "@chakra-ui/react";
import { BsPersonWalking } from "react-icons/bs";
import { LuAlarmClock } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import { Category, Todo } from "@/lib/definitions";

function getLuminance(color: string): number {
  let rgb;
  // hex 形式か rgba 形式かを確認
  if (color.startsWith("#")) {
    rgb = hexToRgb(color);
  } else if (color.startsWith("rgba")) {
    rgb = rgbaToRgb(color);
  } else {
    return 0; // 対応していない色の場合
  }

  // RGBからリニアRGBを計算して、明るさを求める
  const { r, g, b } = rgb;
  const a = [r, g, b].map((x) => {
    x /= 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  });

  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#([0-9a-f]{6}|[0-9a-f]{3})$/i.exec(hex);
  if (!result) return { r: 0, g: 0, b: 0 };
  let r = parseInt(result[1].substr(0, 2), 16);
  let g = parseInt(result[1].substr(2, 2), 16);
  let b = parseInt(result[1].substr(4, 2), 16);
  return { r, g, b };
}

function rgbaToRgb(rgba: string): { r: number; g: number; b: number } {
  const result = /rgba?\((\d+), (\d+), (\d+)(?:, ([\d\.]+))?\)/.exec(rgba);
  if (!result) return { r: 0, g: 0, b: 0 };
  const r = parseInt(result[1], 10);
  const g = parseInt(result[2], 10);
  const b = parseInt(result[3], 10);
  return { r, g, b };
}

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
    const counter = calcRemainingTime(due_str);
    const time = `${counter.weeks}週間${counter.days}日${counter.hours}時間${counter.mins}分`;
    if (proportion > 0) {
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
      timer = `開始まで残り${time}`;
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

export default function TodoCard({ todo, category }: { todo: Todo; category?: Category }) {
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
          {category && (
            <Box bgColor={category?.color} color={getLuminance(category?.color) > 0.5 ? "black" : "white"} fontWeight="700" borderRadius="md" p="0.5">
              {category?.name}
            </Box>
          )}
          {remaining !== null && (
            <Text marginLeft="auto" color={remaining.proportion > 0 ? (remaining.dead ? "red" : "blue") : "gray"} textDecorationLine={remaining.dead ? "underline" : "none"}>
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
