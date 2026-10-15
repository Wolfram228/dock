import * as React from 'react';

import { Button, Input, Modal } from 'antd';

import icon from './icon.png';
import styles from './style.module.css';

const host = "http://localhost:8080"

class SignUpModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      user: "",
      visible: false
    }
  }

  componentDidMount() {
    this.loadUsername()
  }
  componentWillUnmount() {
    this.handleCancel()
  }

  render() {
    return (
      <Modal
        visible={this.state.visible}
        onOk={this.handleOk}
        closable={false}
        footer={[
          <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>
            Start Playing
            </Button>,
        ]}
      >
        <div className={styles.signUpModal}>
          <img src={icon} alt="durak icon" />
          <h1>Wellcome to Durak</h1>
          <h2>Choose your player name:</h2>
        </div>
        <Input size="large" onKeyDown={this.handleInput} ref={(ref) => this.userNameInput = ref} />
      </Modal>
    );
  }

  handleInput = (e) => {
    if (this.userNameInput !== null) {
      this.setState({
        user: this.userNameInput.input.value
      })
    }
  }

  showModal() {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({ loading: true })
    this.login()
      .then(res => this.setState({ loading: false, visible: false }))
      .then(() => this.props.onLogin(this.state.user))
      .catch(() => this.setState({ loading: false }))
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }

  loadUsername = () => {
    fetch(host + "/username", {
      credentials: "include",
      mode: "cors"
    })
      .then(response => {
        switch (response.status) {
          case 200:
            if (response.body != null) {
              response.text()
                .then((text) => {
                  this.setState({ user: text })
                  this.props.onLogin(text)
                })
            } else {
              throw Error("empty body")
            }
            break
          case 401:
            this.showModal()
            return
          default:
            throw Error("invalid status code")
        }
      })
      .catch(((e) => alert(e)))
  }

  login = () => {
    return fetch(host + "/login?username=" + this.state.user)
  }
}

export default SignUpModal;
