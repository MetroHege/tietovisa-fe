import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useQuiz from "@/hooks/quizHooks";
import { useQuestion } from "@/hooks/questionHooks";
import Spinner from "@/components/Spinner";
import AdminSearchComponent from "@/components/AdminSearchComponent";

const AdminQuizDetail = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const {
    getQuizById,
    deleteQuiz,
    quizLoading,
    deleteLoading,
    quizError,
    deleteError,
    quizData,
    addQuestionToQuiz,
    addQuestionLoading,
    addQuestionError,
  } = useQuiz();
  const {
    updateQuestion,
    deleteQuestion,
    updateLoading,
    deleteLoading: deleteQuestionLoading,
    updateError,
    deleteError: deleteQuestionError,
  } = useQuestion();

  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [editedQuestion, setEditedQuestion] = useState<any>(null);
  const [showSearch, setShowSearch] = useState(false); // Modal visibility state

  useEffect(() => {
    if (quizId) {
      getQuizById(quizId);
    }
  }, [quizId]);

  const toggleQuestion = (id: string) => {
    setExpandedQuestion((prev) => (prev === id ? null : id));
  };

  const startEditing = (question: any) => {
    setEditingQuestion(question._id);
    setEditedQuestion({ ...question });
  };

  const cancelEditing = () => {
    setEditingQuestion(null);
    setEditedQuestion(null);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditedQuestion((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleAnswerChange = (index: number, value: string, isCorrect?: boolean) => {
    const updatedAnswers = [...editedQuestion.answers];
    updatedAnswers[index] = { ...updatedAnswers[index], text: value };
    if (isCorrect !== undefined) {
      updatedAnswers[index].isCorrect = isCorrect;
    }
    setEditedQuestion((prev: any) => ({ ...prev, answers: updatedAnswers }));
  };

  const saveChanges = async () => {
    if (!editedQuestion) return;
    await updateQuestion(editedQuestion._id, {
      questionText: editedQuestion.questionText,
      answers: editedQuestion.answers,
      difficulty: editedQuestion.difficulty,
    });
    setEditingQuestion(null);
    setEditedQuestion(null);
    getQuizById(quizId); // Refresh the quiz data
  };

  const handleDeleteQuestion = async (questionId: string) => {
    const confirmed = window.confirm("Haluatko varmasti poistaa tämän kysymyksen?");
    if (confirmed) {
      try {
        await deleteQuestion(questionId);
        alert("Kysymys poistettu onnistuneesti.");
        getQuizById(quizId); // Refresh quiz data after deletion
      } catch (error) {
        console.error("Kysymyksen poistaminen epäonnistui:", error);
      }
    }
  };

  const handleDeleteQuiz = async () => {
    if (!quizId) return;
    const confirmed = window.confirm("Haluatko varmasti poistaa tietovisan?");
    if (confirmed) {
      try {
        await deleteQuiz(quizId);
        alert("Tietovisa poistettu onnistuneesti.");
        navigate("/dashboard");
      } catch (error) {
        console.error("Tietovisan poistaminen epäonnistui:", error);
      }
    }
  };

  const handleAddQuestionToQuiz = async (questionId: string) => {
    if (!quizId) return;
    try {
      await addQuestionToQuiz(quizId, questionId);
      alert("Kysymys lisätty tietovisaan.");
      setShowSearch(false);
      getQuizById(quizId);
    } catch (error) {
      console.error("Kysymyksen lisääminen epäonnistui:", error);
    }
  };

  if (quizLoading || deleteLoading || updateLoading || deleteQuestionLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Spinner />
      </div>
    );
  }

  if (quizError || deleteError || updateError || deleteQuestionError) {
    return (
      <div className="text-center text-red-500">
        <p>Toiminto epäonnistui. Yritä myöhemmin uudelleen.</p>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="text-center text-gray-500">
        <p>Tietovisaa ei löytynyt annetulla ID:llä.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-700 w-full max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Tietovisan Tiedot</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
          <span className="font-semibold">Otsikko:</span> {quizData.title}
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
          <span className="font-semibold">Julkaistu:</span> {quizData.isPublished ? "Kyllä" : "Ei"}
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          <span className="font-semibold">Kysymysten määrä:</span> {quizData.questions.length}
        </p>
        <button
          onClick={handleDeleteQuiz}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Poista Tietovisa
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-700 w-full max-w-2xl mt-6">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Kysymykset</h3>
        <ul className="space-y-4">
          {quizData.questions.map((question, index) => (
            <li
              key={question._id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
            >
              <div
                className="p-4 cursor-pointer bg-gray-50 dark:bg-gray-700 flex justify-between items-center"
                onClick={() => toggleQuestion(question._id)}
              >
                <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                  Kysymys {index + 1}: {question.questionText}
                </p>
                <span className="text-gray-500 dark:text-gray-400">
                  {expandedQuestion === question._id ? "-" : "+"}
                </span>
              </div>

              {expandedQuestion === question._id && (
                <div className="p-4 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  {editingQuestion === question._id ? (
                    <>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200"
                        value={editedQuestion.questionText}
                        onChange={(e) => handleInputChange("questionText", e.target.value)}
                      />
                      <ul className="mt-3 space-y-2">
                        {editedQuestion.answers.map((answer: any, idx: number) => (
                          <li key={answer._id} className="flex items-center space-x-2">
                            <input
                              type="text"
                              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200"
                              value={answer.text}
                              onChange={(e) =>
                                handleAnswerChange(idx, e.target.value, answer.isCorrect)
                              }
                            />
                            <input
                              type="checkbox"
                              checked={answer.isCorrect}
                              onChange={(e) =>
                                handleAnswerChange(idx, answer.text, e.target.checked)
                              }
                            />
                          </li>
                        ))}
                      </ul>
                      <div className="flex space-x-4 mt-3">
                        <button
                          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                          onClick={saveChanges}
                        >
                          Tallenna
                        </button>
                        <button
                          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                          onClick={cancelEditing}
                        >
                          Peruuta
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <ul className="space-y-2">
                        {question.answers.map((answer: any) => (
                          <li
                            key={answer._id}
                            className={`${
                              answer.isCorrect
                                ? "text-green-600 font-semibold"
                                : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {answer.text} {answer.isCorrect && "(Oikea vastaus)"}
                          </li>
                        ))}
                      </ul>
                      <div className="flex space-x-2 mt-3">
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                          onClick={() => startEditing(question)}
                        >
                          Muokkaa
                        </button>
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                          onClick={() => handleDeleteQuestion(question._id)}
                        >
                          Poista
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
        {quizData.questions.length < 10 && (
          <button
            className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => setShowSearch(true)}
          >
            +
          </button>
        )}
      </div>

      {addQuestionLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="text-white text-lg">Lisätään kysymystä...</div>
        </div>
      )}

      {addQuestionError && (
        <div className="text-red-500 text-center my-2">
          {addQuestionError || "Virhe lisättäessä kysymystä."}
        </div>
      )}

      {showSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl h-5/6 overflow-auto relative">
            <button
              onClick={() => setShowSearch(false)}
              className="absolute top-2 right-2 text-white bg-red-500 hover:bg-red-600 rounded-full px-3 py-1"
            >
              ✕
            </button>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Lisää kysymyksiä tietovisaan
            </h3>
            <AdminSearchComponent
              onAction={handleAddQuestionToQuiz}
              actionLabel="Lisää"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminQuizDetail;
