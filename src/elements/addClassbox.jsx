import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useUserData, uselocalStore } from "../store/store";

const AddClassBox = () => { 

  const BASEURL = "https://a6f2-103-251-227-203.ngrok-free.app ";

  const [subjects, setSubjects] = useState([]);
  const clsConfig = {
    title: "",
    description: "",
    subjects: [],
  };
  const [classData, setClassData] = useState();
  const [addingSubject, setAddingSubject] = useState(false);
  const { decodedData, token } = useUserData();

  let { roleID } = decodedData(token);
  const toggleAddingSubject = () => {
    setAddingSubject(!addingSubject);
  };

  const handleAddClassSubmit = async () => {
    if (!classData.title) {
      console.log("Please enter class details!!!!");
      return;
    }

    await axios
      .post(
        `${BASEURL}/api/teachers/${roleID}/createclass`,
        classData
      )
      .then((res) => {
        console.log("res : ", res);
        setClassData(clsConfig);
      })
      .catch((err) => {
        console.log("Error : ", err);
      });
  };

  const formik = useFormik({
    initialValues: { title: "", desc: "" },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setSubjects((prev) => [...prev, values]);
      formik.setValues(formik.initialValues);
    },
  });

  useEffect(() => {
    setClassData((prev) => ({ ...prev, subjects: subjects }));
  }, [subjects]);

  return (
    <div
      className={`flex flex-col gap-2 items-center justify-center absolute top-0 left-0 h-screen w-screen z-20`}
    >
      <div className=" flex items-center justify-center gap-[2rem] h-[60%] w-[80%]">
        <div className=" relative classForm flex flex-col items-center  gap-2 py-4 bg-[#0c0908] overflow-auto h-[80%] w-[40%] ">
          <div className="title flex flex-col gap-2 w-[80%] h-auto ">
            <div className="relative">
              <input
                type="text"
                className="input "
                placeholder="Enter Title"
                value={classData?.title}
                onChange={(e) => {
                  setClassData((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }));
                }}
              />
              <span className="input_border"></span>
            </div>
            <div className="relative">
              <input
                type="text"
                className="input "
                placeholder="Enter description"
                value={classData?.description}
                onChange={(e) => {
                  setClassData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }));
                }}
              />
              <span className="input_border"></span>
            </div>
            <div
              className="bg-HomeBG-side absolute bottom-0 right-0 m-[2rem] px-4 py-2 rounded-2xl cursor-pointer hover:bg-cyan-800 transition-all duration-150"
              onClick={() => {
                handleAddClassSubmit();
              }}
            >
              Add class
            </div>
          </div>
          <ul className="w-[80%] flex flex-col gap-[1rem]  overflow-auto">
            <span className="text-white">Subjects</span>
            {subjects.length > 0 &&
              subjects.map((sub) => {
                return <li className="text-white ">{sub.title}</li>;
              })}
          </ul>
        </div>
        <div
          className={`subjectForm bg-[#0c0908]  p-4 flex flex-col gap-3 justify-between transition-all duration-300 ${addingSubject ? "h-[50%]" : "h-auto"} rounded-2xl  w-[20vw]`}
        >
          <div
            className="bg-HomeBG-content w-[100%] text-center px-3 text-white py-2 rounded-2xl transition-all duration-150 hover:bg-HomeBG-main cursor-pointer"
            onClick={() => {
              toggleAddingSubject();
            }}
          >
            add Subject
          </div>
          {addingSubject && (
            <form
              onSubmit={formik.handleSubmit}
              className="flex flex-col gap-2"
            >
              <div className="relative">
                <input
                  {...formik.getFieldProps("title")}
                  type="text"
                  className="input"
                  placeholder="Enter Subject title"
                />
                <span className="input_border"></span>
              </div>
              <div className="relative">
                <input
                  {...formik.getFieldProps("desc")}
                  type="text"
                  className="input "
                  placeholder="Enter description"
                />
                <span className="input_border"></span>
              </div>
              <button
                type="submit"
                className={`"bg-HomeBG-content  text-center px-3 text-white py-2 rounded-2xl transition-all duration-150 hover:bg-HomeBG-main cursor-pointer`}
              >
                submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddClassBox;
