import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaCommentAlt, FaTimes } from "react-icons/fa";

const FloatingChatbot = () => {
  const tasks = useSelector((state) =>
    Array.isArray(state.tasks.tasks) ? state.tasks.tasks : []
  );

  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState(null);
  const [answers, setAnswers] = useState([]);
  const answersEndRef = useRef(null);
  const chatBodyRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);
  const resetChat = () => {
    setTopic(null);
    setAnswers([]);
  };

 
  useEffect(() => {
    answersEndRef.current?.scrollIntoView({ behavior: "smooth" });

  
    if (chatBodyRef.current) {
      const body = chatBodyRef.current;
      const scrollHeight = body.scrollHeight;
      body.style.height = `${Math.min(scrollHeight + 20, 600)}px`; 
    }
  }, [answers]);

  const todayStr = new Date().toISOString().split("T")[0];

  const getPendingTasks = () =>
    tasks.filter((t) => t.status === "Pending");

  const getCompletedTasks = () =>
    tasks.filter((t) => t.status === "Completed");

  const getPriorityTasks = (priority) =>
    tasks.filter((t) => t.priority === priority);

  const getOverdueTasks = () =>
    tasks.filter(
      (t) =>
        t.status !== "Completed" &&
        t.dueDate &&
        new Date(t.dueDate) < new Date()
    );

  const getDueTodayTasks = () =>
    tasks.filter((t) => t.dueDate === todayStr);

  const getClosestDueTask = () => {
    const pending = getPendingTasks().filter((t) => t.dueDate);
    if (pending.length === 0) return null;
    return pending.reduce((prev, curr) =>
      new Date(prev.dueDate) < new Date(curr.dueDate) ? prev : curr
    );
  };

  const topicQuestions = {
    "Task Status": [
      {
        question: "How many tasks are Pending?",
        answer: () => String(getPendingTasks().length),
      },
      {
        question: "How many tasks are In Progress?",
        answer: () =>
          String(tasks.filter((t) => t.status === "In Progress").length),
      },
      {
        question: "How many tasks are Completed?",
        answer: () => String(getCompletedTasks().length),
      },
      {
        question: "What are the Pending tasks?",
        answer: () =>
          getPendingTasks().map((t) => `• ${t.title}`).join("\n") || "None",
      },
      {
        question: "What are the Completed tasks?",
        answer: () =>
          getCompletedTasks().map((t) => `• ${t.title}`).join("\n") || "None",
      },
      {
        question: "Completion Percentage?",
        answer: () => {
          if (tasks.length === 0) return "0%";
          const percent = Math.round(
            (getCompletedTasks().length / tasks.length) * 100
          );
          return percent + "%";
        },
      },
    ],

    Priority: [
      {
        question: "How many High priority tasks?",
        answer: () => String(getPriorityTasks("High").length),
      },
      {
        question: "How many Medium priority tasks?",
        answer: () => String(getPriorityTasks("Medium").length),
      },
      {
        question: "How many Low priority tasks?",
        answer: () => String(getPriorityTasks("Low").length),
      },
      {
        question: "Show High priority tasks",
        answer: () =>
          getPriorityTasks("High").map((t) => `• ${t.title}`).join("\n") ||
          "None",
      },
      {
        question: "Show Medium priority tasks",
        answer: () =>
          getPriorityTasks("Medium").map((t) => `• ${t.title}`).join("\n") ||
          "None",
      },
      {
        question: "Show Low priority tasks",
        answer: () =>
          getPriorityTasks("Low").map((t) => `• ${t.title}`).join("\n") || "None",
      },
    ],

    "Due Date / Overdue": [
      {
        question: "Tasks due today?",
        answer: () =>
          getDueTodayTasks().map((t) => `• ${t.title}`).join("\n") || "None",
      },
      {
        question: "Overdue tasks?",
        answer: () =>
          getOverdueTasks().map((t) => `• ${t.title}`).join("\n") || "None",
      },
      {
        question: "Task closest to due date?",
        answer: () => {
          const task = getClosestDueTask();
          return task ? `${task.title} (${task.dueDate})` : "None";
        },
      },
    ],

    "Top / Important": [
      {
        question: "Top priority task?",
        answer: () => {
          const highTasks = getPriorityTasks("High");
          if (highTasks.length === 0) return "None";
          const closest = highTasks.reduce((prev, curr) =>
            new Date(prev.dueDate || "9999-12-31") <
            new Date(curr.dueDate || "9999-12-31")
              ? prev
              : curr
          );
          return closest.title + (closest.dueDate ? ` (${closest.dueDate})` : "");
        },
      },
      {
        question: "Most recently added task?",
        answer: () => {
          if (tasks.length === 0) return "None";
          const latest = tasks.reduce((prev, curr) =>
            Number(prev.id) > Number(curr.id) ? prev : curr
          );
          return latest.title;
        },
      },
    ],
  };

  const handleQuestionClick = (q) => {
    let ans;
    try {
      ans = q.answer();
    } catch (error) {
      ans = "Error computing answer";
    }
    const answerText =
      ans === undefined || ans === null ? "No data" : String(ans);
    setAnswers((prev) => [...prev, { question: q.question, answer: answerText }]);
  };

  return (
    <>
  
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleChat}
          className="w-14 h-14 rounded-full bg-gradient-to-b from-cyan-400 via-blue-600 to-indigo-900 shadow-lg flex items-center justify-center text-white text-xl hover:scale-110 transition"
        >
          {isOpen ? <FaTimes /> : <FaCommentAlt />}
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed bottom-20 right-6 w-80 bg-gradient-to-br from-sky-200 to-white shadow-xl rounded-xl flex flex-col overflow-hidden z-50 animate-slide-up transition-all duration-300"
        >
   
          <div className="bg-sky-500 text-white p-3 font-bold text-center">
            Task Assistant
          </div>

     
          <div
            ref={chatBodyRef}
            className="flex flex-col p-3 gap-2 overflow-y-auto max-h-[600px]"
          >
            {!topic && (
              <>
                <p className="text-gray-700 font-medium">Choose a topic:</p>
                {Object.keys(topicQuestions).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTopic(t)}
                    className="text-left p-2 bg-white rounded-lg hover:bg-sky-100 transition"
                  >
                    {t}
                  </button>
                ))}
              </>
            )}

            {topic && (
              <>
                <button
                  onClick={resetChat}
                  className="text-left text-red-600 mb-2"
                >
                  ← Back to Topics
                </button>

                {topicQuestions[topic].map((q) => (
                  <button
                    key={q.question}
                    onClick={() => handleQuestionClick(q)}
                    className="text-left p-2 bg-white rounded-lg hover:bg-sky-100 transition"
                  >
                    {q.question}
                  </button>
                ))}

                <div className="mt-2 p-2 bg-gray-100 rounded-lg overflow-y-auto flex-1">
                  {answers.map((a, i) => (
                    <div key={i} className="mb-2">
                      <p className="font-medium text-sky-800">{a.question}</p>
                      <p className="text-gray-700 whitespace-pre-line">{a.answer}</p>
                    </div>
                  ))}
                  <div ref={answersEndRef}></div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;
