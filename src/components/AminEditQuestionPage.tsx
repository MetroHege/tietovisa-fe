// src/components/AdminEditQuestionPage.tsx

import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import QuestionForm from "@/components/QuestionForm";
import { Question } from "@/types/questionTypes";
import { useQuestion } from "@/hooks/questionHooks";

const AdminEditQuestionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    getQuestionById,
    questionLoading,
    questionError,
    questionData,
    updateQuestion,
    updateLoading,
    updateError,
  } = useQuestion();

  useEffect(() => {
    if (id) {
      getQuestionById(id);
    }
  }, [id]);

  const handleSubmit = async (updatedData: Partial<Question>) => {
    try {
      await updateQuestion(id!, updatedData);
      alert("Question updated successfully!");
      navigate("/dashboard/search");
    } catch (err) {
      console.error(err)
    }
  };

  if (questionLoading && !questionData) {
    return <p className="text-black dark:text-white">Loading question...</p>;
  }

  if (questionError && !questionData) {
    return <p className="text-red-500">{questionError}</p>;
  }

  return (
    <div className="p-4 dark:bg-gray-900 my-10">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
        Edit Question
      </h2>
      {questionData && (
        <QuestionForm
          initialData={questionData}
          onSubmit={handleSubmit}
          loading={updateLoading}
          error={updateError}
        />
      )}
    </div>
  );
};

export default AdminEditQuestionPage;
