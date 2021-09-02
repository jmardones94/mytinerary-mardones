import { useState, useEffect } from "react"
import { connect } from "react-redux"
import citiesActions from "../../redux/actions/citiesActions"
import FormSelect from "./FormSelect"
import toast, { Toaster } from "react-hot-toast"
import { TrashIcon, XIcon } from "@heroicons/react/solid"

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
          toast.success(`${selected} succesfully deleted.`)
        } else {
          throw new Error(res.error)
        }
      } catch (e) {
        toast.error(e.message)
      }
    }

    toast((t) => (
      <div className="flex flex-col gap-2 font-semibold bg-white">
        <p>Are you sure?</p>
        <button
          className="text-gray-100 rounded bg-red-500 px-4 py-1"
          onClick={() => {
            deleteAction()
            toast.dismiss(t.id)
          }}
        >
          Delete
          <TrashIcon className="inline-block w-5 h-5" />
        </button>
        <button
          className="rounded text-gray-100 bg-gray-600 px-3 py-1"
          onClick={() => toast.dismiss(t.id)}
        >
          Cancel <XIcon className=" inline-block w-5 h-5" />
        </button>
      </div>
    ))
    setSelected("")
  }

  return (
    <main className="relative flex justify-center flex-col items-center px-5 md:px-20 transition duration-1000 text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-900 flex-grow">
      <Toaster position="bottom-center" />
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
      <div className="w-72 z-50 flex justify-center">
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
