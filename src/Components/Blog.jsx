import { Row } from "./Row";
import { useState, useEffect, useRef, useReducer } from "react";
import { db } from "../firebaseInit";
import {
  collection,
  doc,
  addDoc,
  /*getDocs,*/ onSnapshot,
  deleteDoc,
} from "firebase/firestore";

// const blogsReducer = (state, action) => {
//   switch (action.type) {
//     case "ADD":
//       return [action.blog, ...state];
//     case "REMOVE":
//       return state.filter((item, index) => index !== action.blogIndex);
//     default:
//       return [];
//   }
// };

export const Blog = () => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const titleRef = useRef();
  // const [blogs, dispatch] = useReducer(blogsReducer, []);
  const [blogs, setBlogs] = useState([]);

  // for getting the docs
  // const getData = async () => {
  //   const querySnapshot = await getDocs(collection(db, "blogs"));
  //   const data = querySnapshot.docs.map((item) => {
  //     return {
  //       id: item.id,
  //       ...item.data(),
  //     };
  //   });
  //   console.log(data);
  //   setBlogs(data);
  // };

  // for getting the live data updates (client listener for firestore db)
  const unsub = onSnapshot(collection(db, "blogs"), (snapshot) => {
    const data = snapshot.docs.map((item) => {
      return {
        id: item.id,
        ...item.data(),
      };
    });
    setBlogs(data);
  });

  useEffect(() => {
    // getData();
    titleRef.current.focus();
  }, []);

  useEffect(() => {
    if (blogs.length > 0 && blogs[0].title) {
      document.title = blogs[0].title;
    } else {
      document.title = "No Blogs";
    }
  }, [blogs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch({ type: "ADD", blog: formData });

    await addDoc(collection(db, "blogs"), {
      ...formData,
      createdAt: new Date(),
    });
    // setBlogs([formData, ...blogs]);
    setFormData({ title: "", about: "" });
    titleRef.current.focus();
  };

  const handleTitleChange = (e) => {
    setFormData({ title: e.target.value, about: formData.about });
  };

  const handleAboutChange = (e) => {
    setFormData({ title: formData.title, about: e.target.value });
  };

  // const handleRemoveBlog = (indexToRemove) => {
  //   // dispatch({ type: "REMOVE", blogIndex: indexToRemove });
  //   setBlogs(blogs.filter((item, index) => index !== indexToRemove));
  // };

  const handleRemoveBlog = async (id) => {
    await deleteDoc(doc(db, "blogs", id));
  };

  return (
    <>
      <h1>Write a Blog!</h1>

      <div className="section">
        <form onSubmit={handleSubmit}>
          <Row label="Title">
            <input
              onChange={handleTitleChange}
              value={formData.title}
              className="input"
              ref={titleRef}
              placeholder="Enter the Title of the Blog here.."
            />
          </Row>

          <Row label="Content">
            <textarea
              required
              onChange={handleAboutChange}
              value={formData.about}
              className="input content"
              placeholder="Content of the Blog goes here.."
            />
          </Row>

          <button className="btn" type="submit">
            ADD
          </button>
        </form>
      </div>

      <hr />

      <h2> Blogs </h2>

      <div>
        {blogs.map((item, index) => (
          <div className="blog" key={index}>
            <div>
              <h4>{item.title}</h4>
              <p>{item.about}</p>
            </div>
            <button
              className="btn remove blog-btn"
              onClick={() => handleRemoveBlog(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
