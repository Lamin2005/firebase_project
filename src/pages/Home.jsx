import { auth } from "../config/firebaseAuth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from "../hook/useUserInfo";
import { useAddtranslation } from "../hook/useAddtranslation";
import { useState } from "react";
import { useGetTranslations } from "../hook/useGetTranslations";

function Home() {
  const navigate = useNavigate();
  let { uid, name, email, photoURL } = useUserInfo();
  let { addtranslation} = useAddtranslation();
  let { translations, loading } = useGetTranslations();

  // State variables for the form
  let [description, setDescription] = useState("");
  let [amount, setAmount] = useState("");
  let [type, setType] = useState("income");

  let balance = 0;
  let income = 0;
  let expenses = 0;

  // Calculate balance, income, and expenses
  translations.forEach((trans) => {
    if (trans.type === "income") {
      income += parseFloat(trans.amount);
    } else {
      expenses += parseFloat(trans.amount);
    }
  });

  balance = income - expenses;

  console.log("User Info:", { uid, name, email, photoURL });

  const SignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      alert("Sign out successful!");
      navigate("/");
    } catch (error) {
      console.log("Error signing out: ", error);
      alert("Error signing out: " + error.message);
    }
  };

  return (
    <section className="home">
      <h1 style={{ fontSize: "2rem" }} className="title">
        {" "}
        Money Tracker App
      </h1>

      <div className="profile">
       <div className="profile_data">
         <div className="profileimg">
          <img
            src={
              photoURL
                ? photoURL
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6M2DZzPSIGEMTJPF6xZg5XRrwlyPgACyEgg&s"
            }
            alt={name}
          />
        </div>
        <div className="profileinfo">
          <span style={{fontWeight:"bolder"}}>{name}</span>
          <span>{email}</span>
        </div>
       </div>
       <div className="signoutbtn">
         <button
          onClick={() => {
            SignOut();
          }}
        >
          Signout
        </button>
       </div>
      </div>

      <div className="maintitle">
        <div className="text">
          <h2 style={{color:"blue"}}>Your Balance - {balance ? balance : "00.00"}</h2>
          <h3 style={{color:"green"}}>Income - {income ? income : "00.00"}</h3>
          <h3 style={{color:"red"}}>Expenses - {expenses ? expenses : "00.00"}</h3>
        </div>
        <div className="form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!description || !amount) {
                alert("Please fill in all fields.");
                return;
              }
              addtranslation({ description, amount, type });
              alert("Translation added successfully!");
              setDescription("");
              setAmount("");
              setType("income");
            }}
          >
            <input
              type="text"
              placeholder="Enter Discription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="type">
               <input
              type="radio"
              name="income"
              id="income"
              value="income"
              checked={type === "income"}
              onChange={(e) => setType(e.target.value)}
            />
            <label htmlFor="income">Income</label>
            <input
              type="radio"
              name="expense"
              id="expense"
              value="expense"
              checked={type === "expense"}
              onChange={(e) => setType(e.target.value)}
            />
            <label htmlFor="expense">Expense</label>
            </div>
            <button type="submit">Add</button>
          </form>
        </div>
      </div>

      <div className="translation">
        <h2>Translations</h2>

        <div className="list">
          {loading && <p>Loading translations...</p>}
          {translations.length === 0 && !loading && (
            <p>No translations found.</p>
          )}
          {translations.length > 0 &&
            !loading &&
            [...translations] // clone array to avoid mutating state directly
              .sort((a, b) => {
                const dateA = a.createTime?.toDate?.();
                const dateB = b.createTime?.toDate?.();
                return dateB - dateA; // ✅ sort newest first
              })
              .map((translation) => (
                <div
                  key={translation.id}
                  className="translation-item"
                  style={{
                    borderLeft:
                      translation.type === "income"
                        ? "6px solid green"
                        : "6px solid red",
                  }}
                >
                  <p>
                    <strong>Description:</strong> {translation.description}
                  </p>
                  <p>
                    <strong>Amount:</strong> {translation.amount}
                  </p>
                  <p>
                    <strong>Type:</strong>{" "}
                    <span
                      style={{
                        color: translation.type === "income" ? "green" : "red",
                      }}
                    >
                      {translation.type}
                    </span>
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(
                      translation.createTime?.toDate()
                    ).toLocaleDateString()}
                  </p>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}

export default Home;
