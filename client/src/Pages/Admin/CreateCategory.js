import React from "react";
import Layout from "../../Components/Layout/Layout";
import AdminMenu from "../../Components/Layout/AdminMenu";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import toast, { Toast } from "react-hot-toast";
import axios from "axios";
import Form from "../../Components/Form/Form";
import "../../CSS/CreateCat.css";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong in input form");
    }
  };
  //Get all category
  const getAllCategory = async (req, res) => {
    try {
      const { data } = await axios.get("/api/v1/category/get-categories");
      if (data.success) {
        setCategory(data?.category);
      }
    } catch (error) {
      // console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //Update Function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updateName }
      );
      if (data.success) {
        toast.success(`${updateName} is updated succesfully`);
        setSelected(null);
        setUpdate(null);
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Updating Error");
    }
  };

  //delete category
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success("Category deleted successfully");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Updating Error");
    }
  };
  return (
    <>
      <Layout title={"Dashboard - Create Category"}>
        <div className="create_main">
          <div className="boom">
            <AdminMenu />
          </div>
          <div className=" create_sec1">
            <h1 style={{ textAlign: "center" }} className="reg_h1">
              Manage Category
            </h1>
            <div className="boom2">
              <Form
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
           

            <div class="table-container">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {category?.map((c) => (
                    <tr key={c.id}>
                      <td>{c.name}</td>
                      <td>
                        <button
                          class="btn btn-secondary"
                          onClick={() => {
                            setVisible(true);
                            setUpdate(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                      <td>
                        <button
                          class="btn btn-primary"
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <Form
                value={updateName}
                setValue={setUpdate}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateCategory;
