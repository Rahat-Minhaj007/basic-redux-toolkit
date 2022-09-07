import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUserData } from "./redux/slice/userSlice";
import { useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.userData);
  console.log(user);
  useEffect(() => {
    dispatch(getUserData());
  }, []);
  return (
    <div className="overflow-hidden">
      {user?.loading && <h1 className="text-center text-primary">Loading...!</h1>}
      {user?.error && <h1 className="text-center text-danger">{user.error}</h1>}
      {user?.userData?.length > 0 && (
        <div className="row g-3 mt-5 mx-3 d-flex justify-content-center py-3">
          {user?.userData.map((user) => {
            return (
              <div key={user.id} className="col-md-3 card border-0 shadow mx-2">
               <div className="card-body">
               <h6>{user?.name}</h6>
                <p>{user?.email}</p>
               </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default App;
