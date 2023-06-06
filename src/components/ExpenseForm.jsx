import axios from "axios";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { expenseActions } from "../redux/expenses-slices";

let ExpenseForm = () => {
  let titleRef = useRef();
  let dateRef = useRef();
  let valueRef = useRef();
  let descriptionRef = useRef();

  let dispatch = useDispatch();

  let onSubmitHandler = (event) => {
    event.preventDefault();
    if (checkData()) {
      saveExpense();
    }
  };

  let checkData = () => {
    if (
      titleRef.current.value !== "" &&
      dateRef.current.value !== "" &&
      valueRef.current.value !== "" &&
      descriptionRef.current.value !== ""
    ) {
      return true;
    }

    alert("Enter required info");
    return false;
  };

  let saveExpense = () => {
    let expense = {
      id: Date.now(),
      title: titleRef.current.value,
      date: dateRef.current.value,
      value: valueRef.current.value,
      description: descriptionRef.current.value,
    };
    axios
      .post(
        "https://ws-expenses-react-a1e5b-default-rtdb.firebaseio.com/expenses.json",
        expense,
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
        }
      )
      .then(function (response) {
        console.log(response);
        expense.firebase_id = response.data.name;
        dispatch(expenseActions.save(expense));
        clear();
        Swal.fire({
          icon: "success",
          title: "Great!",
          text: "Expense saved successfully",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let clear = () => {
    titleRef.current.value = "";
    dateRef.current.value = "";
    valueRef.current.value = "";
    descriptionRef.current.value = "";
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title"
            ref={titleRef}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            placeholder="Date"
            ref={dateRef}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="value">Value</label>
          <input
            type="number"
            name="value"
            id="value"
            placeholder="Value"
            ref={valueRef}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            ref={descriptionRef}
          />
        </div>
      </div>
      <button className="save-btn" type="submit">
        Save
      </button>
    </form>
  );
};

export default ExpenseForm;
