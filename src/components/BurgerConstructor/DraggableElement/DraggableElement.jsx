import React, {memo, useRef} from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {useDrop, useDrag} from 'react-dnd'
import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './DraggableElement.module.css'
import { IngredientPropTypes } from '../../../types/IngredientPropTypes'

DraggableElement.propTypes = {
  draggable: PropTypes.bool,
  children: PropTypes.node,
  extraClass: PropTypes.string,
  moveCard: PropTypes.func,
  index: PropTypes.number,
  ingredient: IngredientPropTypes
} 

function DraggableElement({
  draggable = true, 
  extraClass, 
  children, 
  ingredient,
  index, 
  moveCard 
}) {
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'component',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
          return;
      }
      
      const dragIndex = item.index;
      const hoverIndex = index;
      
      if (dragIndex === hoverIndex) {
          return;
      }
      
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
      }
      
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
      }
      
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  })
     
  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: () => ({ id: ingredient._id, index }),
    collect: (monitor) => ({
        isDragging: monitor.isDragging(),
    }),
  });
  
  const opacity = isDragging ? 0 : 1;
  
  drag(drop(ref));

  return (
    <li 
      className={classnames(styles.element, 'pl-8 pr-2 pb-4', extraClass, {
        [styles.draggable]: draggable
      })}
      ref={draggable ? ref : null}
      style={{ opacity }}
      onDrop={(e) => e.preventDefault()}
      data-handler-id={handlerId}
    >
      {draggable && <span className={styles.icon}><DragIcon type="primary" /></span>}
      {children}
    </li>
  )
}

export default memo(DraggableElement)