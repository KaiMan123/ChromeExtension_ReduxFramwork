import React from 'react';
import { Typography, Container, Button, Divider } from '@material-ui/core';
import { HOME_ROUTE } from "../../shared/constants/routes";

class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    content(num) {
        switch(num){
            case 0:
                return <Button onClick={() => this.props.changeNum(1)}>Click to switch variable type to 1</Button>;
            case 1:
                return <Button onClick={() => this.props.changeNum(0)}>Click to switch variable type to 0</Button>;
            default:
                return;
        }
    }
    render() {
        let content = this.content(this.props.main.num)
        return (
            <Container>
                <Typography variant="h4" gutterBottom>You are now in Main Page</Typography>
                <Divider />
                {content}
                <Divider />
                <Typography variant="h7" gutterBottom>The value of variable num is {this.props.main.num}</Typography>
                <Divider />
                <Button onClick={() => this.props.history.push(HOME_ROUTE)}>Click to switch pages</Button>
            </Container>
        )
    }
}

export default Main
