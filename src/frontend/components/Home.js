import React from 'react';
import { Typography, Container, Button, Divider } from '@material-ui/core';
import { MAIN_ROUTE } from "../../shared/constants/routes";

class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    content(type) {
        switch(type){
            case 'Home':
                return <Button onClick={() => this.props.changeType('Not Home')}>Click to switch variable type to Not Home</Button>;
            case 'Not Home':
                return <Button onClick={() => this.props.changeType('Home')}>Click to switch variable type to Home</Button>;
            default:
                return;
        }
    }
    render() {
        let content = this.content(this.props.home.type)
        return (
            <Container>
                <Typography variant="h4" gutterBottom>You are now in Home Page</Typography>
                <Divider />
                {content}
                <Divider />
                <Typography variant="h7" gutterBottom>The value of variable type is {this.props.home.type}</Typography>
                <Divider />
                <Button onClick={() => this.props.history.push(MAIN_ROUTE)}>Click to switch pages</Button>
            </Container>
        )
    }
}

export default Home
