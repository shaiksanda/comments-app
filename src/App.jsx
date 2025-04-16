import { useState } from "react"
import { v4 } from "uuid"
import "./App.css"
const colors = [
  "#FF6B6B", // Red-ish
  "#FFD93D", // Yellow
  "#6BCB77", // Green
  "#4D96FF", // Blue
  "#A66DD4", // Purple
  "#FF9F1C", // Orange
  "#3FEEE6", // Aqua
  "#F67280", // Pink
  "#2D3142", // Dark Gray
  "#F4A261"  // Warm Sand
];
const getBackground = () => {
  const random = Math.ceil(Math.random() * colors.length)
  return colors[random]
}

const App = () => {
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const initialComments = JSON.parse(localStorage.getItem('comments')) || [];
  const [comments, setComments] = useState(initialComments);

  const handleName = (event) => {
    setName(event.target.value)
  }
  const handleComment = (event) => {
    setComment(event.target.value)
  }
  const addComment = (event) => {
    event.preventDefault()
    if (name && comment) {
      const newComment = { name, comment, id: v4(), createdAt: Date.now(), isLiked: false }
      setComments(prev => [...prev, newComment])
      localStorage.setItem("comments", JSON.stringify([...comments, newComment]));

      setName("")
      setComment("")
    }
  }
  const handleLike = (id) => {
    const updated = comments.map(each => {
      if (each.id === id) {
        return { ...each, isLiked: !each.isLiked }
      }
      return each
    })
    setComments(updated)
    localStorage.setItem("comments", JSON.stringify(updated));

  }
  const timeAgo = (timestamp) => {
    const diff = Date.now() - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 10) return "just now";
    if (seconds < 60) return "less than a minute ago";
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (days < 30) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
    return `${years} year${years > 1 ? "s" : ""} ago`;
  };

  const hanldeDelete = (id) => {
    const index = comments.findIndex(each => each.id === id)
    comments.splice(index, 1)
    setComments([...comments])
    localStorage.setItem("comments", JSON.stringify([...comments]));

  }



  return (
    <div className="app-container">
      <div className="top-container">
        <div className="input-container">
          <h1 className="comments-heading">Comments</h1>
          <h4>Say Something About 4.0 Technologies</h4>
          <form onSubmit={addComment}>
            <div className="input-wrapper">
              <input onChange={handleName} value={name} className="input" id="username" required type="text" />
              <label htmlFor="username">Your Name</label>
            </div>
            <div className="input-wrapper">
              <textarea onChange={handleComment} value={comment} style={{ height: "100px" }} required className="input" id="textarea"></textarea>
              <label htmlFor="textarea">Your Comment</label>
            </div>
            <button type="submit">
              Add Comment
            </button>
          </form>
        </div>
        <div>
          <img className="image" src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png" alt="comments" />
        </div>
      </div>
      <hr className="hr" />
      <div className="comment-length">
        <div className="length">{comments.length}</div>
        <div><h1>Comments</h1></div>
      </div>
      <div className="grid-container">
        {comments.map(each => (
          <div key={each.id} className="main-data">
            <div className="data-container">
              
              <div>
                <div className="name-and-time">
                  <h1 className="each-name">{each.name}</h1>
                  <p className="time">{timeAgo(each.createdAt)}</p>
                </div>
                <p className="comment">{each.comment}</p>
              </div>
            </div>
            <div className="bottom-container">
              <div onClick={() => handleLike(each.id)} className="like-container">
                <img className="icon" src={each.isLiked ? "https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png" : "https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png"} alt="" />
                <p>{each.isLiked ? "Liked" : "Like"}</p>
              </div>
              <img onClick={() => { hanldeDelete(each.id) }} className="icon" src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png" alt="delete" />
            </div>


          </div>
        ))}
      </div>
    </div>
  )
}

export default App