import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Reset = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        const { data } = await axios.post(
          "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
          values
        );
        if (data.status === "Success") {
          setIsLoading(false);

          navigate("/newPassword");
        }
        console.log(data);
      } catch (error) {
        toast.error(error.response.data.message);
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <div className="py-5">
        <div className="lg:w-[70%] mx-auto md:p-0 p-5">
          <h1 className="capitalize font-bold text-3xl py-5">
            Reset Password:
          </h1>
          <form onSubmit={formik.handleSubmit}>
            {/* Email */}
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="resetCode"
                id="resetCode"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
                value={formik.values.resetCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                htmlFor="email"
                className="capitalize peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                resetCode
              </label>
            </div>

            {/* Submit Button */}
            <div className="relative z-0 w-full mb-5 group">
              <button
                type="submit"
                className="w-full text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                disabled={isLoading} // Disable button while loading
              >
                {isLoading ? (
                  <i className="fa-solid fa-spinner fa-spin fa-xl"></i>
                ) : (
                  "Log In Now"
                )}
              </button>
            </div>
            <Link className="text-blue-400" to="/register">
              Don't have an account?
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Reset;
