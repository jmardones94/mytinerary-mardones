import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline"
import usersActions from "../../redux/actions/usersActions"
import { connect } from "react-redux"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)
const Toast = MySwal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 10000,
  timerProgressBar: true,
  showCloseButton: true,
})

const Security = ({ updateUser }) => {
  const [newPasswordData, setNewPasswordData] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  })
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const updatePasswordHandler = async () => {
    const res = await updateUser(newPasswordData)
    if (res.error) {
      Toast.fire({
        icon: "error",
        title: res.error,
      })
    } else {
      setNewPasswordData({
        oldPassword: "",
        password: "",
        confirmPassword: "",
      })
      Toast.fire({
        title: "Password updated",
        icon: "success",
      })
    }
  }
  const onChangePasswordHandler = (e) => {
    setNewPasswordData({
      ...newPasswordData,
      [e.target.name]: e.target.value,
    })
  }
  return (
    <div className="w-64 sm:w-80 lg:w-80 flex flex-col justify-between gap-2 md:min-h-72">
      <div className="flex justify-between mb-3 items-center">
        <h2 className="text-lg font-semibold ">Change password</h2>
        {isPasswordVisible ? (
          <EyeIcon
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="cursor-pointer w-5 h-5 inline-block"
          />
        ) : (
          <EyeOffIcon
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="cursor-pointer w-5 h-5 inline-block"
          />
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div>
          <div className="flex w-max">
            <p className="w-44 sm:w-48 font-medium"> Current password </p>
            <input
              className="flex-shrink text-right text-gray-900 w-20 sm:w-32 px-3 h-6 focus:outline-none rounded"
              name="oldPassword"
              type={isPasswordVisible ? "text" : "password"}
              onChange={onChangePasswordHandler}
              value={newPasswordData.oldPassword}
            />
          </div>
        </div>
        <div>
          <div className="flex w-max">
            <p className="w-44 sm:w-48 font-medium"> New password </p>
            <input
              className="text-right text-gray-900 w-20 sm:w-32 px-3 h-6 focus:outline-none rounded"
              name="password"
              type={isPasswordVisible ? "text" : "password"}
              onChange={onChangePasswordHandler}
              value={newPasswordData.password}
            />
          </div>
        </div>
        <div>
          <div className="flex w-max">
            <p className="w-44 sm:w-48 font-medium"> Confirm new password </p>
            <input
              className="text-right text-gray-900 w-20 sm:w-32 px-3 h-6 focus:outline-none rounded"
              name="confirmPassword"
              type={isPasswordVisible ? "text" : "password"}
              onChange={onChangePasswordHandler}
              value={newPasswordData.confirmPassword}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={updatePasswordHandler}
          className="bg-gray-300 text-gray-900 font-medium rounded w-40 px-3 py-2"
        >
          Change password
        </button>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  updateUser: usersActions.updateUser,
}

export default connect(null, mapDispatchToProps)(Security)
