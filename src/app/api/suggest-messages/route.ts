import OpenAI from "openai";
import { OpenAIStream, StreamTextResult } from "ai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const response = await openai.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo",
      stream: true,
    });

    const stream = OpenAIStream(response);
    return new StreamTextResult(stream);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json(
        {
          name,
          status,
          headers,
          message,
        },
        { status }
      );
    } else {
      console.log("An unexpected error", error);
    }
  }
}
