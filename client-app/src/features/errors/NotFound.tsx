import React from 'react';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name="search" />
                Oops - we've looked everywhere and could not find this.
            </Header>
            <Segment.Inline>
                <Button as={Link} to="/tasks" primary>
                    Back to tasks page
                </Button>
            </Segment.Inline>
        </Segment>
    )
}