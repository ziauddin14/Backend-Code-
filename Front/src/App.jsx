// // src/App.jsx
// import React, { useState, useEffect } from "react";
// import { getUsers, addUser, updateUser, deleteUser } from "./api";

// const App = () => {
//   const [users, setUsers] = useState([]);
//   const [form, setForm] = useState({ id: "", name: "", email: "", age: "" });

//   const loadUsers = async () => {
//     const data = await getUsers();
//     setUsers(data.users);
//   };

//   const handleAdd = async () => {
//     if (!form.name || !form.email || !form.age) return alert("Please fill all fields!");
//     await addUser(form.name, form.email, Number(form.age));
//     await loadUsers();
//     setForm({ id: "", name: "", email: "", age: "" });
//   };

//   const handleUpdate = async () => {
//     if (!form.id) return alert("Please enter user ID to update!");
//     await updateUser(Number(form.id), form.name, form.email, Number(form.age));
//     await loadUsers();
//   };

//   const handleDelete = async () => {
//     if (!form.id) return alert("Please enter user ID to delete!");
//     await deleteUser(Number(form.id));
//     await loadUsers();
//   };

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   return (
//     <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: 500, margin: "auto" }}>
//       <h2>GraphQL User Manager</h2>
//       <input
//         type="text"
//         placeholder="ID (for update/delete)"
//         value={form.id}
//         onChange={(e) => setForm({ ...form, id: e.target.value })}
//       />
//       <input
//         type="text"
//         placeholder="Name"
//         value={form.name}
//         onChange={(e) => setForm({ ...form, name: e.target.value })}
//       />
//       <input
//         type="email"
//         placeholder="Email"
//         value={form.email}
//         onChange={(e) => setForm({ ...form, email: e.target.value })}
//       />
//       <input
//         type="number"
//         placeholder="Age"
//         value={form.age}
//         onChange={(e) => setForm({ ...form, age: e.target.value })}
//       />
//       <div style={{ marginTop: 10 }}>
//         <button onClick={handleAdd}>Add</button>
//         <button onClick={handleUpdate}>Update</button>
//         <button onClick={handleDelete}>Delete</button>
//         <button onClick={loadUsers}>Refresh</button>
//       </div>

//       <h3>Users:</h3>
//       <ul>
//         {users.map((u) => (
//           <li key={u.id}>
//             {u.id}. {u.name} — {u.email} ({u.age})
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default App;
