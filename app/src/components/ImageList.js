import React, { useRef } from "react"
import { useDrag, useDrop } from "react-dnd"

const type = "Tweet" // Need to pass which type element can be draggable

const Tweet = ({ tweet, index, moveTweet }) => {
  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: type,
    hover(item) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Move the content
      moveTweet(dragIndex, hoverIndex)
      // Update the index for dragged item directly to avoid flickering when half dragged
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    item: { type, id: tweet.id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  // initialize drag and drop into the element
  drag(drop(ref))

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0 : 1 }}
      className="file-item"
    >
      
    </div>
  )
}

const TweetList = ({ tweets, moveTweet }) => {
  const renderTweet = (tweet, index) => {
    return (
      <Tweet
        tweet={tweet}
        index={index}
        key={`${tweet.id}-tweet`}
        moveImage={moveTweet}
      />
    )
  }

  return <section className="file-list">{tweets.map(renderTweet)}</section>
}

export default TweetList
