import { useDrop } from 'react-dnd';
import { useUpdatePriorityMutation } from '../slices/taskApiSlice';

const DroppableTaskList = ({ priority, onDrop, children }) => {
  const [updatePriority] = useUpdatePriorityMutation();

  const [, drop] = useDrop(() => ({
    accept: 'task',
    drop: (item, monitor) => {
      updatePriority({ taskId: item.id, newPriority: priority })
        .then(() => onDrop()) // Call onDrop after updatePriority completes
        .catch((error) => console.error(error));
    },
  }));

  return <div ref={drop}>{children}</div>;
};

export default DroppableTaskList;