import { Table } from "react-bootstrap";
import { AddStatus } from "../update/AddStatus";

export const Tasks = (props) => {
  return (
    <div>
      <Table striped="columns">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>
                Admin
            </th>
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
                        <tr >
                        <th> <td><AddStatus id={item.id} tasks ={props.tasks}/></td> </th>
                        </tr>
                    <tr>
                        <th>name</th>
                        <th>Descrip.</th>
                    </tr>
                    </thead>
                    <tbody>
                    { item.statuses &&
                    item.statuses.map((item, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                    </Table>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      
    </div>
  );
};
