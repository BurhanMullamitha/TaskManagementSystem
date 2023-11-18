import React from "react";
import { useStore} from "../../../app/stores/store";
import { observer} from "mobx-react-lite";
import { Card } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { format } from "date-fns";

function TaskList() {

    const { taskStore } = useStore();
    const { tasks } = taskStore;

    return (
        <Card.Group centered itemsPerRow={1}>
            {tasks.map(task => (
                <Card key={task.id} as={NavLink} to={`/tasks/${task.id}`}>
                    <Card.Content>
                        <Card.Header>{task.title}</Card.Header>
                        <Card.Meta>Due by: {format(task.dueDate!, 'd MMM yyyy h:mm aa')}</Card.Meta>
                        <Card.Description>{task.description}</Card.Description>
                    </Card.Content>
                </Card>
            ))}
        </Card.Group>
    )
}

export default observer(TaskList)