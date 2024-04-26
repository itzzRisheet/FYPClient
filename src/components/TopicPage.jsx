import {
  faAngleUp,
  faArrowUp,
  faBars,
  faCode,
  faHamburger,
  faPlus,
  faSchool,
  faUpLong,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, List, fabClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
import SidebarList from "../elements/sidebarList";
import { useParams } from "react-router-dom";
import { getTopicDetails } from "../helper/helper";
import { useTopicData, uselocalStore } from "../store/store";
import AddClassBox from "../elements/addClassbox";
import ReactPlayer from "react-player/youtube";
import Quiz from "../elements/Quiz";
import axios from "axios";
import Transcript from "../elements/Transcript";
import Resources from "../elements/Resources";
import AddLectureBox from "../elements/addLectureBox";

const LecturesData = [
  {
    id: 1,
    title: "Introduction to Artificial Intelligence",
    description:
      "This lecture provides an overview of the foundational concepts and applications of artificial intelligence (AI). Artificial intelligence is a branch of computer science that focuses on the development of intelligent machines capable of performing tasks that typically require human intelligence. In this introductory lecture, we'll explore topics such as problem-solving, knowledge representation, machine learning, and natural language processing. We'll discuss how AI technologies are transforming various industries, including healthcare, finance, and transportation.",
    lec_link: "https://www.youtube.com/watch?v=0Z865gZ4wI0",
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    description:
      "Machine learning is a subset of artificial intelligence that enables computers to learn from data and improve their performance over time without being explicitly programmed. This lecture covers the fundamental concepts of machine learning, including supervised and unsupervised learning algorithms. We'll discuss algorithms such as linear regression, logistic regression, decision trees, and clustering. By the end of this lecture, you'll have a solid understanding of the basic principles underlying machine learning and its real-world applications.",
    lec_link: "https://www.youtube.com/watch?v=_PwhiWxHK8o",
  },
  {
    id: 3,
    title: "Deep Learning Basics",
    description:
      "Deep learning is a subfield of machine learning that focuses on neural networks with multiple layers, allowing the model to learn hierarchical representations of data. This lecture introduces the basics of deep learning techniques, such as neural networks, convolutional neural networks (CNNs), and recurrent neural networks (RNNs). We'll explore how deep learning models are used in various domains, including image recognition, natural language processing, and speech recognition. Whether you're a beginner or an experienced practitioner, this lecture will provide valuable insights into the fundamentals of deep learning.",
    lec_link: "https://www.youtube.com/watch?v=RBSGKlAvoiM",
  },
  {
    id: 4,
    title: "Advanced Machine Learning",
    description:
      "Building upon the foundational concepts of machine learning, this lecture delves into advanced topics such as reinforcement learning and natural language processing (NLP). Reinforcement learning is a type of machine learning where an agent learns to make decisions by interacting with an environment to achieve a goal. We'll discuss algorithms like Q-learning and deep Q-networks (DQN) and their applications in game playing and robotics. Additionally, we'll explore NLP techniques for tasks like text classification, sentiment analysis, and language generation. By the end of this lecture, you'll have a deeper understanding of the state-of-the-art techniques in machine learning.",
    lec_link: "https://www.youtube.com/watch?v=3JluqTojuME",
  },
  {
    id: 5,
    title: "Neural Networks and Deep Learning",
    description:
      "Neural networks are a fundamental component of deep learning, mimicking the structure and function of the human brain to process complex data. This lecture provides an in-depth exploration of neural networks, deep learning architectures, and their applications. We'll cover topics such as feedforward neural networks, convolutional neural networks (CNNs), recurrent neural networks (RNNs), and long short-term memory (LSTM) networks. Whether you're interested in image recognition, natural language processing, or time series prediction, understanding neural networks is essential for mastering deep learning.",
    lec_link: "https://www.youtube.com/watch?v=rfscVS0vtbw",
  },
  {
    id: 6,
    title: "Natural Language Processing",
    description:
      "Natural language processing (NLP) is a branch of artificial intelligence that enables computers to understand, interpret, and generate human language. In this lecture, we'll explore various NLP techniques and algorithms for processing and analyzing text data. Topics covered include tokenization, part-of-speech tagging, named entity recognition, sentiment analysis, and language generation. We'll also discuss applications of NLP in chatbots, virtual assistants, sentiment analysis, and machine translation. Whether you're interested in building language-based applications or extracting insights from textual data, this lecture will provide you with the foundational knowledge of natural language processing.",
    lec_link: "https://www.youtube.com/watch?v=fiP0q9TTQdA",
  },
  {
    id: 7,
    title: "Reinforcement Learning",
    description:
      "Reinforcement learning is a type of machine learning where an agent learns to make decisions by trial and error, receiving feedback from its environment. This lecture provides an advanced overview of reinforcement learning algorithms and applications. We'll cover topics such as Markov decision processes (MDPs), value iteration, policy iteration, Q-learning, and deep reinforcement learning. Applications of reinforcement learning in robotics, game playing, autonomous vehicles, and finance will be discussed. By the end of this lecture, you'll have a comprehensive understanding of reinforcement learning principles and techniques.",
    lec_link: "https://www.youtube.com/watch?v=JhHMJCUmq28",
  },
  {
    id: 8,
    title: "Generative Adversarial Networks (GANs)",
    description:
      "Generative adversarial networks (GANs) are a class of machine learning models used for generating new data samples that are similar to a given dataset. This lecture explores the fascinating field of GANs and their applications in image generation, style transfer, and data augmentation. We'll discuss the architecture of GANs, including the generator and discriminator networks, as well as training techniques such as adversarial training and Wasserstein distance. Whether you're interested in art generation, image editing, or data synthesis, understanding GANs will open up exciting possibilities in artificial intelligence.",
    lec_link: "https://www.youtube.com/watch?v=JEWGbzv2SOM",
  },
  {
    id: 9,
    title: "AI Ethics and Bias",
    description:
      "As artificial intelligence becomes increasingly integrated into our daily lives, it's crucial to consider the ethical implications and biases inherent in AI systems. This lecture delves into the ethical considerations surrounding AI technologies, including issues of privacy, fairness, accountability, and transparency. We'll discuss real-world examples of AI bias and discrimination and explore strategies for mitigating bias and ensuring responsible AI development. Whether you're a developer, researcher, or policymaker, understanding AI ethics is essential for building trustworthy and socially responsible AI systems.",
    lec_link: "https://www.youtube.com/watch?v=a1v9be9Gw_A",
  },
  {
    id: 10,
    title: "Advanced Topics in AI",
    description:
      "In this comprehensive overview of advanced topics in artificial intelligence (AI), we'll explore cutting-edge research and applications in various domains. Topics covered include robotics, computer vision, natural language understanding, autonomous vehicles, and more. We'll discuss state-of-the-art techniques and algorithms used in AI research, including deep reinforcement learning, transformer models, graph neural networks, and generative models. Whether you're interested in pushing the boundaries of AI research or applying AI techniques to solve real-world problems, this lecture will provide valuable insights into the future of artificial intelligence.",
    lec_link: "https://www.youtube.com/watch?v=ZghMPWGXexs",
  },
];

const TopicPage = () => {
  const [Lectures, setLectures] = useState(LecturesData);
  const {
    setPopupMsg,
    setPopupOpen,
    QuizOpen,
    setQuizOpen,
    ResourcesOpen,
    TranscriptOpen,
    setResourcesOpen,
    setTranscriptOpen,
    role,
    addLectureOpen,
    setAddLectureOpen,
  } = uselocalStore();
  const { topicID } = useParams();
  const { topicData, setTopicData } = useTopicData();
  const [watchedLectures, setWatchedLectures] = useState({});
  const [lectureCompleteStatus, setLecturesCompleteStatus] = useState(
    Lectures.length * 0.99
  );
  const [tooltipon, setTooltipon] = useState(false);

  useEffect(() => {
    if (lectureCompleteStatus >= 0.99 * Lectures.length) {
      setPopupMsg(lectureCompleteStatus, "  Lectures completed successfully");
    } else {
      setPopupMsg(lectureCompleteStatus, "Lectures completed!!!");
    }
    setPopupOpen(true);
  }, [lectureCompleteStatus]);

  useEffect(() => {
    const totalLectures = Lectures.length;
    const completedLectures = Object.keys(watchedLectures).reduce(
      (total, lectureId) => {
        const fractionWatched = watchedLectures[lectureId];
        if (fractionWatched === 1) {
          return total + 1; // If the lecture is fully watched, count it as completed
        } else {
          return total + fractionWatched; // Add the fraction watched to the total completed percentage
        }
      },
      0
    );
    const percentageComplete = (completedLectures / totalLectures) * 100;
    setLecturesCompleteStatus(
      Math.max(percentageComplete, lectureCompleteStatus)
    );
  }, [watchedLectures]);

  const [currentLec, setCurrentLec] = useState(Lectures[0]);

  const ProgressBar = ({ percentageComplete }) => {
    return (
      <div className="w-[95%] m-auto overflow-hidden h-1 -translate-y-1 mb-4 text-xs flex rounded bg-blue-200">
        <div
          style={{ width: `${percentageComplete}%` }}
          className={` none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500`}
        ></div>
      </div>
    );
  };

  const LectureProgress = ({ percentageComplete }) => {
    return (
      <div className="w-full">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-sm font-semibold  inline-block py-1 px-2 uppercase rounded-full text-white-600 bg-gray-800">
                Lecture Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-blue-600">
                {Math.round(percentageComplete)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
            <div
              style={{ width: `${percentageComplete}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            ></div>
          </div>
        </div>
      </div>
    );
  };

  const LectureCard = ({ lecture }) => {
    const [percentageComplete, setPercentageComplete] = useState(0);

    useEffect(() => {
      const calculatePercentageComplete = () => {
        if (watchedLectures[lecture.id]) {
          const fractionWatched = watchedLectures[lecture.id];
          setPercentageComplete(fractionWatched * 100);
        } else {
          setPercentageComplete(0);
        }
      };

      calculatePercentageComplete();
    }, [watchedLectures, lecture.id]);

    const getTranscript = (lecture) => {
      console.log(lecture.lec_link.split("=")[1]);
      let data = JSON.stringify({
        video_id: lecture.lec_link.split("=")[1],
        preferred_language_code: "en",
      });

      let config = {
        method: "POST",
        maxBodyLength: Infinity,
        url: "https://videohighlight.com/api/chat-gpt/transcript/get",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer sk_vhl_kbca2k6sc2lkkdfdevje5lv1d",
        },
        data: data,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    // Function to truncate the description
    const truncateDescription = (text, maxLength) => {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "..."; // Truncate the text if it exceeds maxLength characters
      } else {
        return text; // Return the original text if it's within the maxLength
      }
    };

    return (
      <div>
        <div className=" relative flex items-center w-full rounded-2xl px-[1rem] overflow-hidden shadow-lg bg-slate-700">
          <img
            src={`https://img.youtube.com/vi/${lecture.lec_link.split("v=")[1]}/mqdefault.jpg`}
            alt="Video Thumbnail"
            className="w-full max-w-28 h-24 object-cover"
          />
          <div className="px-6 py-4">
            <div
              className="font-bold text-xl mb-2 "
              onClick={() => {
                console.log(watchedLectures[lecture.id]);
                getTranscript(lecture);
                setCurrentLec(lecture);
              }}
            >
              <span className="cursor-pointer border-b-2 border-transparent hover:border-white transition-all duration-200 pr-2">
                {lecture.title}
              </span>
            </div>
            <p className="text-gray-400 text-base">
              {truncateDescription(lecture.description, 150)}{" "}
              {/* Limiting description to 150 characters */}
            </p>
          </div>
        </div>
        <ProgressBar percentageComplete={percentageComplete} />
      </div>
    );
  };

  const LectureList = ({ lectures }) => {
    return (
      <div className="z-10 container mx-auto p-4">
        <div className="grid grid-cols-1 gap-4">
          {lectures.map((lecture, index) => (
            <LectureCard key={index} lecture={lecture} />
          ))}
        </div>
      </div>
    );
  };

  useEffect(() => {
    setTopicData(topicID);
  }, []);
  const { addClassOpen } = uselocalStore();

  useEffect(() => {
    console.log("Resources div : ", ResourcesOpen);
  }, [ResourcesOpen]);
  useEffect(() => {
    console.log("transcript div : ", TranscriptOpen);
  }, [TranscriptOpen]);

  if (role)
    return (
      <div className="relative">
        {QuizOpen && (
          <div className="absolute top-0 left-0 h-full w-full z-50 flex flex-col justify-center items-center ">
            <Quiz />
          </div>
        )}
        <div
          className={`h-screen w-screen flex py-[10vh] flex-col bg-HomeBG-main ${QuizOpen ? "brightness-[5%]" : "brightness-100"}`}
        >
          <div className="flex flex-col md:flex-row gap-4 h-full">
            <div className="overflow-scroll side h-[90vh] w-[40%] text-white px-2">
              <div className="sticky top-0 mb-5 py-2 bg-black z-20">
                <LectureProgress percentageComplete={lectureCompleteStatus} />
              </div>

              <div className="relative">
                {ResourcesOpen && (
                  <div className="absolute h-full w-full bg-gray-600 z-20">
                    <Resources />
                  </div>
                )}
                {TranscriptOpen && (
                  <div className="absolute h-full w-full bg-gray-600 z-20">
                    <Transcript />
                  </div>
                )}
                <LectureList lectures={Lectures} />
              </div>
            </div>
            <div className="content flex flex-col gap-2 items-center  h-[90vh] w-[60%] overflow-auto p-4">
              <div className="h-[60%] w-[100%] bg-gray-700 p-[1rem] rounded-xl">
                <ReactPlayer
                  url={currentLec.lec_link}
                  playing
                  controls={true}
                  width={"100%"}
                  height={"100%"}
                  config={{
                    youtube: {
                      playerVars: {
                        start:
                          Math.floor(
                            (watchedLectures[currentLec.id] || 0) * 100
                          ) + "%", // Set the start time to the fraction where it was last stopped
                      },
                    },
                  }}
                  onProgress={(e) => {
                    setWatchedLectures((prev) => ({
                      ...prev,
                      [currentLec.id]: e.played,
                    }));
                  }}
                />
              </div>
              <div className="w-full relative flex flex-col gap-2 min-h-[40%] bg-gray-700 p-[1rem] rounded-xl">
                <h1 className="text-white text-3xl ">{currentLec.title}</h1>
                <h4 className="text-gray-400">{currentLec.description}</h4>
                <div
                  className="self-center absolute bottom-0 p-2 cursor-pointer hover:-translate-y-2 transition-all duration-300  bg-white"
                  style={{
                    borderRadius: "150px 150px 0 0",
                  }}
                  onMouseEnter={() => {
                    setTooltipon(true);
                  }}
                  onMouseLeave={() => {
                    setTooltipon(false);
                  }}
                >
                  <div className="h-full w-full">
                    {tooltipon && (
                      <div className="flex gap-2  py-2 absolute left-1/2 transform -translate-x-1/2 bottom-full ">
                        <button
                          className="text-white px-4 py-2 bg-teal-700  rounded-2xl transition-all duration-200 hover:bg-teal-900"
                          onClick={async (e) => {
                            e.preventDefault();
                            setTranscriptOpen(false);
                            setResourcesOpen(true);
                          }}
                        >
                          Resources
                        </button>
                        <button
                          className="text-white px-4 py-2 bg-teal-700  rounded-2xl transition-all duration-200 hover:bg-teal-900"
                          onClick={async (e) => {
                            e.preventDefault();
                            setResourcesOpen(false);
                            await setTranscriptOpen(true);
                          }}
                        >
                          Transcript
                        </button>
                      </div>
                    )}
                  </div>
                  <FontAwesomeIcon icon={faAngleUp} />
                </div>
                <div className="absolute bottom-2 flex gap-4">
                  <button
                    className="text-white px-4 py-2 bg-blue-600  rounded-2xl transition-all duration-200 hover:bg-blue-700"
                    // disabled={lectureCompleteStatus !== 100}
                    onClick={() => {
                      setQuizOpen(true);
                    }}
                  >
                    Attempt quiz
                  </button>
                  <button className="text-white px-4 py-2 bg-lime-700  rounded-2xl transition-all duration-200 hover:bg-lime-900">
                    Code <FontAwesomeIcon icon={faCode} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className={`relative `}>
      {addLectureOpen && (
        <div className="absolute z-50 top-0 left-0 flex flex-col h-screen w-screen justify-center items-center">
          <AddLectureBox />
        </div>
      )}
      <div
        className={`h-screen w-screen flex flex-col items-center justify-center bg-HomeBG-main ${addLectureOpen ? "brightness-[20%]" : "brightness-100"}`}
      >
        <div className="text-white bg-blue-700 px-4 py-2 my-8 rounded-2xl">
          <button
            onClick={() => {
              setAddLectureOpen(true);
            }}
          >
            Add Lecture <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className="grid grid-cols-1 h-[80%] overflow-auto md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
          {LecturesData.map((lecture) => (
            <div
              key={lecture.id}
              className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2">{lecture.title}</h2>
                <p className="text-gray-700 line-clamp-3">
                  {lecture.description}
                </p>
              </div>
              <div className="flex justify-center items-center bg-gray-100 py-3">
                <a
                  href={lecture.lec_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 font-semibold"
                >
                  Watch Lecture
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
