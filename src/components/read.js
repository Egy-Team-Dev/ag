import axios from "axios";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { Fab, makeStyles, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";
import OneRead from "./oneRead";
import EditIcon from "@material-ui/icons/Edit";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import FormDialog from "./dialog";

//Table
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    right: "5%",
    bottom: "5%",
  },
}));

export default function Read() {
  const url = "https://notification-system-beta.herokuapp.com/getAS";
  const [APIData, setAPIData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [gridApi, setGridApi] = useState(null);
  const [, /* gridColumnApi */ setGridColumnApi] = useState(null);
  const initialValue = {
    AccountID: "",
    Emails: "",
    Mobiles: "",
    NotifyType: "",
    NotifyChannels: "",
    FireWaitSec: "",
    UnfireWaitSec: "",
    NotifyWaitSec: "",
    CustomSettings: "",
    ModifyTime: "",
  };
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState(initialValue);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialValue);
  };
  //Ref of select for rows per page
  const selectRef = useRef();
  const classes = useStyles();
  const columns = [
    {
      headerName: "Actions",
      field: "id",
      minWidth: 200,
      cellRendererFramework: (params) => (
        <div className="groupBtn">
          <Button
            component={Link}
            color="primary"
            onClick={() => handleUpdate(params.data)}
            startIcon={<EditIcon />}
          ></Button>
          <Button
            component={Link}
            color="secondary"
            onClick={() => handleDelete(params.value)}
            startIcon={<DeleteOutlineIcon />}
          ></Button>
        </div>
      ),
    },
    {
      headerName: "Account ID",
      field: "AccountID",
      minWidth: 150,
      sortable: true,
      unSortIcon: true,
    },
    {
      headerName: "Emails",
      field: "Emails",
      minWidth: 300,
      sortable: true,
      unSortIcon: true,
    },
    {
      headerName: "Mobiles",
      field: "Mobiles",
      minWidth: 250,
      sortable: true,
      unSortIcon: true,
    },
    {
      headerName: "Notify Type",
      field: "NotifyType",
      minWidth: 150,
      sortable: true,
      unSortIcon: true,
    },
    {
      headerName: "Notify Channels",
      field: "NotifyChannels",
      minWidth: 200,
      sortable: true,
      unSortIcon: true,
    },
    {
      headerName: "Fire Wait Sec",
      field: "FireWaitSec",
      minWidth: 150,
      unSortIcon: true,
    },
    {
      headerName: "Unfire Wait Sec",
      field: "UnfireWaitSec",
      minWidth: 150,
      unSortIcon: true,
    },

    {
      headerName: "Notify Wait Sec",
      field: "NotifyWaitSec",
      minWidth: 150,
      unSortIcon: true,
    },
    {
      headerName: "Custom Settings",
      field: "CustomSettings",
      minWidth: 300,
      unSortIcon: true,
    },
    {
      headerName: "Modify Time",
      field: "ModifyTime",
      minWidth: 200,
      valueFormatter: 'value?.slice(5).replace("T", " ").replace(".000Z", "")',
      unSortIcon: true,
    },
  ];

  //the setting of the AG grid table .. sort , filter , etc...
  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      flex: 1,
      resizable: true,
      filter: true,
      editable: true,
    };
  }, []);

  //set the Api of the AG grid table
  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const onFirstDataRendered = (params) => {
    params.api.paginationGoToPage(0);
  };

  //num of rows to appear in a single page
  const onPageSizeChanged = (newPageSize) => {
    var selectValue = selectRef.current.value;
    gridApi.paginationSetPageSize(Number(selectValue));
  };
  const getData = () => {
    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((getData) => {
        setAPIData(getData.data.AccountSettings);
        setIsLoading(true);
      });
  };
  const onChange = (e) => {
    const { value, id } = e.target;
    // console.log(value,id)
    setFormData({ ...formData, [id]: value });
  };
  // setting update row data to form data and opening pop up window
  const handleUpdate = (oldData) => {
    setFormData(oldData);
    handleClickOpen();
  };
  //deleting a user
  const handleDelete = (id) => {
    const confirm = window.confirm(
      "Are you sure, you want to delete this row",
      id
    );
    if (confirm) {
      fetch(url + `/${id}`, { method: "DELETE" })
        .then((resp) => resp.json())
        .then((resp) => getData());
    }
  };
  const handleFormSubmit = () => {
    if (formData.id) {
      //updating a user
      const confirm = window.confirm(
        "Are you sure, you want to update this row ?"
      );
      confirm &&
        fetch(url + `/${formData.id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: {
            "content-type": "application/json",
          },
        })
          .then((resp) => resp.json())
          .then((resp) => {
            handleClose();
            getData();
          });
    } else {
      // adding new user
      fetch(url, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => {
          handleClose();
          getData();
        });
    }
  };

  useEffect(() => {
    getData();
  }, [APIData]);

  const setData = (data) => {
    let {
      AccountID,
      Emails,
      Mobiles,
      NotifyType,
      NotifyChannels,
      FireWaitSec,
      UnfireWaitSec,
      NotifyWaitSec,
      CustomSettings,
      ModifyTime,
    } = data;

    localStorage.setItem("Account ID", AccountID);
    localStorage.setItem("Emails", Emails);
    localStorage.setItem("Mobiles", Mobiles);
    localStorage.setItem("Notify Type", NotifyType);
    localStorage.setItem("Notify Channels", NotifyChannels);
    localStorage.setItem("Fire Wait Sec", FireWaitSec);
    localStorage.setItem("Unfire Wait Sec", UnfireWaitSec);
    localStorage.setItem("Notify Wait Sec", NotifyWaitSec);
    localStorage.setItem("Custom Settings", CustomSettings);
    localStorage.setItem("Modify Time", ModifyTime);
  };

  const onDelete = (id) => {
    axios
      .delete(`https://notification-system-beta.herokuapp.com/getAS/${id}`)
      .then(() => {
        getData();
      });
  };

  //APIData setData onDelete
  return (
    <>
      {isLoading ? (
        <>
          <span className="warehouseTableTitle">Get All Settings</span>
          <div className="ag-theme-alpine ag-grid-style">
            <AgGridReact
              columnDefs={columns}
              rowData={APIData}
              pagination={true}
              domLayout={"autoHeight"}
              suppressExcelExport={true}
              paginationPageSize={10}
              paginationNumberFormatter={function (params) {
                return params.value.toLocaleString();
              }}
              onFirstDataRendered={onFirstDataRendered}
              defaultColDef={defaultColDef}
              onGridReady={onGridReady}
              overlayNoRowsTemplate="Please select a Start date to get specific data"
              suppressMenuHide={true}
            />
            <div>
              <div className="optionsPage">
                <span>Row per Page :</span>
                <select
                  className="selectBtn"
                  onChange={() => onPageSizeChanged()}
                  ref={selectRef}
                >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="75">75</option>
                  <option value="100">100</option>
                </select>
              </div>
              <Fab
                component={Link}
                onClick={handleClickOpen}
                color="primary"
                className={classes.fab}
              >
                <AddIcon />
              </Fab>
            </div>
          </div>
          <FormDialog
            open={open}
            handleClose={handleClose}
            data={formData}
            onChange={onChange}
            handleFormSubmit={handleFormSubmit}
          />
        </>
      ) : (
        <span
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>Loading ....</h2>
        </span>
      )}
    </>
  );
}
