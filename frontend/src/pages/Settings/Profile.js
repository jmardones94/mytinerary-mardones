import { PencilAltIcon, PhotographIcon } from "@heroicons/react/outline"
import { useState } from "react"
import { connect } from "react-redux"
import usersActions from "../../redux/actions/usersActions"

const Profile = ({ user, updateUser }) => {
  const [editMode, setEditMode] = useState(false)

  const [data, setData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    photoURL: user.photoURL,
    country: user.country,
  })
  const [avatarSectionVisible, setAvatarSectionVisible] = useState(false)

  const avatars = [
    "https://i.imgur.com/OqloSPp.jpg",
    "https://i.imgur.com/wWZHn3v.jpg",
    "https://i.imgur.com/2TlFTKV.jpg",
    "https://i.imgur.com/zeEQeRZ.jpg",
    "https://i.imgur.com/O4rwcXT.jpg",
    "https://i.imgur.com/guyrHyC.jpg",
  ]

  const updateHandler = async () => {
    const res = await updateUser(data)
    if (res.error) {
      console.error(res.error) // Agregar tostadita con el error eventualmente
    } else {
      setEditMode(false)
    }
  }
  return (
    <div className="flex flex-col lg:flex-row lg:justify-evenly lg:items-start items-center flex-grow gap-2 w-full min-h-64">
      <div className="flex flex-col min-h-72">
        <div className="w-64 sm:w-72 items-center flex mb-4 justify-between">
          <h2 className="text-lg py-1 font-semibold">User info</h2>
          {!editMode && (
            <button
              type="button"
              onClick={() => setEditMode(!editMode)}
              className="w-24 flex items-center justify-center gap-1 rounded py-1 bg-yellow-500 text-gray-100"
            >
              Edit <PencilAltIcon className="w-5 h-5 inline-block" />
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className=" w-64 sm:w-72 flex flex-col gap-2"></div>
          <div className="flex w-max gap-2">
            <p className="w-24 font-medium"> First name </p>
            {!editMode ? (
              <p className="text-right w-32 sm:w-48 px-3 h-6">
                {user.firstName}
              </p>
            ) : (
              <input
                autoFocus
                className="text-right w-32 sm:w-48 text-gray-900 px-3 h-6 focus:outline-none rounded"
                name="firstName"
                type="text"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                value={data.firstName}
              />
            )}
          </div>

          <div className="flex w-max gap-2">
            <p className="w-24 font-medium"> Last name </p>
            {!editMode ? (
              <p className="text-right w-32 sm:w-48 px-3 h-6">
                {user.lastName}
              </p>
            ) : (
              <input
                className="text-right text-gray-900 w-32 sm:w-48 px-3 h-6 focus:outline-none rounded"
                name="lastName"
                type="text"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                value={data.lastName}
              />
            )}
          </div>

          <div className="flex w-max gap-2">
            {!user.google && <p className="w-24 font-medium">Email</p>}
            {!user.google &&
              (!editMode ? (
                <p className="text-right w-32 sm:w-48 px-3 h-6">{user.email}</p>
              ) : (
                <input
                  className="text-right text-gray-900 w-32 sm:w-48 px-3 h-6 focus:outline-none rounded"
                  name="email"
                  type="text"
                  onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                  }
                  value={data.email}
                />
              ))}
          </div>
          <div className="flex relative items-center w-max gap-2">
            <p className="w-24 font-medium"> Photo </p>
            {!editMode ? (
              <div className="w-32 sm:w-48 flex justify-end">
                <div
                  className="mr-2 w-8 h-8 rounded-full"
                  style={{
                    backgroundImage: `url("${user.photoURL}")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>
            ) : (
              <>
                <input
                  className="text-right text-gray-900 w-32 sm:w-48 px-3 h-8 focus:outline-none rounded"
                  name="photoURL"
                  type="text"
                  onChange={(e) =>
                    setData({ ...data, [e.target.name]: e.target.value })
                  }
                  value={data.photoURL}
                />
                <PhotographIcon
                  id="avatar-visibility-toggle"
                  onClick={() => setAvatarSectionVisible(!avatarSectionVisible)}
                  className="z-50 cursor-pointer absolute transition duration-1000 text-gray-900 bg-gray-100 dark:text-gray-100 dark:bg-gray-900 -right-7 h-6 w-6 rounded"
                />
                {avatarSectionVisible && (
                  <div className="z-50 py-2 absolute w-full justify-center -right-3 bottom-0 rounded bg-white flex gap-2 flex-wrap">
                    {avatars.map((avatar, i) => (
                      <div
                        key={avatar}
                        onClick={() => {
                          setAvatarSectionVisible(false)
                          setData({
                            ...data,
                            photoURL: avatar,
                          })
                        }}
                        id={`avatar${i + 1}`}
                        className="cursor-pointer w-24 h-24 rounded-full"
                        style={{
                          backgroundImage: `url("${avatar}")`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          <div className="flex w-max gap-2">
            <p className="w-24 font-medium"> Country </p>
            {!editMode ? (
              <p className="text-right w-32 sm:w-48 px-3 h-6">{user.country}</p>
            ) : (
              <input
                className="text-right text-gray-900 w-32 sm:w-48 px-3 h-6 focus:outline-none rounded"
                name="country"
                type="text"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
                value={data.country}
              />
            )}
          </div>
          {editMode && (
            <div className="w-64 sm:w-72 flex justify-center gap-2">
              <button
                onClick={() => {
                  setEditMode(false)
                  setData({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    photoURL: user.photoURL,
                    country: user.country,
                  })
                }}
                type="button"
                className="rounded font-semibold px-6 py-2 w-32 bg-gray-300 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={updateHandler}
                className="rounded font-semibold px-6 py-2 w-32 bg-green-600 text-gray-100"
              >
                Update
              </button>
            </div>
          )}
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
  updateUser: usersActions.updateUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
