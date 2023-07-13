import { useEffect, useState } from "react";
import "./App.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import Button from "@mui/material/Button";
import Modal from "./components/Modal/Modal";
import { addData, completeData, deleteData, editData, editModalShow, filterData, handleChangeData, handleChangeModal, oNCancel, searchData} from "./reducers/todos";
import { Form, Input, } from "antd";
import { Button, Popconfirm } from "antd";
import { Select, Space } from 'antd';
function App() {
  const todos = useSelector(({ todos }) => todos.todos);
  const addModal = useSelector(({ todos }) => todos.dialogs.addModal);
  const editModal = useSelector(({ todos }) => todos.dialogs.editModal);
  const delModal = useSelector(({ todos }) => todos.dialogs.delModal);
  const nameInput = useSelector(({ todos }) => todos.user.name);
  const surnameInput = useSelector(({ todos }) => todos.user.surname);
  const ageInput = useSelector(({ todos }) => todos.user.age);
  const emailInput = useSelector(({ todos }) => todos.user.email);
  const phoneInput = useSelector(({ todos }) => todos.user.phone);
  const filter = useSelector(({ todos }) => todos.filterTodo);
  const search = useSelector(({ todos }) => todos.user.search);
  const dispatch = useDispatch();
const complet=(value)=>{
   dispatch(filterData(value))
}

  return (
    <>
      <div className="flex items-center justify-center py-[50px]">
        <div className="container max-w-[1200px] mx-auto">
          <div className="">
            <div className="flex items-center justify-between pt-[40px]">
              <h1 className="text-[50px] font-[700]">Table User</h1>
              <Button
              className="w-[150px] h-[50px]  bg-[#1e97e8]"
              type="primary"
                onClick={() =>
                  dispatch(handleChangeModal({ name: "addModal", value: true }))
                }
              >
                Add User
              </Button>
            </div>
            <div className="py-[20px] flex items-center justify-between">
              <input type="search" value={search} onChange={(e)=>dispatch(searchData(e.target.value))} className="border w-[40%] py-[10px] px-[20px] outline-none rounded-[5px] border-[#117ce1]" placeholder="search" />
              <Space wrap>
    <Select
defaultValue="All"
      style={{
        width: 120,
      }}
      onChange={complet}
      options={[
        {
          value: 'All',
          label: 'All',
        },
        {
          value: 'Complete',
          label: 'Complete',
        },
        {
          value: 'Uncomplete',
          label: 'Uncomplete',
        }
      ]}
    />
  </Space>
            </div>
            <div className="">
              <table className="w-full p-[10px] border-separate">
                <thead className="bg-[#1e97e8] h-[50px] sticky text-[#FFF] font-[600]">
                  <tr>
                    <td>
                    </td>
                    <td className="w-[20%] px-[10px]">Full Name</td>
                    <td className="w-[10%] px-[10px]">Age</td>
                    <td className="w-[25%] px-[10px]">Email</td>
                    <td className="w-[20%] px-[10px]">Phone</td>
                    <td className="w-[20%] px-[10px]">Action</td>  
                  </tr>
                </thead>
                <tbody>
                  {todos.filter((e)=>{
                    if(e.name.toLowerCase().includes(search.trim().toLowerCase())){
                      return e
                    }else if(e.surname.toLowerCase().includes(search.trim().toLowerCase())){
                      return e
                    }else if(e.age.toString().includes(search.trim().toString())){
                      return e
                    }else if(e.email.toLowerCase().includes(search.trim().toLowerCase())){
                      return e
                    }else if(e.phone.toString().includes(search.toString().trim())){
                      return e
                    }
                  }
                    ).filter((e)=>{
                     if(filter ==="Complete"){
                        return e.completed
                     }else if(filter ==="Uncomplete"){
                        return !e.completed
                     }else {
                        return e
                     }
                  }).map((e) => {
                    return (
                      <tr key={e.id} className="h-[50px] w-full" style={e.completed?{backgroundColor:"#92b7db"}:{backgroundColor:"rgb(227, 227, 227)"}}>
                        <td className="h-[60px] flex items-center justify-center">
                          <input type="checkbox" checked={e.completed} onChange={()=>dispatch(completeData(e.id))} className="input"/>
                        </td>
                        <td className="w-[20%] px-[10px]">
                          <h1>
                             {e.name} {e.surname}
                           </h1>
                        </td>
                        <td className="w-[10%] px-[10px]">{e.age}</td>
                        <td className="w-[25%] px-[10px]">{e.email}</td>
                        <td className="w-[20%] px-[10px]">{e.phone}</td>
                        <td className="px-[10px]">
                        <Space wrap>
                        <Button  type="primary"  className="mr-[20px] bg-[#1e97e8]" onClick={() =>
                           dispatch(editModalShow(e))
                            }>Edit</Button>
                            </Space>
                          <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={()=>dispatch(deleteData(e.id))}
                            onCancel={()=>dispatch(handleChangeModal({name:delModal, value: false}))}
                            okText="Yes"
                            okType="danger"
                            cancelText="No"
                          >
                            <Button type="primary" danger  onClick={() =>
                              dispatch(handleChangeModal({ name: "delModal" ,value:true }))
                            }>Delete</Button>
                          </Popconfirm>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal modalTitle="Add Todo" open={addModal} nameModal="addModal">
        <div>
          <form
            onSubmit={() => dispatch(addData())}
            className="flex items-center flex-col gap-y-[20px] py-[20px] pb-[30px]"
          >
            <Input
              placeholder="Name"
              required
              value={nameInput}
              onChange={(e) =>
                dispatch(
                  handleChangeData({ key: "name", value: e.target.value })
                )
              }
            />
            <Input
              placeholder="Surname"
              required
              value={surnameInput}
              onChange={(e) =>
                dispatch(
                  handleChangeData({ key: "surname", value: e.target.value })
                )
              }
            />
            <Input
              placeholder="Age"
              className="w-full"
              required
              maxLength={3}
              type="number"
              value={ageInput}
              onChange={(e) =>
                dispatch(
                  handleChangeData({ key: "age", value: e.target.value })
                )
              }
            />
            <Input
              placeholder="Email"
              required
              value={emailInput}
              onChange={(e) =>
                dispatch(
                  handleChangeData({
                    key: "email",
                    value: e.target.value.trim(),
                  })
                )
              }
            />
            <Input
              placeholder="Phone"
              required
              value={phoneInput}
              type="number"
              onChange={(e) =>
                dispatch(
                  handleChangeData({ key: "phone", value: e.target.value })
                )
              }
            />
          </form>
          <div className="flex items-center justify-end gap-[20px]">
            <Button
              onClick={() =>
                dispatch(handleChangeModal({ name: "addModal", value: false }))
              }
            >
              Cancel
            </Button>
            <Button onClick={() => dispatch(addData())}  type="primary"  className="bg-[#1e97e8]">Add</Button>
          </div>
        </div>
      </Modal>
      <Modal modalTitle="Edit Todo" open={editModal} nameModal="editModal">
        <div>
          <form
            onSubmit={() => dispatch(editData())}
            className="flex items-center flex-col gap-y-[20px] py-[20px] pb-[30px]"
          >
            <Input
              placeholder="Name"
              required
              value={nameInput}
              onChange={(e) =>
                dispatch(
                  handleChangeData({ key: "name", value: e.target.value })
                )
              }
            />
            <Input
              placeholder="Surname"
              required
              value={surnameInput}
              onChange={(e) =>
                dispatch(
                  handleChangeData({ key: "surname", value: e.target.value })
                )
              }
            />
            <Input
              placeholder="Age"
              className="w-full"
              required
              type="number"
              value={ageInput}
              onChange={(e) =>
                dispatch(
                  handleChangeData({ key: "age", value: e.target.value })
                )
              }
            />
            <Input
              placeholder="Email"
              required
              value={emailInput}
              onChange={(e) =>
                dispatch(
                  handleChangeData({
                    key: "email",
                    value: e.target.value.trim(),
                  })
                )
              }
            />
            <Input
              placeholder="Phone"
              required
              value={phoneInput}
              type="number"
              onChange={(e) =>
                dispatch(
                  handleChangeData({ key: "phone", value: e.target.value })
                )
              }
            />
          </form>
          <div className="flex items-center justify-end gap-[20px]">
            <Button
              onClick={() =>{
                dispatch(handleChangeModal({ name: "editModal", value: false }))
                dispatch(oNCancel())} 
              }
            >
              Cancel
            </Button>
            <Button  className="bg-[#1e97e8]"
              type="primary"  onClick={() => {dispatch(editData())
            dispatch(oNCancel())}}>Edit</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default App;
