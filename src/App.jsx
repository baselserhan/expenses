import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ExpenseForm from "./components/ExpenseForm";
import ExpensesTable from "./components/ExpensesTable";
import { expenseActions } from "./redux/expenses-slices";
import "./resources/css/style.css";
import MainImage from "./resources/images/m1.png";

let App = () => {
  let dispatch = useDispatch();
  let fetchExpenses = () => {
    axios
      .get(
        "https://ws-expenses-react-a1e5b-default-rtdb.firebaseio.com/expenses.json"
      )
      .then(function (response) {
        let expenses = [];
        for (let key in response.data) {
          let expense = response.data[key];
          expense.firebase_id = key;
          expenses.push(expense);
        }
        dispatch(expenseActions.read(expenses));
      })
      .catch(function (error) {});
  };

  useEffect(fetchExpenses, []);
  return (
    <div className="content-wrapper">
      <section className="top-section">
        <img src={MainImage} alt="figure-title" />
        <section>
          <span>Welcome to Expenses Manager</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </p>
          <ExpenseForm />
        </section>
      </section>
      <ExpensesTable />
    </div>
  );
};

export default App;
