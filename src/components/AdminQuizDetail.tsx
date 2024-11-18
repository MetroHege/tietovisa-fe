// import useQuiz from "@/hooks/quizHooks";
import {useParams} from 'react-router-dom';

const AdminQuizDetail = () => {
  const {quizId} = useParams();
  // const { getQuizById, quizLoading, quizError } = useQuiz()

  // const getQuiz = async () => {

  // }

  return (
    <div>
      <h2>Admin Quiz Detail</h2>
      <p>Quiz ID: {quizId}</p>
    </div>
  );
};

export default AdminQuizDetail;
