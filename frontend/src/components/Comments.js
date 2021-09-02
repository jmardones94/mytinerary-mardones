import React, { useEffect, useState } from "react"
import itinerariesActions from "../redux/actions/itinerariesActions"
import { connect } from "react-redux"
import {
  PaperAirplaneIcon,
  TrashIcon,
  PencilAltIcon,
  XIcon,
} from "@heroicons/react/solid"
import toast, { Toaster } from "react-hot-toast"

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
  // const [isButtonDisabled, setIsButtonDisabled] = useState(false)

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
    setInputContent("")
    if (!inputContent) return false
    try {
      const res = await addComment(itineraryId, inputContent)
      if (!res.success) throw new Error(res.error)
    } catch (e) {
      toast.error(e.message)
    }
  }
  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      addCommentHandler()
    }
  }

  if (loading) return <Loading className="bg-gray-800 transform scale-50" />
  return (
    <div className="flex flex-col md:px-20 w-full rounded justify-between pt-10">
      <div
        className={`min-h-64 min-w-full max-h-1/2s overflow-auto px-2 rounded flex flex-col gap-4`}
      >
        <Toaster position="bottom-center" />
        <h3 className="comments text-center text-xl font-semibold mb-5">
          Comments
        </h3>
        {comments.length ? (
          comments.map((comment) => (
            <Comment
              key={comment._id}
              user={user}
              comment={comment}
              editComment={editComment}
              removeComment={removeComment}
              itineraryId={itineraryId}
            />
          ))
        ) : (
          <p className="w-full text-center text-lg self-center mt-16">
            There are no comments yet, be the first!
          </p>
        )}
      </div>
      <div className="flex gap-2 items-center justify-center w-full p-2">
        <input
          type="text"
          className="w-1/2 border border-gray-300 dark:border-transparent rounded h-10 flex-grow py-2 px-3 text-gray-900 focus:outline-none"
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          placeholder={`${
            user === false ? "Log in to leave a comment." : "Leave a comment."
          }`}
          disabled={user === false}
          onKeyDown={keyDownHandler}
        />
        <button
          className="px-3 h-10 py-1 bg-black text-gray-100 rounded"
          onClick={addCommentHandler}
          type="button"
          title="Post comment"
        >
          <PaperAirplaneIcon className="h-5 w-5 transform rotate-90" />
        </button>
      </div>
    </div>
  )
}

const Comment = ({
  comment,
  user,
  itineraryId,
  editComment,
  removeComment,
}) => {
  const [editContent, setEditContent] = useState(comment.content)
  const [editMode, setEditMode] = useState(false)

  const updateClickHandler = async () => {
    const res = await editComment(comment._id, editContent)
    if (!res.success) {
      toast.error(res.error)
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  updateClickHandler()
                }
              }}
              onFocus={(e) => {
                e.target.value = ""
                e.target.value = editContent
              }}
              type="text"
              className=" border border-gray-300 dark:border-transparent text-gray-900 w-full focus:outline-none px-4 h-20 overflow-auto rounded m-1 resize-none"
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
              <button
                className="w-5 h-5 inline-block"
                title="Edit comment"
                onClick={() => setEditMode(!editMode)}
                type="button"
              >
                <PencilAltIcon className="cursor-pointer w-5 h-5 inline-block" />
              </button>
            )}
            <button
              title="Delete comment"
              onClick={() => {
                toast((t) => (
                  <div className="px-5 flex flex-col gap-2 font-semibold bg-white">
                    <p>Are you sure?</p>
                    <button
                      className="flex items-center justify-center gap-1 text-gray-100 rounded bg-red-500 px-4 py-1"
                      onClick={() => {
                        removeComment(comment._id, itineraryId)
                        toast.dismiss(t.id)
                      }}
                    >
                      Delete
                      <TrashIcon className="inline-block w-5 h-5" />
                    </button>
                    <button
                      className="flex gap-1 items-center justify-center rounded text-gray-100 bg-gray-600 px-3 py-1"
                      onClick={() => toast.dismiss(t.id)}
                    >
                      Cancel <XIcon className=" inline-block w-5 h-5" />
                    </button>
                  </div>
                ))
              }}
            >
              <TrashIcon className="cursor-pointer w-5 h-5 inline-block" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const Loading = () => {
  return (
    <div className="px-5 h-1/2s flex items-center justify-center flex-grow py-5 transition duration-1000 dark:bg-gray-800 bg-white">
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
