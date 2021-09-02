import { connect } from "react-redux"
import usersActions from "../../redux/actions/usersActions"
import { useState } from "react"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import itinerariesActions from "../../redux/actions/itinerariesActions"

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

  const confirmDelete = () => {
    MySwal.fire({
      title: "Are you sure?",
      html: "<p class='dark:text-gray-200'>Your account will be permanent removed from our database.</p>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      customClass: {
        confirmButton: "bg-red-600 px-6 py-2 rounded mx-2 text-gray-200",
        cancelButton: "bg-green-600 px-6 py-2 rounded mx-2 text-gray-200",
        title: "dark:text-gray-200",
        text: "dark:text-gray-200",
      },
      iconColor: "#FBBF24",
      background: `${
        window.document.documentElement.classList.contains("dark") && "#1F2937"
      }`,
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteHandler()
      } else {
        Toast.fire({
          title: "Cancelled.",
          icon: "error",
        })
      }
    })
  }

  const deleteHandler = async () => {
    const res = await props.deleteAccount(password)
    if (res.success) {
      await props.onDeleteAccount(res.response)
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
          {!props.user?.google && " please enter your password,"} click delete
          and confirm.
        </p>
        <div className="flex flex-col w-60 justify-center items-center gap-2">
          {!props.user?.google && (
            <input
              className="text-gray-900 text-center rounded w-full px-2 py-1 focus:outline-none focus:scale-102 transform"
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          )}
          <button
            onClick={confirmDelete}
            className="rounded px-5 py-2 w-full bg-red-500 text-gray-100"
          >
            Delete account
          </button>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  }
}

const mapDispatchToProps = {
  deleteAccount: usersActions.deleteAccount,
  onDeleteAccount: itinerariesActions.onDeleteAccount,
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount)
