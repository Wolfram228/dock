import * as React from 'react';

import { Button, Card } from 'antd'
import { Link } from 'react-router-dom'

import './style.css'

class JoinGame extends React.Component {

    render() {
        return (
            <div className="JoinGame" >
                <Card title="Durak">
                    <Link to="/play">
                        <Button>Start a Game</Button>
                    </Link>
                </Card>
            </div>
        );
    }
}

export default JoinGame;
