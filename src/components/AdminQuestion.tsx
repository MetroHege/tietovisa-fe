import AdminAddQuestion from "./AdminAddQuestion";
import AdminSearchComponent from "./AdminSearchComponent";

const AdminQuestion = () => {

  return (
    <section className="p-4 space-y-8">
      <AdminAddQuestion />
      <AdminSearchComponent
        onAction={(questionId) => console.log("Added question:", questionId)}
        actionLabel="Muokkaa"
        isQuizContext={true}
      />
    </section>
  );
};

export default AdminQuestion;
