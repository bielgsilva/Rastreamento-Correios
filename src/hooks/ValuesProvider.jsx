import { useState } from "react";

export default function ValuesProvider() {

  const [data, setData] = useState([]);
  const [search, setSearch] = useState(false);
  const [invalidCode, setInvalidCode] = useState(false);
  const [apiIsDown, setApiIsDown,] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clearPreviousSearch, setClearPreviousSearch] = useState(false);
  const [emptyHistory, setEmptyHistory] = useState(true);
  const [successfulSearchHistory, setSuccessfulSearchHistory] = useState([]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTrackingCode, setSelectedTrackingCode] = useState('')


  return ({
    data, setData,
    search, setSearch,
    invalidCode, setInvalidCode,
    loading, setLoading,
    clearPreviousSearch, setClearPreviousSearch,
    apiIsDown, setApiIsDown,
    successfulSearchHistory, setSuccessfulSearchHistory,
    emptyHistory, setEmptyHistory,
    editModalOpen, setEditModalOpen,
    selectedTrackingCode, setSelectedTrackingCode

  });
}