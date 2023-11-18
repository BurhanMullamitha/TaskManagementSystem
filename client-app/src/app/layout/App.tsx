import React, { useEffect } from 'react';
import { useStore } from '../stores/store';
import TaskDashboard from '../../features/tasks/dashboard/TaskDashboard';
import { observer } from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import './styles.css';
import TaskDetails from '../../features/tasks/details/TaskDetails';
import CreateTask from '../../features/tasks/form/CreateTask';
import NotFound from '../../features/errors/NotFound';
import UpdateTask from '../../features/tasks/form/UpdateTask';
import LoadingComponent from '../common/LoadingComponent';

function App() {
  const { taskStore } = useStore();

  useEffect(() => {
    taskStore.loadTasks();
  }, [taskStore])

  if(taskStore.loadingInitial) return <LoadingComponent content="Loading App..." />

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
      <Route exact path="/"><Redirect to="/tasks" /></Route>
        <Route path={'/(.+)'}
          render={() => (
            <>
              <Switch>
                <Route exact path="/tasks" component={TaskDashboard} />
                <Route path="/tasks/:id" component={TaskDetails} />
                <Route path="/createTask" component={CreateTask} />
                <Route path="/updateTask/:id" component={UpdateTask} />
                <Route component={NotFound} />
              </Switch>
            </>
          )}
        />
      </Container>
    </>
  )
}

export default observer(App);
