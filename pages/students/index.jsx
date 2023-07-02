import React, { useEffect, useState } from "react";
import DashboardPage from "../dashboard/index.jsx";
import styles from "./student.module.css";
import Grid from "@mui/system/Unstable_Grid";
import { Input, Button, Modal, Table } from "antd";
const { Search } = Input;
import { fetchData } from "../api/getData.js";
import { deleteData } from "../api/deleteData.js";
import { FormData } from "../../model/FormData.js";
import { fetchUserData } from "../api/fetchUserData.js";
import { formUpdate } from "../api/formUpdate.js";

import { RiPencilLine, RiDeleteBin7Line } from "react-icons/ri";

const Students = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = React.useState(null);
  const [data, setData] = useState([]);
  const { formData, setFormData } = FormData();
  const [searchTerm, setSearchTerm] = useState("");

  const [openSecondModal, setOpenSecondModal] = useState(false);

  const [createData, setCreateData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    website: "",
    companyName: "",
  });

  /// create user
  const createUser = async () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: createData.firstName,
        lastName: createData.lastName,
        email: createData.email,
        phone: createData.phone,
        website: createData.website,
        companyName: createData.companyName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
          setOpenSecondModal(false);
          console.log(data);
      })
      .catch((error) => {
        console.log("Bir hata oluştu:");
        console.log(error);
      });
  };
  
  // table colums
  const columns = [
    {
      title: "",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
    },
    {
      title: "Company Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (_, record) => (
        <div>
          <a onClick={() => handleEdit(record.id)}>
            <RiPencilLine className={styles.tableIcon} />
          </a>
          <a onClick={() => handleDelete(record.id)}>
            <RiDeleteBin7Line className={styles.tableIcon} />
          </a>
        </div>
      ),
    },
  ];

  /// delete
  const handleDelete = async (id) => {
    console.log(id);
    try {
      const confirmed = window.confirm(
        "Bu öğeyi silmek istediğinize emin misiniz?"
      );
      if (confirmed) {
        const success = await deleteData(id);
        if (success) {
          const updatedData = data.filter((item) => item.id !== id);
          setData(updatedData);
        }
      }
    } catch (error) {
      console.error("Silme işlemi başarısız oldu:", error);
    }
  };

  // edit click
  const handleEdit = (id) => {
    console.log("Düzenleme işlemi için id:", id);
    setUserId(id);
    setOpen(true);
    const fetchData = async () => {
      const userData = await fetchUserData(id);
      if (userData) {
        setFormData(userData);
      }
    };

    fetchData();
  };
  // update model
  const handleFormSubmit = async () => {
    try {
      await formUpdate(formData, userId, setOpen, handleFormUpdate);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // update get list
  const handleFormUpdate = async () => {
    try {
      const updatedData = await fetchData();
      setData(updatedData);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // list get
  useEffect(() => {
    const getData = async () => {
      const fetchedData = await fetchData();
      setData(fetchedData);
    };

    getData();
  }, []);

  /// search
  const handleSearch = (value) => {
    setSearchTerm(value);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}search?q=${value}`)
      .then((res) => res.json())
      .then((data) => {
        const filteredData = rawData.filter((item) => {});

        setData(filteredData);
      })
      .catch((error) => {
        console.error("Arama işlemi başarısız oldu:", error);
      });
  };

  // search set data
  useEffect(() => {
    fetchData(searchTerm).then((data) => {
      setData(data);
    });
  }, [searchTerm]);

  return (
    <div className={styles.content}>
      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        <Grid xs={12} md={7}>
          <div className={styles.title}>
            <label>Students List</label>
          </div>
        </Grid>
        <Grid xs={12} md={3}>
          <div className={styles.search}>
            <Search
              placeholder="input search text"
              allowClear
              onSearch={handleSearch}
              style={{
                width: 200,
              }}
            />
          </div>
        </Grid>
        <Grid xs={12} md={2}>
          <div className={styles.addStudent}>
            <Button type="primary" onClick={() => setOpenSecondModal(true)}>
              ADD NEW STUDENT
            </Button>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        <Grid xs={12} md={12} id={styles.tableContent}>
          <Table 
            columns={columns}
            dataSource={data.map((item) => ({ ...item, key: item.id }))}
            searchTerm={searchTerm}
          />
        </Grid>
      </Grid>
      <>
        {/* update modal*/}
        <Modal
          centered
          open={open}
          onOk={handleFormSubmit}
          onCancel={() => setOpen(false)}
          width={800}
        >       
        <div className={styles.modalTitle}>
            <label>User Update</label>
            </div>   
          <Grid container spacing={3} sx={{ flexGrow: 1 }}>            
            <Grid xs={12} md={4}>
              <div>
                <label className={styles.formGroup}>Name</label>
                <Input
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </Grid>
            <Grid xs={12} md={4}>
              <div className="">
                <label className={styles.formGroup}>Lastname</label>
                <Input
                  placeholder="Lastname"
                  value={formData.lastname}
                  onChange={(e) =>
                    setFormData({ ...formData, lastname: e.target.value })
                  }
                />
              </div>
            </Grid>
            <Grid xs={12} md={4}>
              <div className="">
                <label className={styles.formGroup}>Email</label>
                <Input
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </Grid>
            <Grid xs={12} md={4}>
              <div className="">
                <label className={styles.formGroup}>Phone</label>
                <Input
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </Grid>
            <Grid xs={12} md={4}>
              <div className="">
                <label className={styles.formGroup}>Website</label>
                <Input
                  placeholder="Website"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
              </div>
            </Grid>
            <Grid xs={12} md={4}>
              <div className="">
                <label className={styles.formGroup}>Company Name</label>
                <Input
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                />
              </div>
            </Grid>
          </Grid>
        </Modal>
        {/* Create modal */}
        <Modal
          centered
          open={openSecondModal}
          onOk={createUser}
          onCancel={() => setOpenSecondModal(false)}
          width={800}
        >
          <div className={styles.modalTitle}>
          <label >New User</label>
          </div>
          <Grid container spacing={3} sx={{ flexGrow: 1 }}>
            <Grid xs={12} md={4}>
              <div>
                <label className={styles.formGroup}>Name</label>
                <Input
                  placeholder="Name"
                  value={createData.firstName}
                  onChange={(e) =>
                    setCreateData({ ...createData, firstName: e.target.value })
                  }
                />
              </div>
            </Grid>
            <Grid xs={12} md={4}>
              <div className="">
                <label className={styles.formGroup}>Lastname</label>
                <Input
                  placeholder="Lastname"
                  value={createData.lastName}
                  onChange={(e) =>
                    setCreateData({ ...createData, lastName: e.target.value })
                  }
                />
              </div>
            </Grid>
            <Grid xs={12} md={4}>
              <div className="">
                <label className={styles.formGroup}>Email</label>
                <Input
                  placeholder="Email"
                  value={createData.email}
                  onChange={(e) =>
                    setCreateData({ ...createData, email: e.target.value })
                  }
                />
              </div>
            </Grid>
            <Grid xs={12} md={4}>
              <div className="">
                <label className={styles.formGroup}>Phone</label>
                <Input
                  placeholder="Phone"
                  value={createData.phone}
                  onChange={(e) =>
                    setCreateData({ ...createData, phone: e.target.value })
                  }
                />
              </div>
            </Grid>
            <Grid xs={12} md={4}>
              <div className="">
                <label className={styles.formGroup}>Website</label>
                <Input
                  placeholder="Website"
                  value={createData.website}
                  onChange={(e) =>
                    setCreateData({ ...createData, website: e.target.value })
                  }
                />
              </div>
            </Grid>
            <Grid xs={12} md={4}>
              <div className="">
                <label className={styles.formGroup}>Company Name</label>
                <Input
                  placeholder="Company Name"
                  value={createData.companyName}
                  onChange={(e) =>
                    setCreateData({
                      ...createData,
                      companyName: e.target.value,
                    })
                  }
                />
              </div>
            </Grid>
          </Grid>
        </Modal>
      </>
    </div>
  );
};

const index = () => {
  return (
    <DashboardPage>
      <Students />
    </DashboardPage>
  );
};

export default index;
