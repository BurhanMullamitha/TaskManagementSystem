import React from "react";
import TaskList from "./TaskList";
import { Container, Grid } from "semantic-ui-react";
import PieChart from "./PieChart";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

function TaskDashboard() {
    const { taskStore } = useStore();
    const { statusCounts } = taskStore;

    return (
        <Container>
            <Grid stackable>
                <Grid.Row columns={2}>
                    <Grid.Column width={9}>
                        <TaskList />
                    </Grid.Column>
                    <Grid.Column width={7}>
                        <PieChart title="Tasks By Status" data={Object.values(statusCounts)} labels={Object.keys(statusCounts)} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default observer(TaskDashboard);