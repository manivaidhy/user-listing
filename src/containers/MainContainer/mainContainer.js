import React, { useEffect } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import ListContainer from '../ListContainer/listContainer';
import ListDetailContainer from '../ListDetailContainer/listDetailContainer';

const MainContainer = ({ history }) => {
  
    useEffect(() => {
      const unlisten = history.listen(() => {
        window.scrollTo(0, 0);
      });
      return () => {
        unlisten();
      }
    }, [history]);
  
    return (
      <Switch>
        <Route exact path='/' component={() => <Redirect to='/users' />}/>
        <Route path='/users' component={ListContainer} exact />
        <Route path='/users/:rep_id' component={ListDetailContainer} exact />
      </Switch>
    )
  }
  
  export default withRouter(MainContainer);