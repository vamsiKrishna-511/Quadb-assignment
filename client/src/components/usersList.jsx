import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  function fetchAllUsers() {
    fetch("http://localhost:4000/fetch-all")
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        setUsers(data);
      })
      .catch((err) =>
        console.log("error while fetching all users details in front end", err)
      );
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const onClickEdit = (id) => {
    try {
      fetch("http://localhost:4000/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
    } catch (error) {}
  };

  const onClickReturn = () => {
    navigate("/");
  };

  const OnClicDelete = (id) => {
    try {
      fetch(`http://localhost:4000/delete/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          fetchAllUsers();
        })
        .catch((err) => console.log({ err }));
    } catch (error) {}
  };

  return (
    <div>
      <table>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Total Orders</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {users.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.user_name}</td>
              <td>{val.user_email}</td>
              <td>{val.total_orders}</td>
              <button onClick={() => onClickEdit(val.user_id)}>Edit</button>
              <button onClick={() => OnClicDelete(val.user_id)}>Delete</button>
            </tr>
          );
        })}
      </table>
      <button onClick={onClickReturn}>Login</button>
    </div>
  );
};

export default UsersList;
