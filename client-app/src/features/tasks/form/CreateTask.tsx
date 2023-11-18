import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import { TaskFormValues } from "../../../app/models/task";
import { v4 as uuid } from 'uuid';
import * as Yup from "yup";
import { Button, Confirm, Header, Segment } from "semantic-ui-react";
import { Form, Formik } from "formik";
import MyTextInput from "../../../app/common/MyTextInput";
import MyTextArea from "../../../app/common/MyTextArea";
import MySelectInput from "../../../app/common/MySelectInput";
import MyDateInput from "../../../app/common/MyDateInput";
import { TaskStatusOptions } from "../../../app/enums/TaskStatus";
import { Priority, PriorityOptions } from "../../../app/enums/Priority";

function CreateTask() {
    const history = useHistory();
    const { taskStore } = useStore();
    const { createTask } = taskStore;
    const task = new TaskFormValues();
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState<TaskFormValues | null>(null);

    const validationSchema = Yup.object({
        title: Yup.string().required("The task title is required"),
        priority: Yup.string().required(),
        status: Yup.string().required(),
        dueDate: Yup.string().required("Due Date is required")
    })

    function handleFormSubmit(task: TaskFormValues) {
        if(task.priority === Priority.High)
        {
            setValues(task);
            setOpen(true);
        }
        else {
            confirmFormSubmit(task);
        }
    }

    function confirmFormSubmit(task: TaskFormValues) {
        let newTask = {
            ...task,
            id: uuid()
        };

        createTask(newTask).then(() => history.push(`/tasks/${newTask.id}`));
    }

    const handleConfirm = () => {
        setOpen(false);
        confirmFormSubmit(values!);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Segment clearing>
            <Header content="Task Details" sub color="teal" />
            <Formik
                validationSchema={validationSchema}
                initialValues={task}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty, setSubmitting }) => (
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
                        <Confirm
                            open={open}
                            onCancel={() => {
                                handleCancel()
                                setSubmitting(false)
                            }}
                            onConfirm={handleConfirm}
                            content='Are you sure you want to create a task with high priority?'
                        />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
}

export default observer(CreateTask);