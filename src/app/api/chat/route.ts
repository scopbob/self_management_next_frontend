import { google } from "@ai-sdk/google";
import { streamText, tool, generateText } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = `
  あなたは性格診断士です。
  ユーザーに一問ずつ質問し、性格を分析してください。

  【ルール】
  - 会話・質問・出力のすべては**絶対に日本語のみ**で行ってください。
  - 英語、ヒンディー語、ベンガル語、中国語、その他の外国語やスクリプトは**一切使用しないでください**。
  - 一度に一問だけ質問する
  - 質問は5〜8問以内
  - 回答を踏まえて次の質問を考える
  - 質問の解答は自由形式で、ユーザーが答えやすいように例を挙げる
  - 最後にユーザーからのアバターの見た目に関する要望を聞く
  - その性格を文面からも詳細に判断し、アバター画像を生成する
    `.trim();
  const result = streamText({
    model: google("gemini-2.0-flash-001"),
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    tools: {
      avatar: tool({
        description: "Generate an avatar image based on user's personality.",
        parameters: z.object({
          personality: z.string().describe("The personality type of the user."),
        }),
        execute: async ({ personality }) => {
          const result = await generateText({
            model: google("gemini-2.0-flash-exp"),
            providerOptions: {
              google: { responseModalities: ["TEXT", "IMAGE"] },
            },
            prompt: `Create a character illustration of a person who represents ${personality}.
            A character in flat vector style, inspired by 16Personalities artwork. Low-poly aesthetic with geometric shapes, sharp edges, and soft shading.
            Make sure the avatar's expression, outfit, and pose reflect the typical traits of this personality type.
            The illustration should show only the character from the chest up (upper body, including the shoulders and head).
            Use a simple background with abstract shapes or colors that reflect the personality of the MBTI type (e.g. ENFJ = warm and vibrant tones).
            Do not include any text in the image.
            Output only the image.`,
          });
          for (const file of result.files) {
            if (file.mimeType.startsWith("image/")) {
              // show the image
              return { image: file.base64 };
            }
          }
          return { image: "" };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
