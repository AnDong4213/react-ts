import { useEffect, useState } from "react";

export const SearchPanel = () => {
  const [param, setParma] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch("").then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [param]);

  return (
    <form>
      <input
        type="text"
        value={param.name}
        onChange={(evt) =>
          setParma({
            ...param,
            name: evt.target.value,
          })
        }
      />
      <select
        value={param.personId}
        onChange={(evt) => {
          setParma({
            ...param,
            personId: evt.target.value,
          });
        }}
      >
        <option value={""}>负责人</option>
        {users.map((user) => (
          <option value={user.id}>{user.name}</option>
        ))}
      </select>
    </form>
  );
};
