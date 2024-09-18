import { useState } from "react";
import { Quiz, PopulatedQuiz } from "../types/quizTypes";
import { LeanDocument } from "mongoose";

const useQuiz = () => {
  const [quizzes, setQuizzes] = useState<LeanDocument<PopulatedQuiz>[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL + "/quizzes";

  // Fetch all quizzes
  const getQuizzes = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setQuizzes(data);
    } catch (err) {
      setError("Failed to fetch quizzes");
    } finally {
      setLoading(false);
    }
  };

  // Fetch quiz by ID
  const getQuizById = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/${id}`);
      const data = await response.json();
      return data;
    } catch (err) {
      setError("Failed to fetch quiz by ID");
    } finally {
      setLoading(false);
    }
  };

  // Fetch quizzes by date
  const getQuizzesByDate = async (date: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}?date=${date}`);
      const data = await response.json();
      setQuizzes(data);
    } catch (err) {
      setError("Failed to fetch quizzes by date");
    } finally {
      setLoading(false);
    }
  };

  // Create a new quiz
  const postQuiz = async (quiz: Quiz) => {
    setLoading(true);
    try {
      const options: RequestInit = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quiz),
      };
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      setQuizzes((prev) => [...prev, data]);
    } catch (err) {
      setError("Failed to create quiz");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing quiz
  const putQuiz = async (id: string, quiz: Partial<Quiz>) => {
    setLoading(true);
    try {
      const options: RequestInit = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(quiz),
      };
      const response = await fetch(`${apiUrl}/${id}`, options);
      const data = await response.json();
      setQuizzes((prev) =>
        prev.map((q) => (q._id === id ? { ...q, ...data } : q))
      );
    } catch (err) {
      setError("Failed to update quiz");
    } finally {
      setLoading(false);
    }
  };

  // Delete a quiz
  const deleteQuiz = async (id: string) => {
    setLoading(true);
    try {
      const options: RequestInit = {
        method: "DELETE",
      };
      await fetch(`${apiUrl}/${id}`, options);
      setQuizzes((prev) => prev.filter((q) => q._id !== id));
    } catch (err) {
      setError("Failed to delete quiz");
    } finally {
      setLoading(false);
    }
  };

  return {
    quizzes,
    loading,
    error,
    getQuizzes,
    getQuizById,
    getQuizzesByDate,
    postQuiz,
    putQuiz,
    deleteQuiz,
  };
};

export default useQuiz;
