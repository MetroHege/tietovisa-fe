import AdminAddQuestion from "./AdminAddQuestion";
import AdminSearchComponent from "./AdminSearchComponent";

const AdminQuestion = () => {
  const handleSearchAction = (questionId: string) => {
    console.log("Action triggered for question:", questionId);
  };

  return (
    <section className="p-4 space-y-8">
      <AdminAddQuestion />
      <AdminSearchComponent onAction={handleSearchAction} actionLabel="Add" />
    </section>
  );
};

export default AdminQuestion;
