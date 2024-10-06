import AdminAddQuestion from "./AdminAddQuestion";
import AdminSearchComponent from "./AdminSearchComponent";

const AdminQuestion = () => {
  return (
    <section className="p-4 space-y-8">
      <AdminAddQuestion />
      <AdminSearchComponent />
    </section>
  );
};

export default AdminQuestion;
