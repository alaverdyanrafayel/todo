import React, {Component} from 'react';
//@ts-ignore
import {buildYup} from 'json-schema-to-yup';
import './index.css';
import settings from './settings.json';
import schema from './schema.json';
import {TodosContainer} from './containers';

type AppState = {
  error: string;
};

class App extends Component<{}, AppState> {
  state: AppState = {
    error: '',
  };

  async componentDidMount() {
    try {
      await this.checkSettingsFile();
    } catch (error) {
      this.setState({error: error.message});
    }
  }

  checkSettingsFile() {
    const yupSchema = buildYup(schema, {});
    return yupSchema.validate(settings);
  }

  render() {
    const {error} = this.state;
    if (!!error) return <div>{error}</div>;

    return (
      <div style={styles.appContainer}>
        <TodosContainer />
      </div>
    );
  }
}

const styles = {
  appContainer: {
    background: settings.themeColor,
    padding: 30,
    display: 'flex' as 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
};

export default App;
