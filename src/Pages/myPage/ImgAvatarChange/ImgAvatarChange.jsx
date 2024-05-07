// import  { useState } from "react";
// import css from "./ImgAvatarChange.module.css";
// import { useSelector, useDispatch } from "react-redux";
// import { editMyData } from "../../../Store/getMeSlice";
// import ErrorModel from "../../../Model/errorModel/ErrorModel";

// export default function ImgAvatarChange() {
//   // back to edit refresh page
//   const { records, error, complete, loading } = useSelector(
//     (state) => state.me
//   );
//   const [img, setImg] = useState(records.data.imageProfile);


//   const dispatch = useDispatch();

//   const fileChange = (e) => {
//     let formData = new FormData();
//     const file = e.target.files[0];
//     if (file) {
//       const imgs = URL.createObjectURL(file);
//       setImg(imgs);
//       formData.append("imageProfile", file);
//       dispatch(editMyData(formData));
//     }
//   };
//   return (
//     <div className={css.image}>
//       <img src={img} alt="MyPhoto" />
//       <div>
//         <label className={css.customFileInput} htmlFor="image">
//           Add New Image
//         </label>
//         <input
//           type="file"
//           id="image"
//           name="image"
//           accept=".png, .jpg, .jpeg"
//           onChange={fileChange}
//         />
//       </div>
//       {/* {error ? (
//         <ErrorModel
//           msg={error}
//           loading={loading}
//           error={error}
//           complete={complete}
//         />
//       ) : null}
//       {complete ? (
//         <ErrorModel
//           msg={error}
//           loading={loading}
//           error={error}
//           complete={complete}
//         />
//       ) : null}
//       {loading ? (
//         <ErrorModel
//           msg={error}
//           loading={loading}
//           error={error}
//           complete={complete}
//         />
//       ) : null} */}
//     </div>
//   );
// }
