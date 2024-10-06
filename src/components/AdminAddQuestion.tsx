import { useState } from "react";
import { NewQuestionData } from "@/types/questionTypes";
import { useQuestion } from "@/hooks/questionHooks";

const AdminAddQuestion = () => {
  const { createQuestion, createLoading, createError } = useQuestion();

  const [formData, setFormData] = useState<NewQuestionData>({
    questionText: "",
    date: "",
    answers: [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (name === "questionText" || name === "date") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (name.startsWith("answer")) {
      const updatedAnswers = [...formData.answers];
      if (index !== undefined) {
        updatedAnswers[index].text = value;
      }
      setFormData((prevData) => ({
        ...prevData,
        answers: updatedAnswers,
      }));
    } else if (name.startsWith("isCorrect")) {
      const updatedAnswers = [...formData.answers];
      if (index !== undefined) {
        updatedAnswers[index].isCorrect = e.target.checked;
      }
      setFormData((prevData) => ({
        ...prevData,
        answers: updatedAnswers,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createQuestion(formData);
  };

  return (
    <div className="max-w-full md:max-w-screen-md mx-auto p-4 md:p-6 bg-gray-800 rounded-lg">
      <h3 className="text-white font-medium text-center text-lg md:text-xl tracking-tighter mb-4">
        Lisää kysymys
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-white mb-2" htmlFor="questionText">Kysymys</label>
          <input
            type="text"
            id="questionText"
            name="questionText"
            value={formData.questionText}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="text-white mb-2" htmlFor="date">Päivämäärä</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {formData.answers.map((answer, index) => (
            <div key={index} className="p-4 rounded-lg bg-gray-700">
              <label className="text-white mb-2 block" htmlFor={`answer${index}`}>
                Vastaus {index + 1}
              </label>
              <input
                type="text"
                id={`answer${index}`}
                name={`answer${index}`}
                value={answer.text}
                onChange={(e) => handleChange(e, index)}
                className="w-full p-2 rounded bg-gray-600 text-white"
                required
              />
              <label className="text-white inline-flex items-center mt-2">
                <input
                  type="checkbox"
                  name={`isCorrect${index}`}
                  checked={answer.isCorrect}
                  onChange={(e) => handleChange(e, index)}
                  className="mr-2"
                />
                Oikea vastaus
              </label>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={createLoading}
          className="bg-green-500 text-white py-2 px-4 rounded w-full md:w-auto"
        >
          {createLoading ? "Tallennetaan..." : "Lisää kysymys"}
        </button>

        {createError && <div className="text-red-500 mt-4">{createError}</div>}
      </form>
    </div>
  );
};

export default AdminAddQuestion;
