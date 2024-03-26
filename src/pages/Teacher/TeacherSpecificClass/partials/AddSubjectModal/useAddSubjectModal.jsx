import { useState } from "react";
import showSuccessNotification from "@/utils/ShowSuccessNotification";
import showErrorNotification from "@/utils/ShowErrorNotification";
import { useClassDetails } from "../../contexts/ClassDetailsContext";
import { addSubjectApi } from "../../helpers/addSubjectApi";

export default function useAddSubjectModal() {
  const classDetailsContext = useClassDetails();
  const { classDetails, fetchClassDetails } = classDetailsContext;

  const [subjectName, setSubjectName] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [schedules, setSchedules] = useState([
    { day: "", startTime: "", endTime: "" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = async () => {
    try {
      const newSubjectData = {
        classId: classDetails._id,
        subjectName,
        subjectTeacher: selectedTeacher,
        schedules,
      };

      const response = await addSubjectApi(newSubjectData);

      showSuccessNotification(response.data.message);

      setSubjectName("");
      setSelectedTeacher("");
      setSchedules([{ day: "", startTime: "", endTime: "" }]);

      fetchClassDetails();
      closeModal();
    } catch (error) {
      showErrorNotification("Error adding subject:", error.message);
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
    isModalOpen,
    setIsModalOpen,
    closeModal,
    handleSaveChanges,
    addSchedule,
    removeSchedule,
    updateSchedule,
  };
}
