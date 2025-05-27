import { Route, Routes } from "react-router";
import TodoChatGPT from "./features/todo/TodoChatGPT";
import TodoClaude from "./features/todo/TodoClaude";
import TodoGemini from "./features/todo/TodoGemini";
import TodoRaw from "./features/todo/TodoRaw";
import TodoRaw2ClaudeAI from "./features/todo/TodoRaw2ClaudeAI";
import LandingPage from "./features/landing-page/LandingPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/chatgpt" element={<TodoChatGPT />} />
      <Route path="/claude" element={<TodoClaude />} />
      <Route path="/gemini" element={<TodoGemini />} />
      <Route path="/raw" element={<TodoRaw />} />
      <Route path="/dashboard" element={<TodoRaw2ClaudeAI />} />
    </Routes>
  )
}