import { useState } from "react";
import showSuccessNotification from "@/utils/ShowSuccessNotification";
import showErrorNotification from "@/utils/ShowErrorNotification";
import { useClassDetails } from "../../contexts/ClassDetailsContext";
import { addSubjectApi } from "../../helpers/addSubjectApi";
import { useModal } from "./AddSubjectModal.hooks";
import SonnerShowSuccessNotification from "@/utils/SonnerShowSuccessNotification";

export default function useAddSubjectModal() {
  const [loading, setLoading] = useState(false);
  const { closeModal } = useModal();

  const classDetailsContext = useClassDetails();
  const { classDetails, fetchClassDetails } = classDetailsContext;

  const [subjectName, setSubjectName] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [schedules, setSchedules] = useState([
    { day: "", startTime: "", endTime: "" },
  ]);

  const handleSaveChanges = async () => {
    setLoading(true);

    try {
      const newSubjectData = {
        classId: classDetails._id,
        subjectName,
        subjectTeacher: selectedTeacher,
        schedules,
      };

      const response = await addSubjectApi(newSubjectData);

      SonnerShowSuccessNotification(response.data.message);

      setSubjectName("");
      setSelectedTeacher("");
      setSchedules([{ day: "", startTime: "", endTime: "" }]);

      fetchClassDetails();
      closeModal();
      setLoading(false);
    } catch (error) {
      // showErrorNotification("Error adding subject:", error.message);
      showErrorNotification(error.response.data.message);
      setLoading(false);
    }
  };

  const addSchedule = () => {
    setSchedules([...schedules, { day: "", startTime: "", endTime: "" }]);
  };

  const removeSchedule = (index) => {
    if (schedules.length > 1) {
      const updatedSchedules = [...schedules];
      updatedSchedules.splice(index, 1);
      setSchedules(updatedSchedules);
    }
  };

  const updateSchedule = (index, field, value) => {
    const updatedSchedules = [...schedules];
    updatedSchedules[index][field] = value;
    setSchedules(updatedSchedules);
  };

  return {
    subjectName,
    setSubjectName,
    selectedTeacher,
    setSelectedTeacher,
    schedules,
    setSchedules,
    handleSaveChanges,
    addSchedule,
    removeSchedule,
    updateSchedule,
    loading,
  };
}
