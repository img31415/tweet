import { DraggableLocation } from "react-beautiful-dnd"

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

export const reorderTweets = (tweets, source, destination) => {
  const current = [...tweets[source.droppableId]]
  const next = [...tweets[destination.droppableId]]
  const target = current[source.index]

  // moving to same list
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index)
    return {
      ...tweets,
      [source.droppableId]: reordered,
    }
  }

  // remove from original
  current.splice(source.index, 1)
  // insert into next
  next.splice(destination.index, 0, target)

  return {
    ...tweets,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  }
}
