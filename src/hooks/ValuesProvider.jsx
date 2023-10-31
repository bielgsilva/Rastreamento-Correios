import { useState } from "react";

export default function ValuesProvider() {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState(false);

  return ({
    data, setData,
    search, setSearch
  });
}