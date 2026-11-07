import * as React from 'react';

import JoinGame from '../../components/JoinGame';
import SignUpModal from '../../components/SignUpModal';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: undefined
    }
  }

  render() {
    return (
      <div>
        {this.state.user &&
          <JoinGame/>
        }
        <SignUpModal onLogin={this.onLogin} />
      </div>
    );
  }

  onLogin = (user) => {
    this.setState({user})
  }
}

export default App;
