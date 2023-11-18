import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useStore } from "../../../app/stores/store";
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import { Button, Grid, Header, Icon } from "semantic-ui-react";
import { PriorityLabels } from "../../../app/enums/Priority";
import { TaskStatusLabels } from "../../../app/enums/TaskStatus";
import { format } from "date-fns";
import LoadingComponent from "../../../app/common/LoadingComponent";

function TaskDetails() {
    const history = useHistory();
    const { taskStore } = useStore();
    const { selectedTask: task, loadTask, clearSelectedTask, deleteTask } = taskStore;
    const { id } = useParams<{id: string}>();

    useEffect(() => {

        if(id) loadTask(id);
        return () => clearSelectedTask();

    }, [id, loadTask, clearSelectedTask]);

    const delTask = () => {
        if(id) deleteTask(id).then(() => history.push('/tasks'));
    }

    if(!task) return <LoadingComponent content="Loading Task Info..." />

    return (
        <Grid centered>
            <Grid.Column width="10">
                <Header as='h2'>
                    {task.title}
                </Header>
                <p><strong>Description:</strong> {task.description}</p>
                <p><strong>Due Date:</strong> {format(task.dueDate!, 'dd MMM yyyy h:mm aa')}</p>
                <p><strong>Priority:</strong> {PriorityLabels[task.priority]}</p>
                <p><strong>Status:</strong> {TaskStatusLabels[task.status]}</p>
            </Grid.Column>
            <Grid.Column width="10">
                <Button
                    color='blue'
                    as={NavLink}
                    to={`/updateTask/${task.id}`}
                    style={{ width: '110px' }}
                >
                    <Icon name="edit" /> Edit
                </Button>
                <Button
                    color='red'
                    onClick={delTask}
                    style={{ width: '110px' }}
                >
                    <Icon name="delete" /> Delete
                </Button>
                <Button
                    color='grey'
                    as={Link}
                    to='/tasks'
                    style={{ width: '110px' }}
                >
                    <Icon name="arrow left" /> Tasks
                </Button>
            </Grid.Column>
        </Grid>
    )
}

export default observer(TaskDetails);