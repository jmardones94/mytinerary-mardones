import { useState, useEffect } from "react"
import { connect } from "react-redux"
import citiesActions from "../../redux/actions/citiesActions"
import FormSelect from "./FormSelect"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)
const Toast = MySwal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 3000,
})

const FormDelete = (props) => {
  const cities = [...props.cities] || []
  const [selected, setSelected] = useState("")
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleDeleteClick = () => {
    const deleteAction = async () => {
      try {
        const res = await props.deleteCity(
          cities.find((city) => city.name === selected)._id
        )
        if (res.success) {
          Toast.fire({
            icon: "success",
            title: `${selected} successfully deleted.`,
          })
        } else {
          throw new Error(res.error)
        }
      } catch (e) {
        Toast.fire({
          title: e.message,
          icon: "error",
        })
      }
    }
    MySwal.fire({
      title: "Are you sure?",
      html: "<p class='dark:text-gray-200'>The city will be permanent removed from our database.</p>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete the city!",
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
        deleteAction()
      } else {
        Toast.fire({
          title: "Cancelled.",
          icon: "error",
        })
      }
    })
    setSelected("")
  }

  return (
    <main className="relative flex justify-center flex-col items-center px-5 md:px-20 transition duration-1000 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 flex-grow">
      <div className="flex justify-center gap-3 h-16 py-3">
        <button
          type="button"
          className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-gray-100 w-20 text-center py-1 px-3 rounded "
          onClick={() => props.setSection("add")}
        >
          Add
        </button>
        <button
          type="button"
          className="border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-100 py-1 px-3 w-20 text-center rounded "
          onClick={() => props.setSection("update")}
        >
          Update
        </button>
        <button
          type="button"
          className="bg-red-500 text-gray-100 w-20 text-center py-1 px-3 rounded "
          onClick={() => props.setSection("delete")}
        >
          Delete
        </button>
      </div>
      <h2 className="text-center text-lg mb-3 mt-16 md:mt-0">
        Select the city you want to delete
      </h2>
      <div className="w-72 z-50">
        <FormSelect
          selected={selected}
          setSelected={setSelected}
          data={cities}
          itemName="City"
        />
      </div>
      <div>
        <button
          onClick={(e) => {
            selected && handleDeleteClick()
          }}
          className={`w-72 py-2 px-10 font-medium bg-red-500 text-gray-100 rounded my-4`}
        >
          Delete
        </button>
      </div>
    </main>
  )
}

const mapStateToProps = (state) => {
  return { cities: state.cities.cities }
}

const mapDispatchToProps = {
  deleteCity: citiesActions.deleteCity,
}

export default connect(mapStateToProps, mapDispatchToProps)(FormDelete)
