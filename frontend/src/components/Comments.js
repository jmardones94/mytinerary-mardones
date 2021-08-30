import React, { useEffect, useState } from "react"
import itinerariesActions from "../redux/actions/itinerariesActions"
import { connect } from "react-redux"
import {
  PaperAirplaneIcon,
  TrashIcon,
  PencilAltIcon,
} from "@heroicons/react/solid"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const MySwal = withReactContent(Swal)
const Toast = MySwal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 3000,
  showCloseButton: true,
})

const Comments = ({
  itineraryId,
  addComment,
  getComments,
  editComment,
  removeComment,
  user,
  allComments,
}) => {
  const comments = allComments.filter((c) => c.itineraryId === itineraryId)
  const [inputContent, setInputContent] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      const res = await getComments(itineraryId)
      if (!res.success) {
        console.error(res.error)
      }
      setLoading(false)
    }
    if (!comments.length) {
      getData()
    } else {
      setLoading(false)
    }
    // eslint-disable-next-line
  }, [getComments, itineraryId])

  const addCommentHandler = async () => {
    if (!inputContent) return false
    try {
      const res = await addComment(itineraryId, inputContent)
      if (!res.success) throw new Error(res.error)
    } catch (e) {
      console.error(e.message)
    }
    setInputContent("")
  }
  if (loading) return <Loading className="bg-gray-800 transform scale-50" />
  return (
    <div className="flex flex-col-reverse md:flex-row">
      <div className="flex flex-col w-full md:w-3/5 rounded justify-between">
        <div
          className={` min-h-28 min-w-full h-1/2s overflow-auto px-2 rounded flex flex-col gap-4`}
        >
          <p className="text-center">
            This is the comments section. Currently under construction.
          </p>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              user={user}
              comment={comment}
              editComment={editComment}
              removeComment={removeComment}
            />
          ))}
        </div>
        <div className="flex gap-2 items-center justify-center w-full py-2">
          <input
            type="text"
            className="w-1/2 rounded h-full flex-grow py-2 px-3 text-gray-900 focus:outline-none"
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            placeholder={`${
              user === false ? "Log in to leave a comment." : "Leave a comment."
            }`}
            disabled={user === false}
          />
          <button
            className="px-3 py-1 h-full bg-black text-gray-100 rounded"
            onClick={addCommentHandler}
            type="button"
          >
            <PaperAirplaneIcon className="h-5 w-5 transform rotate-90" />
          </button>
        </div>
      </div>

      <div className={`w-full min-h-1/2s md:w-2/5 flex-grow px-5`}>
        Aquí adentro van las fotos de las actividades.
      </div>
    </div>
  )
}

const Comment = ({ comment, user, editComment, removeComment }) => {
  const [editContent, setEditContent] = useState(comment.content)
  const [editMode, setEditMode] = useState(false)

  const updateClickHandler = async () => {
    const res = await editComment(comment._id, editContent)
    if (!res.success) {
      Toast.fire({
        title: res.error,
        icon: "error",
      })
    }
    setEditMode(false)
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <div
          className="rounded-full w-10 h-10 bg-yellow-300"
          style={{
            backgroundImage: `url("${comment.userId.photoURL}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <p className="text-lg font-semibold">{`${comment.userId.firstName} ${comment.userId.lastName}`}</p>
      </div>
      <div
        className="w-full flex items-start justify-between"
        key={comment._id}
      >
        {editMode ? (
          <div className="w-full mx-2">
            <textarea
              autoFocus
              type="text"
              className="text-gray-900 w-full focus:outline-none px-4 h-20 overflow-auto rounded m-1 resize-none"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-2 rounded bg-gray-300 text-gray-900 w-20"
                type="button"
                onClick={() => {
                  setEditMode(false)
                  setEditContent(comment.content)
                }}
              >
                Cancel
              </button>
              <button
                className="px-3 py-2 rounded bg-green-600 text-gray-100 w-20"
                onClick={updateClickHandler}
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          <p className="pl-6 pr-3">{comment.content}</p>
        )}
        {user?._id === comment.userId._id && (
          <div className="flex gap-px pt-1">
            {!editMode && (
              <PencilAltIcon
                onClick={() => setEditMode(!editMode)}
                className="cursor-pointer w-5 h-5 inline-block"
              />
            )}
            <TrashIcon
              onClick={() => removeComment(comment._id)}
              className="cursor-pointer w-5 h-5 inline-block"
            />
          </div>
        )}
      </div>
    </div>
  )
}

const Loading = () => {
  return (
    <div className="px-5 h-1/2s flex items-center justify-center flex-grow md:px-28 py-5 transition duration-1000 dark:bg-gray-800 bg-gray-100">
      <h1 className="flex gap-px text-center text-2xl dark:text-gray-100">
        <span className="animate-bounce">L</span>
        <span className="animate-bounce animation-delay-100">o</span>
        <span className="animate-bounce animation-delay-200">a</span>
        <span className="animate-bounce animation-delay-300">d</span>
        <span className="animate-bounce animation-delay-400">i</span>
        <span className="animate-bounce animation-delay-500">n</span>
        <span className="animate-bounce animation-delay-600">g</span>
        <span className="text-2xl font-black animate-bounce animation-delay-700">
          .
        </span>
        <span className="text-2xl font-black transition animate-bounce animation-delay-800">
          .
        </span>
        <span className="text-2xl font-black transition animate-bounce animation-delay-900">
          .
        </span>
      </h1>
    </div>
  )
}

const mapStateToProps = (state) => {
  return { user: state.users.user, allComments: state.itineraries.comments }
}

const mapDispatchToProps = {
  addComment: itinerariesActions.addComment,
  getComments: itinerariesActions.getComments,
  editComment: itinerariesActions.editComment,
  removeComment: itinerariesActions.removeComment,
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
