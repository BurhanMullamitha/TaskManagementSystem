import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { TaskFormValues } from "../../../app/models/task";
import * as Yup from "yup";
import { Button, Header, Segment } from "semantic-ui-react";
import { Form, Formik } from "formik";
import MyTextInput from "../../../app/common/MyTextInput";
import MyTextArea from "../../../app/common/MyTextArea";
import MySelectInput from "../../../app/common/MySelectInput";
import MyDateInput from "../../../app/common/MyDateInput";
import { TaskStatusOptions } from "../../../app/enums/TaskStatus";
import { PriorityOptions } from "../../../app/enums/Priority";
import LoadingComponent from "../../../app/common/LoadingComponent";

function UpdateTask() {
    const history = useHistory();
    const { taskStore } = useStore();
    const { loadTask, updateTask, loadingInitial } = taskStore;
    const { id } = useParams<{id: string}>();
    const [task, setTask] = useState<TaskFormValues>(new TaskFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required("The task title is required"),
        priority: Yup.string().required("The priority is required"),
        status: Yup.string().required("The status is required"),
        dueDate: Yup.string().required("Due Date is required")
    })

    useEffect(() => {
        if(id) loadTask(id).then(task => setTask(new TaskFormValues(task)));
    }, [id, loadTask]);

    function handleFormSubmit(task: TaskFormValues) {
        updateTask(task).then(() => history.push(`/tasks/${task.id}`));
    }

    if(loadingInitial) return <LoadingComponent content="Loading Task..." />

    return (
        <Segment clearing>
            <Header content="Update Task" sub color="teal" />
            <Formik
                enableReinitialize
                validationSchema={validationSchema}
                initialValues={task}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="form ui" onSubmit={handleSubmit} autoComplete="off">
                        <MyTextInput placeholder="Title" name="title" />
                        <MyTextArea rows={3} placeholder="Description" name="description" />
                        <MyDateInput
                            placeholderText="Due Date"
                            name="dueDate"
                            showTimeSelect
                            timeCaption="Time"
                            timeIntervals={15}
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />
                        <MySelectInput options={TaskStatusOptions} placeholder="Status" name="status" />
                        <MySelectInput options={PriorityOptions} placeholder="Priority" name="priority" />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting}
                            floated="right"
                            positive
                            type="submit"
                            content="Submit"
                        />
                        <Button onClick={history.goBack} floated="right" type="button" content="Cancel" />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
}

export default observer(UpdateTask);