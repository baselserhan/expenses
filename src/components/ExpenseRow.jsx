import axios from "axios";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { expenseActions } from "../redux/expenses-slices";

function ExpenseRow(props) {
  let dispatch = useDispatch();
  let onDeleteExpenseHandler = () => {
    Swal.fire({
      icon: "question",
      title: "Delete Expense!",
      text: "Are you sure?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: "#CF0A0A",
      cancelButtonColor: "#B2B2B2",
      confirmButtonText: "Delete",
      cancelButtonText: "deny",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteExpense();
      }
    });
  };

  let deleteExpense = () => {
    axios
      .delete(
        `https://ws-expenses-react-a1e5b-default-rtdb.firebaseio.com/expenses/${props.expense.firebase_id}.json`
      )
      .then(function (response) {
        dispatch(expenseActions.delete(props.expense.id));
        Swal.fire({
          icon: "success",
          title: "Great!",
          text: "Expense deleted successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <tr>
      <td>{props.expense.title}</td>
      <td>{props.expense.date}</td>
      <td>${props.expense.value}</td>
      <td>{props.expense.description}</td>
      <td>
        <a href="#" onClick={onDeleteExpenseHandler}>
          Delete
        </a>
      </td>
    </tr>
  );
}

export default ExpenseRow;
