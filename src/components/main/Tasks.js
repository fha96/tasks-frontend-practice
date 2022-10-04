import { useContext, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { AddStatus } from "../update/AddStatus";
import { UpdateModal } from "../update/UpdateModal";
import { TaskContext } from "../../context/TasksContext";

export const Tasks = (props) => {
  const { getTasks,canDo } = useContext(TaskContext);
  const [show, setShow] = useState(false);

  const handleShowModal = () => {
    setShow(true);
  };

  return (
    <div>
      <Table
        striped="columns"
        style={{ width: "85%", margin: "0 auto", border: "5px solid" }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            {props.role === "admin" && <th>Admin</th>}
          </tr>
        </thead>
        <tbody>
          {props.tasks.map((item, idx) => {
            return (
              <tr key={idx}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>
                  <Table>
                    <thead>
                      <tr>
                        <th>
                          {" "}
                          <td>
                            <AddStatus id={item.id} tasks={props.tasks} />
                          </td>{" "}
                        </th>
                      </tr>
                      <tr>
                        <th>name</th>
                        <th>Descrip.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {item.statuses &&
                        item.statuses.map((item, idx) => {
                          return (
                            <tr key={idx}>
                              <td>{item.name}</td>
                              <td>{item.description}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </td>
                {
                  canDo()&& (
                  <td>
                    <Button onClick={() => props.handleDelete(item.id)}>
                      Delete
                    </Button>
                    <br />
                    <br />
                    <br />
                    <Button onClick={handleShowModal}>Edit</Button>
                    {show && (
                      <UpdateModal
                        show={show}
                        handleClose={() => {
                          setShow(false);
                          getTasks();
                        }}
                        id={item.id}
                      />
                    )}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
