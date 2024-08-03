import axios from "axios";
import "../CSS/ShowRequests.css";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils";
import AddReq from "./AddReq";
import DeleteImage from "../Images/Delete.jpg";
export default function ShowAllRequests() {
  const [allRequests, setAllRequests] = useState([]);
  const [singleRequestData, setSingleRequestData] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/get`);
      setAllRequests(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log("error======>", error);
      setAllRequests([]);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = async (_id) => {
    try {
      const res = await axios.get(`${BASE_URL}/get?id=${_id}`);
      if (!res.data.status) {
        setSingleRequestData(null);
        return;
      }
      setSingleRequestData(res.data.data);
    } catch (error) {
      setSingleRequestData(null);
      console.log("error ", error);
    }
  };

  const handleEdit = async (data) => {
    alert("edit is not possible as of now....");
    console.log("data ", data);
    try {
      const res = await axios.post(`${BASE_URL}/update`, data);
      console.log("res ", res);
    } catch (error) {
      console.log("error ", error);
    }
  };
  const handleDelete = async (id) => {
    alert("deleting......");
    // alert("")
    console.log("data ", id);
    try {
      const res = await axios.delete(`${BASE_URL}/delete?_id=${id}`);
      if (res.data.status) {
        fetchData();
        return;
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  if (loading) {
    return <div>Loading...........</div>;
  }

  if (allRequests.length === 0) {
    return <div>No data found</div>;
  }

  return (
    <div>
      <AddReq />
      <div
        style={{
          display: "flex",
          gap: "30px",
        }}
      >
        <div>
          {allRequests.map((req) => {
            return (
              <div key={req._id}>
                <div className="titEditDel">
                  <button
                    className="title"
                    onClick={() => {
                      handleClick(req._id);
                    }}
                  >
                    {req.title.length > 16
                      ? req.title.slice(0, 16) + ".."
                      : req.title}
                  </button>
                  {!singleRequestData ? (
                    <div role="button" className="edit-btn">
                      Edit
                    </div>
                  ) : (
                    <AddReq
                      singleRequestData={singleRequestData}
                      title="Edit"
                    />
                  )}

                  <button
                    className="deleteB"
                    onClick={() => {
                      handleDelete(req._id);
                    }}
                  >
                    {/* Delete */}
                    {/* <img src={Delete} alt="delete"></img> */}
                    <img className="delete" src={DeleteImage} alt="Delete" />
                  </button>

                  {/* <AddReq /> */}
                </div>
              </div>
            );
          })}
        </div>
        <div className="reqData">
          {!singleRequestData ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
                fontWeight: "bold",
                fontSize: "30px",
              }}
            >
              No Data Found.
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <div
                className=""
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div style={{ display: "flex", gap: "100px" }}>
                  <div>
                    <span
                      style={{
                        fontWeight: "bold",
                        marginRight: "25px",
                      }}
                    >
                      METHOD:
                    </span>
                    {singleRequestData.request.method}
                  </div>

                  <div style={{ flexGrow: 1 }}>
                    <span
                      style={{
                        fontWeight: "bold",
                        marginRight: "25px",
                      }}
                    >
                      URL:
                    </span>
                    {singleRequestData.request.url}
                  </div>
                </div>
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                      marginRight: "25px",
                    }}
                  >
                    Description:
                  </span>
                  {singleRequestData.request.description}
                </div>
              </div>

              {/*  */}
              <div className="options">
                <div className="table tableData">
                  <div className="HeadersP">
                    <div>
                      <h3 className="Headers">Headers</h3>
                    </div>
                    <div className="opt">
                      {singleRequestData.headers.map((header) => {
                        return (
                          <div key={header._id}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "column",
                                padding: "10px",
                              }}
                            >
                              <div>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    marginRight: "25px",
                                  }}
                                >
                                  Key:
                                </span>
                                <span>{header.key}</span>
                              </div>
                              <div>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    marginRight: "10px",
                                  }}
                                >
                                  Value:
                                </span>
                                <span>{header.value}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
                {/* Do same for params */}
                <div className="table tableData">
                  <div>
                    <h3>Params</h3>
                    <div className="opt">
                      {singleRequestData.params.map((header) => {
                        return (
                          <div key={header._id}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: "column",
                                padding: "10px",
                              }}
                            >
                              <div>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    marginRight: "25px",
                                  }}
                                >
                                  Key:
                                </span>
                                <span>{header.key}</span>
                              </div>
                              <div>
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    marginRight: "10px",
                                  }}
                                >
                                  Value:
                                </span>
                                <span>{header.value}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Body code */}
                <div className=" table tableData">
                  <div className="bodyData ">
                    <div>
                      <h3 className="Body">Body</h3>
                    </div>
                    <div className="opt">
                      {singleRequestData.body ? (
                        JSON.stringify(singleRequestData.body || null, null, 3)
                      ) : (
                        // <div>
                        <div>
                          <div>No data in body </div>
                        </div>
                        // </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
