import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;

  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user)
      return res
        .status(401)
        .json({ message: "ser not registered or Token malfunctioned" });

    const chats = user.chats.map(({ role, content }) => ({
      role,
      content
    })) as ChatCompletionMessageParam[];
    chats.push({ role: "user", content: message });
    user.chats.push({ role: "user", content: message });

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_SECRET,
      organization: process.env.OPENAI_ORGANIZATION_ID
    });
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chats
    });
    user.chats.push(chatResponse.choices[0].message);
    await user.save();

    return res.status(200).json({ chats: user.chats });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;

  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user)
      return res
        .status(401)
        .json({ message: "ser not registered or Token malfunctioned" });

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permission didn't match");
    }

    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;

  try {
    const user = await User.findById(res.locals.jwtData.id);

    if (!user)
      return res
        .status(401)
        .json({ message: "ser not registered or Token malfunctioned" });

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permission didn't match");
    }
    //@ts-ignore
    user.chats = [];

    await user.save();

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    //@ts-ignore
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
