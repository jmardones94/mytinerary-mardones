import { connect } from "react-redux"
import usersActions from "../../redux/actions/usersActions"
import { useState } from "react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)
const Toast = MySwal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  showCloseButton: true,
})

const DeleteAccount = (props) => {
  const [password, setPassword] = useState("")
  const deleteHandler = async () => {
    const res = await props.deleteAccount(password)
    if (res.success) {
      Toast.fire({
        icon: "success",
        title: "Account deleted.",
      })
    } else {
      Toast.fire({
        icon: "error",
        title: res.error,
      })
    }
  }
  return (
    <div className="flex flex-col gap-5 flex-grow items-center justify-center">
      <h1 className="text-2xl font-medium">
        We're sorry you want to leave{" "}
        <span className="font-silt">MyTinerary</span>.
      </h1>
      <div className="flex flex-col items-center gap-5">
        <p>
          To <span className="underline">permanently</span> delete your account,
          please enter your password and click delete.
        </p>
        <div className="flex flex-col w-60 justify-center items-center gap-2">
          <input
            className="text-gray-900 text-center rounded w-full px-2 py-1"
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
          <button
            onClick={deleteHandler}
            className="rounded px-5 py-2 w-full bg-red-500 text-gray-100"
          >
            Delete account
          </button>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  deleteAccount: usersActions.deleteAccount,
}

export default connect(null, mapDispatchToProps)(DeleteAccount)
