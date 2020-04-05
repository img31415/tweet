import React from "react"
import { Droppable, Draggable } from "react-beautiful-dnd"
import { Row } from "./types"

export const AuthorList = ({
  listId,
  listType,
  tw,
  onDown,
  onUp,
  onLabelChange,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Droppable
        droppableId={listId}
        type={listType}
        direction="horizontal"
        isCombineEnabled={false}
      >
        {dropProvided => (
          <div
            {...dropProvided.droppableProps}
            style={{
              flex: 1,
              display: "flex",
              backgroundColor: "pink",
              margin: 20,
              minHeight: 60,
              overflowX: "auto",
            }}
            ref={dropProvided.innerRef}
          >
            {tw.map((tweet, index) => (
              <Draggable key={index} draggableId={tweet.id} index={index}>
                {dragProvided => (
                  <div
                    {...dragProvided.dragHandleProps}
                    {...dragProvided.draggableProps}
                    ref={dragProvided.innerRef}
                  >
                   
                  </div>
                )}
              </Draggable>
            ))}
            {dropProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}
