import React, { memo, useRef } from 'react'
import classnames from 'classnames'
import { useDrop, useDrag, XYCoord, DropTargetMonitor } from 'react-dnd'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './DraggableElement.module.css'
import { Ingredient } from '../../../types/IngredientTypes'

type DraggableElementProps = {
  draggable?: boolean,
  children: React.ReactNode,
  extraClass?: string,
  moveCard?(from: number, to: number):  void,
  index?: number,
  ingredient?: Ingredient,
}

const DraggableElement: React.FC<DraggableElementProps>= ({
  draggable = true,
  extraClass,
  children,
  ingredient,
  index,
  moveCard,
}) => {
  const ref = useRef<HTMLLIElement | null>(null)

  const [{ handlerId }, drop] = useDrop<
    { type: string; index: number; id: string },
    void,
    { handlerId: string }
  >({
    accept: 'component',
    collect(monitor: DropTargetMonitor) {
      return {
        handlerId: monitor.getHandlerId()?.toString() || '',
      }
    },
    hover(item, monitor: DropTargetMonitor) {
      if (!moveCard || !index) {
        return
      }
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: () => ({ id: ingredient?._id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1

  drag(drop(ref))

  return (
    <li
      className={classnames(styles.element, 'pl-8 pr-2 pb-4', extraClass, {
        [styles.draggable]: draggable,
      })}
      ref={draggable ? ref : null}
      style={{ opacity }}
      onDrop={(e) => e.preventDefault()}
      data-handler-id={handlerId}
    >
      {draggable && (
        <span className={styles.icon}>
          <DragIcon type="primary" />
        </span>
      )}
      {children}
    </li>
  )
}

export default memo(DraggableElement)
