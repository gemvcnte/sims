import { useState } from "react";
import showSuccessNotification from "@/utils/ShowSuccessNotification";
import showErrorNotification from "@/utils/ShowErrorNotification";
import { useClassDetails } from "../../contexts/ClassDetailsContext";
import { addSubjectApi } from "../../helpers/addSubjectApi";
import { updateSubjectApi } from "../../helpers/updateSubjectApi";
import { useModal } from "./AddSubjectModal.hooks";

export default function useAddSubjectModal({ subject }) {
  const [loading, setLoading] = useState(false);
  const { closeModal } = useModal();

  const classDetailsContext = useClassDetails();
  const { classDetails, fetchClassDetails } = classDetailsContext;

  const [subjectName, setSubjectName] = useState(subject.subjectName || "");
  const [selectedTeacher, setSelectedTeacher] = useState(
    subject.subjectTeacher || "",
  );
  const [schedules, setSchedules] = useState(subject.schedules || []);

  const handleSaveChanges = async () => {
    setLoading(true);

    try {
      const updatedSubjectData = {
        subjectId: subject._id,
        subjectName,
        subjectTeacher: selectedTeacher,
        schedules,
      };

      const response = await updateSubjectApi(updatedSubjectData);

      if (response.status == 200) {
        showSuccessNotification(response.data.message);
        closeModal();
        fetchClassDetails();
        // onSuccess();
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating subject:", error.message);
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