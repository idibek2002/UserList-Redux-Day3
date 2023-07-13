import { createSlice } from "@reduxjs/toolkit";

export const todos = createSlice({
  name: "list",
  initialState: {
    todos: [
      {
        id: 1,
        name: "idibek",
        surname: "rahimov",
        age: 21,
        email: "idibekrahimov@gmail.com",
        phone: 907079014,
        completed: true,
      },
    ],
    dialogs: {
      addModal: false,
      editModal: false,
      delmodal: false,
    },
    idx: null,
    user: {
      name: "",
      surname: "",
      age: null,
      email: "",
      phone: null,
      search:"",
    },
    filterTodo:"All"
  },
  reducers: {
    searchData:(state, action)=>{
        state.user.search=action.payload
    },
    handleChangeModal: (state, action) => {
      const { name, value } = action.payload;
      state.dialogs[name] = value;
    },
    handleChangeData: (state, action) => {
      const { key, value } = action.payload;
      state.user[key] = value;
    },
    addData: (state) => {
      if (
        state.user.name == "" ||
        state.user.surname == "" ||
        state.user.email == "" ||
        state.user.age == "" ||
        state.user.phone == ""
      ) {
        return alert("Please enter the text");
      }
      let obj = {
        id: new Date().getTime(),
        name: state.user.name,
        surname: state.user.surname,
        age: state.user.age,
        email: state.user.email,
        phone: state.user.phone,
        completed: false,
      };
      state.todos.push(obj);
      state.user.name = "";
      state.user.surname = "";
      state.user.age = "";
      state.user.email = "";
      state.user.phone = "";
      state.dialogs.addModal = false;
    },
    deleteData: (state, action) => {
      state.todos = state.todos.filter((e) => e.id !== action.payload);
      state.dialogs.delmodal = false;
    },
    oNCancel: (state) => {
      state.user.name = "";
      state.user.surname = "";
      state.user.age = "";
      state.user.email = "";
      state.user.phone = "";
    },
    editModalShow: (state, action) => {
      const { name, surname, email, phone, age, id } = action.payload;
      state.user.name = name;
      state.user.surname = surname;
      state.user.email = email;
      state.user.phone = phone;
      state.user.age = age;
      state.dialogs.editModal = true;
      state.idx = id;
    },
    editData: (state) => {
      state.todos = state.todos.map((e) => {
        if (e.id === state.idx) {
          (e.name = state.user.name),
            (e.surname = state.user.surname),
            (e.age = state.user.age),
            (e.email = state.user.email),
            (e.phone = state.user.phone);
        }
        return e;
      });
      state.dialogs.editModal = false;
    },
    completeData:(state,action)=>{
        state.todos = state.todos.map((e)=>{
          if(e.id === action.payload) {
            e.completed=!e.completed;
          }
          return e
        }
        )
    },
    filterData:(state,action)=>{
      state.filterTodo = action.payload 
    }
  },
});
export const {
  handleChangeModal,
  handleChangeData,
  addData,
  deleteData,
  editModalShow,
  oNCancel,
  editData,
  completeData,
  filterData,
  searchData,
  allCompleted
} = todos.actions;
export default todos.reducer;
