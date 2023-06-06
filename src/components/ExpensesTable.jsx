import { useSelector } from "react-redux";
import ExpenseRow from "./ExpenseRow";

export default function ExpensesTable() {
  let expenses = useSelector((state) => state.expenses);
  return (
    <section className="bottom-section">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Value</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((element) => (
            <ExpenseRow key={element.id} expense={element} />
          ))}
        </tbody>
      </table>
    </section>
  );
}
